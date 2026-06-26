"use client";

import clsx from "clsx";

type Props = {
  label: string;
  active?: boolean;
  onClick(): void;
};

const buttonClass =
  "rounded-lg px-3 py-2 text-sm transition-colors hover:bg-slate-100 text-slate-500 cursor-pointer";

const activeClass = "bg-slate-900 text-white";

export default function ToolbarButton({ label, active, onClick }: Props) {
  return (
    <button
      type="button"
      className={clsx(buttonClass, active && activeClass)}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
