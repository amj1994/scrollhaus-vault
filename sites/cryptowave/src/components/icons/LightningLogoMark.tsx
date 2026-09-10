import { useId } from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export function LightningLogoMark({ size = 40, className }: IconProps) {
  const maskId = useId();
  const gradientId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <mask
        id={maskId}
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="40"
        height="40"
      >
        <path d="M40 0H0V40H40V0Z" fill="white" />
      </mask>
      <g mask={`url(#${maskId})`}>
        <path
          d="M34.1627 39.7741C34.1627 39.7741 35.296 40.4574 35.0294 39.4908L31.7294 27.1574L34.8294 25.7241C34.8294 25.7241 35.7627 25.2908 35.496 24.3074L31.4127 9.04078C31.4127 9.04078 31.1627 8.05744 30.2127 8.49078L20.8794 12.8241L22.3127 18.1574L24.1294 24.9574L24.146 25.0574C24.2294 25.8408 23.4627 26.3741 23.4627 26.3741L20.3294 27.8241L21.1627 30.9741L21.2294 31.1408C21.346 31.4241 21.696 32.1408 22.5794 32.6574L34.1627 39.7741ZM22.9314 24.45L22.9148 24.35L21.0314 17.3167L19.9314 13.2333L18.8148 9.08333V9.01666C18.8148 9.01666 18.5481 8.03333 17.4148 7.34999L5.83145 0.233327C5.83145 0.233327 4.69811 -0.450007 4.96478 0.51666L8.28145 12.8833L5.16478 14.3333C5.16478 14.3333 4.23145 14.7667 4.49811 15.75L8.58145 31.0167C8.58145 31.0167 8.84811 32 9.78145 31.5667L20.0648 26.7833L22.2314 25.7667C22.2314 25.7667 23.0981 25.3667 22.9314 24.45Z"
          fill={`url(#${gradientId})`}
        />
      </g>
      <defs>
        <linearGradient
          id={gradientId}
          x1="4.4502"
          y1="14.169"
          x2="34.3317"
          y2="17.9326"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.11" stopColor="#F6B03C" />
          <stop offset="0.945" stopColor="#6562EA" />
        </linearGradient>
      </defs>
    </svg>
  );
}
