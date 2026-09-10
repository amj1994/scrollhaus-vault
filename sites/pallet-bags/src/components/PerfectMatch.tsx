import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SerifGlow from "@/components/SerifGlow";

const ASSET = "https://qclay.design/lovable/bags";
const OVERSHOOT = [0.34, 1.56, 0.64, 1] as const;
const ORBIT_RADIUS = 260;
const BAG_HALF = 80;
const LABEL_GAP = 8;

const BAGS = [
  { img: "baggy-1.png", baseAngle: 270, label: "(01)" },
  { img: "baggy-2.png", baseAngle: 330, label: "(02)" },
  { img: "baggy-3.png", baseAngle: 30, label: "(03)" },
  { img: "baggy-4.png", baseAngle: 150, label: "(04)" },
  { img: "baggy-5.png", baseAngle: 210, label: "(05)" },
  { img: "baggy-6.png", baseAngle: 90, label: "(06)" },
];

function Bag({
  bag,
  index,
  angle,
  setPaused,
}: {
  bag: (typeof BAGS)[number];
  index: number;
  angle: number;
  setPaused: (v: boolean) => void;
}) {
  const rad = ((angle + bag.baseAngle) * Math.PI) / 180;
  const x = Math.cos(rad) * ORBIT_RADIUS;
  const y = Math.sin(rad) * ORBIT_RADIUS;
  const labelDist = BAG_HALF + LABEL_GAP;
  const labelX = Math.cos(rad) * labelDist;
  const labelY = Math.sin(rad) * labelDist;

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
        zIndex: 6,
      }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: OVERSHOOT, delay: index * 0.08 }}
      >
        <motion.div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          whileHover={{ scale: 1.12, filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.15))" }}
          style={{ width: 160, height: 160, position: "relative", cursor: "pointer" }}
        >
          <img src={`${ASSET}/${bag.img}`} alt="" style={{ width: 160, height: 160, objectFit: "contain", display: "block" }} />
        </motion.div>
      </motion.div>
      <span
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(${labelX}px, ${labelY}px) translate(-50%, -50%)`,
          fontFamily: "'Instrument Serif', serif",
          fontSize: 16,
          fontWeight: 400,
          color: "rgba(84,84,84,0.65)",
          letterSpacing: "-0.5px",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        {bag.label}
      </span>
    </div>
  );
}

export default function PerfectMatch() {
  const [angle, setAngle] = useState(0);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      if (!pausedRef.current) {
        setAngle((a) => (a + 0.12) % 360);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{ background: "#f7f7f7", minHeight: "100vh", paddingBottom: 80, fontFamily: "'Inter Tight', sans-serif", overflow: "visible", position: "relative" }}>
      <img
        src={`${ASSET}/paper.png`}
        alt=""
        style={{ position: "absolute", top: -188, left: 0, right: 0, width: "100%", height: "auto", objectFit: "cover", objectPosition: "top center", zIndex: 50, pointerEvents: "none" }}
      />

      <motion.div
        initial={{ opacity: 0, filter: "blur(8px)", y: 12 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ textAlign: "center", paddingTop: 120, zIndex: 60, position: "relative" }}
      >
        {["DESIGNED WITH PURPOSE.", "WORN WITH CONFIDENCE."].map((line) => (
          <div key={line} style={{ fontSize: 11, fontWeight: 500, letterSpacing: 2.5, lineHeight: 1.8, color: "rgba(84,84,84,0.55)" }}>
            {line}
          </div>
        ))}
      </motion.div>

      <div style={{ position: "relative", width: "100%", height: 640, zIndex: 60, marginTop: 20 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", zIndex: 10, pointerEvents: "none" }}
        >
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1, letterSpacing: "-2px", color: "#545454" }}>Find your</div>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span style={{ fontSize: 64, fontWeight: 700, letterSpacing: "-2px", color: "#545454" }}>perfect </span>
            <SerifGlow word="match" fontSize={64} lineHeight={64} letterSpacing={-2} strokeWidth={14} delay={0.5} inView />
          </div>
        </motion.div>

        <div style={{ position: "absolute", top: "50%", left: "50%", width: 0, height: 0 }}>
          {BAGS.map((bag, i) => (
            <Bag key={bag.img} bag={bag} index={i} angle={angle} setPaused={setPaused} />
          ))}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "flex-start", gap: 16, maxWidth: 380, margin: "50px auto 0", padding: "0 40px", zIndex: 5, position: "relative" }}>
        <motion.img
          src={`${ASSET}/eye.png`}
          alt=""
          initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
          whileInView={{ opacity: 0.7, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: OVERSHOOT }}
          style={{ width: 32, height: 32, objectFit: "contain", flexShrink: 0, marginTop: 12 }}
        />
        <motion.p
          initial={{ opacity: 0, filter: "blur(8px)", x: 16 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          style={{ fontSize: 13, fontWeight: 400, lineHeight: 1.75, color: "rgba(84,84,84,0.75)", textAlign: "justify", marginTop: 10 }}
        >
          We believe a bag is more than an accessory — It&apos;s a companion to your every moment. From the daily
          rush to quiet evenings, our pieces are crafted to be effortlessly elegant, enduring, and distinctively
          yours.
        </motion.p>
      </div>
    </div>
  );
}
