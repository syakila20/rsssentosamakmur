import SvgArticle from "@/Icon/Article";
import SvgPlus from "@/Icon/Plus";
import clsx from "clsx";
import Image from "next/image";

type ImageUploadProps = {
  preview?: string | null;
  onChange?: (file: File | null) => void;
  className?: string;
};

export function ImageUpload({
  preview,
  onChange,
  className,
}: ImageUploadProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    onChange?.(file);

    e.target.value = "";
  };

  return (
    <label
      className={clsx(
        "group relative flex h-full w-full cursor-pointer overflow-hidden",
        "items-center justify-center rounded-xl",
        "border-2 border-dashed border-slate-300",
        "bg-slate-50 transition-all duration-200",
        "hover:border-blue-400 hover:bg-slate-100",
        className,
      )}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      {preview ? (
        <>
          <Image
            src={preview}
            alt="Preview"
            fill
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div
            className={clsx(
              "absolute inset-0 flex items-center justify-center",
              "bg-black/50 opacity-0 transition-opacity",
              "group-hover:opacity-100",
            )}
          >
            <div className="text-center text-white">
              <SvgPlus className="mx-auto mb-2 h-10 w-10" />
              <p className="text-sm font-medium">Change Image</p>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center">
          <SvgArticle className="mx-auto mb-4 h-14 w-14 text-slate-400" />

          <p className="text-sm text-slate-600">
            Drag & drop your image here or{" "}
            <span className="font-medium text-blue-500">browse</span>
          </p>

          <p className="mt-2 text-xs text-slate-400">
            PNG, JPG, JPEG up to 5MB
          </p>
        </div>
      )}
    </label>
  );
}
