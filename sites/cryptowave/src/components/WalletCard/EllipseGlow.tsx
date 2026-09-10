import { useId } from "react";
import styles from "./EllipseGlow.module.css";

/**
 * Soft blue glow blob (source: Ellipse_116.svg) tucked into a corner of the
 * balance card. Rendered with `preserveAspectRatio="none"` so it stretches
 * to fill its positioned wrapper and keeps sitting in the same relative
 * spot (~90% across, ~94% down) at any card size, rather than being a
 * fixed-size image that would misalign on smaller/larger cards.
 */
export function EllipseGlow() {
  const filterId = useId();

  return (
    <svg
      className={styles.root}
      viewBox="0 0 313 431"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <g filter={`url(#${filterId})`}>
        <circle cx="282.693" cy="402.925" r="126.69" fill="#0657F5" fillOpacity="0.7" />
      </g>
      <defs>
        <filter
          id={filterId}
          x="-142.092"
          y="-21.8603"
          width="849.571"
          height="849.571"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="149.048" result="effect1_foregroundBlur" />
        </filter>
      </defs>
    </svg>
  );
}
