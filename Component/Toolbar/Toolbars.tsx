"use client";

import SvgSort from "@/Icon/Sort";
import clsx from "clsx";
import { CardTitle, PageTitle, SectionTitle } from "../Typography/Typhography";
import SvgSearch from "@/Icon/Search";
import InputWithButton from "../Input/InputWithButton";
import { useState } from "react";

interface ToolbarProps {
  title: string;

  searchValue?: string;
  onSearch?: (val: string) => void;
  action?: React.ReactNode;
  showSearch?: boolean;
  className?: string;
}

export default function Toolbar({
  title,
  onSearch,
  action,
  showSearch,
  className,
}: ToolbarProps) {
  const [keyword, setKeyword] = useState<string>();
  const [errorMsg, setErrorMsg] = useState<string>("");

  const onClickSearch = () => {
    if (!keyword?.trim()) {
      setErrorMsg("");
      onSearch?.("");
      return;
    }

    if (keyword.length < 3) {
      setErrorMsg("Minimal 3 karakter untuk melakukan pencarian");
      return;
    }

    setErrorMsg("");

    onSearch?.(keyword);
  };
  return (
    <div
      className={clsx(
        `
        flex
        flex-col
        gap-4
        lg:flex-row
        lg:items-end
        lg:justify-between
      `,
        className,
      )}
    >
      <div>
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
        {showSearch && (
          <InputWithButton
            value={keyword || ""}
            onChangeValue={(val) => setKeyword(val?.target?.value)}
            onSubmit={onClickSearch}
          />
        )}
        {action}
      </div>
    </div>
  );
}
