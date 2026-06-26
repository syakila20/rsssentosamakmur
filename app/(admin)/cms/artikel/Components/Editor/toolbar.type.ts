// components/article/editor/toolbar.type.ts

import { Editor } from "@tiptap/react";

export type ToolbarGroup = "toolbar" | "bubble" | "floating" | "slash";

export type ToolbarItem = {
  id: string;
  label: string;

  title?: string;
  description?: string;

  groups: ToolbarGroup[];

  isActive?: (editor: Editor) => boolean;

  action: (editor: Editor) => void;
};
