import styles from "./WaveRings.module.css";

interface WaveRingsProps {
  className?: string;
}

/**
 * Sound-wave arcs behind the badge - NOT full concentric circles. Each
 * "ring" is two separate open arcs (one bowing right, one bowing left,
 * mirrored), sharing the same center as the badge, with gaps at the top
 * and bottom where the arcs don't meet - the classic "audio wave radiating
 * from a point" look rather than a closed ring.
 */
export function WaveRings({ className }: WaveRingsProps) {
  return (
      <svg
          className={`${styles.root} ${className ?? ""}`}
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
      >
        <g transform="rotate(90 100 100)">
          <path d="M 130.57 56.34 A 53.30 53.30 0 0 1 130.57 143.66" className={`${styles.arc} ${styles.arc1}`} />
          <path d="M 69.43 143.66 A 53.30 53.30 0 0 0 69.43 56.34" className={`${styles.arc} ${styles.arc1}`} />

          <path d="M 138.80 44.58 A 67.65 67.65 0 0 1 138.80 155.42" className={`${styles.arc} ${styles.arc2}`} />
          <path d="M 61.20 155.42 A 67.65 67.65 0 0 0 61.20 44.58" className={`${styles.arc} ${styles.arc2}`} />

          <path d="M 147.03 32.83 A 82.00 82.00 0 0 1 147.03 167.17" className={`${styles.arc} ${styles.arc3}`} />
          <path d="M 52.97 167.17 A 82.00 82.00 0 0 0 52.97 32.83" className={`${styles.arc} ${styles.arc3}`} />

          <path d="M 155.26 21.07 A 96.35 96.35 0 0 1 155.26 178.93" className={`${styles.arc} ${styles.arc4}`} />
          <path d="M 44.74 178.93 A 96.35 96.35 0 0 0 44.74 21.07" className={`${styles.arc} ${styles.arc4}`} />
        </g>
      </svg>
  );
}