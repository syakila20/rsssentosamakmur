import { ToolbarGroup, ToolbarItem } from "./toolbar.type";
import SvgHeading1 from "@/Icon/Heading1";
import SvgHeading2 from "@/Icon/Heading2";
import SvgHeading3 from "@/Icon/Heading3";
import Bold from "@/Icon/Bold";
import Italic from "@/Icon/italic";
import Underline from "@/Icon/Underline";
import ListUl from "@/Icon/BulletList";
import CodeAlt from "@/Icon/CodeBlock";
import DividerOutline from "@/Icon/Divider";
import Link from "@/Icon/Link";
import QuoteLeftAltFilled from "@/Icon/Quote";
import OrderList from "@/Icon/OrderList";
import AlignJustify from "@/Icon/Justify";
import AlignRight from "@/Icon/AlignRight";
import AlignCenter from "@/Icon/Center";
import AlignLeft from "@/Icon/AlignLeft";

export function createToolbarItems(setLink: () => void): ToolbarItem[] {
  return [
    {
      id: "left",
      groups: ["toolbar", "bubble", "slash"],
      keywords: ["left", "title", "align"],
      title: "Align Left",
      icon: <AlignLeft />,

      label: "Left",
      isActive: (editor) => editor.isActive({ textAlign: "left" }),
      action: (editor) => editor.chain().focus().setTextAlign("left").run(),
    },

    {
      id: "center",
      groups: ["toolbar", "bubble", "slash"],
      keywords: ["center", "title", "align"],
      title: "Center",
      label: "Center",
      icon: <AlignCenter />,

      isActive: (editor) => editor.isActive({ textAlign: "center" }),
      action: (editor) => editor.chain().focus().setTextAlign("center").run(),
    },

    {
      id: "Right",
      groups: ["toolbar", "bubble", "slash"],
      keywords: ["right", "title", "align"],
      title: "Align Right",
      label: "Right",
      icon: <AlignRight />,

      isActive: (editor) => editor.isActive({ textAlign: "right" }),
      action: (editor) => editor.chain().focus().setTextAlign("right").run(),
    },

    {
      id: "Justify",
      groups: ["toolbar", "bubble", "slash"],
      keywords: ["justify", "title", "align"],
      title: "Justify",
      label: "Justify",
      icon: <AlignJustify />,

      isActive: (editor) => editor.isActive({ textAlign: "justify" }),
      action: (editor) => editor.chain().focus().setTextAlign("justify").run(),
    },
    {
      id: "paragraph",
      label: "Paragraph",
      title: "Paragraph",
      description: "Normal text",
      groups: ["slash"],
      keywords: ["paragraph", "text", "body"],
      action: (editor) => editor.chain().focus().setParagraph().run(),
    },

    {
      id: "h1",
      label: "Heading 1",
      title: "Heading 1",
      description: "Big section heading",
      icon: <SvgHeading1 />,
      groups: ["toolbar", "bubble", "slash"],
      keywords: ["heading", "title", "h1"],

      isActive: (editor) =>
        editor.isActive("heading", {
          level: 1,
        }),

      action: (editor) =>
        editor
          .chain()
          .focus()
          .toggleHeading({
            level: 1,
          })
          .run(),
    },

    {
      id: "h2",
      label: "Heading 2",
      title: "Heading 2",
      icon: <SvgHeading2 />,

      description: "Medium heading",
      groups: ["toolbar", "bubble", "slash"],
      keywords: ["heading", "title", "h2"],

      isActive: (editor) =>
        editor.isActive("heading", {
          level: 2,
        }),

      action: (editor) =>
        editor
          .chain()
          .focus()
          .toggleHeading({
            level: 2,
          })
          .run(),
    },

    {
      id: "h3",
      label: "Heading 3",
      title: "Heading 3",
      icon: <SvgHeading3 />,

      description: "Small heading",
      groups: ["toolbar", "bubble", "slash"],
      keywords: ["heading", "title", "h3"],

      isActive: (editor) =>
        editor.isActive("heading", {
          level: 3,
        }),

      action: (editor) =>
        editor
          .chain()
          .focus()
          .toggleHeading({
            level: 3,
          })
          .run(),
    },

    {
      id: "bold",
      label: "Bold",
      title: "Bold",
      icon: <Bold />,

      description: "Make text bold",
      groups: ["toolbar", "bubble", "slash"],
      keywords: ["bold", "strong"],

      isActive: (editor) => editor.isActive("bold"),

      action: (editor) => editor.chain().focus().toggleBold().run(),
    },

    {
      id: "italic",
      label: "Italic",
      title: "Italic",
      icon: <Italic />,

      description: "Italic text",
      groups: ["toolbar", "bubble", "slash"],
      keywords: ["italic", "em"],

      isActive: (editor) => editor.isActive("italic"),

      action: (editor) => editor.chain().focus().toggleItalic().run(),
    },

    {
      id: "underline",
      label: "Underline",
      title: "Underline",
      icon: <Underline />,

      description: "Underline text",
      groups: ["toolbar", "bubble", "slash"],
      keywords: ["underline"],

      isActive: (editor) => editor.isActive("underline"),

      action: (editor) => editor.chain().focus().toggleUnderline().run(),
    },

    {
      id: "bullet",
      label: "Bullet List",
      title: "Bullet List",
      icon: <ListUl />,

      description: "Create bullet list",
      groups: ["toolbar", "bubble", "slash"],
      keywords: ["list", "bullet"],

      isActive: (editor) => editor.isActive("bulletList"),

      action: (editor) => editor.chain().focus().toggleBulletList().run(),
    },

    {
      id: "ordered",
      label: "Ordered List",
      icon: <OrderList />,

      title: "Ordered List",
      description: "Create numbered list",
      groups: ["toolbar", "bubble", "slash"],
      keywords: ["number", "ordered", "list"],

      isActive: (editor) => editor.isActive("orderedList"),

      action: (editor) => editor.chain().focus().toggleOrderedList().run(),
    },

    {
      id: "quote",
      label: "Quote",
      title: "Quote",
      icon: <QuoteLeftAltFilled />,

      description: "Insert quote",
      groups: ["toolbar", "bubble", "slash"],
      keywords: ["quote", "blockquote"],

      isActive: (editor) => editor.isActive("blockquote"),

      action: (editor) => editor.chain().focus().toggleBlockquote().run(),
    },

    {
      id: "code",
      label: "Code Block",
      title: "Code Block",
      icon: <CodeAlt />,
      description: "Insert code block",
      groups: ["toolbar", "bubble", "slash"],
      keywords: ["code"],

      isActive: (editor) => editor.isActive("codeBlock"),

      action: (editor) => editor.chain().focus().toggleCodeBlock().run(),
    },

    {
      id: "divider",
      label: "Divider",
      title: "Divider",
      icon: <DividerOutline />,

      description: "Horizontal line",
      groups: ["toolbar", "bubble", "slash"],
      keywords: ["divider", "line", "hr"],

      action: (editor) => editor.chain().focus().setHorizontalRule().run(),
    },

    {
      id: "link",
      label: "Link",
      title: "Link",
      icon: <Link />,

      description: "Insert hyperlink",
      groups: ["toolbar", "bubble", "slash"],
      keywords: ["url", "link"],

      isActive: (editor) => editor.isActive("link"),

      action: () => setLink(),
    },
    {
      id: "image",

      label: "Image",

      title: "Image",

      groups: ["slash"],

      keywords: ["image", "photo"],

      action: (editor) => {
        const event = new CustomEvent("tiptap-image-upload", {
          detail: editor,
        });

        window.dispatchEvent(event);
      },
    },
  ];
}

export function getItemsByGroup(items: ToolbarItem[], group: ToolbarGroup) {
  return items.filter((item) => item.groups.includes(group));
}
