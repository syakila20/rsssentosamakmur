import clsx from "clsx";
import { ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export function PageTitle({ children, className }: TypographyProps) {
  return (
    <h1
      className={clsx(
        `
        text-2xl
        md:text-3xl
        font-bold
        tracking-tight
        text-slate-700
      `,
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function SectionTitle({ children, className }: TypographyProps) {
  return (
    <h2
      className={clsx(
        `
        text-xl
        md:text-2xl
        font-semibold
        tracking-tight
        text-slate-700
      `,
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function CardTitle({ children, className }: TypographyProps) {
  return (
    <h3
      className={clsx(
        `
        text-base
        md:text-lg
        font-semibold
        text-slate-800
      `,
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function Description({ children, className }: TypographyProps) {
  return (
    <p
      className={clsx(
        `
        text-sm
        md:text-base
        leading-relaxed
        text-slate-500
      `,
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Label({ children, className }: TypographyProps) {
  return (
    <label
      className={clsx(
        `
        text-sm
        font-medium
      `,
        className,
      )}
    >
      {children}
    </label>
  );
}

export function Caption({ children, className }: TypographyProps) {
  return (
    <span
      className={clsx(
        `
        text-xs
        text-slate-400
      `,
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Metric({ children, className }: TypographyProps) {
  return (
    <p
      className={clsx(
        `
        text-2xl
        md:text-3xl
        font-bold
        text-slate-800
      `,
        className,
      )}
    >
      {children}
    </p>
  );
}

export function AccentText({ children, className }: TypographyProps) {
  return (
    <span
      className={clsx(
        `
        text-emerald-700
        font-medium
      `,
        className,
      )}
    >
      {children}
    </span>
  );
}
