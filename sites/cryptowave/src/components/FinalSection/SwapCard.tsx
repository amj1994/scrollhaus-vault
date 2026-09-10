import { motion } from "framer-motion";
import { CursorIcon } from "../icons";
import { SIGNATURE_EASE } from "../common/motionConfig";
import styles from "./SwapCard.module.css";

const base = "https://qclay.design/lovable/crypto/icon";

type IconSize = "sm" | "md" | "lg";

interface SwapIcon {
  src: string;
  alt: string;
  size: IconSize;
}

const topRow: SwapIcon[] = [
  { src: `${base}/protocol-m.svg`, alt: "Protocol", size: "sm" },
  { src: `${base}/protocol-toxtic.svg`, alt: "toxtic", size: "md" },
  { src: `${base}/bitcoin.svg`, alt: "Bitcoin", size: "lg" },
  { src: `${base}/protocol-d.svg`, alt: "Protocol", size: "md" },
  { src: `${base}/protocol-a.svg`, alt: "Protocol", size: "sm" },
];

const bottomRow: SwapIcon[] = [
  { src: `${base}/optimism.svg`, alt: "Optimism", size: "md" },
  { src: `${base}/tether.svg`, alt: "Tether", size: "md" },
  { src: `${base}/ethereum.svg`, alt: "Ethereum", size: "md" },
  { src: `${base}/ripple-x.svg`, alt: "Ripple", size: "md" },
];

export function SwapCard() {
  return (
    <motion.div
      className={styles.root}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: SIGNATURE_EASE, delay: 0.2 }}
    >
      <div className={styles.header}>
        <h3 className={styles.heading}>Buy, sell, and Swap</h3>
        <button type="button" className={styles.cursorBtn} aria-label="Cursor">
          <CursorIcon size={16} />
        </button>
      </div>

      <div className={styles.iconGrid}>
        <div className={styles.iconRow}>
          {topRow.map((icon, index) => (
            <motion.span
              key={icon.src}
              className={`${styles.iconWrap} ${styles[`iconWrap${icon.size === "sm" ? "Sm" : icon.size === "lg" ? "Lg" : "Md"}`]}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: SIGNATURE_EASE, delay: 0.9 + index * 0.08 }}
            >
              <img src={icon.src} alt={icon.alt} loading="lazy" decoding="async" />
            </motion.span>
          ))}
        </div>

        <div className={`${styles.iconRow} ${styles.iconRowBottom}`}>
          {bottomRow.map((icon, index) => {
            const isOuter = index === 0 || index === bottomRow.length - 1;
            return (
              <motion.span
                key={icon.src}
                className={`${styles.iconWrap} ${isOuter ? styles.iconWrapBottomOuter : styles.iconWrapBottomMid}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: SIGNATURE_EASE, delay: 1.3 + index * 0.08 }}
              >
                <img src={icon.src} alt={icon.alt} loading="lazy" decoding="async" />
              </motion.span>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}