import { SvgTextProps } from "./type";

export default function CodeAlt({
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
        d="M9.71 16.29L5.41 12l4.3-4.29l-1.42-1.42L2.59 12l5.7 5.71zm6 1.42l5.7-5.71l-5.7-5.71l-1.42 1.42l4.3 4.29l-4.3 4.29z"
      ></path>
    </svg>
  );
}
