import { Editor } from "@tiptap/react";
import { ReactNode } from "react";

export type ToolbarGroup = "toolbar" | "bubble" | "floating" | "slash";

export type ToolbarItem = {
  id: string;

  label: string;

  title: string;

  description?: string;

  icon?: ReactNode;

  groups: ToolbarGroup[];

  keywords?: string[];

  isActive?: (editor: Editor) => boolean;

  action: (editor: Editor) => void;
};
