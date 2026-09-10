const dotsUrl = "https://qclay.design/lovable/crypto/livepeer.png";
import { GlassCircleIcon } from "../icons";
import styles from "./DotsGlassIcon.module.css";

export function DotsGlassIcon({ size = 41 }: { size?: number }) {
  return (
    <span className={styles.root} style={{ width: size, height: size }}>
      <GlassCircleIcon size={size} className={styles.backdrop} />
      <img src={dotsUrl} alt="" width={16} height={16} className={styles.dots} />
    </span>
  );
}
