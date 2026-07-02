import { SvgTextProps } from "./type";

export default function AlignCenter({
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
      viewBox="0 0 24 24"
      width="100%"
      height={height}
      style={style}
      className={className}
      onClick={onClick}
    >
      <path
        fill="currentColor"
        d="M6 7h12v2H6zM3 3h18v2H3zm0 8h18v2H3zm3 4h12v2H6zm-3 4h18v2H3z"
      ></path>
    </svg>
  );
}
