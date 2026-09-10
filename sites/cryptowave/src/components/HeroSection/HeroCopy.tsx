import { motion } from "framer-motion";
import { ArrowRightIcon, ChatBubbleIcon, CubeIcon, SparkleIcon } from "../icons";
import { WordReveal } from "../common/motion";
import { TextScramble } from "../common/TextScramble";
import { SIGNATURE_EASE } from "../common/motionConfig";
import styles from "./HeroCopy.module.css";

export function HeroCopy() {
  return (
      <div className={styles.root}>
        <div className={styles.centerBlock}>
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: SIGNATURE_EASE, delay: 0.1 }}
          >
            <CubeIcon size={40} className={styles.cube} />
          </motion.div>

          <h1 className={styles.headline}>
            <TextScramble lines={["Decentralized", "Future Cryptocurrency", "Assets"]} delay={0.2} duration={1.4} whileInView={false} />
          </h1>

          <p className={styles.lede}>
            <WordReveal
              text="A Platform for CryptoWave Surfing Financial Freedom"
              delay={0.9}
              wordDelay={0.04}
            />
          </p>

          <motion.div
            className={styles.ctaRow}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: SIGNATURE_EASE, delay: 1.3 }}
          >
            <a href="#discover" className={styles.btnGhost}>
              Discover
            </a>
            <a href="#join" className={styles.btnPrimary}>
              Join now
              <ArrowRightIcon size={14} />
            </a>
          </motion.div>
        </div>

        <motion.div
          className={styles.footerRow}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: SIGNATURE_EASE, delay: 1.5 }}
        >
          <a href="#contact" className={styles.contactPill}>
            <ChatBubbleIcon size={16} />
            Contact Us
          </a>

          <button type="button" className={styles.fab} aria-label="Quick actions">
            <SparkleIcon size={22} />
          </button>
        </motion.div>
      </div>
  );
}