import { motion } from "framer-motion";
import type { CSSProperties } from "react";

const CURL_EASE = [0.22, 1, 0.36, 1] as const;

export default function SerifGlow({
  word,
  fontSize,
  lineHeight,
  letterSpacing,
  strokeWidth,
  italic = false,
  delay,
  inView = false,
  fillColor = "#545454",
  whiteSpace,
}: {
  word: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  strokeWidth: number;
  italic?: boolean;
  delay: number;
  inView?: boolean;
  fillColor?: string;
  whiteSpace?: CSSProperties["whiteSpace"];
}) {
  const baseTextStyle: CSSProperties = {
    fontFamily: "'Instrument Serif', serif",
    fontStyle: italic ? "italic" : "normal",
    fontWeight: 400,
    fontSize,
    lineHeight: `${lineHeight}px`,
    letterSpacing,
    whiteSpace,
  };

  const animateProps = {
    rotateX: [-110, -70, -20, 5, -2, 0],
    scaleY: [0.15, 0.4, 0.8, 1.04, 0.98, 1],
    scaleX: [0.7, 0.85, 0.95, 1.02, 1, 1],
    opacity: [0, 0.4, 0.85, 1, 1, 1],
  };
  const transition = {
    duration: 0.7,
    ease: CURL_EASE,
    times: [0, 0.2, 0.55, 0.75, 0.88, 1],
    delay,
  };

  const motionProps = inView
    ? { initial: { rotateX: -110, scaleY: 0.15, scaleX: 0.7, opacity: 0 }, whileInView: animateProps, viewport: { once: true } }
    : { initial: { rotateX: -110, scaleY: 0.15, scaleX: 0.7, opacity: 0 }, animate: animateProps };

  return (
    <motion.span
      {...motionProps}
      transition={transition}
      style={{
        display: "inline-block",
        position: "relative",
        transformPerspective: 600,
        transformOrigin: "top center",
      }}
    >
      <span
        aria-hidden
        style={{
          ...baseTextStyle,
          position: "absolute",
          top: 0,
          left: 0,
          color: "#EAFE79",
          WebkitTextStrokeWidth: strokeWidth,
          WebkitTextStrokeColor: "#EAFE79",
        }}
      >
        {word}
      </span>
      <span style={{ ...baseTextStyle, position: "relative", color: fillColor }}>{word}</span>
    </motion.span>
  );
}
