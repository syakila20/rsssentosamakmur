import Image from "@tiptap/extension-image";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { ImageView } from "./ImageView";

export const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),

      alt: {
        default: "",
      },

      title: {
        default: "",
      },

      uploading: {
        default: false,
      },
      size: {
        default: "medium",
      },

      status: {
        default: "idle",
        parseHTML: (element) => element.getAttribute("data-status") ?? "idle",
        renderHTML: (attributes) => ({
          "data-status": attributes.status,
        }),
      },
      publicId: {
        default: null,

        renderHTML(attributes) {
          if (!attributes.publicId) {
            return {};
          }

          return {
            "data-public-id": attributes.publicId,
          };
        },

        parseHTML(element) {
          return element.getAttribute("data-public-id");
        },
      },

      caption: {
        default: "",
        renderHTML(attributes) {
          if (!attributes.caption) {
            return {};
          }

          return {
            "data-caption": attributes.caption,
          };
        },

        parseHTML(element) {
          return element.getAttribute("data-caption") ?? "";
        },
      },

      align: {
        default: "center",

        renderHTML(attributes) {
          return {
            "data-align": attributes.align,
          };
        },

        parseHTML(element) {
          return element.getAttribute("data-align") ?? "center";
        },
      },

      width: {
        default: null,

        renderHTML(attributes) {
          if (!attributes.width) {
            return {};
          }

          return {
            "data-width": attributes.width,
          };
        },

        parseHTML(element) {
          const value = element.getAttribute("data-width");

          return value ? Number(value) : null;
        },
      },

      height: {
        default: null,

        renderHTML(attributes) {
          if (!attributes.height) {
            return {};
          }

          return {
            "data-height": attributes.height,
          };
        },

        parseHTML(element) {
          const value = element.getAttribute("data-height");

          return value ? Number(value) : null;
        },
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageView);
  },
});
