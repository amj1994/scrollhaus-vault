import { useId } from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export function GlassCircleIcon({ size = 41, className }: IconProps) {
  const gradientId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="20.3151" cy="20.3151" r="20.3151" fill={`url(#${gradientId})`} fillOpacity="0.54" />
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="20.3151"
          x2="40.6303"
          y2="20.3151"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.24" />
          <stop offset="1" stopColor="white" stopOpacity="0.31" />
        </linearGradient>
      </defs>
    </svg>
  );
}
