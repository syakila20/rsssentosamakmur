/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { ToolbarItem } from "../toolbar.type";

type Props = {
  items: ToolbarItem[];
  command: (item: ToolbarItem) => void;
  onClose: () => void;
};

export type SlashCommandListRef = {
  onKeyDown: (props: any) => boolean;
};

const GROUPS = {
  basic: "Basic",
  format: "Format",
  block: "Block",
  media: "Media",
};

function getGroup(item: ToolbarItem) {
  if (["paragraph", "h1", "h2", "h3"].includes(item.id)) {
    return GROUPS.basic;
  }

  if (["bold", "italic", "underline"].includes(item.id)) {
    return GROUPS.format;
  }

  if (["quote", "code", "divider", "bullet", "ordered"].includes(item.id)) {
    return GROUPS.block;
  }

  return GROUPS.media;
}

const SlashCommandList = forwardRef<SlashCommandListRef, Props>(
  ({ items, command, onClose }, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, [selectedIndex]);

    const grouped = useMemo(() => {
      const result: Record<string, ToolbarItem[]> = {};

      items.forEach((item) => {
        const group = getGroup(item);

        if (!result[group]) {
          result[group] = [];
        }

        result[group].push(item);
      });

      return result;
    }, [items]);

    const flatItems = useMemo(() => {
      return Object.values(grouped).flat();
    }, [grouped]);

    const selectItem = (index: number) => {
      const item = flatItems[index];

      if (!item) {
        return;
      }

      command(item);
    };

    useImperativeHandle(
      ref,
      () => ({
        onKeyDown({ event }) {
          if (event.key === "ArrowDown") {
            setSelectedIndex((index) => (index + 1) % flatItems.length);
            return true;
          }

          if (event.key === "ArrowUp") {
            setSelectedIndex(
              (index) => (index - 1 + flatItems.length) % flatItems.length,
            );
            return true;
          }

          if (event.key === "Enter") {
            selectItem(selectedIndex);
            return true;
          }

          if (event.key === "Escape") {
            return true;
          }

          return false;
        },
      }),
      [flatItems, selectedIndex],
    );

    let globalIndex = 0;

    return (
      <div
        className="
          w-80
          overflow-hidden
          rounded-xl
          border
          border-slate-700
          bg-slate-800
          shadow-2xl
        "
      >
        <div
          className="
            slash-scroll
            max-h-72
            overflow-y-auto
            p-2
          "
        >
          {Object.entries(grouped).map(([group, groupItems]) => (
            <div key={group} className="mb-2 last:mb-0">
              <div
                className="
                  px-3
                  py-2
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-slate-500
                "
              >
                {group}
              </div>

              {groupItems.map((item) => {
                const index = globalIndex++;

                const active = selectedIndex === index;

                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    type="button"
                    onClick={() => selectItem(index)}
                    className={`
                      group
                      mb-1
                      flex
                      w-full
                      gap-3
                      rounded-lg
                      p-3
                      text-left
                      transition-colors
                      duration-150

                      ${active ? "bg-slate-700" : "hover:bg-slate-100"}
                    `}
                  >
                    <div
                      className={`
                        mt-1
                        transition-colors
                        ${
                          active
                            ? "text-white"
                            : "text-slate-400 group-hover:text-slate-700"
                        }
                      `}
                    >
                      {item.icon}
                    </div>

                    <div className="flex-1">
                      <div
                        className={`
                          text-sm
                          font-medium
                          transition-colors
                          ${
                            active
                              ? "text-white"
                              : "text-slate-200 group-hover:text-slate-800"
                          }
                        `}
                      >
                        {item.label}
                      </div>

                      {item.description && (
                        <div
                          className={`
                            text-xs
                            transition-colors
                            ${
                              active
                                ? "text-slate-300"
                                : "text-slate-500 group-hover:text-slate-600"
                            }
                          `}
                        >
                          {item.description}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* <div
          className="
            border-t
            border-slate-700
            p-2
          "
        >
          <button
            type="button"
            onClick={() => {
              document.dispatchEvent(
                new KeyboardEvent("keydown", {
                  key: "Escape",
                }),
              );
            }}
            className="
              w-full
              rounded-lg
              px-3
              py-2
              text-sm
              text-slate-400
              transition-colors
              hover:bg-slate-700
              hover:text-white
            "
          >
            Cancel
          </button>
        </div> */}
      </div>
    );
  },
);

SlashCommandList.displayName = "SlashCommandList";

export default SlashCommandList;
