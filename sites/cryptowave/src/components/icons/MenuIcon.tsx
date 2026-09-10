interface IconProps {
  size?: number;
  className?: string;
  open?: boolean;
}

/** Animates between a hamburger and a close (×) glyph based on `open`. */
export function MenuIcon({ size = 20, className, open = false }: IconProps) {
  const lineStyle = {
    transformOrigin: "10px 10px",
    transition: "transform var(--duration-base, 260ms) var(--ease-out, ease)",
  } as const;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <line
        x1="3"
        y1="5.5"
        x2="17"
        y2="5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          ...lineStyle,
          transform: open ? "translateY(4.5px) rotate(45deg)" : "none",
        }}
      />
      <line
        x1="3"
        y1="10"
        x2="17"
        y2="10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          opacity: open ? 0 : 1,
          transition: "opacity var(--duration-fast, 160ms) linear",
        }}
      />
      <line
        x1="3"
        y1="14.5"
        x2="17"
        y2="14.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          ...lineStyle,
          transform: open ? "translateY(-4.5px) rotate(-45deg)" : "none",
        }}
      />
    </svg>
  );
}
