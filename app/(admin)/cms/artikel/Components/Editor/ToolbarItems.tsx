import { Editor } from "@tiptap/react";
import { ToolbarGroup, ToolbarItem } from "./toolbar.type";

export function getToolbarItems(
  editor: Editor,
  setLink: () => void,
): ToolbarItem[] {
  return [
    {
      id: "left",
      groups: ["toolbar", "bubble", "slash", "floating", "slash"],
      label: "Left",
      isActive: (editor) => editor.isActive({ textAlign: "left" }),
      action: (editor) => editor.chain().focus().setTextAlign("left").run(),
    },

    {
      id: "center",
      groups: ["toolbar", "bubble", "slash", "floating"],
      label: "Center",
      isActive: (editor) => editor.isActive({ textAlign: "center" }),
      action: (editor) => editor.chain().focus().setTextAlign("center").run(),
    },

    {
      id: "right",
      groups: ["toolbar", "bubble", "slash"],
      label: "Right",
      isActive: (editor) => editor.isActive({ textAlign: "right" }),
      action: (editor) => editor.chain().focus().setTextAlign("right").run(),
    },

    {
      id: "justify",
      groups: ["toolbar", "bubble", "slash"],
      label: "Justify",
      isActive: (editor) => editor.isActive({ textAlign: "justify" }),
      action: (editor) => editor.chain().focus().setTextAlign("justify").run(),
    },

    {
      id: "Bold",
      groups: ["toolbar", "bubble", "slash"],
      label: "B",
      isActive: (editor) => editor.isActive("bold"),
      action: (editor) => editor.chain().focus().toggleBold().run(),
    },

    {
      id: "italic",
      groups: ["toolbar", "bubble", "slash"],
      label: "I",
      isActive: (editor) => editor.isActive("italic"),
      action: (editor) => editor.chain().focus().toggleItalic().run(),
    },
    {
      id: "underline",
      groups: ["toolbar", "bubble", "slash"],
      label: "U",
      isActive: (editor) => editor.isActive("underline"),
      action: (editor) => editor.chain().focus().toggleUnderline().run(),
    },

    {
      id: "h1",
      groups: ["toolbar", "bubble", "slash"],
      label: "H1",
      title: "Heading 1",
      description: "Heading besar untuk judul section",
      isActive: (editor) => editor.isActive("heading", { level: 1 }),
      action: (editor) =>
        editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },

    {
      id: "h2",
      groups: ["toolbar", "bubble", "slash"],
      label: "H2",
      isActive: (editor) => editor.isActive("heading", { level: 2 }),
      action: (editor) =>
        editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },

    {
      id: "h3",
      groups: ["toolbar", "bubble", "slash"],
      label: "H3",
      isActive: (editor) => editor.isActive("heading", { level: 3 }),
      action: (editor) =>
        editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },

    {
      id: "list",
      groups: ["toolbar", "bubble", "slash"],
      label: "• List",
      title: "Bullet List",
      description: "Daftar menggunakan bullet",
      isActive: (editor) => editor.isActive("bulletList"),
      action: (editor) => editor.chain().focus().toggleBulletList().run(),
    },

    {
      id: "listnumber",
      groups: ["toolbar", "bubble", "slash"],
      label: "1. List",
      isActive: (editor) => editor.isActive("orderedList"),
      action: (editor) => editor.chain().focus().toggleOrderedList().run(),
    },

    {
      id: "quote",
      groups: ["toolbar", "bubble", "slash"],
      label: "Quote",
      isActive: (editor) => editor.isActive("blockquote"),
      action: (editor) => editor.chain().focus().toggleBlockquote().run(),
    },

    {
      id: "tag",
      groups: ["toolbar", "bubble", "slash"],
      label: "</>",
      isActive: (editor) => editor.isActive("code"),
      action: (editor) => editor.chain().focus().toggleCode().run(),
    },

    {
      id: "code",
      groups: ["toolbar", "bubble", "slash"],
      label: "Code",
      title: "Code Block",
      description: "Blok kode dengan syntax highlighting",
      isActive: (editor) => editor.isActive("codeBlock"),
      action: (editor) => editor.chain().focus().toggleCodeBlock().run(),
    },

    {
      id: "link",
      groups: ["toolbar", "bubble", "slash", "floating"],
      label: "Link",
      isActive: (editor) => editor.isActive("link"),
      action: () => setLink(),
    },

    {
      id: "hr",
      groups: ["toolbar", "bubble", "slash"],
      label: "HR",
      title: "Divider",
      description: "Garis pemisah section",
      action: (editor) => editor.chain().focus().setHorizontalRule().run(),
    },
  ];
}

export function getItemsByGroup(items: ToolbarItem[], group: ToolbarGroup) {
  return items.filter((item) => item.groups.includes(group));
}
