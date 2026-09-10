interface IconProps {
  className?: string;
}

/**
 * Runs from the second (lower) deploy card up to the first (upper) card:
 * up from the lower card, left along a rounded elbow, then up into the
 * bottom of the upper card with an upward arrowhead.
 */
export function DeployConnectorArrow({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M56 96 V58 Q56 48 46 48 L18 48 Q8 48 8 38 V9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M8 0L12.5 9H3.5L8 0Z" fill="currentColor" />
    </svg>
  );
}
