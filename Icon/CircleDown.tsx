import { SvgTextProps } from "./type";

const SvgCircleDown = ({
  className,
  height = "18px",
  style,
  onClick,
}: SvgTextProps) => {
  return (
    <svg
      fill="currentColor"
      viewBox="-1 0 19 19"
      xmlns="http://www.w3.org/2000/svg"
      transform="matrix(-1, 0, 0, 1, 0, 0)"
      width="auto"
      height={height}
      style={style}
      className={className}
      onClick={onClick}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M16.416 9.579A7.917 7.917 0 1 1 8.5 1.662a7.916 7.916 0 0 1 7.916 7.917zm-4.07.53a.792.792 0 0 0-1.119 0l-1.935 1.935V5.212a.792.792 0 1 0-1.584 0v6.832L5.773 10.11a.792.792 0 0 0-1.12 1.12l3.287 3.287a.792.792 0 0 0 1.12 0l3.287-3.288a.791.791 0 0 0 0-1.12z"></path>
      </g>
    </svg>
  );
};

export default SvgCircleDown;
