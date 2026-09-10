import { useId } from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export function MenuBarsBadgeIcon({ size = 45, className }: IconProps) {
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
        d="M13.8952 27.4199C14.0584 27.2639 14.2796 27.1763 14.5103 27.1763H35.7923C36.1799 27.1763 36.374 27.6249 36.0998 27.8872L31.8945 31.9086C31.7314 32.0647 31.5101 32.1524 31.2794 32.1523H9.99746C9.6098 32.1523 9.41571 31.7037 9.68992 31.4414L13.8952 27.4199Z"
        fill="white"
      />
      <path
        d="M13.8952 12.396C14.0584 12.24 14.2796 12.1523 14.5103 12.1523H35.7923C36.1799 12.1523 36.374 12.601 36.0998 12.8633L31.8945 16.8848C31.7313 17.0408 31.5101 17.1284 31.2794 17.1284H9.99746C9.6098 17.1284 9.41571 16.6797 9.68992 16.4175L13.8952 12.396Z"
        fill="white"
      />
      <path
        d="M31.8945 19.8601C31.7313 19.7041 31.5101 19.6165 31.2794 19.6165H9.99746C9.6098 19.6165 9.41571 20.0652 9.68992 20.3274L13.8952 24.3488C14.0584 24.5049 14.2796 24.5926 14.5103 24.5925H35.7923C36.1799 24.5925 36.374 24.1439 36.0998 23.8816L31.8945 19.8601Z"
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
