import SvgPlus from "@/Icon/Plus";
import SvgTrashBinSolid from "@/Icon/Trash";
import SvgUpload from "@/Icon/Upload";
import clsx from "clsx";
import Image from "next/image";
import { useId } from "react";

type ImageUploadProps = {
  preview?: string | null;
  onChange?: (file: File | null) => void;
  className?: string;
  onDelete: () => void;
};

export function ImageUpload({
  preview,
  onChange,
  className,
  onDelete,
}: ImageUploadProps) {
  const inputId = useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    onChange?.(file);

    e.target.value = "";
  };

  return (
    <>
      <input
        id={inputId}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      <div
        className={clsx(
          "group relative flex h-full w-full overflow-hidden rounded-xl",
          "border-2 border-dashed border-slate-300 bg-slate-50",
          "transition-all duration-200",
          "hover:border-blue-400 hover:bg-slate-100",
          className,
        )}
      >
        {preview ? (
          <>
            <Image src={preview} alt="Preview" fill className="object-cover" />

            {/* Overlay */}
            <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {/* Change Image */}
              <label
                htmlFor={inputId}
                className={clsx(
                  "flex h-12 w-12 cursor-pointer items-center justify-center",
                  "rounded-full border border-white/20",
                  "bg-white/15 backdrop-blur-md",
                  "transition-all duration-200",
                  "hover:scale-110 hover:bg-white/25",
                )}
              >
                <SvgPlus className="h-5 w-5 text-white" />
              </label>

              {/* Delete Image */}
              <button
                type="button"
                onClick={onDelete}
                className={clsx(
                  "flex h-12 w-12 items-center justify-center",
                  "rounded-full border border-white/20",
                  "bg-red-500/20 backdrop-blur-md cursor-pointer",
                  "transition-all duration-200",
                  "hover:scale-110 hover:bg-red-500/40",
                )}
              >
                <SvgTrashBinSolid className="h-5 w-5 text-white" />
              </button>
            </div>
          </>
        ) : (
          <label
            htmlFor={inputId}
            className="flex h-full w-full cursor-pointer flex-col items-center justify-center p-6 text-center"
          >
            <SvgUpload className="mb-4 h-14 w-14 text-slate-400 transition-colors group-hover:text-blue-500" />

            <p className="text-sm font-medium text-slate-700">Upload Image</p>

            <p className="mt-2 text-xs text-slate-400">
              PNG, JPG, JPEG up to 5MB
            </p>
          </label>
        )}
      </div>
    </>
  );
}
