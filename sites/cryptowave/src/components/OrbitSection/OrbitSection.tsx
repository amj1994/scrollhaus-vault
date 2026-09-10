import { OrbitNavButton } from "./OrbitNavButton";
import { OrbitRings } from "./OrbitRings";
import { IconRow } from "./IconRow";
import { TextScramble } from "../common/TextScramble";
import { bottomRows, topRows } from "./protocolIcons";
import styles from "./OrbitSection.module.css";

export function OrbitSection() {
  return (
    <section className={styles.section} id="create-wallet">
      <OrbitRings />

      <OrbitNavButton direction="prev" className={`${styles.navBtn} ${styles.navPrev}`} />
      <OrbitNavButton direction="next" className={`${styles.navBtn} ${styles.navNext}`} />

      <div className={styles.container}>
        <div className={styles.orbit}>
          {topRows.map((row, i) => {
            const offset = i === 0 ? 0 : topRows[0].length;
            return <IconRow key={`top-${i}`} icons={row} startIndex={offset} />;
          })}

          <div className={styles.copy}>
            <span className={styles.eyebrow}>[03] Assets</span>
            <h2 className={styles.heading}>
              <TextScramble text="Cryptocurrency Surfing" whileInView delay={0.2} duration={1.3} />
            </h2>
            <p className={styles.lede}>Use our Encrypted Cloud Backup for increased wallet security.</p>
          </div>

          {bottomRows.map((row, i) => {
            const topTotal = topRows.reduce((acc, r) => acc + r.length, 0);
            const offset = topTotal + (i === 0 ? 0 : bottomRows[0].length);
            return <IconRow key={`bottom-${i}`} icons={row} startIndex={offset} />;
          })}
        </div>
      </div>
    </section>
  );
}
