import { SvgTextProps } from "./type";

const SvgArrow = ({
  className,
  height = "18px",
  style,
  onClick,
}: SvgTextProps) => {
  return (
    <svg
      fill="none"
      width="auto"
      height={height}
      style={style}
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M7 17L17 7M17 7H8M17 7V16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SvgArrow;
