interface SplitTextProps {
  text: string;
  className?: string;
  letterClassName?: string;
}

/**
 * Splits `text` into one <span> per character (space preserved as \u00A0
 * where needed) so each letter can be targeted individually by GSAP for a
 * stagger reveal, e.g. the "Solv." wordmark in the nav.
 */
export default function SplitText({
  text,
  className,
  letterClassName = "split-letter",
}: SplitTextProps) {
  return (
    <span className={className} aria-label={text}>
      {[...text].map((ch, i) => (
        <span
          className={letterClassName}
          key={i}
          aria-hidden="true"
          style={{ display: "inline-block" }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}
