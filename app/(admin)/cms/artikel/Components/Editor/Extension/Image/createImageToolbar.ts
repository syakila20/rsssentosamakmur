/* eslint-disable react-hooks/rules-of-hooks */
import { Editor } from "@tiptap/react";
import { ImageToolbarItem } from "./type";
import { useReplaceImage } from "../../../../hooks/useReplaceImage";
import { useDeleteImage } from "../../../../hooks/useDeleteImage";

export function createImageToolbarItems(editor: Editor): ImageToolbarItem[] {
  const { selectReplaceImage } = useReplaceImage(editor);
  const { deleteImage } = useDeleteImage(editor);
  return [
    {
      id: "delete",

      label: "Delete",

      action() {
        deleteImage();
      },
    },
    {
      id: "replace",

      label: "Replace",

      action() {
        selectReplaceImage();
      },
    },
    {
      id: "size-small",

      label: "Small",

      isActive(editor) {
        return editor.isActive("image", {
          size: "small",
        });
      },

      action(editor) {
        editor
          .chain()
          .focus()
          .updateAttributes("image", {
            size: "small",
            width: 320,
          })
          .run();
      },
    },

    {
      id: "size-medium",

      label: "Medium",

      isActive(editor) {
        return editor.isActive("image", {
          size: "medium",
        });
      },

      action(editor) {
        editor
          .chain()
          .focus()
          .updateAttributes("image", {
            size: "medium",
            width: 640,
          })
          .run();
      },
    },

    {
      id: "size-large",

      label: "Large",

      isActive(editor) {
        return editor.isActive("image", {
          size: "large",
        });
      },

      action(editor) {
        editor
          .chain()
          .focus()
          .updateAttributes("image", {
            size: "large",
            width: 960,
          })
          .run();
      },
    },
    {
      id: "align-left",

      label: "Left",

      isActive(editor) {
        return editor.isActive("image", {
          align: "left",
        });
      },

      action(editor) {
        editor
          .chain()
          .focus()
          .updateAttributes("image", {
            align: "left",
          })
          .run();
      },
    },

    {
      id: "align-center",

      label: "Center",

      isActive(editor) {
        return editor.isActive("image", {
          align: "center",
        });
      },

      action(editor) {
        editor
          .chain()
          .focus()
          .updateAttributes("image", {
            align: "center",
          })
          .run();
      },
    },

    {
      id: "align-right",

      label: "Right",

      isActive(editor) {
        return editor.isActive("image", {
          align: "right",
        });
      },

      action(editor) {
        editor
          .chain()
          .focus()
          .updateAttributes("image", {
            align: "right",
          })
          .run();
      },
    },
  ];
}
