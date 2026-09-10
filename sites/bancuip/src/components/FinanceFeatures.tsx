import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { A } from "@/lib/assets";

const EASE = [0.22, 1, 0.36, 1] as const;

const CARDS = [
  { bg: "back-3-1.jpg", word1: "Multi", word2: "Currency", desc: "Insert your bid, form your strategy, or set campaign limits at any currency you wish, without worrying who will keep an eye on all those digits and exchange rates, we will do it - no mistakes!" },
  { bg: "back-3-2.jpg", word1: "Account", word2: "Manager", desc: "Get your service assistant to help with optimization, process improvements, implementations, and every inquiry to maximize your performance." },
  { bg: "back-3-3.jpg", word1: "White Label", word2: "Solution", desc: "Get our service and technical capabilities through a personalized interface under your brand, with no technical setup required on your side." },
];

function FeatureCard({ card }: { card: (typeof CARDS)[number] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["0vw", "-18vw"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["0vw", "18vw"]);

  return (
    <div
      ref={ref}
      className="ff-card"
      style={{ position: "relative", width: "100%", borderRadius: 14, overflow: "hidden", aspectRatio: "1820 / 720", background: "#0a0a0a", isolation: "isolate" }}
    >
      <img src={`${A}/${card.bg}`} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.25) 100%)" }} />

      <div style={{ position: "absolute", top: 0, bottom: 0, left: 32, right: 32, zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, pointerEvents: "none", overflow: "hidden" }}>
        <motion.span style={{ x: x1, color: "#FFFFFF", fontSize: "clamp(2.5rem, 7vw, 7rem)", fontWeight: 400, lineHeight: 1, letterSpacing: "-1px", display: "inline-block", willChange: "transform" }}>
          {card.word1}
        </motion.span>
        <motion.span style={{ x: x2, color: "#FFFFFF", fontSize: "clamp(2.5rem, 7vw, 7rem)", fontWeight: 400, lineHeight: 1, letterSpacing: "-1px", display: "inline-block", willChange: "transform" }}>
          {card.word2}
        </motion.span>
      </div>

      <div style={{ position: "absolute", left: 32, right: 32, bottom: 32, zIndex: 3, width: 330, maxWidth: "calc(100% - 64px)" }}>
        <p style={{ color: "#FFFFFF", fontSize: "0.8125rem", fontWeight: 400, lineHeight: 1.45, margin: 0, opacity: 0.8 }}>{card.desc}</p>
      </div>
    </div>
  );
}

export default function FinanceFeatures() {
  return (
    <section style={{ background: "#FFFFFF", padding: "115px 18px 18px", fontFamily: "'Inter Tight', sans-serif" }}>
      <style>{`
        @media (max-width: 900px) {
          .ff-header { grid-template-columns: 1fr !important; gap: 1.5rem !important; align-items: start !important; }
          .ff-header-left { align-items: flex-start !important; gap: 1rem !important; }
          .ff-title { width: 100% !important; justify-self: start !important; }
          .ff-card { aspect-ratio: 4 / 5 !important; }
        }
      `}</style>

      <div className="ff-wrap" style={{ width: "100%", margin: "0 auto" }}>
        <div className="ff-header" style={{ display: "grid", gridTemplateColumns: "1fr 660px", gap: "clamp(2rem, 6vw, 6rem)", alignItems: "end", marginBottom: "clamp(2rem, 4vw, 3.5rem)" }}>
          <motion.div
            className="ff-header-left"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", alignItems: "flex-start" }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, border: "1px solid rgba(0,0,0,0.20)", borderRadius: 9, padding: "7px 14px", background: "transparent", fontSize: "0.8125rem", fontWeight: 400, color: "#083400" }}>
              Features
            </div>
            <p style={{ margin: 0, maxWidth: "30rem", color: "#0F0F0F", opacity: 0.55, fontSize: "1rem", fontWeight: 400, lineHeight: "21.5px" }}>
              The complete suite of fintech infrastructure for payments, wallets, fraud monitoring, compliance workflows, and financial automation, built to support secure digital finance operations at scale.
            </p>
          </motion.div>

          <motion.h2
            className="ff-title"
            initial={{ opacity: 0, y: 16, filter: "blur(14px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            style={{ width: 660, maxWidth: "100%", justifySelf: "end", color: "#083400", fontSize: "clamp(2rem, 4.3vw, 4.0625rem)", fontWeight: 400, lineHeight: 1.169, margin: 0 }}
          >
            Analytics that feels like it&apos;s from the future
          </motion.h2>
        </div>

        <motion.div
          className="ff-stack"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ display: "flex", flexDirection: "column", gap: "clamp(1rem, 2vw, 1.5rem)" }}
        >
          {CARDS.map((card) => (
            <FeatureCard key={card.word1} card={card} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
