import { SvgTextProps } from "./type";

export default function Italic({
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
        d="M19 4H9v2h3.67L9.25 18H5v2h10v-2h-3.67l3.42-12H19z"
      ></path>
    </svg>
  );
}
