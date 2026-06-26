"use client";

import { Editor } from "@tiptap/react";

interface Props {
  editor: Editor;
}

export default function FloatingToolbar({ editor }: Props) {
  if (!editor) return null;

  return (
    <div
      className="
        sticky
        top-4
        z-20
        mb-4
        flex
        gap-2
        rounded-lg
        border
        bg-white
        p-2
        shadow
      "
    >
      <button onClick={() => editor.chain().focus().toggleBold().run()}>
        B
      </button>

      <button onClick={() => editor.chain().focus().toggleItalic().run()}>
        I
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        H1
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        H3
      </button>

      <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
        UL
      </button>

      <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        OL
      </button>
    </div>
  );
}
