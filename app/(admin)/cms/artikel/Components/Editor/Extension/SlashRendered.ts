/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ReactRenderer } from "@tiptap/react";

import tippy, { Instance } from "tippy.js";
import SlashList, { SlashListRef } from "../Suggestion/SlashCommandList";

export function createSlashRenderer() {
  let component: ReactRenderer<SlashListRef>;

  let popup: Instance;

  return {
    onStart(props: any) {
      component = new ReactRenderer(SlashList, {
        editor: props.editor,
        props,
      });

      if (!props.clientRect) {
        return;
      }

      popup = tippy(document.body, {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        interactive: true,
        trigger: "manual",
        placement: "bottom-start",
      })[0];

      popup.show();
    },

    onUpdate(props: any) {
      component.updateProps(props);

      popup.setProps({
        getReferenceClientRect: props.clientRect,
      });
    },

    onKeyDown(props: any) {
      if (props.event.key === "Escape") {
        popup.hide();

        return true;
      }

      return component.ref?.onKeyDown(props) ?? false;
    },

    onExit() {
      popup.destroy();

      component.destroy();
    },
  };
}
