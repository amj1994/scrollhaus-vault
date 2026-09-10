const avatarUrl = "https://qclay.design/lovable/crypto/avatar.png";
import { ArrowRightIcon, CubeIcon, ChatBubbleIcon } from "../icons";
import { SquiggleConnectorIcon } from "../FeatureSection/SquiggleConnectorIcon";
import { WordReveal } from "../common/motion";
import { WaveRings } from "./WaveRings";
import styles from "./FinalCopy.module.css";

export function FinalCopy() {
  return (
    <div className={styles.root}>
      <div className={styles.chain}>
        <img
          className={styles.avatar}
          src={avatarUrl}
          width={36}
          height={36}
          alt="Connected account avatar"
          loading="lazy"
          decoding="async"
        />
        <SquiggleConnectorIcon className={styles.squiggle} />
        <span className={styles.logoWrap}>
          <WaveRings className={styles.logoWaves} />
          <CubeIcon size={38} />
        </span>
      </div>

      <h2 className={styles.heading}>
        <WordReveal
          text="Encryption Build On Web3 Wallet For Crypto"
          whileInView
          delay={0.1}
          wordDelay={0.045}
        />
      </h2>

      <p className={styles.lede}>Try to buy, sell, and swap crypto, all in one place.</p>

      <a href="#create-wallet" className={styles.cta}>
        <span>Let&apos;s try our wallet main feature</span>
        <span className={styles.ctaIcon}>
          <ArrowRightIcon size={14} />
        </span>
      </a>

      <a href="#contact" className={styles.contactPill}>
          <ChatBubbleIcon size={16} />
        Contact Us
      </a>
    </div>
  );
}
