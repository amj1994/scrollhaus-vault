import { motion } from "framer-motion";
import { OrbitNavButton } from "../OrbitSection/OrbitNavButton";
import { SIGNATURE_EASE } from "../common/motionConfig";
import styles from "./DAppsCard.module.css";

export function DAppsCard() {
  return (
    <motion.div
      className={styles.root}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: SIGNATURE_EASE, delay: 0.1 }}
    >
      <OrbitNavButton direction="prev" className={styles.edgeNav} />

      <div className={styles.header}>
        <h3 className={styles.heading}>DApps</h3>
        <span className={styles.badge}>Coming Soon</span>
      </div>

      <p className={styles.lede}>Take control of your crypto assets fast and secure</p>

      <div className={styles.list}>
        <img src="https://qclay.design/lovable/crypto/row-3.svg" alt="" className={styles.rowImg} />
        <img
          src="https://qclay.design/lovable/crypto/row-2-featured.svg"
          alt=""
          className={`${styles.rowImg} ${styles.rowImgFeatured}`}
        />
        <img src="https://qclay.design/lovable/crypto/row-1.svg" alt="" className={styles.rowImg2} />
      </div>
    </motion.div>
  );
}