import { motion } from "framer-motion";
import styles from "./CardStarField.module.css";

/**
 * Tiny twinkle particles scattered inside the wallet card panel itself
 * (source: Star_41.svg). Distinct from the hero's <StarField> - this one
 * uses the panel's own ~688x818 reference size, a denser scatter, and a
 * much smaller star (~1.6px at the 1440px reference, per spec) so they
 * read as fine grain rather than the larger hero twinkles.
 *
 * Each star fades in individually (not as one block), but with a very
 * tight stagger between them so the whole field reads as "twinkling on
 * together" rather than a slow one-at-a-time reveal.
 */
const STAR_PATH =
  "M-0.0001 0.198L0.6097 0.4174L1.1052 0L0.8862 0.6097L1.3036 1.1053L0.6939 0.8863L0.1983 1.3037L0.4173 0.6939L-0.0001 0.198Z";

interface StarSpec {
  x: number;
  y: number;
  opacity: number;
}

// Coordinates in a 688x818 space, matching the panel's own reference size
// at 1440px (see WalletCard.module.css). Scattered across the whole panel
// rather than clustered, since the panel's background is visible edge to
// edge behind the header, rings and balance card.
const STARS: StarSpec[] = [
  { x: 40, y: 40, opacity: 0.6 }, { x: 120, y: 90, opacity: 0.4 },
  { x: 210, y: 55, opacity: 0.5 }, { x: 330, y: 30, opacity: 0.35 },
  { x: 480, y: 60, opacity: 0.55 }, { x: 600, y: 45, opacity: 0.4 },
  { x: 650, y: 130, opacity: 0.5 }, { x: 30, y: 160, opacity: 0.45 },
  { x: 150, y: 200, opacity: 0.3 }, { x: 620, y: 220, opacity: 0.4 },
  { x: 60, y: 260, opacity: 0.5 }, { x: 660, y: 300, opacity: 0.35 },
  { x: 25, y: 340, opacity: 0.4 }, { x: 640, y: 380, opacity: 0.5 },
  { x: 40, y: 420, opacity: 0.35 }, { x: 655, y: 440, opacity: 0.45 },
  { x: 20, y: 480, opacity: 0.5 }, { x: 645, y: 500, opacity: 0.4 },
  { x: 50, y: 540, opacity: 0.35 }, { x: 630, y: 560, opacity: 0.5 },
  { x: 35, y: 600, opacity: 0.45 }, { x: 660, y: 610, opacity: 0.35 },
  { x: 70, y: 650, opacity: 0.4 }, { x: 610, y: 660, opacity: 0.5 },
  { x: 100, y: 700, opacity: 0.35 }, { x: 580, y: 710, opacity: 0.4 },
  { x: 150, y: 740, opacity: 0.45 }, { x: 540, y: 750, opacity: 0.35 },
  { x: 200, y: 780, opacity: 0.4 }, { x: 480, y: 785, opacity: 0.3 },
  { x: 280, y: 20, opacity: 0.4 }, { x: 380, y: 800, opacity: 0.35 },
  { x: 440, y: 100, opacity: 0.3 }, { x: 90, y: 350, opacity: 0.35 },
  { x: 590, y: 350, opacity: 0.3 }, { x: 320, y: 780, opacity: 0.4 },
  { x: 250, y: 450, opacity: 0.25 }, { x: 430, y: 470, opacity: 0.25 },
  { x: 350, y: 120, opacity: 0.3 }, { x: 550, y: 480, opacity: 0.35 },
  { x: 130, y: 600, opacity: 0.3 }, { x: 560, y: 620, opacity: 0.3 },
];

export function CardStarField({ delay = 0 }: { delay?: number }) {
  const starStagger = 0.012;

  return (
    <svg
      className={styles.root}
      viewBox="0 0 688 818"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {STARS.map((star, i) => (
        <motion.path
          key={i}
          d={STAR_PATH}
          transform={`translate(${star.x} ${star.y}) scale(1.22)`}
          fill="white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: star.opacity }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.35, ease: "easeOut", delay: delay + i * starStagger }}
        />
      ))}
    </svg>
  );
}
