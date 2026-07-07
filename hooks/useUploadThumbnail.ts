/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";

import { uploadFile } from "@/lib/image/uploadImage";
import { useToast } from "@/Component/Toast/useToast";
import { http } from "@/lib/api/http";

type Props = {
  value?: string;
  onUploaded?: (url: string, publicId: string) => void;
};

export function useThumbnailUpload({ value, onUploaded }: Props) {
  const toast = useToast();

  const [preview, setPreview] = useState<string | null>(null);
  const [url, setUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPreview(value || null);
  }, [value]);

  async function onChange(file: File | null) {
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setPreview(previewUrl);

    try {
      setLoading(true);

      const result = await uploadFile({
        file,
      });

      setUrl(result.url);

      setPublicId(result.publicId);

      setPreview(result.url);
      URL.revokeObjectURL(previewUrl);
      onUploaded?.(result.url, result.publicId);
    } catch (error) {
      URL.revokeObjectURL(previewUrl);

      setPreview(null);

      toast.warning(
        error instanceof Error ? error.message : "Gagal mengunggah file image.",
      );
    } finally {
      setLoading(false);
    }
  }

  const deleteImage = async (id: string) => {
    console.log("??id", { id });
    try {
      const res = await http.post("/api/claudinary/delete", { publicId: id });
      if (!res?.success) {
        throw new Error("Gagal hapus photo");
      }
      toast?.success("Berhasil Hapus Photo");
      setPreview(null);
      onUploaded?.("", "");
      setPublicId("");
      setUrl("");
    } catch (error) {
      toast.warning(
        error instanceof Error ? error.message : "Gagal hapus file image.",
      );
    }
  };

  return {
    preview,
    url,
    publicId,
    loading,
    deleteImage,
    onChange,
  };
}
