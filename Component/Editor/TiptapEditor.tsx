/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";

import { useEffect } from "react";

import FloatingToolbar from "./FloatingToolbar";
import { SlashCommand } from "./slashCommand";

interface Props {
  content?: any;
  onChange?: (html: string, json: string) => void;
}

export default function TiptapEditor({ content, onChange }: Props) {
  const editor = useEditor({
    immediatelyRender: false,

    extensions: [
      StarterKit.configure({
        blockquote: false,
        codeBlock: false,
        horizontalRule: false,
      }),

      Image.configure({
        inline: false,
      }),

      Placeholder.configure({
        placeholder: "Type '/' for commands or start writing...",
      }),
      SlashCommand,
    ],

    content,

    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none focus:outline-none min-h-[600px]",
      },
    },

    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML(), JSON.stringify(editor.getJSON()));
    },
  });

  useEffect(() => {
    if (!editor) return;

    const handler = (event: KeyboardEvent) => {
      if (event.key !== "/") return;

      console.log("open slash menu");
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [editor]);

  if (!editor) return null;

  const uploadImage = async () => {
    const input = document.createElement("input");

    input.type = "file";

    input.accept = "image/*";

    input.onchange = async () => {
      const file = input.files?.[0];

      if (!file) return;

      const formData = new FormData();

      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      editor
        .chain()
        .focus()
        .setImage({
          src: data.url,
        })
        .run();
    };

    input.click();
  };

  const executeSlash = (type: string) => {
    switch (type) {
      case "h1":
        editor
          .chain()
          .focus()
          .toggleHeading({
            level: 1,
          })
          .run();
        break;

      case "h2":
        editor
          .chain()
          .focus()
          .toggleHeading({
            level: 2,
          })
          .run();
        break;

      case "h3":
        editor
          .chain()
          .focus()
          .toggleHeading({
            level: 3,
          })
          .run();
        break;

      case "ul":
        editor.chain().focus().toggleBulletList().run();
        break;

      case "ol":
        editor.chain().focus().toggleOrderedList().run();
        break;

      case "image":
        uploadImage();
        break;
    }
  };

  return (
    <div className="relative">
      <FloatingToolbar editor={editor} />

      <EditorContent editor={editor} />

      {/* sementara */}
      <div className="mt-8">
        <button onClick={() => executeSlash("h1")}>H1</button>

        <button onClick={() => executeSlash("h2")}>H2</button>

        <button onClick={() => executeSlash("h3")}>H3</button>

        <button onClick={() => executeSlash("ul")}>UL</button>

        <button onClick={() => executeSlash("ol")}>OL</button>

        <button onClick={() => executeSlash("image")}>Image</button>
      </div>
    </div>
  );
}
