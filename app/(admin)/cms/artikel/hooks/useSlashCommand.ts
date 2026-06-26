"use client";

import { useEffect, useMemo, useState } from "react";
import { Editor } from "@tiptap/react";
import { ToolbarItem } from "../Components/Editor/toolbar.type";
import { executeSlashItem } from "../Components/Editor/Extension/SlashCommand";

type Props = {
  editor: Editor | null;
  items: ToolbarItem[];
};

export function useSlashCommand({ editor, items }: Props) {
  const [open, setOpen] = useState(false);

  const [query, setQuery] = useState("");

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [position, setPosition] = useState({
    left: 0,
    top: 0,
  });

  const filteredItems = useMemo(() => {
    if (!query) return items;

    return items.filter((item) =>
      (item.title || item.label).toLowerCase().includes(query.toLowerCase()),
    );
  }, [items, query]);

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      const { from } = editor.state.selection;

      const textBefore = editor.state.doc.textBetween(
        Math.max(0, from - 50),
        from,
      );

      const match = textBefore.match(/\/([a-zA-Z0-9]*)$/);

      if (!match) {
        setOpen(false);
        return;
      }

      const coords = editor.view.coordsAtPos(from);

      const popupHeight = 320;

      const showAbove = window.innerHeight - coords.bottom < popupHeight;

      setPosition({
        left: coords.left,
        top: showAbove ? coords.top - popupHeight : coords.bottom + 8,
      });

      setQuery(match[1] ?? "");

      setSelectedIndex(0);

      setOpen(true);
    };

    editor.on("update", handleUpdate);

    return () => {
      editor.off("update", handleUpdate);
    };
  }, [editor]);

  useEffect(() => {
    if (!open || !editor) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((prev) =>
          prev >= filteredItems.length - 1 ? 0 : prev + 1,
        );
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((prev) =>
          prev <= 0 ? filteredItems.length - 1 : prev - 1,
        );
        return;
      }

      if (event.key !== "Enter") {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const item = filteredItems[selectedIndex];

      if (!item || !editor) return;

      executeSlashItem(editor, item, () => setOpen(false));
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, editor, filteredItems, selectedIndex]);

  useEffect(() => {
    if (!open) return;

    const handleWindowScroll = () => {
      setOpen(false);
    };

    window.addEventListener("scroll", handleWindowScroll, false);

    return () =>
      window.removeEventListener("scroll", handleWindowScroll, false);
  }, [open]);

  return {
    open,
    position,
    selectedIndex,
    filteredItems,
    close: () => setOpen(false),
  };
}
