"use client";
import { BubbleMenu } from "@tiptap/react/menus";
import { Editor } from "@tiptap/react";
import { getItemsByGroup, getToolbarItems } from "./ToolbarItems";
import ToolbarButton from "./ToolbarButton";

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

  const items = getToolbarItems(editor, setLink);
  const bubbleItems = getItemsByGroup(items, "bubble");
  return (
    <BubbleMenu editor={editor}>
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
            label={item.label}
            active={item.isActive?.(editor)}
            onClick={() => item.action(editor)}
          />
        ))}
      </div>
    </BubbleMenu>
  );
}
