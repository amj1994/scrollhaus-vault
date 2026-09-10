import { motion } from "framer-motion";
import { A } from "@/lib/assets";

const LOGOS = [
  { src: "logo-1.svg", alt: "Nueral" },
  { src: "logo-2.svg", alt: "GroundAI" },
  { src: "logo-3.svg", alt: "Wids" },
  { src: "logo-4.svg", alt: "Orinya" },
  { src: "logo-5.svg", alt: "Xyreion" },
  { src: "logo-6.svg", alt: "Skodia" },
  { src: "logo-7.svg", alt: "GreenFI" },
];

export default function Testimonials() {
  return (
    <section style={{ background: "#F6F6F6", padding: "85px 18px 60px", fontFamily: "'Inter Tight', sans-serif" }}>
      <style>{`
        @media (max-width: 900px) {
          .ts-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .ts-right p.ts-quote { width: 100% !important; }
          .ts-meta { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>

      <motion.div
        className="ts-grid"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ display: "grid", gridTemplateColumns: "295px 1fr", gap: "clamp(2rem, 6vw, 6rem)", alignItems: "start", marginBottom: "clamp(3rem, 6vw, 5rem)" }}
      >
        <div className="ts-left" style={{ display: "flex", flexDirection: "column", gap: 75, alignItems: "flex-start" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, border: "1px solid rgba(0,0,0,0.20)", borderRadius: 9, padding: "7px 14px", background: "transparent", fontSize: "0.8125rem", fontWeight: 400, color: "#083400", width: 153, boxSizing: "border-box" }}>
            What our clients say
          </div>
          <p
            style={{
              color: "#0F0F0F",
              fontFamily: "'Sequel Sans', 'Inter Tight', sans-serif",
              fontSize: "1rem",
              fontWeight: 405,
              lineHeight: "21.5px",
              width: 295,
              maxWidth: "100%",
              margin: 0,
              opacity: 0.55,
            }}
          >
            The complete suite of fintech infrastructure for payments, wallets, fraud monitoring, compliance workflows, and financial automation at scale.
          </p>
        </div>

        <div className="ts-right" style={{ display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "flex-start", width: "100%", minWidth: 0 }}>
          <div className="ts-meta" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", marginRight: -14, zIndex: 1 }}>
                  <img src={`${A}/quote.svg`} alt="" style={{ width: 22, height: 22 }} />
                </div>
                <img src={`${A}/client-1.jpg`} alt="" style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", zIndex: 2 }} />
              </div>
              <div style={{ marginLeft: "1.25rem" }}>
                <div style={{ color: "#22282B", fontSize: "1.5rem", fontWeight: 600, lineHeight: "130%", letterSpacing: "0.24px" }}>James Smith</div>
                <div style={{ color: "#0F0F0F", fontSize: "1.25rem", fontWeight: 400, lineHeight: "130%", letterSpacing: "0.2px", opacity: 0.55 }}>
                  Product Manager, Orinya
                </div>
              </div>
            </div>
            <img src={`${A}/logo-4.svg`} alt="Orinya" style={{ height: 28, width: "auto" }} />
          </div>

          <div style={{ height: 1, background: "rgba(0,0,0,0.10)", width: "100%" }} />

          <p
            className="ts-quote"
            style={{
              color: "#083400",
              fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
              fontWeight: 400,
              lineHeight: "110%",
              width: 700,
              maxWidth: "100%",
              margin: 0,
            }}
          >
            We&apos;ve worked across fintech operations for years, but never had such a complete platform for managing payments in one place.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-start", marginTop: "1rem" }}>
            <button
              type="button"
              aria-label="Previous"
              style={{ background: "transparent", border: "none", cursor: "pointer", padding: "8px 8px 8px 0", opacity: 0.6, transition: "opacity 0.2s" }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseOut={(e) => (e.currentTarget.style.opacity = "0.6")}
            >
              <img src={`${A}/arrow-l.svg`} alt="" style={{ width: 28, height: 14 }} />
            </button>
            <button
              type="button"
              aria-label="Next"
              style={{ background: "transparent", border: "none", cursor: "pointer", padding: "8px 8px 8px 0", opacity: 0.6, transition: "opacity 0.2s" }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseOut={(e) => (e.currentTarget.style.opacity = "0.6")}
            >
              <img src={`${A}/arrow-r.svg`} alt="" style={{ width: 28, height: 14 }} />
            </button>
          </div>
        </div>
      </motion.div>

      <div
        className="ts-marquee-wrap"
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 4%, #000 14%, #000 86%, rgba(0,0,0,0.2) 96%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 4%, #000 14%, #000 86%, rgba(0,0,0,0.2) 96%, transparent 100%)",
        }}
      >
        <div className="ts-marquee" style={{ display: "flex", width: "max-content", animation: "ts-scroll 38s linear infinite", opacity: 0.7, alignItems: "center", willChange: "transform" }}>
          {[0, 1].map((rep) => (
            <div key={rep} className="ts-marquee-half" style={{ display: "flex", alignItems: "center", gap: "clamp(3rem, 8vw, 7rem)", paddingRight: "clamp(3rem, 8vw, 7rem)", flexShrink: 0 }}>
              {LOGOS.map((logo) => (
                <img key={logo.alt} src={`${A}/${logo.src}`} alt={logo.alt} style={{ height: 28, width: "auto" }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
