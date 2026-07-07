import { SvgTextProps } from "./type";

export default function SvgTrashBinSolid({
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
      viewBox="0 0 24 24"
      height={height}
      style={style}
      className={className}
      onClick={onClick}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414M10 6h4V4h-4zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
