import { DAppsCard } from "./DAppsCard";
import { FinalCopy } from "./FinalCopy";
import { SecurityCard } from "./SecurityCard";
import { SwapCard } from "./SwapCard";
import styles from "./FinalSection.module.css";

export function FinalSection() {
  return (
    <section className={styles.section} id="fiat-exchange">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.copyColumn}>
            <FinalCopy />
          </div>

          <div className={styles.cardColumn}>
            <SecurityCard />
            <div className={styles.subGrid}>
              <DAppsCard />
              <SwapCard />
              <div className={styles.gradientOrange}></div>
              <div className={styles.gradientBlue}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
