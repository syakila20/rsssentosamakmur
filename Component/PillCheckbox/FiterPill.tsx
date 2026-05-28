"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MotionCheckboxPill from "./PillCheck";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { IOption } from "@/types/type";

interface Props {
  selected: string[] | string;
  onChange: (value: string[] | string) => void;
  arrPill: IOption[];
  multiple?: boolean;
}

export default function FilterPill({
  selected,
  onChange,
  arrPill,
  multiple = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const { isMobile, isTablet } = useMediaQuery();

  // normalize ke array
  const selectedArray = Array.isArray(selected)
    ? selected
    : selected
      ? [selected]
      : [];

  const toggle = (value: string) => {
    if (multiple) {
      if (selectedArray.includes(value)) {
        onChange(selectedArray.filter((i) => i !== value));
      } else {
        onChange([...selectedArray, value]);
      }
    } else {
      if (selected === value) {
        onChange("");
      } else {
        onChange(value);
        setOpen(false);
      }
    }
  };

  const visible = arrPill.slice(0, isMobile ? 2 : isTablet ? 5 : 10);
  const hiddenCount = arrPill.length - visible.length;

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2">
        {visible.map((item) => (
          <MotionCheckboxPill
            key={item.value}
            label={item.label}
            checked={selectedArray.includes(item.value)}
            onToggle={() => toggle(item.value)}
          />
        ))}

        {hiddenCount > 0 && (
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 rounded-full border text-xs lg:text-sm md:text-sm text-gray-600 hover:bg-gray-100"
          >
            +{hiddenCount} lainnya
          </button>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/20 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              className="fixed z-50 top-1/2 left-1/2 w-[90%] max-w-md
                         -translate-x-1/2 -translate-y-1/2
                         bg-white rounded-2xl p-4 shadow-xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
                {arrPill.map((item) => (
                  <MotionCheckboxPill
                    key={item.value}
                    label={item.label}
                    checked={selectedArray.includes(item.value)}
                    onToggle={() => toggle(item.value)}
                  />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
