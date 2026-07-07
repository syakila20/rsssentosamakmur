"use client";

import { JSONContent } from "@tiptap/core";
import { EditorContent } from "@tiptap/react";

import { useEffect, useRef } from "react";

import Toolbar from "./Toolbar";
import BubbleMenuBar from "./BubbleMenuBar";

import { useArticleEditor } from "../../hooks/useArticleEditor";
import { useEditorUpload } from "@/hooks/useEditorUploadImage";

type Props = {
  value?: JSONContent;

  onChange?: (json: JSONContent, html: string) => void;
};

export default function ArticleEditor({ value, onChange }: Props) {
  const { editor } = useArticleEditor({
    content: value,
    onChange,
  });

  const { selectImage } = useEditorUpload({
    editor,
  });

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
p-4
outline-none
  "
      />
    </div>
  );
}
