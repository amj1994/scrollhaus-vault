import { GradientLogoBadge } from "../icons";
import { WaveRings } from "./WaveRings";
import styles from "./WaveBadge.module.css";

export function WaveBadge() {
  return (
    <div className={styles.root} aria-hidden="true">
      <WaveRings />
      <GradientLogoBadge size={64} className={styles.badge} />
    </div>
  );
}
