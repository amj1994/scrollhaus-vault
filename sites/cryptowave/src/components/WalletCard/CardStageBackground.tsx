import { motion } from "framer-motion";
import styles from "./CardStageBackground.module.css";

/**
 * Ambient color glow + three concentric rings behind the balance card.
 * The rings match the design spec exactly (diameter/border/opacity/blur
 * per ring at the 1440px reference) but are sized in % of the panel so
 * they scale as one unit rather than being fixed-size images.
 *
 * First step of the card's reveal sequence: fades in as one layer before
 * anything else on top of it appears.
 */
export function CardStageBackground({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className={styles.root}
      aria-hidden="true"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      <div className={styles.glow} />
      <div className={`${styles.ring} ${styles.ringOuter}`} />
      <div className={`${styles.ring} ${styles.ringMiddle}`} />
      <div className={`${styles.ring} ${styles.ringInner}`} />
    </motion.div>
  );
}
