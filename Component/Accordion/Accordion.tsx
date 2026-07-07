"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import SvgCircleDown from "@/Icon/CircleDown";

type AccordionProps = {
  title: string;
  children: React.ReactNode;

  /**
   * Uncontrolled mode
   */
  defaultOpen?: boolean;

  /**
   * Controlled mode
   */
  open?: boolean;

  onOpenChange?: (open: boolean) => void;

  className?: string;

  contentClassName?: string;

  rightAction?: React.ReactNode;

  disabled?: boolean;
};

export default function Accordion({
  title,
  children,
  defaultOpen = false,
  open,
  onOpenChange,
  className,
  contentClassName,
  rightAction,
  disabled = false,
}: AccordionProps) {
  /**
   * Internal state (Uncontrolled mode)
   */
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  /**
   * Controlled or Uncontrolled
   */
  const isControlled = open !== undefined;

  /**
   * Source of truth
   */
  const isOpen = isControlled ? open : internalOpen;

  const handleToggle = () => {
    if (disabled) return;

    const next = !isOpen;

    if (!isControlled) {
      setInternalOpen(next);
    }

    onOpenChange?.(next);
  };

  return (
    <section
      className={clsx(
        "rounded-xl border bg-white transition-all duration-200",
        isOpen
          ? "border-blue-200 shadow-sm"
          : "border-slate-200 hover:border-slate-300",
        className,
      )}
    >
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={clsx(
          "flex w-full items-center justify-between px-5 py-4",
          "transition-colors duration-200",
          isOpen ? "bg-blue-50/50" : "",
          disabled && "cursor-not-allowed opacity-60",
        )}
      >
        <div className="flex items-center gap-3">
          <SvgCircleDown
            className={clsx(
              "h-4 w-4 transition-transform duration-200",
              isOpen ? "rotate-180 text-blue-600" : "text-slate-500",
            )}
          />

          <h3
            className={clsx(
              "text-base font-semibold",
              isOpen ? "text-blue-700" : "text-slate-800",
            )}
          >
            {title}
          </h3>
        </div>

        {rightAction && (
          <div
            className="flex items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {rightAction}
          </div>
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
            className="overflow-visible"
          >
            <div
              className={clsx(
                "border-t border-slate-100 p-5",
                contentClassName,
              )}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
