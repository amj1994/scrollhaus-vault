import { useEffect, useRef, useState, type RefObject } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from "framer-motion";
import { smoothEase, hoverEase, getTimeForProgress } from "@/lib/easing";
import { FAN_SLOTS, CASCADE, HERO_ROW_Y, CARD_SIZE } from "@/lib/cards";

const CARD_IMAGES = Array.from({ length: 7 }, (_, i) => `/card-${i + 1}.png`);

function CardShell({
  src,
  baseZ,
  style,
}: {
  src: string;
  baseZ: number;
  style: React.CSSProperties;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ transition: { duration: 0.2, ease: hoverEase } }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: CARD_SIZE,
        height: CARD_SIZE,
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.20)",
        zIndex: hovered ? 30 : baseZ,
        ...style,
      }}
    >
      <img src={src} alt="" draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </motion.div>
  );
}

function IntroOverlay({ vp, onDone }: { vp: { w: number; h: number }; onDone: () => void }) {
  const introDelay = 0.8;
  const introDuration = 0.72;
  const travelToRightDuration = 0.6;
  const sweepLeftDuration = 1.6;
  const totalDuration = introDuration + travelToRightDuration + sweepLeftDuration;
  const sweepStart = introDelay + introDuration + travelToRightDuration;

  const slot0 = FAN_SLOTS[0];
  const slot6 = FAN_SLOTS[6];

  return (
    <div className="fixed inset-0 z-[5] pointer-events-none">
      {/* Lead card: card-1, three-phase choreographed entrance, ends in slot 0 */}
      <motion.div
        initial={{ opacity: 0, x: vp.w / 2, y: vp.h / 2 + 180, rotate: 0, scale: 0.3 }}
        animate={{
          x: [vp.w / 2, vp.w / 2, vp.w / 2 + slot6.x, vp.w / 2 + slot0.x],
          y: [vp.h / 2 + 180, HERO_ROW_Y, HERO_ROW_Y + slot6.y, HERO_ROW_Y + slot0.y],
          rotate: [0, 0, slot6.rotate, slot0.rotate],
          scale: [0.3, 1, slot6.scale, slot0.scale],
          opacity: [0, 1, 1, 1],
        }}
        transition={{
          duration: totalDuration,
          delay: introDelay,
          times: [0, introDuration / totalDuration, (introDuration + travelToRightDuration) / totalDuration, 1],
          ease: [smoothEase, smoothEase, smoothEase],
        }}
        onAnimationComplete={onDone}
        style={{ position: "absolute", top: 0, left: 0, translateX: "-50%", translateY: "-50%", zIndex: 10 }}
      >
        <CardShell src={CARD_IMAGES[0]} baseZ={10} style={{ position: "static" }} />
      </motion.div>

      {/* Cards for slots 1..6, revealed as the lead card sweeps past each slot's x position */}
      {FAN_SLOTS.map((slot, i) => {
        if (i === 0) return null;
        const progress = (slot.x - slot6.x) / (slot0.x - slot6.x);
        const revealTime = getTimeForProgress(progress, smoothEase);
        const revealDelay = sweepStart + revealTime * sweepLeftDuration;
        const revealDuration = i <= 3 ? 0.06 : 0.18;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: revealDuration, delay: revealDelay, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              translateX: `calc(-50% + ${vp.w / 2 + slot.x}px)`,
              translateY: `calc(-50% + ${HERO_ROW_Y + slot.y}px)`,
              rotate: slot.rotate,
              scale: slot.scale,
              zIndex: slot.z,
            }}
          >
            <CardShell src={CARD_IMAGES[i]} baseZ={slot.z} style={{ position: "static" }} />
          </motion.div>
        );
      })}
    </div>
  );
}

function ScrollLinkedCard({
  index,
  vp,
  clamped,
  lockProgress,
}: {
  index: number;
  vp: { w: number; h: number };
  clamped: MotionValue<number>;
  lockProgress: number;
}) {
  const slot = FAN_SLOTS[index];
  const cascade = CASCADE[index];
  const lp = Math.max(lockProgress, 0.05);
  const p1 = lp * 0.33;
  const p2 = lp * 0.66;

  const s1Cx = vp.w / 2 + slot.x;
  const s1Cy = HERO_ROW_Y + slot.y;
  const stackCx = vp.w / 2;
  const stackCy = vp.h / 2;
  const cascadeLeftRef = vp.w * 0.4;
  const s2Cx = cascadeLeftRef + cascade.left + CARD_SIZE / 2;
  const s2Cy = cascade.top + CARD_SIZE / 2;

  const x = useTransform(clamped, [0, p1, p2, lp], [s1Cx, stackCx, stackCx, s2Cx]);
  const y = useTransform(clamped, [0, p1, p2, lp], [s1Cy, stackCy, s2Cy, s2Cy]);
  const rotate = useTransform(clamped, [0, p1, lp], [slot.rotate, 0, cascade.rotate]);
  const scaleX = useTransform(clamped, [0, p1, lp], [slot.scale, 1, 1]);
  const scaleY = useTransform(clamped, [0, p1, lp], [slot.scale, 1, 1]);

  return (
    <motion.div style={{ position: "absolute", top: 0, left: 0, x, y, rotate, scaleX, scaleY, translateX: "-50%", translateY: "-50%" }}>
      <CardShell src={CARD_IMAGES[index]} baseZ={cascade.z} style={{ position: "static" }} />
    </motion.div>
  );
}

export default function ScrollCardsOverlay({ containerRef }: { containerRef: RefObject<HTMLDivElement> }) {
  const [introDone, setIntroDone] = useState(false);
  const [vp, setVp] = useState({ w: typeof window !== "undefined" ? window.innerWidth : 1920, h: typeof window !== "undefined" ? window.innerHeight : 1080 });
  const [lockProgress, setLockProgress] = useState(0.5);
  const [scrollableHeight, setScrollableHeight] = useState(1000);
  const [currentProgress, setCurrentProgress] = useState(0);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setCurrentProgress(v));

  const clamped = useTransform(scrollYProgress, (v) => Math.min(v, Math.max(lockProgress, 0.05)));

  const measure = () => {
    const container = containerRef.current;
    if (!container) return;
    const containerTop = container.getBoundingClientRect().top + window.scrollY;
    const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const sectionTwo = container.querySelector<HTMLElement>('[data-section="two"]');
    const sectionTwoTop = sectionTwo ? sectionTwo.getBoundingClientRect().top + window.scrollY : containerTop;
    const lp = Math.min(0.99, Math.max(0.05, (sectionTwoTop - containerTop) / scrollable));
    setScrollableHeight(scrollable);
    setLockProgress(lp);
    setVp({ w: window.innerWidth, h: window.innerHeight });
  };

  useEffect(() => {
    measure();
    const t = window.setTimeout(measure, 300);
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!introDone) {
    return <IntroOverlay vp={vp} onDone={() => setIntroDone(true)} />;
  }

  const isLocked = currentProgress >= lockProgress;
  const wrapperStyle: React.CSSProperties = isLocked
    ? { position: "absolute", top: lockProgress * scrollableHeight, left: 0, width: "100%", height: vp.h, zIndex: 5 }
    : { position: "fixed", inset: 0, zIndex: 5 };

  return (
    <div style={wrapperStyle}>
      {FAN_SLOTS.map((_, i) => (
        <ScrollLinkedCard key={i} index={i} vp={vp} clamped={clamped} lockProgress={lockProgress} />
      ))}
    </div>
  );
}
