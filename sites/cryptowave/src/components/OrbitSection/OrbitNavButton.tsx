import { ChevronRightIcon } from "../icons";
import styles from "./OrbitNavButton.module.css";

interface NavArrowProps {
  direction: "prev" | "next";
  className?: string;
}

export function OrbitNavButton({ direction, className }: NavArrowProps) {
  return (
    <button
      type="button"
      className={`${className ?? ""} ${styles.btn}`}
      aria-label={direction === "prev" ? "Previous" : "Next"}
    >
      <ChevronRightIcon size={16} className={direction === "prev" ? styles.flip : undefined} />
    </button>
  );
}