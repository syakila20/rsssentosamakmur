import { SvgTextProps } from "./type";

const SvgHeading1 = ({
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
      width="100%"
      height={height}
      style={style}
      className={className}
      onClick={onClick}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M4 13h5v4h2V7H9v4H4V7H2v10h2zm18 2h-3V7h-1.41l-3.3 3.29l1.42 1.42l1.29-1.3V15h-3v2h8z"
      ></path>
    </svg>
  );
};

export default SvgHeading1;
