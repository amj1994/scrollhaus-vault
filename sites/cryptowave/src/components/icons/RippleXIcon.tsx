import { useId } from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export function RippleXIcon({ size = 40, className }: IconProps) {
  const gradientId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect
        width="44.7143"
        height="44.7143"
        rx="14.9048"
        fill={`url(#${gradientId})`}
        fillOpacity="0.14"
      />
      <path
        d="M30.9956 32.4675L26.6818 25.9376H32.8767V23.4708H12.5615V25.9376H18.7564L14.4426 32.4675H17.6528L22.7191 24.801L27.7853 32.4675H30.9956ZM32.8767 21.0765V18.6097H26.8072L31.0709 12.1524H27.8355L22.7191 19.9398L17.6027 12.1524H14.3673L18.631 18.6097H12.5615V21.1007L32.8767 21.0765Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="22.3571"
          x2="44.7143"
          y2="22.3571"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.24" />
          <stop offset="1" stopColor="white" stopOpacity="0.31" />
        </linearGradient>
      </defs>
    </svg>
  );
}
