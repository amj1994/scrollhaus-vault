interface IconProps {
  size?: number;
  className?: string;
  direction?: "left" | "right";
}

export function TinyArrowIcon({ size = 8, className, direction = "right" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: direction === "left" ? "rotate(180deg)" : undefined }}
      aria-hidden="true"
    >
      <path
        d="M1 5h7.5M5.5 1.5 9 5l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
