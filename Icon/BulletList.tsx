import { SvgTextProps } from "./type";

export default function ListUl({
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
        d="M8 11h13v2H8zm0-5h13v2H8zm0 10h13v2H8zM3 5.5h3v3H3zm0 5h3v3H3zm0 5h3v3H3z"
      ></path>
    </svg>
  );
}
