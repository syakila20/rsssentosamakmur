"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import { Label } from "../Typography/Typhography";

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
}

function Popover({ children, defaultOpen = false }: PopoverProps) {
  const [open, setOpen] = useState(defaultOpen);

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
  width?: string; // <- flexible Tailwind class
  title?: string;
  footer?: React.ReactNode;
}

function Content({
  children,
  align = "right",
  width = "w-64",
  title,
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
