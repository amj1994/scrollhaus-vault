import { motion } from "framer-motion";
import type { CSSProperties, ElementType, ReactNode } from "react";
import { SIGNATURE_EASE } from "./motionConfig";

interface WordRevealProps {
  text?: string;
  lines?: string[];
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Seconds before the first word starts. */
  delay?: number;
  /** Seconds between each word's start. */
  wordDelay?: number;
  /** Animate on scroll into view instead of immediately on mount. */
  whileInView?: boolean;
  /** Fraction of the element that must be visible to trigger (whileInView only). */
  amount?: number;
}

/**
 * Splits text into words and reveals them one at a time with a
 * fade + upward slide + blur-to-sharp transition. Reads as the text
 * "coming into focus" rather than just sliding or fading in as a block.
 * Pass either `text` (wraps naturally) or `lines` (forces specific line
 * breaks) - the word-index stagger continues across lines either way.
 */
export function WordReveal({
  text,
  lines,
  as: Tag = "span",
  className,
  style,
  delay = 0,
  wordDelay = 0.05,
  whileInView = false,
  amount = 0.4,
}: WordRevealProps) {
  const MotionTag = motion(Tag as ElementType) as ElementType<Record<string, unknown>>;
  let counter = 0;

  const renderWord = (word: string, isLastInLine: boolean) => {
    const i = counter++;
    const common = {
      key: i,
      style: { display: "inline-block" },
      initial: { opacity: 0, y: 14, filter: "blur(6px)" },
      transition: {
        duration: 0.55,
        ease: SIGNATURE_EASE,
        delay: delay + i * wordDelay,
      },
    };
    return whileInView ? (
      <motion.span
        {...common}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount }}
      >
        {word}
        {!isLastInLine ? "\u00A0" : ""}
      </motion.span>
    ) : (
      <motion.span {...common} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}>
        {word}
        {!isLastInLine ? "\u00A0" : ""}
      </motion.span>
    );
  };

  if (lines) {
    return (
      <MotionTag className={className} style={style}>
        {lines.map((line, li) => {
          const words = line.split(" ");
          return (
            <span key={li} style={{ display: "block" }}>
              {words.map((w, wi) => renderWord(w, wi === words.length - 1))}
            </span>
          );
        })}
      </MotionTag>
    );
  }

  const words = (text ?? "").split(" ");
  return (
    <MotionTag className={className} style={style}>
      {words.map((w, wi) => renderWord(w, wi === words.length - 1))}
    </MotionTag>
  );
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Overall entrance style. */
  variant?: "fade-up" | "scale" | "fade";
  duration?: number;
  amount?: number;
  once?: boolean;
}

/**
 * Generic scroll-triggered entrance wrapper for anything that isn't text
 * (cards, buttons, badges, whole sections) - fades/slides/scales in once
 * when it enters the viewport, using the same signature ease as WordReveal
 * so every animated element in the page shares one motion language.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  variant = "fade-up",
  duration = 0.7,
  amount = 0.3,
  once = true,
}: RevealProps) {
  const initial =
    variant === "scale"
      ? { opacity: 0, scale: 0.92 }
      : variant === "fade"
        ? { opacity: 0 }
        : { opacity: 0, y: 28 };
  const animate =
    variant === "scale" ? { opacity: 1, scale: 1 } : variant === "fade" ? { opacity: 1 } : { opacity: 1, y: 0 };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once, amount }}
      transition={{ duration, ease: SIGNATURE_EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
