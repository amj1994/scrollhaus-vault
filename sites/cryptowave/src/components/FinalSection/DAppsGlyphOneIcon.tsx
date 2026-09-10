interface IconProps {
  size?: number;
  className?: string;
}

export function DAppsGlyphOneIcon({ size = 8, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M7.25926 8L5.56049 5.42857H8V4.45714H0V5.42857H2.43951L0.740741 8H2.00494L4 4.98095L5.99506 8H7.25926ZM8 3.51429V2.54286H5.60988L7.28889 0H6.01481L4 3.06667L1.98519 0H0.711111L2.39012 2.54286H0V3.52381L8 3.51429Z"
        fill="currentColor"
      />
    </svg>
  );
}
