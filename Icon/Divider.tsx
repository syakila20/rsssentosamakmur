import { SvgTextProps } from "./type";

export default function DividerOutline({
  className,
  height = "18px",
  onClick,
  style,
}: SvgTextProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      width="100%"
      height={height}
      style={style}
      className={className}
      onClick={onClick}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M21 11a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2z"
      ></path>
    </svg>
  );
}
