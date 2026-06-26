"use client";

import { Editor } from "@tiptap/react";
import { ToolbarItem } from "./toolbar.type";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import { executeSlashItem } from "./Extension/SlashCommand";

type Props = {
  editor: Editor;
  items: ToolbarItem[];
  open: boolean;
  onClose: () => void;
  position: {
    top: number;
    left: number;
  };

  selectedIndex: number;
};

export default function SlashCommand({
  editor,
  items,
  open,
  onClose,
  position,
  selectedIndex,
}: Props) {
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    itemRefs.current[selectedIndex]?.scrollIntoView({
      block: "nearest",
    });
  }, [selectedIndex]);
  if (!open) return null;
  return (
    <div
      style={{
        left: position?.left,
        top: position?.top,
      }}
      className="
      fixed 
     
      z-50

      flex
      flex-col

      w-80
      max-h-80

      overflow-hidden

      rounded-xl
      border
      border-slate-700

      bg-slate-800

      shadow-xl
    "
    >
      <div
        className="
        flex-1
        overflow-y-auto
        p-2

       slash-scroll
      "
      >
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className={clsx(
              `
    flex
    w-full
    flex-col
    items-start
    rounded-lg
    px-3
    py-2
    text-left
    transition-colors
  `,
              index === selectedIndex ? "bg-slate-700" : "hover:bg-slate-700",
            )}
            // onClick={() => {

            //   const { from } = editor.state.selection;

            //   const textBefore = editor.state.doc.textBetween(
            //     Math.max(0, from - 50),
            //     from,
            //   );

            //   const match = textBefore.match(/\/([a-zA-Z0-9]*)$/);

            //   const slashLength = match?.[0]?.length ?? 0;

            //   editor
            //     .chain()
            //     .focus()
            //     .deleteRange({
            //       from: from - slashLength,
            //       to: from,
            //     })
            //     .run();

            //   item.action(editor);

            //   onClose();
            // }}
            onClick={() => executeSlashItem(editor, item, onClose)}
          >
            {item.title || item.label}
          </button>
        ))}
      </div>

      <div
        className="
        border-t
        border-slate-700

        bg-slate-800

        p-2
      "
      >
        <button
          type="button"
          onClick={onClose}
          className="
          w-full
          rounded-md

          bg-slate-700

          px-3
          py-2

          text-sm

          hover:bg-slate-600
        "
        >
          Tutup
        </button>
      </div>
    </div>
  );
}
