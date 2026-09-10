interface IconProps {
  size?: number;
  className?: string;
}

export function PinIcon({ size = 14, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M8 14.5s5-4.13 5-8.13a5 5 0 0 0-10 0c0 4 5 8.13 5 8.13Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path
        d="M9.35 5.05a1.9 1.9 0 1 0-2.7 2.7"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}
