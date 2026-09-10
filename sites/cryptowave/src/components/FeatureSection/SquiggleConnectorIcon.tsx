interface IconProps {
  width?: number;
  height?: number;
  className?: string;
}

export function SquiggleConnectorIcon({ width = 34, height = 20, className }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 34 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M1 3C6 3 6 10 11 10C16 10 16 3 21 3C26 3 26 16 33 17"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeDasharray="2.5 3.5"
      />
    </svg>
  );
}
