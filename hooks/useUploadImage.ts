"use client";

import { uploadToCloudinary } from "@/lib/api/uploadImage";
import { Editor } from "@tiptap/react";

export function useImageUpload(editor: Editor | null) {
  async function upload(file: File) {
    if (!editor) {
      return;
    }

    const url = await uploadToCloudinary(file);

    editor
      .chain()
      .focus()
      .setImage({
        src: url,
      })
      .run();
  }

  function selectImage() {
    const input = document.createElement("input");

    input.type = "file";
    input.accept = "image/*";

    input.onchange = async () => {
      const file = input.files?.[0];

      if (!file) {
        input.remove();
        return;
      }

      try {
        await upload(file);
      } finally {
        input.remove();
      }
    };

    document.body.appendChild(input);

    input.click();
  }

  return {
    selectImage,
    upload,
  };
}
