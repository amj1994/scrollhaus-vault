interface IconProps {
  className?: string;
}

export function CommitDotIcon({ className }: IconProps) {
  return (
    <svg
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <line x1="0" y1="6" x2="4.5" y2="6" stroke="currentColor" strokeWidth="1.2" />
      <line x1="11.5" y1="6" x2="16" y2="6" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="8" cy="6" r="2.6" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  );
}
