import { TinyArrowIcon } from "../icons";
import type { Transaction } from "./data";
import styles from "./TransactionRow.module.css";

export function TransactionRow({ tx }: { tx: Transaction }) {
  return (
    <li className={`${styles.row} ${tx.muted ? styles.muted : ""}`}>
      <span className={styles.icon}>{tx.icon}</span>

      <span className={styles.main}>
        <span className={styles.name}>{tx.name}</span>
        <span className={styles.statusLine}>
          <span className={styles.status}>{tx.status}</span>
          {tx.trace && (
            <span className={styles.trace} aria-hidden="true">
              {tx.trace.direction === "sent" ? (
                <>
                  <span className={styles.dot} />
                  <span className={styles.traceBar} />
                  <TinyArrowIcon size={7} direction="right" />
                </>
              ) : (
                <>
                  <TinyArrowIcon size={7} direction="left" />
                  <span className={styles.traceBar} />
                  <span className={styles.dot} />
                </>
              )}
            </span>
          )}
        </span>
      </span>

      <span className={styles.amountCol}>
        <span className={styles.amount}>{tx.amount}</span>
        {tx.trace && (
          <span className={styles.counterpart}>{tx.trace.counterpart}</span>
        )}
      </span>
    </li>
  );
}
