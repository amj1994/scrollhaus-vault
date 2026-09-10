interface IconProps {
  size?: number;
  className?: string;
}

export function ChevronRightIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M8 7V3L12 3V5L14 5V7H15V9H17V11H18V13H17V15L15 15V17H14V19H12V21H8V17H9V15H11V13H12V11H11V9H9V7H8Z"
        fill="currentColor"
      />
    </svg>
  );
}