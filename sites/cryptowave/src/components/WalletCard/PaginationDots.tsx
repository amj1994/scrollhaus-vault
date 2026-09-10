import { useState } from "react";
import styles from "./PaginationDots.module.css";

const SLIDES = ["Bitcoin overview", "Portfolio breakdown", "Recent activity"];

export function PaginationDots() {
  const [active, setActive] = useState(1);

  return (
    <div className={styles.root} role="tablist" aria-label="Wallet card views">
      {SLIDES.map((label, index) => (
        <button
          key={label}
          type="button"
          role="tab"
          aria-selected={active === index}
          aria-label={label}
          className={`${styles.dot} ${active === index ? styles.dotActive : ""}`}
          onClick={() => setActive(index)}
        />
      ))}
    </div>
  );
}
