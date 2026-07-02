"use client";

import { JSONContent } from "@tiptap/core";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { createToolbarItems } from "../Components/Editor/ToolbarItems";
import { SlashCommand } from "../Components/Editor/Extension/SlashCommand";
import { CustomImage } from "../Components/Editor/Extension/Image/Image";
import { useState } from "react";

type Props = {
  content?: JSONContent;

  onChange?: (json: JSONContent, html: string) => void;
};

export function useArticleEditor({ content, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const editor = useEditor({
    immediatelyRender: false,

    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),

      Underline,

      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),

      Placeholder.configure({
        placeholder: "Tulis artikel...",
      }),

      SlashCommand.configure({
        items: createToolbarItems(() => {}).filter((item) =>
          item.groups.includes("slash"),
        ),
      }),

      CustomImage.configure({
        inline: false,
        allowBase64: false,
      }),
    ],

    content,

    onUpdate({ editor }) {
      onChange?.(editor.getJSON(), editor.getHTML());
    },
  });
  console.log("??editor", editor?.commands);

  return {
    editor,
    uploading,
    setUploading,
  };
}
