import { useEffect, useState } from "react";
const iconAI = "https://qclay.design/lovable/shyen/icon_ai.png";
const improvedSvg = "https://qclay.design/lovable/shyen/improved.svg";
const improvedDottSvg = "https://qclay.design/lovable/shyen/improved_dott.svg";
const chartSvg = "https://qclay.design/lovable/shyen/chart.svg";
import { useInView } from "@/hooks/use-in-view";

const cardLabel: React.CSSProperties = {
  position: "absolute",
  top: "28px",
  right: "32px",
  color: "#3A4A1F",
  fontFamily: "Geist, sans-serif",
  fontSize: "14px",
  letterSpacing: "-0.28px",
  opacity: 0.7,
};

const dot = (color: string): React.CSSProperties => ({
  width: "6px",
  height: "6px",
  borderRadius: "999px",
  background: color,
});

export default function ToolkitSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#112115]">
      <div
        className="relative mx-auto max-w-[1240px] px-6"
        style={{ paddingTop: "124px", paddingBottom: "0px" }}
      >
        {/* Heading */}
        <div className="relative z-10 flex flex-col items-center">
          <h2
            style={{
              color: "#EAF1C1",
              textAlign: "center",
              fontFamily: "Halant, serif",
              fontSize: "72px",
              fontWeight: 400,
              lineHeight: "72px",
              letterSpacing: "-3.6px",
            }}
          >
            A full toolkit for a full
            <br />
            calmer mind.
          </h2>
          <p
            style={{
              marginTop: "24px",
              color: "#EAF1C1",
              textAlign: "center",
              fontFamily: "Geist, sans-serif",
              fontSize: "20px",
              fontWeight: 400,
              lineHeight: "26px",
              letterSpacing: "-0.4px",
              opacity: 0.5,
            }}
          >
            Personalized tools powered by AI to help you manage stress,
            <br />
            improve focus, and build emotional balance every day.
          </p>
        </div>

        {/* Cards area with glow */}
        <div style={{ position: "relative", marginTop: "72px" }}>
          {/* Glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute"
            style={{
              inset: "-120px -80px -40px -80px",
              background:
                "linear-gradient(0deg, #112115 31.31%, #375B39 69.37%, #FAFF67 94%)",
              filter: "blur(93px)",
              zIndex: 0,
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <HeroRecoveryCard />

            <MoodTrackingCard />

            <ImprovedCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroRecoveryCard() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });
  const [count, setCount] = useState(0);
  const [textIn, setTextIn] = useState(false);
  const [badgeIn, setBadgeIn] = useState(false);
  const [chartIn, setChartIn] = useState(false);
  const [pillsIn, setPillsIn] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1500;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      setCount(Math.round(400 * easeOut(t)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const tText = setTimeout(() => setTextIn(true), 700);
    const tBadge = setTimeout(() => setBadgeIn(true), 1300);
    const tChart = setTimeout(() => setChartIn(true), 1600);
    const tPills = setTimeout(() => setPillsIn(true), 1600 + 1400 + 200);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(tText);
      clearTimeout(tBadge);
      clearTimeout(tChart);
      clearTimeout(tPills);
    };
  }, [inView]);

  const ease = "cubic-bezier(0.22,1,0.36,1)";

  return (
    <div
      ref={ref}
      style={{
        gridColumn: "1 / -1",
        height: "460px",
        borderRadius: "32px",
        background: "#FBFFE6",
        position: "relative",
        overflow: "hidden",
        padding: "14px 32px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.15fr",
          gap: "32px",
          height: "100%",
          alignItems: "stretch",
        }}
      >
        {/* Left content */}
        <div className="flex flex-col" style={{ paddingTop: "18px", paddingBottom: "18px" }}>
          <h3
            style={{
              color: "#112115",
              fontFamily: "Halant, serif",
              fontSize: "80px",
              fontWeight: 400,
              lineHeight: "normal",
              letterSpacing: "-3.2px",
            }}
          >
            {count}+
          </h3>
          <p
            style={{
              marginTop: "15px",
              color: "#112115",
              fontFamily: "Halant, serif",
              fontSize: "32px",
              fontWeight: 400,
              lineHeight: "31px",
              letterSpacing: "-0.96px",
              opacity: textIn ? 1 : 0,
              transform: textIn ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 800ms ${ease}, transform 800ms ${ease}`,
            }}
          >
            Patients recovered 5x faster with
            <br />
            AI-powered support.
          </p>
          <p
            style={{
              marginTop: "20px",
              color: "#112115",
              fontFamily: "Geist, sans-serif",
              fontSize: "18px",
              fontWeight: 400,
              lineHeight: "normal",
              letterSpacing: "-0.36px",
              opacity: textIn ? 0.5 : 0,
              transform: textIn ? "translateY(0)" : "translateY(20px)",
              maxWidth: "440px",
              transition: `opacity 800ms ${ease} 120ms, transform 800ms ${ease} 120ms`,
            }}
          >
            Our personalized care, real-time guidance, and
            <br />
            proactive support help patients overcome challenges
            <br />
            and regain well-being faster.
          </p>

          {/* Outcome badge */}
          <div
            style={{
              marginTop: "70px",
              opacity: badgeIn ? 1 : 0,
              transform: badgeIn ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 700ms ${ease}, transform 700ms ${ease}`,
            }}
          >
            <div
              style={{
                display: "flex",
                width: "336px",
                padding: "12px",
                alignItems: "center",
                gap: "8px",
                borderRadius: "20px",
                background: "#EBF1C9",
              }}
            >
              <img
                src={iconAI}
                alt=""
                style={{ width: "32px", height: "32px", flexShrink: 0 }}
              />
              <span
                style={{
                  color: "#112115",
                  fontFamily: "Halant, serif",
                  fontSize: "20px",
                  fontWeight: 400,
                  lineHeight: "20px",
                  letterSpacing: "-0.4px",
                  marginRight: "0.8px",
                }}
              >
                Shyen.AI
              </span>
              <span
                style={{
                  color: "rgba(17, 33, 21, 0.60)",
                  fontFamily: "Halant, serif",
                  fontSize: "13px",
                  fontWeight: 400,
                  lineHeight: "20px",
                  letterSpacing: "-0.65px",
                }}
              >
                Backed by real patient outcomes
              </span>
            </div>
          </div>
        </div>

        {/* Right — chart */}
        <RecoveryChart chartIn={chartIn} pillsIn={pillsIn} />
      </div>
    </div>
  );
}

function RecoveryChart({ chartIn, pillsIn }: { chartIn: boolean; pillsIn: boolean }) {
  const ease = "cubic-bezier(0.22,1,0.36,1)";
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "transparent",
        borderRadius: 36,
        overflow: "hidden",
      }}
    >
      {/* Recovery label top-right */}
      <span
        style={{
          position: "absolute",
          top: "24px",
          right: "28px",
          color: "#112115",
          fontFamily: "Geist, sans-serif",
          fontSize: "18px",
          fontWeight: 400,
          lineHeight: "normal",
          letterSpacing: "-0.36px",
          opacity: 0.6,
          zIndex: 4,
        }}
      >
        Recovery
      </span>

      {/* Chart SVG — reveals left → right */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          clipPath: chartIn ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
          transition: `clip-path 1400ms ${ease}`,
        }}
      >
        <img
          src={chartSvg}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            objectFit: "fill",
          }}
        />
      </div>

      {/* Avg recovery: 5X — orange pill */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "30%",
          zIndex: 5,
          opacity: pillsIn ? 1 : 0,
          transform: pillsIn ? "translateY(0)" : "translateY(10px)",
          transition: `opacity 600ms ${ease}, transform 600ms ${ease}`,
        }}
      >
        <PillBadge bg="#E8A969" text="Avg recovery: 5X" />
      </div>

      {/* Traditional approach — olive pill */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          right: "5%",
          zIndex: 5,
          opacity: pillsIn ? 1 : 0,
          transform: pillsIn ? "translateY(0)" : "translateY(10px)",
          transition: `opacity 600ms ${ease} 120ms, transform 600ms ${ease} 120ms`,
        }}
      >
        <PillBadge bg="#BECB6D" text="Traditional approach" hideOval />
      </div>
    </div>
  );
}

function PillBadge({ bg, text, hideOval }: { bg: string; text: string; hideOval?: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        height: "40px",
        padding: "8px 18px",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        borderRadius: "48px",
        background: bg,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      {!hideOval && (
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <circle
            cx="5.5"
            cy="5.5"
            r="4.5"
            transform="matrix(-1 0 0 1 11 0)"
            fill="#F0A06E"
            stroke="#FFFCF9"
            strokeWidth="2"
          />
        </svg>
      )}
      <span
        style={{
          color: "#FFFCF9",
          fontFamily: "Geist, sans-serif",
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "normal",
          letterSpacing: "-0.32px",
        }}
      >
        {text}
      </span>
    </span>
  );
}

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const MOODS = ["Happy", "Calm mode", "Stressed", "Focused", "Relaxed"];
const LABEL_H = 40;
const LABEL_GAP = 8;
const ROW_H = LABEL_H + LABEL_GAP; // 48
const SCROLL_DURATION = MOODS.length * 1.6; // seconds

function MoodTrackingCard() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [count, setCount] = useState(0);
  const [arcAngle, setArcAngle] = useState(0);
  const [titleIn, setTitleIn] = useState(false);
  const [ovalIn, setOvalIn] = useState(false);
  const [textIn, setTextIn] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  // Cycle active label in sync with scroll — the bar currently in the center
  // window passes the previous bar (scrolling top→bottom means the next active
  // bar is the one that was just above the centered one).
  useEffect(() => {
    if (!inView) return;
    const stepMs = (SCROLL_DURATION * 1000) / MOODS.length;
    const id = setInterval(() => {
      setActiveIdx((i) => (i - 1 + MOODS.length) % MOODS.length);
    }, stepMs);
    return () => clearInterval(id);
  }, [inView]);

  // Counter 0 → 45 (the second number)
  useEffect(() => {
    if (!inView) return;
    setTitleIn(true);
    const start = performance.now();
    const dur = 1600;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      setCount(Math.round(45 * easeOut(t)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  // Oval appears, then arc fills 0 → 90deg
  useEffect(() => {
    if (!inView) return;
    const ovalTimer = setTimeout(() => setOvalIn(true), 350);
    const arcStartDelay = 700;
    let raf = 0;
    const arcTimer = setTimeout(() => {
      const start = performance.now();
      const dur = 1400;
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        setArcAngle(90 * easeOut(t));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, arcStartDelay);
    const textTimer = setTimeout(() => setTextIn(true), 900);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(ovalTimer);
      clearTimeout(arcTimer);
      clearTimeout(textTimer);
    };
  }, [inView]);

  // Duplicate list for seamless loop
  const loopList = [...MOODS, ...MOODS];

  return (
    <div
      ref={ref}
      style={{
        background: "#EAF1C1",
        borderRadius: "32px",
        position: "relative",
        overflow: "hidden",
        padding: "36px",
        minHeight: "460px",
      }}
    >
      {/* 10–45% title */}
      <h3
        style={{
          position: "absolute",
          top: "36px",
          left: "36px",
          color: "#112115",
          fontFamily: "Halant, serif",
          fontSize: "72px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "normal",
          letterSpacing: "-2.88px",
          margin: 0,
          opacity: titleIn ? 1 : 0,
          transform: titleIn ? "translateY(0)" : "translateY(24px)",
          transition: `opacity 900ms ${EASE}, transform 900ms ${EASE}`,
        }}
      >
        10 – {count}%
      </h3>

      {/* Mode label top right */}
      <span
        style={{
          position: "absolute",
          top: "44px",
          right: "36px",
          color: "#112115",
          fontFamily: "Geist, sans-serif",
          fontSize: "18px",
          fontWeight: 400,
          lineHeight: "normal",
          letterSpacing: "-0.36px",
          opacity: 0.6,
        }}
      >
        Mode
      </span>

      {/* Scrolling labels — left column */}
      <div
        style={{
          position: "absolute",
          top: "168px",
          left: "36px",
          width: "180px",
          height: `${ROW_H * 3 - LABEL_GAP}px`,
          overflow: "hidden",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, #000 30%, #000 70%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 30%, #000 70%, transparent 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: `${LABEL_GAP}px`,
            animation: `moodScroll ${SCROLL_DURATION}s linear infinite`,
          }}
        >
          {loopList.map((m, i) => (
            <MoodLabel
              key={`${m}-${i}`}
              text={m}
              active={i % MOODS.length === activeIdx}
            />
          ))}
        </div>
        <style>{`
          @keyframes moodScroll {
            from { transform: translateY(-${ROW_H * MOODS.length}px); }
            to { transform: translateY(0); }
          }
        `}</style>
      </div>

      {/* Oval indicator — right */}
      <div
        style={{
          position: "absolute",
          top: "119px",
          right: "36px",
          opacity: ovalIn ? 1 : 0,
          transform: ovalIn ? "translateY(0) scale(1)" : "translateY(16px) scale(0.92)",
          transition: `opacity 900ms ${EASE}, transform 900ms ${EASE}`,
        }}
      >
        <OvalProgress angle={arcAngle} />
      </div>

      {/* Mood tracking text block — bottom */}
      <div
        style={{
          position: "absolute",
          top: "330px",
          left: "36px",
          right: "36px",
        }}
      >
        <h4
          style={{
            color: "#112115",
            fontFamily: "Geist, sans-serif",
            fontSize: "32px",
            fontWeight: 400,
            lineHeight: "normal",
            letterSpacing: "-0.64px",
            margin: 0,
            opacity: textIn ? 1 : 0,
            transform: textIn ? "translateY(0)" : "translateY(30px)",
            transition: `opacity 800ms ${EASE}, transform 800ms ${EASE}`,
          }}
        >
          Mood tracking
        </h4>
        <p
          style={{
            marginTop: "12px",
            color: "#112115",
            fontFamily: "Geist, sans-serif",
            fontSize: "18px",
            fontWeight: 400,
            lineHeight: "normal",
            letterSpacing: "-0.36px",
            opacity: textIn ? 0.7 : 0,
            transform: textIn ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 900ms ${EASE} 180ms, transform 900ms ${EASE} 180ms`,
          }}
        >
          Gentle check-ins that reveal long-term
          <br />
          emotional trends.
        </p>
      </div>
    </div>
  );
}

function MoodLabel({ text, active = false }: { text: string; active?: boolean }) {
  if (active) {
    return (
      <div
        style={{
          display: "flex",
          height: "40px",
          padding: "8px 18px",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          alignSelf: "stretch",
          borderRadius: "18px",
          background: "#BECB6D",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: "0 8px 24px -10px rgba(128,140,62,0.45)",
          transition: `background 500ms ${EASE}`,
        }}
      >
        <span
          aria-hidden
          style={{
            width: "11px",
            height: "11px",
            flexShrink: 0,
            borderRadius: "999px",
            background: "#EAF1C1",
          }}
        />
        <span
          style={{
            color: "#FFF",
            fontFamily: "Geist, sans-serif",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "normal",
            letterSpacing: "-0.32px",
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </span>
      </div>
    );
  }
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        height: `${LABEL_H}px`,
        paddingLeft: "36px",
        paddingRight: "18px",
        alignItems: "center",
        borderRadius: "18px",
        background: "rgba(190,203,109,0.35)",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.15) inset",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        transition: `background 500ms ${EASE}, box-shadow 500ms ${EASE}`,
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: "18px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "11px",
          height: "11px",
          borderRadius: "999px",
          background: "rgba(234,241,193,0.55)",
        }}
      />
      <span
        style={{
          color: "rgba(17,33,21,0.55)",
          fontFamily: "Geist, sans-serif",
          fontSize: "16px",
          fontWeight: 400,
          lineHeight: "normal",
          letterSpacing: "-0.32px",
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </span>
    </div>
  );
}

function OvalProgress({ angle }: { angle: number }) {
  const size = 270.926;
  const cx = size / 2;
  const cy = size / 2;
  const stroke = 2.52;
  const r = size / 2 - stroke;
  const rad = (angle - 90) * (Math.PI / 180);
  const endX = cx + r * Math.cos(rad);
  const endY = cy + r * Math.sin(rad);
  const largeArc = angle > 180 ? 1 : 0;
  const startX = cx;
  const startY = cy - r;
  const arcPath =
    angle <= 0.01
      ? ""
      : `M ${cx} ${cy} L ${startX} ${startY} A ${r} ${r} 0 ${largeArc} 1 ${endX} ${endY} Z`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <defs>
        <linearGradient id="oval-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="25.46%" stopColor="rgba(181, 196, 104, 0.70)" />
          <stop offset="99.83%" stopColor="rgba(181, 196, 104, 0)" />
        </linearGradient>
      </defs>
      {/* Outer ring */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="#808C3E"
        strokeWidth={stroke}
      />
      {/* Tick marks from oval.svg */}
      <line
        x1={cx}
        y1={size - 16}
        x2={cx}
        y2={size - 2}
        stroke="#808C3E"
        strokeWidth={stroke}
        opacity="0.5"
      />
      <line
        x1={16}
        y1={cy}
        x2={2}
        y2={cy}
        stroke="#808C3E"
        strokeWidth={stroke}
        opacity="0.5"
      />
      {/* Filled arc */}
      {arcPath && (
        <path
          d={arcPath}
          fill="url(#oval-fill)"
          stroke="#808C3E"
          strokeWidth={stroke}
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

function ImprovedCard() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [titleIn, setTitleIn] = useState(false);
  const [bottomSvgIn, setBottomSvgIn] = useState(false);
  const [dottSvgIn, setDottSvgIn] = useState(false);
  const [pillIn, setPillIn] = useState(false);
  const [textIn, setTextIn] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t1 = setTimeout(() => setTitleIn(true), 0);
    const t2 = setTimeout(() => setBottomSvgIn(true), 350);
    const t3 = setTimeout(() => setDottSvgIn(true), 1400);
    const t4 = setTimeout(() => setPillIn(true), 2300);
    const t5 = setTimeout(() => setTextIn(true), 900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [inView]);

  return (
    <div
      ref={ref}
      style={{
        background: "#EAF1C1",
        borderRadius: "32px",
        position: "relative",
        overflow: "hidden",
        padding: "36px",
        minHeight: "460px",
      }}
    >
      {/* Bottom SVG — flush to bottom, reveals left → right */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "300px",
          zIndex: 0,
          clipPath: bottomSvgIn ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
          transition: `clip-path 1100ms ${EASE}`,
        }}
      >
        <img
          src={improvedSvg}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            display: "block",
            objectFit: "fill",
          }}
        />
      </div>

      {/* Dotted overlay SVG — above bottom SVG, also reveals left → right */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "60px",
          height: "130px",
          zIndex: 1,
          clipPath: dottSvgIn ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
          transition: `clip-path 900ms ${EASE}`,
        }}
      >
        <img
          src={improvedDottSvg}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            display: "block",
            objectFit: "fill",
            transform: "rotate(-2.5deg)",
            transformOrigin: "left center",
          }}
        />
      </div>

      {/* "Improved" title */}
      <h3
        style={{
          position: "absolute",
          top: "36px",
          left: "36px",
          color: "#112115",
          fontFamily: "Halant, serif",
          fontSize: "72px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "normal",
          letterSpacing: "-2.88px",
          margin: 0,
          zIndex: 3,
          opacity: titleIn ? 1 : 0,
          transform: titleIn ? "translateY(0)" : "translateY(24px)",
          transition: `opacity 900ms ${EASE}, transform 900ms ${EASE}`,
        }}
      >
        Improved
      </h3>

      {/* "Tools" label top right */}
      <span
        style={{
          position: "absolute",
          top: "44px",
          right: "36px",
          color: "#112115",
          fontFamily: "Geist, sans-serif",
          fontSize: "18px",
          fontWeight: 400,
          lineHeight: "normal",
          letterSpacing: "-0.36px",
          opacity: 0.6,
          zIndex: 3,
        }}
      >
        Tools
      </span>

      {/* Avg sleep pill */}
      <div
        style={{
          position: "absolute",
          top: "225px",
          left: "168px",
          zIndex: 3,
          opacity: pillIn ? 1 : 0,
          transform: pillIn ? "translateY(0) scale(1)" : "translateY(12px) scale(0.96)",
          transition: `opacity 700ms ${EASE}, transform 700ms ${EASE}`,
        }}
      >
        <span
          style={{
            display: "inline-flex",
            height: "40px",
            padding: "8px 18px",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            borderRadius: "48px",
            border: "2px solid #EAF1C1",
            background: "#BECB6D",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            color: "#FFF",
            fontFamily: "Geist, sans-serif",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "normal",
            letterSpacing: "-0.32px",
          }}
        >
          Avg sleep: 28%
        </span>
      </div>

      {/* Sleep tools text block */}
      <div
        style={{
          position: "absolute",
          top: "330px",
          left: "36px",
          right: "36px",
          zIndex: 3,
        }}
      >
        <h4
          style={{
            color: "#112115",
            fontFamily: "Geist, sans-serif",
            fontSize: "32px",
            fontWeight: 400,
            lineHeight: "normal",
            letterSpacing: "-0.64px",
            margin: 0,
            opacity: textIn ? 1 : 0,
            transform: textIn ? "translateY(0)" : "translateY(30px)",
            transition: `opacity 800ms ${EASE}, transform 800ms ${EASE}`,
          }}
        >
          Sleep tools
        </h4>
        <p
          style={{
            marginTop: "12px",
            color: "#112115",
            fontFamily: "Geist, sans-serif",
            fontSize: "18px",
            fontWeight: 400,
            lineHeight: "normal",
            letterSpacing: "-0.36px",
            opacity: textIn ? 0.7 : 0,
            transform: textIn ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 900ms ${EASE} 180ms, transform 900ms ${EASE} 180ms`,
          }}
        >
          Wind-down routines, soundscapes, and stories
          <br />
          for deeper rest.
        </p>
      </div>
    </div>
  );
}
