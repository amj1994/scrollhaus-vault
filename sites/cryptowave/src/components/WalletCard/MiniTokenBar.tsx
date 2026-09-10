import { BitcoinIcon, SettingsIcon } from "../icons";
import styles from "./MiniTokenBar.module.css";

export function MiniTokenBar() {
  return (
    <div className={styles.root}>
      <div className={styles.pill}>
        <BitcoinIcon size={44.714} className={styles.icon} />
        <span className={styles.textCol}>
          <span className={styles.name}>Bitcoin BTC</span>
          <span className={styles.balance}>0.00069848</span>
        </span>
      </div>

      <button type="button" className={styles.gear} aria-label="Token settings">
        <SettingsIcon size={16} />
      </button>
    </div>
  );
}