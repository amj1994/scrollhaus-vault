import { useId } from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export function SwapMarkCircleIcon({ size = 41, className }: IconProps) {
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
      <rect width="40.6303" height="40.6303" rx="20.3151" fill={`url(#${gradientId})`} fillOpacity="0.6" />
      <path
        d="M28.5921 30.4727L24.2783 23.9428H30.4732V21.476H10.158V23.9428H16.3529L12.0391 30.4727H15.2493L20.3156 22.8061L25.3818 30.4727H28.5921ZM30.4732 19.0817V16.6148H24.4037L28.6674 10.1575H25.432L20.3156 17.945L15.1992 10.1575H11.9638L16.2275 16.6148H10.158V19.1059L30.4732 19.0817Z"
        fill="white"
      />
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
