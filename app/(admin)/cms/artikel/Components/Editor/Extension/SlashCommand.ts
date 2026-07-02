/* eslint-disable @typescript-eslint/no-explicit-any */
import { Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";
import { ReactRenderer } from "@tiptap/react";
import tippy, { Instance } from "tippy.js";
import { ToolbarItem } from "../toolbar.type";
import SlashCommandList, {
  SlashCommandListRef,
} from "../Suggestion/SlashCommandList";

export interface SlashCommandOptions {
  items: ToolbarItem[];
}

export const SlashCommand = Extension.create<SlashCommandOptions>({
  name: "slash-command",

  addOptions() {
    return {
      items: [],
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,

        char: "/",

        items: ({ query }) => {
          return this.options.items
            .filter((item) => item.groups.includes("slash"))
            .filter((item) => {
              const keyword = [
                item.label,
                item.title,
                item.description,
                ...(item.keywords ?? []),
              ]
                .join(" ")
                .toLowerCase();

              return keyword.includes(query.toLowerCase());
            });
        },

        command: ({ editor, range, props }) => {
          editor.chain().focus().deleteRange(range).run();

          setTimeout(() => {
            props.action(editor);
          }, 0);

          requestAnimationFrame(() => {
            editor.commands.scrollIntoView();
          });
        },

        render() {
          let component: ReactRenderer<SlashCommandListRef>;
          let popup: Instance[];

          return {
            onStart(props) {
              component = new ReactRenderer(SlashCommandList, {
                props,
                editor: props.editor,
              });

              popup = tippy("body", {
                getReferenceClientRect: props.clientRect as any,
                appendTo: () => document.body,
                content: component.element,
                interactive: true,
                trigger: "manual",
                placement: "auto-start",
                showOnCreate: true,
                popperOptions: {
                  modifiers: [
                    {
                      name: "preventOverflow",
                      options: {
                        padding: 12,
                      },
                    },
                  ],
                },
              });
            },

            onUpdate(props) {
              component.updateProps(props);

              popup[0].setProps({
                getReferenceClientRect: props.clientRect as any,
              });
            },

            onKeyDown(props) {
              if (props.event.key === "Escape") {
                popup[0].hide();
                return true;
              }

              return component.ref?.onKeyDown(props) ?? false;
            },

            onExit() {
              popup[0].destroy();
              component.destroy();
            },
          };
        },
      }),
    ];
  },
});
