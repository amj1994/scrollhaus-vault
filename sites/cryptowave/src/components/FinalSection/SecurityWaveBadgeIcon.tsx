import { useId } from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export function SecurityWaveBadgeIcon({ size = 82, className }: IconProps) {
  const bgId = useId();
  const markId = useId();
  const maskId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 82 82"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="41" cy="41" r="41" fill={`url(#${bgId})`} />
      <path
        d="M13 30.9338V51.0686C13 58.0186 18.6339 63.653 25.5838 63.653C27.1957 63.653 28.7363 63.3501 30.1522 62.7978C32.3408 66.5097 36.38 69 41.0006 69C45.6212 69 49.6598 66.5091 51.8484 62.7972C53.3043 63.364 54.8532 63.6541 56.4156 63.6524C63.3655 63.6524 69 58.018 69 51.0674V30.9332C69 23.9832 63.3655 18.3494 56.4156 18.3494C54.8049 18.3494 53.2649 18.6523 51.8484 19.2034C49.6604 15.4915 45.6218 13 41.0012 13C36.3794 13 32.3402 15.4915 30.1522 19.204C28.6962 18.6374 27.1473 18.3476 25.585 18.3494C18.6344 18.3494 13 23.9832 13 30.9338Z"
        fill="white"
      />
      <mask
        id={maskId}
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="25"
        y="25"
        width="32"
        height="32"
      >
        <path d="M57 25H25V57H57V25Z" fill="white" />
      </mask>
      <g mask={`url(#${maskId})`}>
        <path
          d="M52.3307 56.8194C52.3307 56.8194 53.2373 57.3661 53.024 56.5928L50.384 46.7261L52.864 45.5794C52.864 45.5794 53.6107 45.2328 53.3973 44.4461L50.1307 32.2328C50.1307 32.2328 49.9307 31.4461 49.1707 31.7928L41.704 35.2594L42.8507 39.5261L44.304 44.9661L44.3173 45.0461C44.384 45.6728 43.7707 46.0994 43.7707 46.0994L41.264 47.2594L41.9307 49.7794L41.984 49.9128C42.0773 50.1394 42.3573 50.7128 43.064 51.1261L52.3307 56.8194ZM43.3457 44.5601L43.3323 44.4801L41.8257 38.8535L40.9457 35.5868L40.0523 32.2668V32.2135C40.0523 32.2135 39.839 31.4268 38.9323 30.8801L29.6657 25.1868C29.6657 25.1868 28.759 24.6401 28.9723 25.4135L31.6257 35.3068L29.1323 36.4668C29.1323 36.4668 28.3857 36.8135 28.599 37.6001L31.8657 49.8135C31.8657 49.8135 32.079 50.6001 32.8257 50.2535L41.0523 46.4268L42.7857 45.6135C42.7857 45.6135 43.479 45.2935 43.3457 44.5601Z"
          fill={`url(#${markId})`}
        />
      </g>
      <defs>
        <linearGradient id={bgId} x1="0" y1="29.0417" x2="78.0044" y2="41.6835" gradientUnits="userSpaceOnUse">
          <stop offset="0.2505" stopColor="#F6B03C" />
          <stop offset="0.8436" stopColor="#6562EA" />
        </linearGradient>
        <linearGradient id={markId} x1="28.5607" y1="36.3353" x2="52.4659" y2="39.3462" gradientUnits="userSpaceOnUse">
          <stop offset="0.11" stopColor="#F6B03C" />
          <stop offset="0.945" stopColor="#6562EA" />
        </linearGradient>
      </defs>
    </svg>
  );
}
