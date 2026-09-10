import { motion } from "framer-motion";
import type { ProtocolIcon } from "./protocolIcons";
import { SIGNATURE_EASE } from "../common/motionConfig";
import styles from "./IconRow.module.css";

interface IconRowProps {
  icons: ProtocolIcon[];
  startIndex?: number;
}

export function IconRow({ icons, startIndex = 0 }: IconRowProps) {
  return (
    <div className={styles.row}>
      {icons.map((icon, i) => {
        const globalIndex = startIndex + i;
        const delay = 0.2 + globalIndex * 0.05;

        return (
          <motion.span
            key={i}
            className={styles.item}
            style={{
              width: `calc(${icon.size}px * var(--icon-scale, 1))`,
              height: `calc(${icon.size}px * var(--icon-scale, 1))`,
              transform: `translateY(calc(${icon.offsetY ?? 0}px * var(--icon-scale, 1)))`,
            }}
            initial={{ opacity: 0, scale: 0.4, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: SIGNATURE_EASE, delay }}
          >
            <img src={icon.src} alt={icon.alt} width={icon.size} height={icon.size} loading="lazy" decoding="async" />
          </motion.span>
        );
      })}
    </div>
  );
}
