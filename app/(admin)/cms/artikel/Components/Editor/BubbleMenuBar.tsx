"use client";
import { BubbleMenu } from "@tiptap/react/menus";
import { Editor } from "@tiptap/react";
import ToolbarButton from "./ToolbarButton";
import { createToolbarItems, getItemsByGroup } from "./ToolbarItems";

type Props = {
  editor: Editor | null;
};

export default function BubbleMenuBar({ editor }: Props) {
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

  const items = createToolbarItems(setLink);
  const bubbleItems = getItemsByGroup(items, "bubble");
  return (
    <BubbleMenu
      editor={editor}
      shouldShow={({ editor }) => {
        const { from, to } = editor.state.selection;

        if (editor.isActive("image")) {
          return false;
        }

        // tidak ada selection
        if (from === to) {
          return false;
        }

        // select all document
        const isAllSelected =
          from === 0 && to === editor.state.doc.content.size;

        if (isAllSelected) {
          return false;
        }

        return true;
      }}
    >
      <div
        className="
          flex
          gap-1
          rounded-xl
          border
          bg-white
          p-1.5
          shadow-xl
        "
      >
        {bubbleItems.map((item) => (
          <ToolbarButton
            key={item.id}
            icon={item?.icon}
            label={item.label}
            active={item.isActive?.(editor)}
            onClick={() => item.action(editor)}
          />
        ))}
      </div>
    </BubbleMenu>
  );
}
