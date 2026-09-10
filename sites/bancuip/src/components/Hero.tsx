import { motion } from "framer-motion";
import { A } from "@/lib/assets";

const EASE = [0.22, 1, 0.36, 1] as const;

const ArrowButton = ({ children }: { children: React.ReactNode }) => (
  <button
    className="group relative inline-flex items-center justify-center overflow-hidden"
    style={{
      height: 38,
      padding: "13px 19.2px",
      gap: 10,
      borderRadius: 9,
      border: "1px solid rgba(250,250,250,0.20)",
      background: "#FFF",
      color: "#111111",
      fontSize: 14,
      fontWeight: 500,
      cursor: "pointer",
      boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
    }}
  >
    <span>{children}</span>
    <span style={{ position: "relative", width: 14, height: 14, overflow: "hidden", display: "inline-block" }}>
      <img
        src={`${A}/arrow-right.svg`}
        alt=""
        className="absolute inset-0 translate-x-0 transition-transform group-hover:translate-x-[200%]"
        style={{ transitionDuration: "500ms", transitionTimingFunction: "cubic-bezier(0.65,0,0.35,1)" }}
      />
      <img
        src={`${A}/arrow-right.svg`}
        alt=""
        className="absolute inset-0 -translate-x-[200%] transition-transform group-hover:translate-x-0"
        style={{ transitionDuration: "500ms", transitionTimingFunction: "cubic-bezier(0.65,0,0.35,1)" }}
      />
    </span>
  </button>
);

export default function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", minHeight: "32rem", fontFamily: "'Inter Tight', sans-serif" }}
    >
      <style>{`
        @media (max-width: 700px) {
          .hero-buttons { display: none !important; }
          .hero-bottombar-left, .hero-bottombar-right { display: none !important; }
          .hero-bottombar { grid-template-columns: 1fr !important; justify-items: center !important; }
        }
      `}</style>

      <div className="absolute inset-0 z-0">
        <motion.img
          src={`${A}/hero-back.jpg`}
          alt=""
          initial={{ scale: 1.06 }}
          animate={{ scale: 1.0 }}
          transition={{ duration: 8, ease: "linear" }}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }}
        />
      </div>

      <div className="absolute inset-0 z-[1]" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.30) 40%, transparent 70%)" }} />
      <div className="absolute inset-0 z-[1]" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 45%)" }} />
      <div className="absolute inset-0 z-[1]" style={{ background: "rgba(0,0,0,0.25)" }} />

      <div
        className="absolute z-10"
        style={{ bottom: "clamp(6rem, 12vh, 7.5rem)", left: "clamp(1rem, 3vw, 2rem)", maxWidth: "min(38.75rem, calc(100vw - 2rem))" }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{
            fontSize: "clamp(2rem, 5vw, 3.125rem)",
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "-1px",
            color: "#FFFFFF",
            margin: 0,
          }}
        >
          Real-time fintech
          <br />
          operations and analytics
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          style={{
            marginTop: "1.25rem",
            maxWidth: "min(31.25rem, 100%)",
            fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
            fontWeight: 300,
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.60)",
          }}
        >
          The complete infrastructure for payments, wallets, transaction monitoring, fraud control,
          compliance workflows, and financial automation in one secure platform.
        </motion.p>
      </div>

      <div
        className="hero-buttons absolute z-10 flex items-center"
        style={{ bottom: "clamp(6rem, 12vh, 7.5rem)", right: "clamp(1rem, 3vw, 2rem)", gap: "1.5rem" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <ArrowButton>Learn more</ArrowButton>
        </motion.div>
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.75)", fontSize: 14, fontWeight: 500, cursor: "pointer" }}
          onMouseOver={(e) => (e.currentTarget.style.color = "#FFFFFF")}
          onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
        >
          Try for free
        </motion.button>
      </div>

      <motion.div
        className="hero-bottombar absolute bottom-0 left-0 right-0 z-10 grid items-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
        style={{
          height: 70,
          gridTemplateColumns: "1fr auto 1fr",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          padding: "0 clamp(1rem, 3vw, 2rem)",
          position: "absolute",
        }}
      >
        <motion.div
          className="absolute left-0"
          style={{ top: -1, height: 1, background: "rgba(255,255,255,0.55)" }}
          initial={{ width: "0%" }}
          animate={{ width: "25%" }}
          transition={{ duration: 1.0, delay: 1.1, ease: "easeOut" }}
        />
        <span
          className="hero-bottombar-left"
          style={{ fontSize: 12, fontWeight: 500, letterSpacing: "2.5px", color: "rgba(255,255,255,0.40)" }}
        >
          ENTERPRISE MANAGEMENT APPLICATIONS
        </span>
        <div className="flex items-center justify-center" style={{ gap: 16 }}>
          <span style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.55)" }}>01 / 04</span>
          <div style={{ width: 1, height: 14, background: "rgba(255,255,255,0.20)" }} />
          <button
            type="button"
            style={{ fontSize: 12, fontWeight: 500, letterSpacing: "1.5px", color: "rgba(255,255,255,0.55)", background: "transparent", border: "none", cursor: "pointer" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.90)")}
            onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
          >
            NEXT
          </button>
        </div>
        <motion.span
          className="hero-bottombar-right"
          style={{ fontSize: 12, fontWeight: 500, letterSpacing: "2.5px", color: "rgba(255,255,255,0.40)", justifySelf: "end" }}
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          SCROLL TO EXPLORE
        </motion.span>
      </motion.div>
    </section>
  );
}
