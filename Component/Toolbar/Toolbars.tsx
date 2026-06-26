"use client";

import clsx from "clsx";
import { CardTitle, PageTitle, SectionTitle } from "../Typography/Typhography";

interface ToolbarProps {
  title: string;

  searchValue?: string;
  onSearch?: (val: string) => void;
  action?: React.ReactNode;
  showSearch?: boolean;
  className?: string;
}

export default function Toolbar({ title, action, className }: ToolbarProps) {
  return (
    <div
      className={clsx(
        `
    flex
    flex-col
    gap-4
    lg:flex-row
    lg:items-start
    lg:justify-between
    `,
        className,
      )}
    >
      <div className="pt-1">
        <CardTitle>{title}</CardTitle>
      </div>

      <div
        className="
          flex
          flex-col
          gap-3
          sm:flex-row
          sm:items-center
        "
      >
        {action}
      </div>
    </div>
  );
}
//  <div className="w-3xs">
//
//           </div>
