import { SvgTextProps } from "./type";

const SvgPlus = ({
  className,
  height = "18px",
  style,
  onClick,
}: SvgTextProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      width="auto"
      height={height}
      style={style}
      className={className}
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 12h7m7 0h-7m0 0V5m0 7v7"
      ></path>
    </svg>
  );
};

export default SvgPlus;
