import { useId } from "react";

interface IconProps {
  size?: number;
  className?: string;
}

/** Gold-to-indigo faceted cube mark, used above the hero headline. */
export function CubeIcon({ size = 40, className }: IconProps) {
  const gradientId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M24 4.8V43.2L7.20001 33.6V14.4L24 4.8Z" fill={`url(#${gradientId})`} />
      <path d="M40.7998 4.8V43.2L23.9998 33.6V14.4L40.7998 4.8Z" fill="#1E1E20" />
      <defs>
        <linearGradient
          id={gradientId}
          x1="7.20001"
          y1="18.4"
          x2="23.5191"
          y2="19.5571"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.2505" stopColor="#F6B03C" />
          <stop offset="0.8436" stopColor="#6562EA" />
        </linearGradient>
      </defs>
    </svg>
  );
}
