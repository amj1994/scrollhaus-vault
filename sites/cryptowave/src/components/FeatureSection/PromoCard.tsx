import { motion } from "framer-motion";
const avatarUrl = "https://qclay.design/lovable/crypto/avatar.png";
import { ChevronRightIcon, GrayBitcoinIcon, LightningLogoMark } from "../icons";
import { Reveal } from "../common/motion";
import { TextScramble } from "../common/TextScramble";
import { SIGNATURE_EASE } from "../common/motionConfig";
import { SquiggleConnectorIcon } from "./SquiggleConnectorIcon";
import styles from "./PromoCard.module.css";

const footerReveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay: 0.75, ease: SIGNATURE_EASE },
};

export function PromoCard() {
  return (
    <motion.div
      className={styles.root}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: SIGNATURE_EASE }}
    >
      <Reveal variant="fade-up" duration={0.5} delay={0.25}>
        <div className={styles.badgeRow}>
          <GrayBitcoinIcon size={34} className={styles.badgeIcon} />
          <span className={styles.badgeLabel}>Swap Assets</span>
        </div>
      </Reveal>

      <h2 className={styles.heading}>
        <TextScramble text="Powerful Web3 Experiences" whileInView delay={0.35} duration={1.2} />
      </h2>

      <Reveal variant="fade-up" duration={0.5} delay={0.55}>
        <p className={styles.lede}>Leading self-custody multi-chain platform assets</p>
      </Reveal>

      <Reveal variant="fade-up" duration={0.5} delay={0.65}>
        <div className={styles.progress} role="presentation">
          <span className={`${styles.progressSegment} ${styles.progressActive}`} />
          <span className={styles.progressSegment} />
          <span className={styles.progressSegment} />
        </div>
      </Reveal>

      <motion.div className={styles.footer} {...footerReveal}>
        <div className={styles.chain}>
          <img
            className={styles.avatar}
            src={avatarUrl}
            width={54}
            height={54}
            alt="Connected account avatar"
            loading="lazy"
            decoding="async"
          />
          <SquiggleConnectorIcon className={styles.squiggle} />
          <LightningLogoMark size={42} />
        </div>

        <button type="button" className={styles.next} aria-label="Next">
          <ChevronRightIcon size={16} />
        </button>
      </motion.div>
    </motion.div>
  );
}