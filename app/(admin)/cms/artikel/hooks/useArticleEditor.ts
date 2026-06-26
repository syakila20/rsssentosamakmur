// "use client";

// import { JSONContent } from "@tiptap/core";
// import Link from "@tiptap/extension-link";
// import Placeholder from "@tiptap/extension-placeholder";
// import Underline from "@tiptap/extension-underline";
// import { useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import TextAlign from "@tiptap/extension-text-align";
// import Suggestion from "@tiptap/suggestion";

// type Props = {
//   content?: JSONContent;
//   onChange?: (json: JSONContent, html: string) => void;
// };

// export function useArticleEditor({ content, onChange }: Props) {
//   return useEditor({
//     immediatelyRender: false,
//     extensions: [
//       StarterKit,
//       Underline,

//       Link.configure({
//         openOnClick: false,
//         autolink: true,
//         linkOnPaste: true,
//       }),

//       TextAlign.configure({
//         types: ["heading", "paragraph"],
//       }),

//       Placeholder.configure({
//         placeholder: "Tulis isi artikel...",
//       }),
//     ],

//     content,

//     onUpdate({ editor }) {
//       onChange?.(editor.getJSON(), editor.getHTML());
//     },
//   });
// }
"use client";

import { JSONContent } from "@tiptap/core";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type Props = {
  content?: JSONContent;
  onChange?: (json: JSONContent, html: string) => void;
};

export function useArticleEditor({ content, onChange }: Props) {
  return useEditor({
    immediatelyRender: false,

    extensions: [
      StarterKit,

      Underline,

      Link.configure({
        openOnClick: false,
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),

      Placeholder.configure({
        placeholder: "Tulis isi artikel...",
      }),
    ],

    content,

    onUpdate({ editor }) {
      onChange?.(editor.getJSON(), editor.getHTML());
    },
  });
}
