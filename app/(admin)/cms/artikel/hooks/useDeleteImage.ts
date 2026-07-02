"use client";

import { Editor } from "@tiptap/react";

export function useDeleteImage(editor: Editor) {
  async function deleteImage() {
    const attrs = editor.getAttributes("image");

    const publicId = attrs.publicId;

    if (publicId) {
      await fetch("/api/claudinary/delete", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          publicId,
        }),
      });
    }

    editor.chain().focus().deleteSelection().run();
  }

  return {
    deleteImage,
  };
}
