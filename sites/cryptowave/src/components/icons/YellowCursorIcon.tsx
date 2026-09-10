interface IconProps {
  size?: number;
  className?: string;
}

export function YellowCursorIcon({ size = 17, className }: IconProps) {
  return (
    <svg
      width={size}
      height={(size * 15) / 17}
      viewBox="0 0 17 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5.71044 14.3796L0.154416 1.58083C-0.15372 0.871012 0.631698 0.172507 1.43857 0.438781L15.5568 5.09791C16.3847 5.37112 16.4333 6.38824 15.6343 6.72188L10.208 8.98801C9.97489 9.08534 9.79344 9.25837 9.7015 9.47092L7.57854 14.3787C7.25131 15.1352 6.03868 15.1358 5.71044 14.3796Z"
        fill="#F6B03D"
      />
    </svg>
  );
}
