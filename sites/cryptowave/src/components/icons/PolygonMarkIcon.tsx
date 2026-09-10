interface IconProps {
  size?: number;
  className?: string;
}

/**
 * Note: no brand asset for this token was included in the provided files,
 * so this is an original abstract "linked loops" glyph in the same violet
 * family as the rest of the wallet UI, rather than a reproduction of any
 * specific network's registered mark.
 */
export function PolygonMarkIcon({ size = 40, className }: IconProps) {
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
      <rect width="40" height="40" rx="9.93651" fill="#7C5CFC" />
      <path
        d="M16.2 14.4C13.88 14.4 12 16.28 12 18.6C12 20.92 13.88 22.8 16.2 22.8C17.36 22.8 18.41 22.33 19.17 21.57L20.83 19.91"
        stroke="white"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M23.8 25.6C26.12 25.6 28 23.72 28 21.4C28 19.08 26.12 17.2 23.8 17.2C22.64 17.2 21.59 17.67 20.83 18.43L19.17 20.09"
        stroke="white"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
    </svg>
  );
}
