import { SvgTextProps } from "./type";

const SvgFilter = ({
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
      width="100%"
      height={height}
      style={style}
      className={className}
      onClick={onClick}
      viewBox="0 0 24 24"
    >
      <g transform="rotate(90 12 12)">
        <g fill="none" stroke="currentColor" strokeLinecap="round">
          <path d="M5 12V4m14 16v-3M5 20v-4m14-3V4m-7 3V4m0 16v-9"></path>
          <circle cx="5" cy="14" r="2"></circle>
          <circle cx="12" cy="9" r="2"></circle>
          <circle cx="19" cy="15" r="2"></circle>
        </g>
      </g>
    </svg>
  );
};

export default SvgFilter;
