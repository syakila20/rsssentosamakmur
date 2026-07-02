"use client";

import { uploadToCloudinary } from "@/lib/api/uploadImage";
import { Editor } from "@tiptap/react";

export function useReplaceImage(editor: Editor) {
  function selectReplaceImage() {
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
        const image = await uploadToCloudinary(file);

        editor
          .chain()
          .focus()
          .updateAttributes("image", {
            src: image.url,

            publicId: image.publicId,
          })
          .run();
      } finally {
        input.remove();
      }
    };

    document.body.appendChild(input);

    input.click();
  }

  return {
    selectReplaceImage,
  };
}
