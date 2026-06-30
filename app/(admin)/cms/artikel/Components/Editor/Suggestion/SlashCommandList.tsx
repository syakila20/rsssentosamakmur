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
  ({ items, command }, ref) => {
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

    return (
      <div
        className="
          w-80
          overflow-hidden
          rounded-xl
          border
          bg-white
          shadow-2xl
        "
      >
        <div
          className="
            max-h-96
            overflow-y-auto
            p-2
          "
        >
          {Object.entries(grouped).map(([group, groupItems]) => (
            <div key={group}>
              <div
                className="
                        px-3
                        py-2
                        text-xs
                        font-semibold
                        uppercase
                        text-slate-400
                      "
              >
                {group}
              </div>

              {groupItems.map((item) => {
                const index = flatItems.indexOf(item);

                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    type="button"
                    onClick={() => selectItem(index)}
                    className={`
                                flex
                                w-full
                                gap-3
                                rounded-lg
                                p-3
                                text-left
                                transition

                                ${
                                  selectedIndex === index
                                    ? "bg-slate-100"
                                    : "hover:bg-slate-50"
                                }
                              `}
                  >
                    <div
                      className="
                                  mt-1
                                "
                    >
                      {item.icon}
                    </div>

                    <div>
                      <div
                        className="
                                    text-sm
                                    font-medium
                                  "
                      >
                        {item.label}
                      </div>

                      {item.description && (
                        <div
                          className="
                                        text-xs
                                        text-slate-500
                                      "
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

        <div
          className="
            border-t
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
              text-slate-500
              hover:bg-slate-100
            "
          >
            Cancel
          </button>
        </div>
      </div>
    );
  },
);

SlashCommandList.displayName = "SlashCommandList";

export default SlashCommandList;
