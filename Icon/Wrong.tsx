import { SvgTextProps } from "./type";

export default function SvgCrossInCircleFilled({
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
      viewBox="0 0 16 16"
    >
      <path
        fill="currentColor"
        d="m8.746 8l3.1-3.1a.527.527 0 1 0-.746-.746L8 7.254l-3.1-3.1a.527.527 0 1 0-.746.746l3.1 3.1l-3.1 3.1a.527.527 0 1 0 .746.746l3.1-3.1l3.1 3.1a.527.527 0 1 0 .746-.746zM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16"
      ></path>
    </svg>
  );
}
