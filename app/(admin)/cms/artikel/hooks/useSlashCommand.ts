/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ReactRenderer } from "@tiptap/react";
import tippy, { Instance } from "tippy.js";
import SlashList, {
  SlashListRef,
} from "../Components/Editor/Suggestion/SlashCommandList";

export function createSlashRenderer() {
  return () => {
    let component: ReactRenderer<SlashListRef> | null = null;

    let popup: Instance | null = null;

    return {
      onStart(props: any) {
        component = new ReactRenderer(SlashList, {
          editor: props.editor,
          props,
        });

        if (!props.clientRect) {
          return;
        }

        const instances = tippy(document.body, {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start",
        });

        popup = instances?.[0];

        popup?.show();
      },

      onUpdate(props: any) {
        component?.updateProps(props);

        if (!props.clientRect || !popup) {
          return;
        }

        popup.setProps({
          getReferenceClientRect: props.clientRect,
        });
      },

      onKeyDown(props: any) {
        if (props.event.key === "Escape") {
          popup?.hide();

          return true;
        }

        return component?.ref?.onKeyDown(props) ?? false;
      },

      onExit() {
        popup?.destroy();

        component?.destroy();

        popup = null;
        component = null;
      },
    };
  };
}
