import { GlassBlobIcon, MenuCircleIcon, SwapMarkCircleIcon, TriangleMarkCircleIcon } from "../icons";
import { DotsGlassIcon } from "./DotsGlassIcon";
import { FeaturedBitcoinIcon } from "./FeaturedBitcoinIcon";
import styles from "./FloatingIcons.module.css";

export function FloatingIcons() {
  return (
    <div className={styles.root} aria-hidden="true">
      <span className={styles.blobWrap}>
        <GlassBlobIcon size={119} />
      </span>

      <div className={styles.row}>
        <span className={`${styles.item} ${styles.itemDots}`}>
          <DotsGlassIcon size={40} />
        </span>
        <span className={`${styles.item} ${styles.itemMenu}`}>
          <MenuCircleIcon size={54} />
        </span>
        <span className={`${styles.item} ${styles.itemFeatured}`}>
          <FeaturedBitcoinIcon size={82} />
        </span>
        <span className={`${styles.item} ${styles.itemTriangle}`}>
          <TriangleMarkCircleIcon size={54} />
        </span>
        <span className={`${styles.item} ${styles.itemSwap}`}>
          <SwapMarkCircleIcon size={40} />
        </span>
      </div>
    </div>
  );
}
