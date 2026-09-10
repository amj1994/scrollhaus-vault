import { useEffect, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";

const A = "https://qclay.design/lovable/sixsense";
const EASE_FOLDER = [0.22, 1, 0.36, 1] as const;
const EASE_CARD = [0.16, 1, 0.3, 1] as const;

type GlowLayer = {
  src: string;
  bottom: number;
  left: number;
  centered?: boolean;
  width: number;
  height: number;
  duration: number;
  delay: number;
  kind: "glow" | "folder";
};

const LAYERS: GlowLayer[] = [
  { src: "blue-light-2.svg", bottom: 50, left: 54.6, centered: true, width: 104, height: 170, duration: 0.8, delay: 1.0, kind: "glow" },
  { src: "blue-light.svg", bottom: 28, left: 54.6, centered: true, width: 104, height: 170, duration: 0.8, delay: 1.0, kind: "glow" },
  { src: "light-1.svg", bottom: 35, left: 57.2, centered: true, width: 180.5, height: 124.5, duration: 1.0, delay: 1.0, kind: "glow" },
  { src: "folder-3.svg", bottom: 60, left: 23.4, width: 69.71, height: 45, duration: 0.6, delay: 0.8, kind: "folder" },
  { src: "small-light-2.svg", bottom: 55, left: 67.6, centered: true, width: 39, height: 17, duration: 0.6, delay: 1.4, kind: "glow" },
  { src: "small-light.svg", bottom: 50, left: 44.2, centered: true, width: 39, height: 25, duration: 0.6, delay: 1.4, kind: "glow" },
  { src: "folder-2.svg", bottom: 45, left: 18.98, width: 79, height: 51, duration: 0.6, delay: 0.6, kind: "folder" },
  { src: "light-2.svg", bottom: 20, left: 57.2, centered: true, width: 109, height: 162.5, duration: 1.0, delay: 1.1, kind: "glow" },
  { src: "folder-1.svg", bottom: 30, left: 13, width: 91, height: 58, duration: 0.6, delay: 0.4, kind: "folder" },
  { src: "folder-0.svg?v=2", bottom: 0, left: 0, width: 113.67, height: 76.5, duration: 0.6, delay: 0.0, kind: "folder" },
];

const CENTER = 113.67 / 2;

type CardDef = {
  src: string;
  w: number;
  h: number;
  x: number;
  y: number;
  rotate: number;
  startX: number;
  startY: number;
  idle: { y: number[]; duration: number };
};

const CARDS: CardDef[] = [
  { src: "image-1.png", w: 88.55, h: 68.46, x: -82, y: 123, rotate: -16, startX: -5, startY: 7, idle: { y: [0, -6, 0, 4, 0], duration: 6 } },
  { src: "image-2.png", w: 105, h: 87, x: 68, y: 124, rotate: 24, startX: 35, startY: 33, idle: { y: [0, 5, 0, -5, 0], duration: 7 } },
  { src: "image-3.png", w: 105, h: 96, x: -4, y: 148, rotate: -4, startX: -4, startY: 27, idle: { y: [0, -4, 0, 6, 0], duration: 8 } },
];

function FloatingCard({ def, index, settled, hoveredIndex, onHover }: {
  def: CardDef;
  index: number;
  settled: boolean;
  hoveredIndex: number | null;
  onHover: (i: number | null) => void;
}) {
  const isHovered = hoveredIndex === index;
  const anyHovered = hoveredIndex !== null;
  const entranceDelay = 0.6 + index * 0.25;
  const finalLeft = CENTER + def.x - def.w / 2;
  const looping = settled && !anyHovered;

  const idleRotate = [
    def.rotate,
    def.rotate + (def.idle.y[1] > 0 ? -2 : 2),
    def.rotate,
    def.rotate + (def.idle.y[1] > 0 ? 2 : -2),
    def.rotate,
  ];

  const animate = {
    opacity: 1,
    width: def.w,
    height: def.h,
    left: finalLeft,
    bottom: def.y,
    y: looping ? def.idle.y : 0,
    rotate: looping ? idleRotate : def.rotate,
    scale: isHovered ? 1.08 : 1,
  };

  const entranceTransition = { duration: 1.4, delay: entranceDelay, ease: EASE_CARD };
  const loopTransition = { duration: def.idle.duration, repeat: Infinity, ease: "easeInOut" };
  const freezeTransition = { duration: 0.4, ease: EASE_CARD };

  const transition = {
    opacity: entranceTransition,
    width: entranceTransition,
    height: entranceTransition,
    left: entranceTransition,
    bottom: entranceTransition,
    y: looping ? loopTransition : freezeTransition,
    rotate: looping ? loopTransition : freezeTransition,
    scale: freezeTransition,
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        width: 20,
        height: 20,
        left: CENTER + def.startX - 10,
        bottom: def.startY,
        rotate: 0,
      }}
      animate={animate}
      transition={transition}
      onHoverStart={() => onHover(index)}
      onHoverEnd={() => onHover(null)}
      style={{
        position: "absolute",
        transformOrigin: "50% 100%",
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: "0 16px 40px rgba(0,0,0,0.18), 0 4px 10px rgba(0,0,0,0.10)",
        zIndex: isHovered ? 20 : 11 + index,
        cursor: "pointer",
      }}
    >
      <img src={`${A}/${def.src}`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </motion.div>
  );
}

export default function FolderStack() {
  const [settled, setSettled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setSettled(true), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ position: "relative", width: 113.67, height: 220, overflow: "visible" }}>
      {LAYERS.map((layer, i) => {
        const style: CSSProperties = {
          position: "absolute",
          bottom: layer.bottom,
          left: layer.left,
          width: layer.width,
          height: layer.height,
          transform: layer.centered ? "translateX(-50%)" : undefined,
        };
        if (layer.kind === "glow") {
          return (
            <motion.img
              key={i}
              src={`${A}/${layer.src}`}
              alt=""
              style={style}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: layer.duration, delay: layer.delay, ease: "easeOut" }}
            />
          );
        }
        return (
          <motion.img
            key={i}
            src={`${A}/${layer.src}`}
            alt=""
            style={style}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: layer.duration, delay: layer.delay, ease: EASE_FOLDER }}
          />
        );
      })}

      {CARDS.map((def, i) => (
        <FloatingCard
          key={i}
          def={def}
          index={i}
          settled={settled}
          hoveredIndex={hoveredIndex}
          onHover={setHoveredIndex}
        />
      ))}
    </div>
  );
}
