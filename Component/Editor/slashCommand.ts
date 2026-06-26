/* eslint-disable @typescript-eslint/no-explicit-any */
import { Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";

export interface CommandItem {
  title: string;
  command: ({ editor, range }: any) => void;
}

const items: CommandItem[] = [
  {
    title: "Heading 1",
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleHeading({ level: 1 })
        .run();
    },
  },

  {
    title: "Heading 2",
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleHeading({ level: 2 })
        .run();
    },
  },

  {
    title: "Heading 3",
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleHeading({ level: 3 })
        .run();
    },
  },

  {
    title: "Bullet List",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },

  {
    title: "Numbered List",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
];

export const SlashCommand = Extension.create({
  name: "slash-command",

  addOptions() {
    return {
      suggestion: {
        char: "/",

        items: ({ query }) => {
          return items.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase()),
          );
        },

        render: () => {
          let component: HTMLDivElement;

          return {
            onStart(props) {
              component = document.createElement("div");

              component.className = "slash-command-menu";

              updateMenu(component, props);

              document.body.appendChild(component);
            },

            onUpdate(props) {
              updateMenu(component, props);
            },

            onExit() {
              component?.remove();
            },
          };
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

function updateMenu(element: HTMLDivElement, props: any) {
  const { items, command, clientRect } = props;

  element.innerHTML = "";

  items.forEach((item: CommandItem) => {
    const button = document.createElement("button");

    button.innerText = item.title;

    button.className = "block w-full text-left px-3 py-2 hover:bg-gray-100";

    button.onclick = () => {
      command(item);
    };

    element.appendChild(button);
  });

  if (clientRect) {
    const rect = clientRect();

    element.style.position = "fixed";
    element.style.left = `${rect.left}px`;
    element.style.top = `${rect.bottom + 8}px`;
  }
}
