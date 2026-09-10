import type { CSSProperties, ReactNode } from "react";
import { RippleXIcon } from "../icons";
import { EllipseGlow } from "./EllipseGlow";
import { OverlapBadges } from "./OverlapBadges";
import { TransactionRow } from "./TransactionRow";
import { transactions } from "./data";
import styles from "./BalanceCard.module.css";

interface BalanceCardProps {
  balance?: string;
  showCursor?: boolean;
  address?: string;
  actionIcon?: ReactNode;
  actionLabel?: string;
  /** Overrides the action button's default size, e.g. "clamp(38px, 3.4vw, 44px)". */
  actionButtonSize?: string;
  showBadges?: boolean;
  /** Delay (seconds) before the overlap badges (coins + connector lines) start animating in. */
  badgesDelay?: number;
  cornerButton?: ReactNode;
  /** Overrides the corner button's default inset (right/bottom), e.g. "clamp(-8px, -0.6vw, -4px)". */
  cornerButtonInset?: string;
}

export function BalanceCard({
  balance = "0.00578",
  showCursor = false,
  address = "0x417 57Zx9 .. 46qx8 x0879",
  actionIcon,
  actionLabel = "Swap",
  actionButtonSize,
  showBadges = true,
  badgesDelay = 0,
  cornerButton,
  cornerButtonInset,
}: BalanceCardProps) {
  return (
    <div className={styles.root}>
      <div className={styles.glowMask} aria-hidden="true">
        <EllipseGlow />
      </div>

      <div className={styles.topRow}>
        <span className={styles.balance}>
          {balance}
          {showCursor && <span className={styles.cursor} aria-hidden="true" />}
        </span>
        <button
          type="button"
          className={styles.sparkleBtn}
          aria-label={actionLabel}
          style={actionButtonSize ? ({ "--action-btn-size": actionButtonSize } as CSSProperties) : undefined}
        >
          {actionIcon ?? <RippleXIcon size={17} />}
        </button>
      </div>

      <div className={styles.addressField}>
        <span className={styles.addressLabel}>Wallet address</span>
        <span className={styles.addressValue}>{address}</span>
      </div>

      <ul className={styles.list}>
        {transactions.map((tx) => (
          <TransactionRow key={tx.id} tx={tx} />
        ))}
      </ul>

      {showBadges && <OverlapBadges delay={badgesDelay} />}
      {cornerButton && (
        <div
          className={styles.cornerButton}
          style={cornerButtonInset ? ({ "--corner-btn-inset": cornerButtonInset } as CSSProperties) : undefined}
        >
          {cornerButton}
        </div>
      )}
    </div>
  );
}