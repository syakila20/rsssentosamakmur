"use client";

import { Editor } from "@tiptap/react";
import clsx from "clsx";
import { ImageToolbarItem, ImageToolbarProps } from "./type";
import { Button } from "@/Component/Button/Button";

type Props = ImageToolbarProps & {
  editor: Editor;
  items: ImageToolbarItem[];
};

export default function ImageToolbar({ editor, items, loading }: Props) {
  return (
    <div
      className="
        absolute
        -top-12
        left-1/2
        z-50
        flex
        -translate-x-1/2
        items-center
        gap-1
        rounded-xl
        bg-gray-100
        px-2
        py-1
        shadow-lg
      "
    >
      {items.map((item) => {
        const active = item.isActive?.(editor);

        return (
          <button
            key={item.id}
            type="button"
            title={item.label}
            disabled={loading}
            onClick={async () => {
              if (loading) {
                return;
              }

              await item.action(editor);
            }}
            className={clsx(
              `
              flex
              h-8
              px-6
              items-center
              justify-center
              rounded-lg
              text-sm
              text-slate-700
              transition
              hover:bg-slate-700
              hover:text-white
              `,
              active && "bg-slate-700 text-white",
              loading && "cursor-not-allowed",
            )}
          >
            {item.icon ?? item.label}
          </button>
        );
      })}
    </div>
  );
}
