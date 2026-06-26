"use client";

import { JSONContent } from "@tiptap/core";
import { EditorContent } from "@tiptap/react";

import Toolbar from "./Toolbar";
import { useArticleEditor } from "../../hooks/useArticleEditor";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import BubbleMenuBar from "./BubbleMenuBar";
import { useSlashCommand } from "../../hooks/useSlashCommand";

import { getToolbarItems, getItemsByGroup } from "./ToolbarItems";
import SlashCommand from "./SlashCommand";
import { executeSlashItem } from "./Extension/SlashCommand";
type Props = {
  value?: JSONContent;
  onChange?: (json: JSONContent, html: string) => void;
};

export default function ArticleEditor({ value, onChange }: Props) {
  const editor = useArticleEditor({
    content: value,
    onChange,
  });
  const toolbarItems = editor ? getToolbarItems(editor, () => {}) : [];

  const slashItems = getItemsByGroup(toolbarItems, "slash");

  const slash = useSlashCommand({
    editor,
    items: slashItems,
  });

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

      {editor && (
        <SlashCommand
          editor={editor}
          items={slash.filteredItems}
          open={slash.open}
          position={slash.position}
          selectedIndex={slash.selectedIndex}
          onClose={slash.close}
        />
      )}

      <EditorContent
        editor={editor}
        className={clsx(
          "min-h-125 p-6 article-content article-editor max-w-none focus:outline-none bg-slate-900",
        )}
      />
    </div>
  );
}
