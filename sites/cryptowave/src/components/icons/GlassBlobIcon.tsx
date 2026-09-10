import { useId } from "react";

interface IconProps {
  size?: number;
  className?: string;
}

/** Soft translucent blob (source: organic circle-ish shape), used as a
 * decorative glass backdrop behind the floating icon row. */
export function GlassBlobIcon({ size = 119, className }: IconProps) {
  const gradientId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 119 119"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M116.586 73.4949C108.681 105.198 76.5679 124.492 44.8577 116.586C13.1603 108.682 -6.13591 76.5704 1.77271 44.8693C9.67392 13.1627 41.7874 -6.13309 73.4885 1.7709C105.197 9.6749 124.491 41.7902 116.586 73.4949V73.4949Z"
        fill={`url(#${gradientId})`}
        fillOpacity="0.54"
      />
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="59.1789"
          x2="118.358"
          y2="59.1789"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.24" />
          <stop offset="1" stopColor="white" stopOpacity="0.31" />
        </linearGradient>
      </defs>
    </svg>
  );
}
