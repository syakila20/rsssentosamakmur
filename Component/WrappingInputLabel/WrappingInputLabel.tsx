import React from "react";
import { Label } from "../Typography/Typhography";
import clsx from "clsx";

interface IWrappingInputLabel {
  label: string;
  children: React.ReactNode;
  isRequired?: boolean;
  error?: boolean;
  message?: string;
  className?: string;
}

const WrappingInputLabel: React.FC<IWrappingInputLabel> = (props) => {
  return (
    <div className="flex flex-col ">
      <Label className="text-slate-500 flex">
        {props?.isRequired && <span className="text-red-400 mr-1">*</span>}
        {props?.label}
      </Label>
      <div className={clsx("mt-1", props?.className)}>{props?.children}</div>
      {props?.error && (
        <span className="text-red-500 text-xs font-light px-1">
          {props?.message}
        </span>
      )}
    </div>
  );
};

export default WrappingInputLabel;
