import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { A } from "@/lib/assets";

const EASE = [0.22, 1, 0.36, 1] as const;

type Stat = { num: string; label: string; from: number; to: number; decimals: number; suffix: string };

const STATS: Stat[] = [
  { num: "01", label: "Daily\nTransactions", from: 50, to: 245, decimals: 0, suffix: "M" },
  { num: "02", label: "Daily\nExchange", from: 0, to: 40.3, decimals: 1, suffix: "M" },
  { num: "03", label: "Global\nCustomers", from: 0, to: 10, decimals: 0, suffix: "M" },
];

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function StatCard({ stat }: { stat: Stat }) {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(gridRef, { once: true, amount: 0.3 });
  const [value, setValue] = useState(stat.from);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1800);
      const eased = easeOutCubic(t);
      setValue(stat.from + (stat.to - stat.from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div
      ref={gridRef}
      className="group relative aspect-square overflow-hidden"
      style={{ borderRadius: 20, border: "1px solid rgba(0,0,0,0.08)", background: "#F2F2F0" }}
    >
      <style>{`
        .stat-card-liquid { transition: height 550ms cubic-bezier(0.65,0,0.35,1); }
        .group:hover .stat-card-liquid { height: 130% !important; }
        .group:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.12); }
        .group { transition: transform 300ms ease, box-shadow 300ms ease; }
      `}</style>
      <div
        aria-hidden
        className="stat-card-liquid absolute"
        style={{ left: "-20%", width: "140%", bottom: 0, height: 0, borderRadius: "50% 50% 0 0", background: "#083400" }}
      />

      <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8">
        <span className="transition-colors duration-300" style={{ fontSize: "0.8125rem", fontWeight: 500, color: "rgba(15,15,15,0.4)" }}>
          {stat.num}
        </span>
        <div>
          <div className="transition-colors duration-300" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, color: "#083400", letterSpacing: "-0.02em" }}>
            {value.toFixed(stat.decimals)}
            {stat.suffix}
          </div>
          <div
            className="transition-colors duration-300"
            style={{ marginTop: 8, fontSize: "0.875rem", fontWeight: 500, color: "rgba(15,15,15,0.55)", whiteSpace: "pre-line" }}
          >
            {stat.label}
          </div>
        </div>
      </div>

      <style>{`
        .group:hover span,
        .group:hover div { color: #FFFFFF !important; }
      `}</style>
    </div>
  );
}

export default function PowerOfFinance() {
  return (
    <section style={{ background: "#FFFFFF", padding: "85px 18px 60px", fontFamily: "'Inter Tight', sans-serif" }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="pof-header"
        style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "end", gap: "clamp(2rem, 6vw, 6rem)", marginBottom: 32 }}
      >
        <div className="pof-left" style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 720 }}>
          <motion.h2
            initial={{ opacity: 0, y: 16, filter: "blur(14px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: EASE }}
            style={{ color: "#083400", fontSize: "clamp(2.5rem, 5.2vw, 5rem)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.01em", margin: 0 }}
          >
            Unleash the full
            <br />
            power of finance
          </motion.h2>
          <p style={{ color: "#0F0F0F", opacity: 0.55, fontSize: 16, fontWeight: 400, lineHeight: "21.5px", margin: 0, maxWidth: 420 }}>
            Everything you need to manage payments, automate financial workflows, reduce risk, and scale fintech operations.
          </p>
        </div>

        <div className="pof-right" style={{ display: "flex", alignItems: "flex-end" }}>
          <div className="pof-ctas" style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button
              type="button"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 9, fontSize: 14, fontWeight: 500, cursor: "pointer", border: "1px solid #6BFF6B", background: "#6BFF6B", color: "#083400", transition: "transform 200ms ease, background 200ms ease, color 200ms ease" }}
              onMouseOver={(e) => (e.currentTarget.style.background = "#5DEB5D")}
              onMouseOut={(e) => (e.currentTarget.style.background = "#6BFF6B")}
            >
              Learn more
              <img src={`${A}/arrow-right.svg`} alt="" width={12} height={12} />
            </button>
            <button
              type="button"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 9, fontSize: 14, fontWeight: 500, cursor: "pointer", border: "1px solid rgba(8,52,0,0.25)", background: "transparent", color: "#083400", transition: "transform 200ms ease, background 200ms ease, color 200ms ease" }}
              onMouseOver={(e) => (e.currentTarget.style.background = "rgba(8,52,0,0.04)")}
              onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
            >
              Try for free
            </button>
          </div>
        </div>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "clamp(1rem, 2vw, 1.5rem)" }}>
        {STATS.map((stat) => (
          <StatCard key={stat.num} stat={stat} />
        ))}
      </div>
    </section>
  );
}
