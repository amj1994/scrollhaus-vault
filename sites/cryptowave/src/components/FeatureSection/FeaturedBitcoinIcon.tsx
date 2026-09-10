import { BitcoinGlyphIcon } from "../icons";
import styles from "./FeaturedBitcoinIcon.module.css";

export function FeaturedBitcoinIcon({ size = 82 }: { size?: number }) {
  return (
    <span className={styles.root} style={{ width: size, height: size }}>
      <BitcoinGlyphIcon size={size * 0.79} className={styles.glyph} />
    </span>
  );
}