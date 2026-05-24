import { SvgTextProps } from "./type";

const SvgSort = ({
  className,
  height = "18px",
  style,
  onClick,
}: SvgTextProps) => {
  return (
    <svg
      viewBox="0 0 512 512"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
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
        {" "}
        <title>sort</title>{" "}
        <g
          id="Page-1"
          stroke="currentColor"
          strokeWidth="1"
          fill="currentColor"
          fillRule="evenodd"
        >
          {" "}
          <g
            id="Shape"
            fill="currentColor"
            transform="translate(42.666667, 85.333333)"
          >
            {" "}
            <path d="M170.666667,210.652373 L200.83328,240.818987 L100.41664,341.333333 L7.10542736e-15,240.818987 L30.1666133,210.652373 L79.0833067,259.569067 L79.0833067,21.3333333 L121.749973,21.3333333 L121.749973,259.569067 L170.666667,210.652373 Z M313.749973,1.42108547e-14 L213.332053,100.52224 L243.498667,130.688853 L292.41664,81.77088 L292.41664,320 L335.083307,320 L335.083307,81.77344 L383.99872,130.688853 L414.165333,100.52224 L313.749973,1.42108547e-14 Z">
              {" "}
            </path>{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>
  );
};

export default SvgSort;
