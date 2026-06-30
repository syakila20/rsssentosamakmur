"use client";

import { JSONContent } from "@tiptap/core";
import { useEditor } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { createToolbarItems } from "../Components/Editor/ToolbarItems";

import { SlashCommand } from "../Components/Editor/Extension/SlashCommand";

type Props = {
  content?: JSONContent;

  onChange?: (json: JSONContent, html: string) => void;
};

export function useArticleEditor({ content, onChange }: Props) {
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

      Image.configure({
        inline: false,
        allowBase64: false,
      }),
    ],

    content,

    onUpdate({ editor }) {
      onChange?.(editor.getJSON(), editor.getHTML());
    },
  });

  return editor;
}
