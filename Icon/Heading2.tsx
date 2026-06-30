import { SvgTextProps } from "./type";

const SvgHeading2 = ({
  className,
  height = "18px",
  onClick,
  style,
}: SvgTextProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      viewBox="0 0 24 24"
      height={height}
      style={style}
      className={className}
      onClick={onClick}
    >
      <path
        fill="currentColor"
        d="M4 13h5v4h2V7H9v4H4V7H2v10h2zm9-4h7v2h-5c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h7v-2h-7v-2h5c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2h-7z"
      ></path>
    </svg>
  );
};

export default SvgHeading2;
