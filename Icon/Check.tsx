import { SvgTextProps } from "./type";

const SvgCheck = ({
  className,
  onClick,
  height = "18px",
  style,
}: SvgTextProps) => {
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
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m5 14l4 4L19 8"
      ></path>
    </svg>
  );
};

export default SvgCheck;
