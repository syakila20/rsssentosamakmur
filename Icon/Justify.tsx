import { SvgTextProps } from "./type";

export default function AlignJustify({
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
        d="M3 7h18v2H3zm0-4h18v2H3zm0 8h18v2H3zm0 4h18v2H3zm3 4h12v2H6z"
      ></path>
    </svg>
  );
}
