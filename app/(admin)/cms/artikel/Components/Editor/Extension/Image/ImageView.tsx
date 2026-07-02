// "use client";

// import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";

// import ImageToolbar from "./ImageToolbar";
// import { createImageToolbarItems } from "./createImageToolbar";
// import { useState } from "react";

// export function ImageView({
//   node,
//   selected,
//   editor,
//   updateAttributes,
// }: NodeViewProps) {
//   const { src, alt, caption, width, height, align, uploading } = node.attrs;
//   const [loading, setLoading] = useState(false);
//   async function runAction(action: () => Promise<void>) {
//     try {
//       setLoading(true);

//       await action();
//     } finally {
//       setLoading(false);
//     }
//   }
//   const toolbarItems = createImageToolbarItems(editor).map((item) => ({
//     ...item,

//     action: async (editor) => {
//       await runAction(() => item.action(editor));
//     },
//   }));

//   return (
//     <NodeViewWrapper className="relative my-6" data-drag-handle>
//       {selected && (
//         <ImageToolbar editor={editor} items={toolbarItems} loading={loading} />
//       )}

//       <div
//         className={[
//           "flex w-full",

//           align === "left" && "justify-start",

//           align === "center" && "justify-center",

//           align === "right" && "justify-end",
//         ]
//           .filter(Boolean)
//           .join(" ")}
//       >
//         <div
//           className="
//             flex
//             max-w-full
//             flex-col
//             gap-3
//           "
//         >
//           <img
//             src={src}
//             alt={alt}
//             draggable={false}
//             style={{
//               width: width ?? "auto",

//               height: height ?? "auto",
//             }}
//             className={[
//               `
//               max-w-full
//               rounded-xl
//               select-none
//               transition
//               `,
//               selected && "ring-2 ring-sky-500",
//             ]
//               .filter(Boolean)
//               .join(" ")}
//           />

//           <input
//             type="text"
//             value={caption}
//             placeholder="Tambahkan caption..."
//             onChange={(e) => {
//               updateAttributes({
//                 caption: e.target.value,
//               });
//             }}
//             className="
//               w-full
//               bg-transparent
//               text-center
//               text-sm
//               text-slate-400
//               outline-none
//               placeholder:text-slate-600
//             "
//           />
//         </div>
//       </div>
//     </NodeViewWrapper>
//   );
// }
"use client";

import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";

import ImageToolbar from "./ImageToolbar";
import { createImageToolbarItems } from "./createImageToolbar";
import { useState } from "react";

export function ImageView({
  node,
  selected,
  editor,
  updateAttributes,
}: NodeViewProps) {
  //   const { src, alt, caption, width, height, align, uploading } = node.attrs;

  const { src, alt, caption, width, height, align, uploading, size } =
    node.attrs;
  const [loading, setLoading] = useState(false);

  async function runAction(action: () => Promise<void>) {
    try {
      setLoading(true);

      await action();
    } finally {
      setLoading(false);
    }
  }

  const toolbarItems = createImageToolbarItems(editor).map((item) => ({
    ...item,

    action: async (editor) => {
      await runAction(() => item.action(editor));
    },
  }));

  return (
    <NodeViewWrapper
      className="
        relative
        my-6
      "
      data-drag-handle
    >
      {selected && !uploading && (
        <ImageToolbar editor={editor} items={toolbarItems} loading={loading} />
      )}

      <div
        className={[
          "flex w-full",

          align === "left" && "justify-start",

          align === "center" && "justify-center",

          align === "right" && "justify-end",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div
          className="
            relative
            flex
            max-w-full
            flex-col
            gap-3
          "
        >
          <img
            src={src}
            alt={alt || caption || ""}
            draggable={false}
            style={{
              width: width ? `${width}px` : "auto",

              height: height ?? "auto",
            }}
            className={[
              `
              max-w-full
              rounded-xl
              select-none
              transition
              duration-300
              `,

              selected && "ring-2 ring-sky-500",

              uploading && "opacity-40",
            ]
              .filter(Boolean)
              .join(" ")}
          />

          {uploading && (
            <div
              className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                  rounded-xl
                  bg-black/30
                "
            >
              <div
                className="
                    flex
                    flex-col
                    items-center
                    gap-2
                    text-white
                  "
              >
                <div
                  className="
                      h-8
                      w-8
                      animate-spin
                      rounded-full
                      border-4
                      border-white/40
                      border-t-white
                    "
                />

                <span
                  className="
                      text-sm
                      font-medium
                    "
                >
                  Uploading...
                </span>
              </div>
            </div>
          )}

          <input
            type="text"
            value={caption ?? ""}
            placeholder="
              Tambahkan caption...
            "
            onChange={(e) => {
              updateAttributes({
                caption: e.target.value,
              });
            }}
            className="
              w-full
              bg-transparent
              text-center
              text-sm
              text-slate-400
              outline-none
              placeholder:text-slate-600
            "
          />
        </div>
      </div>
    </NodeViewWrapper>
  );
}
