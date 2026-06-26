import { SvgTextProps } from "./type";

const SvgMenu = ({
  className,
  height = "18px",
  style,
  onClick,
}: SvgTextProps) => {
  return (
    <svg
      width="100%"
      height={height}
      style={style}
      className={className}
      onClick={onClick}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6H20M4 12H20M4 18H20"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SvgMenu;
