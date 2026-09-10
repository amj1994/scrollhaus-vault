import { motion } from "framer-motion";
import SerifGlow from "@/components/SerifGlow";

const ASSET = "https://qclay.design/lovable/bags";
const OVERSHOOT = [0.34, 1.56, 0.64, 1] as const;
const SMOOTH = [0.22, 1, 0.36, 1] as const;

function Polaroid({ tag, img, delay, rotate }: { tag: string; img: string; delay: number; rotate: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      style={{ position: "relative" }}
    >
      <div style={{ transform: `rotate(${rotate}deg)`, position: "relative" }}>
      <div
        style={{
          width: 170,
          height: 210,
          filter: "drop-shadow(2px 6px 14px rgba(0,0,0,0.10))",
          transition: "all 0.25s ease",
          position: "relative",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
      >
        <img src={`${ASSET}/snap-bare.png`} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", zIndex: 2 }} />
        <img src={`${ASSET}/${img}`} alt="" style={{ position: "absolute", top: "14%", left: "14%", width: "72%", height: "62%", objectFit: "contain", zIndex: 1 }} />
      </div>
      <span
        style={{
          position: "absolute",
          top: -32,
          right: 14,
          zIndex: 3,
          fontFamily: "'Instrument Serif', serif",
          fontSize: 18,
          fontWeight: 400,
          color: "rgba(84,84,84,0.7)",
          pointerEvents: "none",
        }}
      >
        {tag}
      </span>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <div style={{ position: "relative", width: "100%", minHeight: "100vh", overflow: "hidden", background: "#EEEAE3", fontFamily: "'Inter Tight', sans-serif" }}>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, padding: "20px 32px", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 32, background: "transparent" }}>
        {["Catalog", "Favorites", "Cart (0)"].map((label) => (
          <a
            key={label}
            href="#"
            style={{ fontSize: 14, fontWeight: 400, color: "#545454", transition: "opacity 200ms" }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = "0.6")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {label}
          </a>
        ))}
        <button
          type="button"
          style={{ background: "transparent", border: "none", cursor: "pointer", transition: "opacity 200ms", padding: 0 }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <img src={`${ASSET}/burger.svg`} alt="Menu" width={42} height={30} />
        </button>
      </nav>

      <div style={{ position: "absolute", top: 32, left: 40, maxWidth: 500, zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, filter: "blur(14px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          style={{ fontSize: 87.999, fontWeight: 500, lineHeight: "80px", letterSpacing: "-3.52px", color: "#545454" }}
        >
          Bags crafted
        </motion.div>
        <motion.div
          initial={{ opacity: 0, filter: "blur(14px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.28 }}
          style={{ fontSize: 87.999, fontWeight: 500, lineHeight: "80px", letterSpacing: "-3.52px", color: "#545454" }}
        >
          to move with
        </motion.div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: -2 }}>
          <SerifGlow word="your" fontSize={94.969} lineHeight={93.413} letterSpacing={-3.799} strokeWidth={20.55} delay={0.5} />
          <motion.span
            initial={{ opacity: 0, filter: "blur(12px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.78 }}
            style={{ fontSize: 87.999, fontWeight: 500, lineHeight: "80px", letterSpacing: "-3.52px", color: "#545454" }}
          >
            story
          </motion.span>
        </div>
      </div>

      <motion.img
        src={`${ASSET}/woman.png`}
        alt=""
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: SMOOTH, delay: 0.2 }}
        style={{ position: "absolute", bottom: 0, left: 0, right: 0, marginLeft: "auto", marginRight: "auto", height: "100vh", width: "auto", objectFit: "contain", objectPosition: "bottom center", zIndex: 6 }}
      />

      <motion.img
        src={`${ASSET}/sticks.svg`}
        alt=""
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={{ opacity: 1, scale: [0, 1.4, 0.85, 1.15, 0.95, 1.05, 1], rotate: [-180, -20, 25, -15, 10, -5, 0], y: [0, -6, 0] }}
        transition={{
          opacity: { duration: 0.3, delay: 0.85, ease: "easeOut" },
          scale: { duration: 0.95, delay: 0.85, ease: OVERSHOOT },
          rotate: { duration: 0.95, delay: 0.85, ease: OVERSHOOT },
          y: { duration: 3.2, delay: 2, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{ position: "absolute", top: 24, left: "calc(50% + 40px)", zIndex: 7, width: 32, transformOrigin: "bottom center" }}
      />

      <motion.img
        src={`${ASSET}/smile.png`}
        alt=""
        initial={{ opacity: 0, scale: 0.4, rotate: -40 }}
        animate={{ opacity: 1, scale: 1, rotate: [0, 10, -5, 0] }}
        transition={{
          opacity: { duration: 0.5, delay: 1.05, ease: OVERSHOOT },
          scale: { duration: 0.5, delay: 1.05, ease: OVERSHOOT },
          rotate: { duration: 5, delay: 1.55, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{ position: "absolute", top: "calc(55% - 60px)", left: "calc(50% - 260px)", zIndex: 7, width: 60, height: 60 }}
      />

      <motion.img
        src={`${ASSET}/snap.png`}
        alt=""
        initial={{ rotateX: -100, scaleY: 0.1, opacity: 0 }}
        animate={{ rotateX: [-100, -60, -15, 4, -1, 0], scaleY: [0.1, 0.35, 0.8, 1.03, 0.99, 1], opacity: [0, 0.35, 0.85, 1, 1, 1], rotate: [-6, -4, -7, -6] }}
        transition={{
          rotateX: { duration: 0.65, delay: 1.1, ease: SMOOTH, times: [0, 0.2, 0.55, 0.78, 0.9, 1] },
          scaleY: { duration: 0.65, delay: 1.1, ease: SMOOTH, times: [0, 0.2, 0.55, 0.78, 0.9, 1] },
          opacity: { duration: 0.65, delay: 1.1, ease: SMOOTH, times: [0, 0.2, 0.55, 0.78, 0.9, 1] },
          rotate: { duration: 7, delay: 1.8, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{ position: "absolute", top: "35%", left: "calc(50% - 5px)", zIndex: 8, width: 200, transformPerspective: 500, transformOrigin: "top center" }}
      />

      <motion.img
        src={`${ASSET}/card.png`}
        alt=""
        initial={{ rotateX: -90, scaleY: 0.12, opacity: 0 }}
        animate={{ rotateX: [-90, -50, -10, 3, -3], scaleY: [0.12, 0.5, 0.9, 1.02, 1], opacity: [0, 0.4, 0.9, 1, 1] }}
        transition={{ duration: 0.6, delay: 1.2, ease: SMOOTH, times: [0, 0.25, 0.65, 0.85, 1] }}
        style={{ position: "absolute", bottom: "22%", left: "calc(50% - 170px)", zIndex: 9, width: 150, transformPerspective: 600, transformOrigin: "top center" }}
      />

      <div style={{ position: "absolute", bottom: "calc(16% + 40px)", left: "calc(50% - 100px)", zIndex: 10, transform: "rotate(6.206deg)" }}>
        <SerifGlow word="elegance" fontSize={32} lineHeight={31} letterSpacing={-1.2} strokeWidth={10.27} italic delay={1.35} whiteSpace="nowrap" />
      </div>

      <motion.img
        src={`${ASSET}/text-heart.png`}
        alt=""
        initial={{ opacity: 0, scale: 0.5, rotate: 18 }}
        animate={{ opacity: 1, scale: 1, rotate: 4 }}
        transition={{ duration: 0.5, delay: 1.3, ease: OVERSHOOT }}
        style={{ position: "absolute", top: "57%", left: "calc(50% + 150px)", zIndex: 7, width: 110 }}
      />

      <motion.img
        src={`${ASSET}/arrow.svg`}
        alt=""
        initial={{ opacity: 0, x: 24, rotate: 20 }}
        animate={{ opacity: 0.8, x: [0, -5, 0], rotate: 0 }}
        transition={{
          opacity: { duration: 0.55, delay: 1.4, ease: "easeOut" },
          rotate: { duration: 0.55, delay: 1.4, ease: "easeOut" },
          x: { duration: 2.2, delay: 2, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{ position: "absolute", top: "44%", left: "calc(50% + 250px)", zIndex: 7, width: 90 }}
      />

      <div style={{ position: "absolute", top: "48%", right: 32, zIndex: 10, maxWidth: 210, transform: "translateY(-50%)" }}>
      <motion.div
        initial={{ opacity: 0, x: 24, filter: "blur(6px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 600, letterSpacing: 2.5, color: "#545454" }}>
          LOVE BAG
          <img src={`${ASSET}/heart.svg`} alt="" width={13} height={13} />
        </div>
        <p style={{ marginTop: 10, fontSize: 12, fontWeight: 400, lineHeight: 1.7, color: "#545454", textAlign: "justify" }}>
          Crafted with care and designed to follow you from day to night, it holds not only your essentials, but
          your stories
        </p>
      </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        style={{
          position: "absolute",
          bottom: 20,
          right: 32,
          zIndex: 4,
          fontFamily: "'Instrument Serif', serif",
          fontSize: 87.999,
          fontWeight: 400,
          lineHeight: "80px",
          letterSpacing: "-3.52px",
          color: "rgba(84,84,84,0.18)",
        }}
      >
        (01)
      </motion.div>

      <div style={{ position: "absolute", bottom: 24, left: 32, zIndex: 10, display: "flex", alignItems: "flex-end", gap: 20 }}>
        <Polaroid tag="(02)" img="bag-1.png" delay={1.65} rotate={-2} />
        <Polaroid tag="(03)" img="bag-2.png" delay={1.8} rotate={1.5} />
      </div>
    </div>
  );
}
