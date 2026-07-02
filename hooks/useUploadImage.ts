"use client";

import { uploadToCloudinary } from "@/lib/api/uploadImage";
import { Editor } from "@tiptap/react";

type Props = {
  editor: Editor | null;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

export function useImageUpload({ editor }: Props) {
  function validate(file: File) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error(
        "Format gambar tidak didukung. Gunakan JPG, PNG, WebP, atau AVIF.",
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new Error("Ukuran gambar maksimal 5 MB.");
    }
  }

  async function upload(file: File) {
    if (!editor) {
      return;
    }

    validate(file);

    const previewUrl = URL.createObjectURL(file);

    editor
      .chain()
      .focus()
      .setImage({
        src: previewUrl,

        uploading: true,

        publicId: "",

        caption: "",

        align: "center",

        width: null,

        height: null,
      })
      .run();

    try {
      const result = await uploadToCloudinary(file);

      editor
        .chain()
        .focus()
        .updateAttributes("image", {
          src: result.url,

          publicId: result.publicId,

          uploading: false,
        })
        .run();
    } catch (error) {
      console.error(error);

      editor.chain().focus().deleteSelection().run();
    } finally {
      URL.revokeObjectURL(previewUrl);
    }
  }

  function selectImage() {
    const input = document.createElement("input");

    input.type = "file";

    input.accept = ALLOWED_TYPES.join(",");

    input.onchange = async () => {
      const file = input.files?.[0];

      input.remove();

      if (!file) {
        return;
      }

      try {
        await upload(file);
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
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
