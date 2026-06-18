"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  widthModal: "sm" | "md" | "lg" | "xl" | "xs";
  footer?: ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  widthModal = "sm",
  footer,
  children,
}: ModalProps) {
  const modalRoot =
    typeof window !== "undefined"
      ? document.getElementById("modal-root")
      : null;

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!modalRoot) return null;

  const size = {
    xs: "w-2xs",
    sm: "w-3xl",
    md: "w-4xl",
    lg: "w-5xl",
    xl: "w-7xl",
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Wrapper */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-re"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <div
              className={`${size[widthModal]} max-h-[85vh] flex flex-col rounded-xl bg-neutral-100 shadow-xl`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center px-5 py-5 border-b border-b-slate-200">
                <h2 className="text-base lg:text-[12pt] xl:text-[12pt] md:text-[12pt] font-semibold text-slate-700">
                  {title}
                </h2>

                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="rounded-md p-1 hover:bg-gray-200 text-slate-700 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 overflow-y-auto">{children}</div>
              {footer && (
                <div className="border-t border-t-slate-200 px-5 py-3.5 ">
                  {footer}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    modalRoot,
  );
}
