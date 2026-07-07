"use client";

import { AutoSaveStatus } from "@/app/(admin)/cms/artikel/hooks/useAutosaveArticle";
import SvgDashboard from "@/Icon/Dashboard";
import SvgSuccess from "@/Icon/Success";
import ChatTypingAltOutline from "@/Icon/SvgTyping";
import DangerTriangleSolid from "@/Icon/Warning";
import { motion, AnimatePresence } from "framer-motion";
import { ComponentType } from "react";
type IconComponent = ComponentType<{ className?: string }>;

export interface SaveIndicatorProps {
  status: AutoSaveStatus;
  dirty: boolean;
  lastSaved: Date | null;
}
export function formatLastSaved(date: Date | null) {
  if (!date) {
    return "";
  }

  return `Saved ${date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}
export default function SaveIndicator({
  status,
  dirty,
  lastSaved,
}: SaveIndicatorProps) {
  let text = "";
  let color = "";
  let Icon: IconComponent | null = null;

  if (status === "saving") {
    text = "Saving...";
    Icon = SvgDashboard;
    color = "text-amber-600";
  } else if (status === "error") {
    text = "Save failed";
    Icon = DangerTriangleSolid;
    color = "text-red-600";
  } else if (dirty) {
    text = "Unsaved changes";
    Icon = ChatTypingAltOutline;
    color = "text-orange-500";
  } else if (lastSaved) {
    text = formatLastSaved(lastSaved);
    Icon = SvgSuccess;
    color = "text-green-600";
  } else {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${status}-${dirty}-${lastSaved?.getTime()}`}
        initial={{
          opacity: 0,
          y: -4,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: -4,
        }}
        transition={{
          duration: 0.2,
        }}
        className={`
          flex
          items-center
          justify-end
          gap-2
          text-sm
          font-medium
          ${color}
        `}
      >
        <Icon className={`h-6 w-6 `} />

        <span>{text}</span>
      </motion.div>
    </AnimatePresence>
  );
}
