import { SparkleIcon } from "../icons";
import styles from "./TexturedFabButton.module.css";

interface TexturedFabButtonProps {
  label?: string;
  className?: string;
}

/**
 * The tilted, textured circular button (abstract-design.svg background,
 * thick dark border, inset highlight) - originally the hero's "quick
 * actions" button, reused wherever that same treatment is needed (e.g. the
 * wallet card's corner action button) instead of duplicating the styling.
 */
export function TexturedFabButton({ label = "Quick actions", className }: TexturedFabButtonProps) {
  return (
    <button type="button" className={`${styles.fab} ${className ?? ""}`} aria-label={label}>
      <SparkleIcon size={22} />
    </button>
  );
}
