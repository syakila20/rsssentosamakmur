"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import clsx from "clsx";

interface PopoverContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopover() {
  const ctx = useContext(PopoverContext);
  if (!ctx) throw new Error("Popover must be used within Popover");
  return ctx;
}

interface PopoverProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function Popover({
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
}: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  const open = controlledOpen ?? internalOpen;

  const setOpen = (value: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(value);
    }

    onOpenChange?.(value);
  };

  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </PopoverContext.Provider>
  );
}

function Trigger({ children }: { children: React.ReactNode }) {
  const { open, setOpen } = usePopover();

  return (
    <div onClick={() => setOpen(!open)} className="cursor-pointer">
      {children}
    </div>
  );
}

interface ContentProps {
  children: React.ReactNode;
  align?: "left" | "right";
  width?: string;
  title?: string;
  footer?: React.ReactNode;
}

function Content({
  children,
  align = "right",
  width = "w-64",
  footer,
}: ContentProps) {
  const { open, setOpen } = usePopover();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={clsx(
        "absolute top-full mt-2 rounded-xl border border-slate-200 bg-white p-4 shadow-lg z-50 animate-in fade-in zoom-in-95",
        width,
        align === "right" ? "right-0" : "left-0",
      )}
    >
      <div className="mt-4">{children}</div>

      {footer && footer}
    </div>
  );
}

Popover.Trigger = Trigger;
Popover.Content = Content;

export default Popover;
