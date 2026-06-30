"use client";

import { JSONContent } from "@tiptap/core";
import { EditorContent } from "@tiptap/react";

import clsx from "clsx";
import { useEffect, useRef } from "react";

import Toolbar from "./Toolbar";
import BubbleMenuBar from "./BubbleMenuBar";

import { useArticleEditor } from "../../hooks/useArticleEditor";
import { useImageUpload } from "@/hooks/useUploadImage";

type Props = {
  value?: JSONContent;

  onChange?: (json: JSONContent, html: string) => void;
};

export default function ArticleEditor({ value, onChange }: Props) {
  const editor = useArticleEditor({
    content: value,
    onChange,
  });

  const loadedRef = useRef(false);
  const { selectImage } = useImageUpload(editor);

  useEffect(() => {
    if (!editor) return;

    if (!value) return;

    if (loadedRef.current) return;

    editor.commands.setContent(value, false);

    loadedRef.current = true;
  }, [editor, value]);

  useEffect(() => {
    const handler = () => {
      selectImage();
    };

    window.addEventListener("tiptap-image-upload", handler);

    return () => {
      window.removeEventListener("tiptap-image-upload", handler);
    };
  }, [selectImage]);

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        bg-white
        shadow-sm
      "
    >
      <Toolbar editor={editor} />

      <BubbleMenuBar editor={editor} />

      <EditorContent
        editor={editor}
        className="
 article-editor
article-content
min-h-[600px]
max-w-none
p-6
outline-none
  "
      />
    </div>
  );
}
