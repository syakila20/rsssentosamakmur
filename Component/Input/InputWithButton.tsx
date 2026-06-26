import SvgSearch from "@/Icon/Search";
import clsx from "clsx";
import React from "react";

interface IInputWithButton {
  value: string;
  onSubmit: () => void;
  onChangeValue?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  size?: "sm" | "md";
  className?: string;
}

const InputWithButton: React.FC<IInputWithButton> = ({
  value,
  onSubmit,
  onChangeValue,
  placeholder = "Cari data...",
  size = "md",
  className,
}) => {
  const sizeStyles = {
    sm: {
      wrapper: "h-9",
      input: "px-3 text-xs",
      button: "w-9",
      icon: "h-4 w-4",
    },
    md: {
      wrapper: "h-11",
      input: "px-4 text-sm",
      button: "w-11",
      icon: "h-5 w-5",
    },
  };

  const styles = sizeStyles[size];

  return (
    <div
      className={clsx(
        "flex overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-emerald-700",
        styles.wrapper,
        className,
      )}
    >
      <input
        value={value}
        onChange={onChangeValue}
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSubmit();
          }
        }}
        className={clsx("flex-1 outline-none text-slate-700", styles.input)}
      />

      <button
        type="button"
        onClick={onSubmit}
        className={clsx(
          "flex items-center justify-center border-l border-slate-200 bg-emerald-600 text-white transition-colors hover:bg-emerald-700",
          styles.button,
        )}
      >
        <SvgSearch className={styles.icon} />
      </button>
    </div>
  );
};

export default InputWithButton;
