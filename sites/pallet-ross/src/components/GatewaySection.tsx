import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BANNER_SLIDES = ["/banner-1.png", "/banner-2.png", "/banner-3.png"];

function AutoplayBanner() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveSlide((v) => (v + 1) % 3);
    }, 3000);
    return () => window.clearInterval(id);
  }, [activeSlide]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      style={{
        width: "100%",
        borderRadius: 24,
        overflow: "hidden",
        height: 600,
        background: "#111111",
        position: "relative",
      }}
    >
      {BANNER_SLIDES.map((src, i) => (
        <motion.img
          key={src}
          src={src}
          alt=""
          animate={{ opacity: i === activeSlide ? 1 : 0, scale: i === activeSlide ? 1 : 1.04 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
        />
      ))}

      <div style={{ position: "absolute", top: 24, right: 24, zIndex: 10, display: "flex", gap: 5 }}>
        {BANNER_SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveSlide(i)}
            style={{
              height: 6,
              width: i === activeSlide ? 18 : 6,
              background: i === activeSlide ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)",
              borderRadius: 9999,
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      <div style={{ position: "absolute", bottom: 28, left: 28, display: "inline-block" }}>
        <span
          style={{
            position: "absolute",
            inset: -8,
            borderRadius: 9999,
            border: "2px solid rgba(255,255,255,0.40)",
            pointerEvents: "none",
          }}
          className="pallet-ring-1"
        />
        <span
          style={{
            position: "absolute",
            inset: -4,
            borderRadius: 9999,
            border: "2px solid rgba(255,255,255,0.25)",
            pointerEvents: "none",
          }}
          className="pallet-ring-2"
        />
        <motion.button
          type="button"
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          style={{
            position: "relative",
            zIndex: 2,
            background: "#fff",
            color: "#111111",
            fontFamily: "var(--font-heading)",
            fontSize: 15,
            fontWeight: 600,
            padding: "12px 28px",
            borderRadius: 9999,
            border: "none",
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
          }}
        >
          Watch
        </motion.button>
      </div>

      <div style={{ position: "absolute", bottom: 28, right: 28, display: "flex", gap: 10 }}>
        <motion.button
          type="button"
          aria-label="Previous slide"
          whileHover={{ scale: 1.08, backgroundColor: "#FFFFFF", transition: { duration: 0.2 } }}
          onClick={() => setActiveSlide((v) => (v - 1 + 3) % 3)}
          style={{
            width: 44,
            height: 44,
            background: "rgba(255,255,255,0.90)",
            borderRadius: "50%",
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <ChevronLeft size={20} color="#111111" />
        </motion.button>
        <motion.button
          type="button"
          aria-label="Next slide"
          whileHover={{ scale: 1.08, backgroundColor: "#FFFFFF", transition: { duration: 0.2 } }}
          onClick={() => setActiveSlide((v) => (v + 1) % 3)}
          style={{
            width: 44,
            height: 44,
            background: "rgba(255,255,255,0.90)",
            borderRadius: "50%",
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <ChevronRight size={20} color="#111111" />
        </motion.button>
      </div>

      <style>{`
        @keyframes pallet-ring-pulse-1 {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes pallet-ring-pulse-2 {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .pallet-ring-1 { animation: pallet-ring-pulse-1 2s ease-out infinite; }
        .pallet-ring-2 { animation: pallet-ring-pulse-2 2s ease-out infinite 0.5s; }
      `}</style>
    </motion.div>
  );
}

const TITLE_WORDS = ["Gateway", "to", "artist", "people."];

export default function GatewaySection() {
  return (
    <section
      data-section="three"
      style={{ background: "#F2F2F0", minHeight: "100vh", padding: "80px 64px 80px", position: "relative", overflow: "hidden" }}
    >
      <div style={{ maxWidth: 520, marginBottom: 40, position: "relative", zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, filter: "blur(8px)", y: 12 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "2.5px",
            color: "rgba(0,0,0,0.45)",
            marginBottom: 20,
          }}
        >
          CLASS BY REATHA C. PHELAN
        </motion.div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 80, fontWeight: 800, lineHeight: 1.0, letterSpacing: "-2.5px", color: "#111111", margin: 0 }}>
          {TITLE_WORDS.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.07 }}
              style={{ display: "inline-block", marginRight: "0.2em" }}
            >
              {w}
            </motion.span>
          ))}
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, scaleX: 1, scaleY: 1 }}
        whileInView={{
          opacity: 1,
          scaleX: [1, 1.25, 0.75, 1.15, 0.95, 1.05, 1],
          scaleY: [1, 0.75, 1.25, 0.85, 1.05, 0.95, 1],
        }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.65 }}
        style={{
          position: "absolute",
          top: 120,
          right: 180,
          zIndex: 10,
          background: "#111111",
          borderRadius: 9999,
          padding: "10px 22px",
          fontFamily: "var(--font-heading)",
          fontSize: 16,
          fontWeight: 600,
          color: "#fff",
        }}
      >
        @reatha
        <span
          style={{
            position: "absolute",
            bottom: -9,
            right: 24,
            width: 0,
            height: 0,
            borderLeft: "8px solid transparent",
            borderRight: "4px solid transparent",
            borderTop: "10px solid #111111",
          }}
        />
      </motion.div>

      <AutoplayBanner />
    </section>
  );
}
