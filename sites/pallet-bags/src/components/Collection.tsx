import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from "framer-motion";
import SerifGlow from "@/components/SerifGlow";

const ASSET = "https://qclay.design/lovable/bags";
const ENV_W = 480;
const ENV_H = 340;
const FLAP_W = 480;
const FLAP_H = 200;

const NAMES = ["Terra", "Love Bag", "Amélie", "Belle", "Mira", "Adele"];
const CARD_Z = [2, 4, 6, 6, 4, 2];
const PEEK = [
  { x: -90, y: -30, rot: -12 },
  { x: -40, y: -60, rot: -6 },
  { x: -15, y: -78, rot: -2 },
  { x: 20, y: -76, rot: 3 },
  { x: 55, y: -58, rot: 7 },
  { x: 95, y: -28, rot: 12 },
];
const END = [
  { x: -625, y: 0, rot: 0 },
  { x: -375, y: 0, rot: 0 },
  { x: -125, y: 0, rot: 0 },
  { x: 125, y: 0, rot: 0 },
  { x: 375, y: 0, rot: 0 },
  { x: 625, y: 0, rot: 0 },
];
const OFFSETS = [0, 0.015, 0.03, 0.045, 0.06, 0.075];

function PhotoCard({
  index,
  scrollYProgress,
  envelopeY,
  cardsOut,
  cardsVisible,
  photosAboveFlap,
}: {
  index: number;
  scrollYProgress: MotionValue<number>;
  envelopeY: MotionValue<number>;
  cardsOut: boolean;
  cardsVisible: boolean;
  photosAboveFlap: boolean;
}) {
  const off = OFFSETS[index];
  const a0 = 0.3 + off;
  const a1 = 0.5 + off;
  const b0 = 0.55 + off;
  const b1 = 0.78 + off;

  const x = useTransform(scrollYProgress, [a0, a1, b0, b1], [0, PEEK[index].x, PEEK[index].x, END[index].x]);
  const y = useTransform(scrollYProgress, [a0, a1, b0, b1], [60, PEEK[index].y, PEEK[index].y, END[index].y]);
  const r = useTransform(scrollYProgress, [a0, a1, b0, b1], [0, PEEK[index].rot, PEEK[index].rot, END[index].rot]);
  const s = useTransform(scrollYProgress, [a0, a1], [0.5, 1]);

  const zIndex = photosAboveFlap || cardsOut ? 999 : CARD_Z[index];

  return (
    <motion.div
      whileHover={{ rotate: [0, -3, 3, -2, 2, 0], transition: { duration: 0.5, ease: "easeInOut" } }}
      style={{
        position: "absolute",
        left: -90,
        top: -90,
        width: 180,
        zIndex,
        pointerEvents: "auto",
        cursor: "pointer",
        opacity: 1,
        visibility: "visible",
        x,
        y,
        rotate: r,
        scale: s,
        display: cardsVisible ? "block" : "none",
      }}
    >
      <img
        src={`${ASSET}/photo-${index + 1}.png`}
        alt={NAMES[index]}
        style={{ width: "100%", height: "auto", objectFit: "contain", opacity: 1, visibility: "visible", pointerEvents: "none" }}
      />
      <motion.div
        initial={false}
        animate={{ opacity: cardsOut ? 1 : 0, y: cardsOut ? 0 : 8 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 + index * 0.05 }}
        style={{ position: "absolute", top: "calc(100% + 18px)", left: 0, right: 0, textAlign: "center" }}
      >
        <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-0.3px", lineHeight: 1.2, color: "#FFFFFF" }}>{NAMES[index]}</div>
        <div style={{ fontSize: 14, fontWeight: 400, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>€129.90</div>
      </motion.div>
    </motion.div>
  );
}

export default function Collection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  const envelopeY = useTransform(scrollYProgress, [0, 0.18, 0.45, 0.7, 1], [145, 20, 90, 600, 900]);
  const envelopeIn = useTransform(scrollYProgress, [0.6, 0.75], [1, 0]);
  const flapRotate = useTransform(scrollYProgress, [0.2, 0.45], [180, 0]);

  const [cardsOut, setCardsOut] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [photosAboveFlap, setPhotosAboveFlap] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setCardsOut(v >= 0.52);
    setCardsVisible(v >= 0.3);
  });
  useMotionValueEvent(envelopeY, "change", (v) => {
    setPhotosAboveFlap(v > 85);
  });

  const photoWrapperZ = photosAboveFlap || cardsOut ? 999 : 2;

  return (
    <div ref={containerRef} style={{ background: "#111111", position: "relative", height: "400vh", fontFamily: "'Inter Tight', sans-serif" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <motion.div
          initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ position: "absolute", top: 60, left: 0, right: 0, zIndex: 20, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
            <span style={{ fontSize: 72, fontWeight: 500, lineHeight: 1, letterSpacing: "-3px", color: "#FFFFFF" }}>Our</span>
            <SerifGlow word="new" fontSize={78} lineHeight={78} letterSpacing={-3} strokeWidth={16} italic delay={0.5} inView fillColor="#545454" />
          </div>
          <div style={{ fontSize: 72, fontWeight: 500, lineHeight: 1, letterSpacing: "-3px", color: "#FFFFFF", marginTop: 4 }}>Collection</div>
          <motion.p
            initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            style={{ maxWidth: 320, textAlign: "center", fontSize: 13, fontWeight: 400, lineHeight: 1.6, color: "rgba(255,255,255,0.45)", marginTop: 14 }}
          >
            Crafted with care and designed to follow you from day to night, it holds not only your essentials, but
            your stories
          </motion.p>
        </motion.div>

        <motion.div style={{ position: "absolute", top: "58%", left: "50%", width: ENV_W, height: ENV_H, marginLeft: -240, marginTop: -170, overflow: "visible", y: envelopeY }}>
          <motion.img src={`${ASSET}/envelop.webp`} alt="" style={{ position: "absolute", top: 0, left: 0, width: ENV_W, height: ENV_H, zIndex: 1, opacity: envelopeIn, pointerEvents: "none" }} />
          <motion.img src={`${ASSET}/tapa-left.webp`} alt="" style={{ position: "absolute", top: 0, left: 0, height: ENV_H, width: "auto", zIndex: 3, opacity: envelopeIn }} />
          <motion.img src={`${ASSET}/tapa-right.webp`} alt="" style={{ position: "absolute", top: 0, right: 0, height: ENV_H, width: "auto", zIndex: 3, opacity: envelopeIn }} />
          <motion.img
            src={`${ASSET}/tapa-bajo.webp`}
            alt=""
            style={{ position: "absolute", width: ENV_W, bottom: 0, left: 0, zIndex: 4, transformOrigin: "bottom center", transformPerspective: 1400, rotateX: 0, opacity: envelopeIn }}
          />
          <motion.div
            style={{ position: "absolute", top: -FLAP_H + 5, left: 0, width: FLAP_W, height: FLAP_H, zIndex: 8, transformOrigin: "bottom center", transformPerspective: 1400, rotateX: flapRotate, opacity: envelopeIn }}
          >
            <img src={`${ASSET}/open-top.webp`} alt="" style={{ width: "100%", height: "100%" }} />
          </motion.div>

          <motion.div style={{ position: "absolute", top: "50%", left: "50%", width: 0, height: 0, pointerEvents: "none", display: cardsVisible ? "block" : "none", opacity: 1, overflow: "visible", zIndex: photoWrapperZ, y: useTransform(envelopeY, (v) => -v) }}>
            {Array.from({ length: 6 }, (_, i) => (
              <PhotoCard
                key={i}
                index={i}
                scrollYProgress={scrollYProgress}
                envelopeY={envelopeY}
                cardsOut={cardsOut}
                cardsVisible={cardsVisible}
                photosAboveFlap={photosAboveFlap}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
