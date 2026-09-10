import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function EyebrowWord() {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(8px)", y: 16 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        fontFamily: "var(--font-heading)",
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: "2.5px",
        color: "rgba(0,0,0,0.45)",
        marginBottom: 20,
      }}
    >
      E-COMMERCE
    </motion.div>
  );
}

function TitleLine({ text, color, startIndex }: { text: string; color: string; startIndex: number }) {
  const words = text.split(" ");
  return (
    <div>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: (startIndex + i) * 0.06 }}
          style={{ display: "inline-block", marginRight: "0.25em", color }}
        >
          {w}
        </motion.span>
      ))}
    </div>
  );
}

function Tag({
  label,
  top,
  left,
  bg,
  tailLeft,
  tailRight,
  delay,
  inView,
}: {
  label: string;
  top: number;
  left: string;
  bg: string;
  tailLeft?: number;
  tailRight?: number;
  delay: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      style={{
        position: "absolute",
        top,
        left,
        zIndex: 20,
        background: bg,
        borderRadius: 9999,
        padding: "9px 20px",
        fontFamily: "var(--font-heading)",
        fontSize: 15,
        fontWeight: 600,
        color: "#fff",
      }}
    >
      {label}
      <span
        style={{
          position: "absolute",
          bottom: -9,
          left: tailLeft,
          right: tailRight,
          transform: tailLeft === undefined && tailRight === undefined ? "translateX(-50%)" : undefined,
          width: 0,
          height: 0,
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderTop: `10px solid ${bg}`,
        }}
      />
    </motion.div>
  );
}

export default function ShowcaseSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.95 });

  return (
    <section
      ref={ref}
      data-section="two"
      style={{
        background: "#F2F2F0",
        minHeight: "calc(100vh - 30px)",
        padding: "80px 64px 0",
        display: "flex",
        alignItems: "flex-start",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ width: 520, paddingTop: 32 }}>
        <EyebrowWord />
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: 60,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-1.5px",
            margin: 0,
          }}
        >
          <TitleLine text="Showcase, Sell" color="#111111" startIndex={0} />
          <TitleLine text="& acquire arts to" color="#C0392B" startIndex={2} />
          <TitleLine text="our marketplace." color="#111111" startIndex={6} />
        </h2>

        <motion.p
          initial={{ opacity: 0, filter: "blur(8px)", y: 16 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
          style={{
            fontFamily: "var(--font-body)",
            marginTop: 28,
            fontSize: 15,
            fontWeight: 400,
            color: "rgba(0,0,0,0.55)",
            lineHeight: 1.65,
            maxWidth: 340,
          }}
        >
          Dynamic community where artists and buyers seamlessly merge. ArtFusion brings together creators and
          enthusiasts to share creativity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
          style={{ display: "flex", marginTop: 48, gap: 12 }}
        >
          <button
            type="button"
            style={{
              background: "#111111",
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
              padding: "14px 28px",
              borderRadius: 9999,
              border: "none",
              cursor: "pointer",
            }}
          >
            Join for $9.99/m
          </button>
          <button
            type="button"
            style={{
              background: "transparent",
              color: "#111111",
              fontSize: 15,
              fontWeight: 500,
              padding: "14px 20px",
              borderRadius: 9999,
              border: "1.5px solid rgba(0,0,0,0.15)",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.05)")}
            onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
          >
            Read more
          </button>
        </motion.div>
      </div>

      <Tag label="@howard" top={260} left="calc(40% + 340px)" bg="#C0392B" delay={0} inView={inView} />
      <Tag label="@robin" top={430} left="calc(40% + 680px)" bg="#111111" tailLeft={20} delay={0.15} inView={inView} />
    </section>
  );
}
