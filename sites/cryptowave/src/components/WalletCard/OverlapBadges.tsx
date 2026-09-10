import { motion } from "framer-motion";
import { BitcoinGlyphIcon, RippleXGlyphIcon } from "../icons";
import styles from "./OverlapBadges.module.css";
const backgroundImage = "https://qclay.design/lovable/crypto/Div%20%5BAppFeatures_integrationLogoBox__8xiIH%5D.png";

export function OverlapBadges({ delay = 0 }: { delay?: number }) {
    const coinDuration = 0.4;
    // Near-simultaneous, not sequential: a tiny offset so they don't look
    // like a single re-rendered flicker, but read as "together" not "one
    // after the other".
    const goldDelay = delay;
    const indigoDelay = delay + 0.08;
    const linesDelay = delay + coinDuration + 0.1;

    return (
        <div className={styles.root} aria-hidden="true">
            <span className={styles.glow} />
            {/* Lines grow outward from the gold coin's side rather than just
                fading in place - scaleX 0->1 with transform-origin:left reads
                as the connection extending itself, not appearing at full size. */}
            <motion.span
                className={`${styles.connectorLine} ${styles.connectorLineTop}`}
                style={{ transformOrigin: "left" }}
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: linesDelay }}
            />
            <motion.span
                className={`${styles.connectorLine} ${styles.connectorLineBottom}`}
                style={{ transformOrigin: "left" }}
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: linesDelay + 0.08 }}
            />

            <motion.span
                className={styles.badgeWrap}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: coinDuration, ease: "easeOut", delay: goldDelay }}
            >
        <img
            className={`${styles.backgroundImage} ${styles.backgroundImageGold}`}
            src={backgroundImage}
            alt=""
        />
        <span className={`${styles.badge} ${styles.badgeGold}`}>
          <BitcoinGlyphIcon size={20} />
        </span>
      </motion.span>

            <motion.span
                className={styles.badgeWrap}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: coinDuration, ease: "easeOut", delay: indigoDelay }}
            >
        <img
            className={`${styles.backgroundImage} ${styles.backgroundImageIndigo}`}
            src={backgroundImage}
            alt=""
        />
        <span className={`${styles.badge} ${styles.badgeIndigo}`}>
          <RippleXGlyphIcon size={18} />
        </span>
      </motion.span>
        </div>
    );
}
