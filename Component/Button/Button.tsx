import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  shape?: "normal" | "full";
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary:
    "bg-emerald-600 text-gray-100 border border-gray-200 hover:bg-emerald-700",
  outline:
    "bg-transparent text-gray-900 hover:bg-gray-100 outline outline-1 outline-blue-700",
};

const sizes = {
  sm: "px-3 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

const shapes = {
  normal: "rounded-md",
  full: "rounded-full",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  shape = "normal",
  loading = false,
  disabled,
  icon,
  iconPosition = "left",
  className,
  ...props
}: ButtonProps) {
  const hasText = Boolean(children);

  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus:outline-none focus:ring-4",
        variants[variant],
        sizes[size],
        shapes[shape],
        disabled || loading
          ? "cursor-not-allowed opacity-60"
          : "cursor-pointer",
        className,
      )}
      {...props}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <span className="shrink-0">{icon}</span>
          )}

          {children && <span className="whitespace-nowrap">{children}</span>}

          {icon && iconPosition === "right" && (
            <span className="shrink-0">{icon}</span>
          )}
        </>
      )}
    </button>
  );
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        opacity="0.25"
      />
      <path
        d="M22 12a10 10 0 0 1-10 10"
        stroke="currentColor"
        strokeWidth="4"
      />
    </svg>
  );
}
