import { motion } from "framer-motion";
const avatarUrl = "https://qclay.design/lovable/crypto/avatar.png";
import { SwapArrowsIcon } from "../icons";
import styles from "./WalletCardHeader.module.css";

export function WalletCardHeader({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className={styles.root}
      initial={{ opacity: 0, y: -6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
    >
      <img
        className={styles.avatar}
        src={avatarUrl}
        width={44}
        height={44}
        alt="Connected account avatar"
        loading="eager"
        decoding="async"
      />

      <a href="#fiat-exchange" className={styles.link}>
        <span className={styles.linkIndex}>[04]</span>
        Fiat-Exchange
      </a>

      <a href="#account" className={styles.addressPill}>
        <SwapArrowsIcon size={13} />
        <span>0x12AB.....JK35</span>
      </a>
    </motion.div>
  );
}
