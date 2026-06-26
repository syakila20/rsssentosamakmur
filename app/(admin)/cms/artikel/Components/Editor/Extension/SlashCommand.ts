import { Editor, Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";
import { ToolbarItem } from "../toolbar.type";

export const SlashExtension = Extension.create({
  name: "slash-command",

  addOptions() {
    return {
      suggestion: {
        char: "/",
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,

        char: "/",

        items: ({ query }) => {
          const items = this.options.items?.() ?? [];

          return items.filter((item: any) =>
            (item.title || item.label)
              .toLowerCase()
              .includes(query.toLowerCase()),
          );
        },

        command: ({ editor, props }) => {
          props.action(editor);
        },

        render: this.options.render,
      }),
    ];
  },
});

export function executeSlashItem(
  editor: Editor,
  item: ToolbarItem,
  close: () => void,
) {
  const { from } = editor.state.selection;

  const textBefore = editor.state.doc.textBetween(Math.max(0, from - 50), from);

  const match = textBefore.match(/\/([a-zA-Z0-9]*)$/);

  const slashLength = match?.[0]?.length ?? 0;

  editor
    .chain()
    .focus()
    .deleteRange({
      from: from - slashLength,
      to: from,
    })
    .run();

  item.action(editor);

  close();
}
