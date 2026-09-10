import { useId } from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export function MenuCircleIcon({ size = 64, className }: IconProps) {
  const gradientId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="63.5952" height="63.5952" rx="31.7976" fill={`url(#${gradientId})`} fillOpacity="0.6" />
      <path
        d="M17.4889 40.1724C17.7484 39.9244 18.1001 39.785 18.4668 39.785H52.3026C52.9189 39.785 53.2275 40.4984 52.7915 40.9153L46.1056 47.3089C45.8462 47.557 45.4945 47.6964 45.1278 47.6964H11.292C10.6756 47.6964 10.367 46.9831 10.803 46.566L17.4889 40.1724Z"
        fill="white"
      />
      <path
        d="M17.4889 16.2863C17.7483 16.0382 18.1001 15.8988 18.4668 15.8988H52.3026C52.9189 15.8988 53.2275 16.6121 52.7915 17.0292L46.1056 23.4228C45.8462 23.6708 45.4945 23.8102 45.1278 23.8102H11.292C10.6756 23.8102 10.367 23.0968 10.803 22.6799L17.4889 16.2863Z"
        fill="white"
      />
      <path
        d="M46.1056 28.1533C45.8462 27.9052 45.4945 27.7659 45.1278 27.7659H11.292C10.6756 27.7659 10.367 28.4792 10.803 28.8961L17.4889 35.2898C17.7483 35.5379 18.1001 35.6772 18.4668 35.6772H52.3026C52.9189 35.6772 53.2275 34.9639 52.7915 34.5469L46.1056 28.1533Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="31.7976"
          x2="63.5952"
          y2="31.7976"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.24" />
          <stop offset="1" stopColor="white" stopOpacity="0.31" />
        </linearGradient>
      </defs>
    </svg>
  );
}
