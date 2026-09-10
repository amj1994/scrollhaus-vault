import { animate, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface ProgressRingProps {
  value: number;
  size?: number;
  className?: string;
}

export function ProgressRing({ value, size = 24, className }: ProgressRingProps) {
  const stroke = 2.5;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const progress = useMotionValue(0);
  const offset = useTransform(progress, (v) => circumference * (1 - v / 100));
  const label = useTransform(progress, (v) => Math.round(v).toString());
  const [dashOffset, setDashOffset] = useState(circumference);
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(progress, value, { duration: 1.4, ease: "easeOut" });
    const unsubOffset = offset.on("change", setDashOffset);
    const unsubLabel = label.on("change", setDisplayValue);
    return () => {
      controls.stop();
      unsubOffset();
      unsubLabel();
    };
  }, [inView, value, progress, offset, label]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ position: "relative", width: size, height: size, display: "inline-flex" }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.34,
          fontWeight: 600,
          color: "var(--color-text-primary)",
        }}
      >
        {displayValue}
      </span>
    </span>
  );
}
