import { motion } from "framer-motion";

const LINE1 = "A place to display";
const LINE2 = "your masterpiece.";

function WordLine({ text, startIndex }: { text: string; startIndex: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: (startIndex + i) * 0.08 }}
          style={{ display: "inline-block", marginRight: "0.25em" }}
        >
          {w}
        </motion.span>
      ))}
    </>
  );
}

function ChatBubble({
  side,
  label,
  color,
  delay,
}: {
  side: "left" | "right";
  label: string;
  color: string;
  delay: number;
}) {
  const isLeft = side === "left";
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 1, scaleY: 1 }}
      animate={{
        opacity: 1,
        scaleX: [1, 1.25, 0.75, 1.15, 0.95, 1.05, 1],
        scaleY: [1, 0.75, 1.25, 0.85, 1.05, 0.95, 1],
      }}
      transition={{ duration: 0.8, delay }}
      style={{
        position: "absolute",
        top: isLeft ? -12 : -20,
        left: isLeft ? "calc(50% - 320px)" : undefined,
        right: !isLeft ? "calc(50% - 420px)" : undefined,
        background: color,
        padding: "18px 8px",
        borderRadius: 9999,
        fontFamily: "var(--font-heading)",
        fontSize: 15,
        fontWeight: 600,
        color: "#fff",
        zIndex: 20,
      }}
    >
      {label}
      <span
        style={{
          position: "absolute",
          bottom: -8,
          left: isLeft ? 16 : undefined,
          right: !isLeft ? 16 : undefined,
          width: 0,
          height: 0,
          borderLeft: isLeft ? "8px solid transparent" : "4px solid transparent",
          borderRight: isLeft ? "4px solid transparent" : "8px solid transparent",
          borderTop: `10px solid ${color}`,
        }}
      />
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section style={{ minHeight: "100vh", overflow: "hidden", position: "relative" }}>
      <main style={{ textAlign: "center", paddingTop: 140, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: 96,
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: "-3px",
            color: "#111111",
            maxWidth: 1100,
            margin: 0,
          }}
        >
          <div>
            <WordLine text={LINE1} startIndex={0} />
          </div>
          <div>
            <WordLine text={LINE2} startIndex={LINE1.split(" ").length} />
          </div>
        </h1>

        <div style={{ position: "relative", width: "100%", height: 260, marginTop: 40 }}>
          <ChatBubble side="left" label="@coplin" color="#4D7EFF" delay={3.05} />
          <ChatBubble side="right" label="@andrea" color="#3DBF7A" delay={3.2} />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.2 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            fontWeight: 400,
            color: "rgba(0,0,0,0.55)",
            lineHeight: 1.6,
            maxWidth: 480,
            marginTop: 48,
          }}
        >
          Artists can display their masterpieces, and buyers can discover and purchase works that resonate with
          them.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.4 }}
          style={{ display: "flex", gap: 16, marginTop: 28, paddingBottom: 80 }}
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
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#333333")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#111111")}
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
              border: "none",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.06)")}
            onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
          >
            Read more
          </button>
        </motion.div>
      </main>
    </section>
  );
}
