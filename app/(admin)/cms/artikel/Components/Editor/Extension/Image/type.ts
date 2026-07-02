/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor } from "@tiptap/react";
import { ReactNode } from "react";

export type ImageToolbarItem = {
  id: string;

  label: string;

  icon?: ReactNode;

  isActive?: (editor: Editor) => boolean;

  action: (editor: Editor) => void;
};

export type ImageToolbarProps = {
  loading?: boolean;
  setLoading?: any;
};

export type ImageSize = "small" | "medium" | "large";
