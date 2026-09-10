import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import logoSrc from "@/assets/logo.svg";

const EASE = [0.22, 1, 0.36, 1] as const;
const TOTAL = 3600;

const RAY_ANGLES = [0, 30, 60, 120, 150, 210, 240, 300, 330];

function rayEndpoint(angleDeg: number, length: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: 50 + Math.cos(rad) * length,
    y: 50 + Math.sin(rad) * length,
  };
}

export default function IntroSequence({ onDone }: { onDone: () => void }) {
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isReduced = mq.matches;
    setReduced(isReduced);
    const duration = isReduced ? 100 : TOTAL;
    const t = window.setTimeout(() => {
      setHidden(true);
      onDone();
    }, duration);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hidden) return null;

  const dur = reduced ? 0.1 : TOTAL / 1000;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ background: "oklch(0.16 0.004 240)" }}
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 1, 0] }}
        transition={{ duration: dur, times: [0, 0.82, 1], ease: EASE }}
      />

      {!reduced &&
        [1, 2, 3].map((n) => (
          <motion.div
            key={n}
            className="absolute rounded-full border border-white/10"
            style={{
              width: 260 * n,
              height: 260 * n,
              top: "50%",
              left: "50%",
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ opacity: 0, scale: 0.15 }}
            animate={{ opacity: [0, 0.55, 0], scale: [0.15, 1, 1.4] }}
            transition={{
              duration: 2.4,
              delay: 1.22 + n * 0.12,
              times: [0, 0.5, 1],
              ease: EASE,
            }}
          />
        ))}

      {!reduced && (
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {RAY_ANGLES.map((angle, i) => {
            const end = rayEndpoint(angle, 60);
            return (
              <motion.line
                key={angle}
                x1={50}
                y1={50}
                x2={end.x}
                y2={end.y}
                stroke="#fff"
                strokeOpacity={0.45}
                strokeWidth={0.12}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1, 1], opacity: [0, 0.65, 0] }}
                transition={{
                  duration: 2,
                  delay: 1.2 + i * 0.05,
                  times: [0, 0.7, 1],
                  ease: EASE,
                }}
              />
            );
          })}
        </svg>
      )}

      <motion.div
        className="absolute rounded-full bg-white"
        style={{
          top: "50%",
          left: "50%",
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: "0 0 18px 4px rgba(255,255,255,0.7)",
        }}
        initial={{ width: 8, height: 8, opacity: 1 }}
        animate={{ width: [8, 10, 64, 64], height: [8, 10, 64, 64], opacity: [1, 1, 1, 0] }}
        transition={{ duration: dur, times: [0, 0.18, 0.4, 1], ease: EASE }}
      />

      <motion.div
        className="absolute"
        style={{ top: "50%", left: "50%" }}
        initial={{
          translateX: "-50%",
          translateY: "-50%",
          scale: 1,
        }}
        animate={{
          top: ["50%", "50%", "24px", "24px"],
          left: ["50%", "50%", "24px", "24px"],
          translateX: ["-50%", "-50%", "0%", "0%"],
          translateY: ["-50%", "-50%", "0%", "0%"],
          scale: [1, 1, 0.42, 0.42],
        }}
        transition={{ duration: dur, times: [0, 0.6, 0.82, 1], ease: EASE }}
      >
        <motion.div
          className="overflow-hidden"
          style={{ height: 64 }}
          initial={{ width: 64, opacity: 0 }}
          animate={{ width: [64, 64, 64, 268, 268], opacity: [0, 0, 1, 1, 1] }}
          transition={{ duration: dur, times: [0, 0.3, 0.42, 0.78, 1], ease: EASE }}
        >
          <img
            src={logoSrc}
            alt="VALMAX"
            style={{ height: 64, width: 268, maxWidth: "none" }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
