import { SvgTextProps } from "./type";

const ChatTypingAltOutline = ({
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
      viewBox="0 0 15 15"
    >
      <path
        fill="none"
        stroke="currentColor"
        d="M7 7.5h1m-4 0h1m5 0h1m3.5 7h-7a7 7 0 1 1 7-7z"
      ></path>
    </svg>
  );
};

export default ChatTypingAltOutline;
