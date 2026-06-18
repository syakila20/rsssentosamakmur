import SvgSearch from "@/Icon/Search";
import React from "react";

interface IInputWithButton {
  onChangeValue?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  onSubmit: () => void;
}

const InputWithButton: React.FC<IInputWithButton> = (props) => {
  return (
    <div
      className="
      flex
      h-11
      w-full
      overflow-hidden
      rounded-xl
      border
      border-slate-200
      bg-white
      sm:w-72
      focus-within:border-emerald-700
    "
    >
      <input
        value={props?.value}
        onChange={props?.onChangeValue}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            props?.onSubmit();
          }
        }}
        placeholder="Cari data..."
        className="
        flex-1
        px-4
        text-sm
        outline-none
        text-slate-700
      "
      />

      <button
        type="button"
        className="
        flex
        w-11
        items-center
        justify-center
        border-l
        bg-emerald-600
        border-slate-200
        text-slate-500
        transition-colors
        hover:bg-emerald-50
      "
        onClick={props?.onSubmit}
      >
        <SvgSearch className="text-white" />
      </button>
    </div>
  );
};

export default InputWithButton;
