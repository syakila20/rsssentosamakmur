"use client";

import { useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { useClickOutside } from "@/hooks/useClickOutside";
import SvgCheck from "@/Icon/Check";
import SvgUnCheck from "@/Icon/Incorrect";
import { Button } from "../Button/Button";
const baseInputClass =
  "bg-white rounded-md border border-gray-300 font-medium placeholder-slate-400 focus:outline-blue-100 ";

export type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  options: SelectOption[];
  value?: string | string[] | boolean;
  onChange?: (value: string | string[]) => void;
  multiple?: boolean;
  placeholder?: string;
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
  maxVisibleTags?: number;
};

export function Select({
  options,
  value,
  onChange,
  multiple = false,
  placeholder = "Select option",
  searchable = true,
  disabled = false,
  maxVisibleTags = 3,
  className,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  const closeDropdown = () => {
    setOpen(false);
    setSearch("");
  };

  useClickOutside(wrapperRef, closeDropdown);

  const selectedValues = multiple
    ? ((value as string[]) ?? [])
    : value
      ? [value as string]
      : [];

  const selectedOptions = options.filter((item) =>
    selectedValues.includes(item.value),
  );

  const filteredOptions = useMemo(() => {
    if (!searchable) {
      return options;
    }

    return options.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase()),
    );
  }, [options, search, searchable]);

  const handleSelect = (option: SelectOption) => {
    if (multiple) {
      const exists = selectedValues.includes(option.value);

      const newValue = exists
        ? selectedValues.filter((item) => item !== option.value)
        : [...selectedValues, option.value];

      onChange?.(newValue);

      return;
    }

    onChange?.(option.value);
    closeDropdown();
  };

  const removeItem = (value: string) => {
    const newValue = selectedValues.filter((item) => item !== value);
    onChange?.(newValue);
  };

  const hasValue = selectedValues.length > 0;

  const clearValue = () => {
    if (multiple) {
      onChange?.([]);
    } else {
      onChange?.("");
    }
  };

  const selectValueClass = {
    placeholder: "text-slate-400",

    tag: clsx(
      "flex items-center gap-1",
      "shrink-0",
      "rounded",
      "bg-blue-100",
      "px-2 py-1",
      "text-sm",
      "text-blue-700",
    ),

    tagRemove: "cursor-pointer  text-blue-950",
  };

  //   const renderSelectedValue = () => {
  //     if (!selectedOptions.length) {
  //       return (
  //         <span className={selectValueClass.placeholder}>{placeholder}</span>
  //       );
  //     }

  //     if (!multiple) {
  //       return <span className="text-slate-700">{selectedOptions[0].label}</span>;
  //     }

  //     const visibleOptions = selectedOptions.slice(0, maxVisibleTags);
  //     const hiddenCount = selectedOptions.length - visibleOptions.length;

  //     return (
  //       <div className="flex gap-1 align-center w-full">
  //         <div className="flex gap-1 align-center">
  //           {visibleOptions.map((item) => (
  //             <div key={item.value} className={selectValueClass.tag}>
  //               {item.label}
  //               <div
  //                 onClick={(e) => {
  //                   e.stopPropagation();
  //                   removeItem(item.value);
  //                 }}
  //               >
  //                 <SvgUnCheck className={selectValueClass.tagRemove} />
  //               </div>
  //             </div>
  //           ))}
  //         </div>

  //         {hiddenCount > 0 && (
  //           <span
  //             title={selectedOptions
  //               .slice(maxVisibleTags)
  //               .map((item) => item.label)
  //               .join(", ")}
  //             className="text-slate-500 text-xs align-baseline m-auto border"
  //           >
  //             +{hiddenCount}
  //           </span>
  //         )}
  //       </div>
  //     );
  //   };

  const renderSelectedValue = () => {
    if (!selectedOptions.length) {
      return (
        <span className={selectValueClass.placeholder}>{placeholder}</span>
      );
    }

    if (!multiple) {
      return <span className="text-slate-700">{selectedOptions[0].label}</span>;
    }

    return (
      <div
        className=" flex
    min-w-0
    flex-1
    items-center
    gap-2"
      >
        <div
          className="
          flex
          min-w-0
          flex-1
          items-center
          gap-1
          overflow-hidden
        "
        >
          {selectedOptions.map((item) => (
            <div key={item.value} className={selectValueClass.tag}>
              <span className="truncate">{item.label}</span>

              <div
                onClick={(e) => {
                  e.stopPropagation();
                  removeItem(item.value);
                }}
              >
                <SvgUnCheck className={selectValueClass.tagRemove} />
              </div>
            </div>
          ))}
        </div>

        <span
          className="
          shrink-0
          text-xs
          text-slate-500
        "
          title={selectedOptions.map((item) => item.label).join(", ")}
        >
          ({selectedOptions.length})
        </span>
      </div>
    );
  };

  return (
    <div ref={wrapperRef} className={clsx("relative w-full", className)}>
      <div
        // type="button"
        // disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className={clsx(
          baseInputClass,
          "flex min-h-10 w-full items-center justify-between",
          " px-3 py-2",
          "text-left",
          "focus:outline-none",

          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <div
          className=" flex
    min-w-0
    flex-1
    items-center
    gap-2
    overflow-hidden"
        >
          {renderSelectedValue()}
        </div>
        {hasValue && (
          <button
            onMouseDown={(e) => {}}
            onClick={(e) => {
              e.stopPropagation();
              clearValue();
            }}
          >
            <SvgUnCheck
              className="cursor-pointer
            w-3.5 h-3.5
          bg-red-600
          rounded-full
          hover:bg-red-500"
            />
          </button>
        )}
      </div>

      {open && (
        <div
          className="
              absolute
              z-50
              mt-2
              w-full
              overflow-hidden
              rounded-lg
              border
              bg-white
              shadow-lg
            "
        >
          {searchable && (
            <div className="p-2">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className={clsx(
                  baseInputClass,
                  "w-full rounded border px-3 py-2 focus:outline-none text-slate-700",
                )}
              />
            </div>
          )}

          <div
            className="
                max-h-60
                overflow-y-auto
              "
          >
            {filteredOptions.length ? (
              filteredOptions.map((option) => {
                const checked = selectedValues.includes(option.value);

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={clsx(
                      "flex w-full items-center justify-between",
                      "px-3 py-2",
                      "text-left text-slate-700",
                      "hover:bg-gray-100",

                      checked && "bg-gray-50",
                    )}
                  >
                    {option.label}

                    {checked && <SvgCheck className="text-blue-500 w-10" />}
                  </button>
                );
              })
            ) : (
              <div
                className="
                      px-3
                      py-4
                      text-center
                      text-sm
                      text-gray-500
                    "
              >
                No data found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
