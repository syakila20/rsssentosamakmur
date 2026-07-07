import { SVGProps } from "react";
import { SvgTextProps } from "./type";

export default function SvgSuccess({
  className,
  height = "18px",
  onClick,
  style,
}: SvgTextProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      style={style}
      className={className}
      onClick={onClick}
      aria-hidden="true"
      role="img"
      width="100%"
      viewBox="0 0 48 48"
    >
      <defs>
        <mask id="iconifyReact42">
          <g
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
          >
            <path
              fill="#fff"
              stroke="#fff"
              d="m24 4l5.253 3.832l6.503-.012l1.997 6.188l5.268 3.812L41 24l2.021 6.18l-5.268 3.812l-1.997 6.188l-6.503-.012L24 44l-5.253-3.832l-6.503.012l-1.997-6.188l-5.268-3.812L7 24l-2.021-6.18l5.268-3.812l1.997-6.188l6.503.012z"
            ></path>
            <path stroke="#000" d="m17 24l5 5l10-10"></path>
          </g>
        </mask>
      </defs>
      <path
        fill="currentColor"
        d="M0 0h48v48H0z"
        mask="url(#iconifyReact42)"
      ></path>
    </svg>
  );
}
