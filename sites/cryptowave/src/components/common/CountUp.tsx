import { animate, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

/**
 * Animates a number counting up from 0 to its target value once it
 * scrolls into view. Formats with a fixed decimal count so it never
 * flickers between different digit widths mid-count.
 */
export function CountUp({ to, decimals = 0, prefix = "", suffix = "", duration = 1.6, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const motionValue = useMotionValue(0);
  const formatted = useTransform(motionValue, (v) => prefix + v.toFixed(decimals) + suffix);
  const [display, setDisplay] = useState(prefix + (0).toFixed(decimals) + suffix);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, to, { duration, ease: "easeOut" });
    const unsubscribe = formatted.on("change", (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [inView, to, duration, motionValue, formatted]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
