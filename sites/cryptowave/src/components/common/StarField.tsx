import styles from "./StarField.module.css";

/**
 * Small 4-pointed twinkle particles (source: Star_41.svg) scattered across
 * the hero background. The source asset is a single tiny star shape -
 * "_41" in its filename implies it was one of many numbered instances in
 * the original design, so it's reproduced here as a scattered field.
 *
 * Star size is fixed at ~1.588px at the 1440px reference (matching the
 * spec exactly) via `scale(1.22)` on a path that spans ~1.3 local units.
 * Positions are hand-picked deterministically (not runtime-random) so the
 * layout is stable and reviewable, avoiding the headline/CTA text zone.
 */
const STAR_PATH =
  "M-0.0001 0.198L0.6097 0.4174L1.1052 0L0.8862 0.6097L1.3036 1.1053L0.6939 0.8863L0.1983 1.3037L0.4173 0.6939L-0.0001 0.198Z";

interface StarSpec {
  x: number;
  y: number;
  opacity: number;
}

// Coordinates in the same 720x929 design space as DecorativeLines
// (the hero copy column's own reference size, not the full page).
const STARS: StarSpec[] = [
  { x: 664, y: 124, opacity: 0.26 }, { x: 238, y: 152, opacity: 0.58 },
  { x: 568, y: 99, opacity: 0.52 }, { x: 42, y: 40, opacity: 0.29 },
  { x: 626, y: 37, opacity: 0.5 }, { x: 675, y: 728, opacity: 0.5 },
  { x: 613, y: 294, opacity: 0.61 }, { x: 16, y: 787, opacity: 0.61 },
  { x: 294, y: 169, opacity: 0.35 }, { x: 354, y: 114, opacity: 0.29 },
  { x: 109, y: 377, opacity: 0.63 }, { x: 628, y: 280, opacity: 0.61 },
  { x: 90, y: 575, opacity: 0.38 }, { x: 653, y: 643, opacity: 0.65 },
  { x: 206, y: 731, opacity: 0.28 }, { x: 687, y: 243, opacity: 0.6 },
  { x: 91, y: 885, opacity: 0.35 }, { x: 113, y: 399, opacity: 0.38 },
  { x: 660, y: 864, opacity: 0.41 }, { x: 283, y: 728, opacity: 0.67 },
  { x: 673, y: 83, opacity: 0.52 }, { x: 260, y: 177, opacity: 0.46 },
  { x: 342, y: 873, opacity: 0.6 }, { x: 67, y: 244, opacity: 0.62 },
  { x: 284, y: 77, opacity: 0.34 }, { x: 590, y: 745, opacity: 0.39 },
  { x: 681, y: 521, opacity: 0.43 }, { x: 668, y: 479, opacity: 0.31 },
  { x: 279, y: 774, opacity: 0.51 }, { x: 607, y: 418, opacity: 0.41 },
  { x: 515, y: 103, opacity: 0.59 }, { x: 122, y: 166, opacity: 0.53 },
  { x: 75, y: 404, opacity: 0.42 }, { x: 21, y: 706, opacity: 0.57 },
  { x: 559, y: 778, opacity: 0.37 }, { x: 666, y: 358, opacity: 0.3 },
  { x: 455, y: 171, opacity: 0.45 }, { x: 118, y: 650, opacity: 0.38 },
  { x: 664, y: 529, opacity: 0.52 }, { x: 553, y: 10, opacity: 0.52 },
  { x: 510, y: 29, opacity: 0.3 }, { x: 381, y: 861, opacity: 0.61 },
];

export function StarField() {
  return (
    <svg
      className={styles.root}
      viewBox="0 0 720 929"
      preserveAspectRatio="xMidYMin slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {STARS.map((star, i) => (
        <path
          key={i}
          d={STAR_PATH}
          transform={`translate(${star.x} ${star.y}) scale(1.22)`}
          fill="white"
          fillOpacity={star.opacity}
        />
      ))}
    </svg>
  );
}