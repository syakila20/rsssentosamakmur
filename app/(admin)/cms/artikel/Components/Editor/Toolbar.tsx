"use client";

import { Editor } from "@tiptap/react";

import ToolbarButton from "./ToolbarButton";
import { getToolbarItems, getItemsByGroup } from "./ToolbarItems";

type Props = {
  editor: Editor | null;
};

export default function Toolbar({ editor }: Props) {
  if (!editor) return null;

  function setLink() {
    const previousUrl = editor?.getAttributes("link").href;

    const url = window.prompt("Masukkan URL", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor?.chain().focus().unsetLink().run();

      return;
    }

    editor
      ?.chain()
      .focus()
      .setLink({
        href: url,
      })
      .run();
  }

  const items = getToolbarItems(editor, setLink);

  const toolbarItems = getItemsByGroup(items, "toolbar");
  return (
    <div
      className="
        sticky
        top-0
        z-20

        flex
        flex-wrap
        gap-2

        border-b
        border-slate-200

        bg-white

        p-3
      "
    >
      {toolbarItems.map((item) => (
        <ToolbarButton
          key={item.id}
          label={item.label}
          active={item.isActive?.(editor)}
          onClick={() => item.action(editor)}
        />
      ))}
    </div>
  );
}
