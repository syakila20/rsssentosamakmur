import clsx from "clsx";

const baseInputClass =
  "bg-white rounded-md border border-gray-300 text-slate-700 font-medium placeholder-slate-00 focus:outline-blue-100 ";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={clsx(baseInputClass, "w-full py-2 px-3 ", className)}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={clsx(
        baseInputClass,
        "w-full h-20 py-2 px-3 leading-normal resize-none",
        className,
      )}
      {...props}
    />
  );
}
