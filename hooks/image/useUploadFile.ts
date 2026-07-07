"use client";

import { useCallback } from "react";

import { useToast } from "@/Component/Toast/useToast";
import { uploadFile } from "@/lib/image/uploadImage";
import { IUploadFile } from "@/lib/image/type";
import { useFilePicker } from "./useFilePicker";

interface IUseUploadFile extends Pick<IUploadFile, "allowedTypes" | "maxSize"> {
  accept?: string;
}

export function useUploadFile({
  accept = "image/*",
  allowedTypes,
  maxSize,
}: IUseUploadFile) {
  const toast = useToast();

  const { pickFile } = useFilePicker({
    accept,
  });

  const upload = useCallback(async () => {
    try {
      const file = await pickFile();

      if (!file) {
        return null;
      }

      const result = await uploadFile({
        file,
        allowedTypes,
        maxSize,
      });

      return {
        file,
        ...result,
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Gagal mengunggah file.";

      toast.warning(message);

      return null;
    }
  }, [pickFile, allowedTypes, maxSize, toast]);

  return {
    upload,
  };
}
