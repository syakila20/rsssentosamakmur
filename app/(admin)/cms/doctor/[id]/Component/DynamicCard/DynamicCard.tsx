"use client";

import clsx from "clsx";
import SvgTrashBinSolid from "@/Icon/Trash";

type DynamicCardProps = {
  children: React.ReactNode;
  className?: string;
  onDelete?: () => void;
};

export default function DynamicCard({
  children,
  className,
  onDelete,
}: DynamicCardProps) {
  return (
    <div
      className={clsx(
        "rounded-xl border border-slate-200 bg-slate-50 p-5",
        className,
      )}
    >
      <div className="space-y-5">
        {children}

        {onDelete && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onDelete}
              className="
                flex items-center gap-2
                rounded-lg
                px-3 py-2
                text-sm
                text-red-600
                transition-colors
                hover:bg-red-50
              "
            >
              <SvgTrashBinSolid className="h-4 w-4" />
              Hapus
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
