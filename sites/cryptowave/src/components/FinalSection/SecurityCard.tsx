import { motion } from "framer-motion";
import { CommitDotIcon, CommunityIcon, SafeBrowserIcon, YellowCursorIcon } from "../icons";
import { OrbitNavButton } from "../OrbitSection/OrbitNavButton";
import { TextScramble } from "../common/TextScramble";
import { SIGNATURE_EASE } from "../common/motionConfig";
import { DeployConnectorArrow } from "./DeployConnectorArrow";
import { HistoryIcon } from "./HistoryIcon";
import { ProgressRing } from "./ProgressRing";
import { SecurityWaveBadgeIcon } from "./SecurityWaveBadgeIcon";
import { WaveRings } from "./WaveRings";
import styles from "./SecurityCard.module.css";

export function SecurityCard() {
  return (
    <motion.div
      className={styles.root}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: SIGNATURE_EASE }}
    >
      <OrbitNavButton direction="next" className={styles.edgeNav} />

      <div className={styles.surface}>
        <WaveRings className={styles.waveRings} />

        <div className={styles.waveBadgeCol}>
          <span className={styles.waveBadgeWrap}>
            <SecurityWaveBadgeIcon size={82} className={styles.waveBadge} />
          </span>
          <span className={styles.waveBadgeLabel}>Wallet</span>
        </div>

        <div className={styles.topRow}>
          <div className={styles.textCol}>
            <span className={styles.eyebrow}>Proactive Alerts</span>
            <h3 className={styles.heading}>
              <TextScramble lines={["Crypto with", "security encryption"]} whileInView delay={0.2} duration={1.3} />
            </h3>
          </div>
        </div>

        <div className={styles.deployFeed}>
          <div className={styles.deployCard}>
            {/* Cursor + Try Now button start near headline, glide to center, hang 0.5s, then land on DeployCard */}
            <motion.div
              className={styles.tryNowWrap}
              initial={{ opacity: 0, x: -280, y: -110, scale: 0.85 }}
              whileInView={{
                opacity: [0, 1, 1, 1],
                x: [-280, -140, -140, 0],
                y: [-110, -45, -45, 92],
                scale: [0.85, 1.05, 1, 1],
              }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.75, times: [0, 0.35, 0.63, 1], delay: 0.3, ease: "easeInOut" }}
            >
              <YellowCursorIcon size={16} className={styles.tryNowCursor} />
              <button type="button" className={styles.tryNow}>
                Try Now
              </button>
            </motion.div>

            <div className={styles.deployMeta}>
              <span className={styles.deployRepo}>
                vercel-site/<strong>jvjb4ynna</strong>
              </span>
              <span className={styles.deployTime}>1d ago</span>
            </div>
            <div className={styles.deployBody}>
              <span className={styles.deployCommit}>
                <CommitDotIcon className={styles.commitIcon} />
                ba5f5ff Update bento box design
              </span>
              <ProgressRing value={90} size={30} />
            </div>
          </div>

          <DeployConnectorArrow className={styles.connector} />
          <span className={styles.connectorBadge}>
            <HistoryIcon size={16} />
          </span>

          <div className={`${styles.deployCard} ${styles.deployCardSecond}`}>
            <div className={styles.deployMeta}>
              <span className={styles.deployRepo}>
                vercel-site/<strong>gigj178vp</strong>
              </span>
              <span className={styles.deployTime}>10m ago</span>
            </div>
            <div className={styles.deployBodyEnd}>
              <ProgressRing value={55} size={30} />
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.footerBtn}>
            <CommunityIcon size={18} className={styles.footerBtnIcon} />
            Create community
          </button>
          <button type="button" className={styles.footerBtn}>
            <SafeBrowserIcon size={18} className={styles.footerBtnIcon} />
            Safe Browser
          </button>
        </div>
      </div>
    </motion.div>
  );
}