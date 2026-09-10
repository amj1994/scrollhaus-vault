import { useEffect, useRef, useState } from "react";
const fourVideo = "https://qclay.design/lovable/shyen/four.mp4";
const logo = "https://qclay.design/lovable/shyen/Logo.svg";
const beforeNumber = "https://qclay.design/lovable/shyen/before_number.svg";
const thoPackage = "https://qclay.design/lovable/shyen/tho_package.png";
const threePackage = "https://qclay.design/lovable/shyen/three_package.png";
const firstPackage = "https://qclay.design/lovable/shyen/first_package.png";
import { useInView } from "@/hooks/use-in-view";

type SlideKey = "01" | "02" | "03";

type Slide = {
  image: string;
  top: string;
  bottom: string;
};

const TOP_TEXT =
  "Shyen AI discovered your mind and habits\nand recommended meditation products\nthat truly fit you.";
const BOTTOM_TEXT =
  "Carefully matched recommendations to\nsupport your meditation journey and inner\nbalance every day.";

const SLIDES: Record<SlideKey, Slide> = {
  "01": { image: thoPackage, top: TOP_TEXT, bottom: BOTTOM_TEXT },
  "02": { image: threePackage, top: TOP_TEXT, bottom: BOTTOM_TEXT },
  "03": { image: firstPackage, top: TOP_TEXT, bottom: BOTTOM_TEXT },
};

const NUMS: SlideKey[] = ["01", "02", "03"];

const DOT_COUNT = 36;

function DotRow({
  inView,
  baseDelay,
  perDot = 25,
}: {
  inView: boolean;
  baseDelay: number;
  perDot?: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row-reverse",
        justifyContent: "flex-start",
      }}
    >
      {/* Large white anchor dot on the right */}
      <span
        style={{
          display: "block",
          width: "16px",
          height: "16px",
          borderRadius: "16px",
          background: "#FFF",
          flexShrink: 0,
          opacity: inView ? 1 : 0,
          transform: inView ? "scale(1)" : "scale(0.6)",
          transition: `opacity 320ms ease-out ${baseDelay}ms, transform 320ms ease-out ${baseDelay}ms`,
        }}
      />
      {Array.from({ length: DOT_COUNT }).map((_, i) => {
        // i = 0 is the dot closest to the white anchor (appears first)
        const delay = baseDelay + 200 + i * perDot;
        return (
          <span
            key={i}
            style={{
              display: "block",
              width: "2px",
              height: "2px",
              marginLeft: "3px",
              background: "rgba(255,255,255,0.5)",
              flexShrink: 0,
              opacity: inView ? 1 : 0,
              transition: `opacity 260ms ease-out ${delay}ms`,
            }}
          />
        );
      })}
    </div>
  );
}

// Animated counter for the stat card
function useCount(to: number, inView: boolean, durationMs = 1400, startDelay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    let start = 0;
    const t = window.setTimeout(() => {
      const step = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min(1, (ts - start) / durationMs);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(to * eased);
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, startDelay);
    return () => {
      window.clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [to, inView, durationMs, startDelay]);
  return value;
}

export default function RecommendedSection() {
  const [active, setActive] = useState<SlideKey>("02");
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  const transition =
    "opacity 500ms cubic-bezier(0.22,1,0.36,1), transform 500ms cubic-bezier(0.22,1,0.36,1)";

  // Timing plan (ms)
  const T = {
    glass: 0,
    logo: 350,
    headlineLine1: 550,
    productImage: 600, // begins while first line appears
    headlineLine2: 950,
    statsCard: 1250,
    counter: 1300,
    descBelow: 1750,
    // Right column
    rightDotsBase: 600,
    rightDotsPerDot: 28,
    topDescLine: 600 + DOT_COUNT * 28 + 80, // after dots finish
    numberNav: 0,
    bottomDots: 0,
    bottomDesc: 0,
  };
  T.numberNav = T.topDescLine + 450;
  T.bottomDots = T.numberNav + 350;
  T.bottomDesc = T.bottomDots + DOT_COUNT * 28 + 80;

  const counterValue = useCount(5.1, inView, 1500, T.counter);

  const headlineLine1Words = ["Most", "recommended"];
  const headlineLine2Words = ["Product", "all", "the", "time."];

  const renderWords = (words: string[], baseDelay: number, perWord = 70) => (
    <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
      {words.map((w, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            paddingBottom: "0.15em",
            paddingTop: "0.1em",
            marginRight: i === words.length - 1 ? 0 : "0.28em",
          }}
        >
          <span
            style={{
              display: "inline-block",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(30px)",
              transition: `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${
                baseDelay + i * perWord
              }ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${
                baseDelay + i * perWord
              }ms`,
            }}
          >
            {w}
          </span>
        </span>
      ))}
    </span>
  );

  const fadeStyle = (delay: number, y = 16) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : `translateY(${y}px)`,
    transition: `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  });

  return (
    <section
      ref={ref}
      className="recommended-section relative w-full overflow-hidden"
      style={{ background: "#FBFFE6" }}
    >
      {/* Layer 1: Background video */}
      <video
        src={fourVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      {/* Layer 2: Blur strip in lower half */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "32%",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.00) 22.79%, rgba(0,0,0,0.03) 110.59%)",
          filter: "blur(9px)",
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(50px)",
          zIndex: 1,
          pointerEvents: "none",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 30%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 30%)",
        }}
      />

      {/* Layer 3: Content wrapper */}
      <div
        className="relative mx-auto"
        style={{ maxWidth: "1280px", padding: "120px 20px", zIndex: 2 }}
      >
        {/* Glassmorphism content block */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "520px",
            borderRadius: "40px",
            overflow: "hidden",
            background: "rgba(0,0,0,0.25)",
            backdropFilter: "blur(100px)",
            WebkitBackdropFilter: "blur(100px)",
            ...fadeStyle(T.glass, 40),
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              padding: "60px",
              display: "flex",
              gap: "40px",
            }}
          >
            {/* LEFT COLUMN */}
            <div
              style={{
                flex: "0 0 520px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    color: "rgba(255,255,255,0.7)",
                    fontFamily: "Geist, sans-serif",
                    fontSize: "14px",
                    letterSpacing: "-0.28px",
                    marginBottom: "24px",
                    ...fadeStyle(T.logo, 12),
                  }}
                >
                  <img src={logo} alt="" style={{ width: "22px", height: "22px" }} />
                  AI-Powered Wellness
                </div>
                <h2
                  style={{
                    color: "#FFF",
                    fontFamily: "Halant, serif",
                    fontSize: "56px",
                    fontWeight: 400,
                    lineHeight: "56px",
                    letterSpacing: "-2.8px",
                    margin: 0,
                  }}
                >
                  {renderWords(headlineLine1Words, T.headlineLine1)}
                  <br />
                  {renderWords(headlineLine2Words, T.headlineLine2)}
                </h2>

                {/* Stat card */}
                <div
                  style={{
                    marginTop: "40px",
                    width: "440px",
                    borderRadius: "24px",
                    border: "1px solid rgba(255,255,255,0.18)",
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    paddingTop: "24px",
                    paddingLeft: "24px",
                    paddingRight: "24px",
                    paddingBottom: "26px",
                    ...fadeStyle(T.statsCard, 20),
                  }}
                >
                  {/* Row 1: [badge] [Stress Reduction] ... 5.1X on the right */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "14px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          height: "32px",
                          padding: "0 12px",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "999px",
                          border: "1px solid rgba(255,255,255,0.35)",
                          color: "#FFF",
                          fontFamily: "Geist, sans-serif",
                          fontSize: "14px",
                          fontWeight: 500,
                        }}
                      >
                        30%
                      </span>
                      <span
                        style={{
                          color: "#FFF",
                          fontFamily: "Geist, sans-serif",
                          fontSize: "20px",
                          fontWeight: 400,
                          lineHeight: "26px",
                          letterSpacing: "-0.4px",
                        }}
                      >
                        Stress Reduction
                      </span>
                    </div>
                    <span
                      style={{
                        color: "#FFF",
                        fontFamily: "Halant, serif",
                        fontSize: "40px",
                        fontWeight: 400,
                        letterSpacing: "-2px",
                        lineHeight: 1,
                      }}
                    >
                      {counterValue.toFixed(1)}X
                    </span>
                  </div>
                  {/* Row 2 — aligned with badge left edge */}
                  <div
                    style={{
                      marginTop: "6px",
                      color: "#FFF",
                      fontFamily: "Geist, sans-serif",
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "26px",
                      letterSpacing: "-0.32px",
                    }}
                  >
                    Deeper Relaxation
                  </div>
                </div>
              </div>

              <p
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontFamily: "Geist, sans-serif",
                  fontSize: "16px",
                  lineHeight: "24px",
                  letterSpacing: "-0.32px",
                  margin: 0,
                  maxWidth: "440px",
                  ...fadeStyle(T.descBelow, 16),
                }}
              >
                From guided sessions to natural supplements, find what
                <br />
                helps you meditate better and live calmer.
              </p>
            </div>

            {/* RIGHT COLUMN — slider */}
            <div style={{ flex: "1 1 0", position: "relative" }}>
              {/* Top dots row — top: 0 */}
              <div style={{ position: "absolute", top: "0px", left: "165px" }}>
                <DotRow inView={inView} baseDelay={T.rightDotsBase} perDot={T.rightDotsPerDot} />
              </div>

              {/* Top description — top: 53px, slide-synced */}
              <div
                style={{
                  position: "absolute",
                  top: "53px",
                  left: "23px",
                  right: 0,
                  height: "78px",
                  ...fadeStyle(T.topDescLine, 12),
                }}
              >
                {NUMS.map((n) => (
                  <div
                    key={n}
                    style={{
                      position: "absolute",
                      inset: 0,
                      color: "#FFF",
                      fontFamily: "Geist, sans-serif",
                      fontSize: "18px",
                      fontWeight: 400,
                      lineHeight: "26px",
                      letterSpacing: "-0.36px",
                      whiteSpace: "pre-line",
                      opacity: active === n ? 1 : 0,
                      transform: active === n ? "translateY(0)" : "translateY(8px)",
                      transition,
                      pointerEvents: active === n ? "auto" : "none",
                    }}
                  >
                    {SLIDES[n].top}
                  </div>
                ))}
              </div>

              {/* Number selector — top: 165px */}
              <div
                style={{
                  position: "absolute",
                  top: "165px",
                  left: "23px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  ...fadeStyle(T.numberNav, 12),
                }}
              >
                <img src={beforeNumber} alt="" style={{ width: "30px", height: "30px" }} />
                {NUMS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setActive(n)}
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      color: "#FFF",
                      opacity: active === n ? 1 : 0.45,
                      fontFamily: "Geist, sans-serif",
                      fontSize: "17px",
                      fontWeight: active === n ? 500 : 400,
                      letterSpacing: "-0.34px",
                      transition: "opacity 0.35s ease, font-weight 0.35s ease",
                    }}
                  >
                    {n}
                  </button>
                ))}
              </div>

              {/* Bottom dots row — top: 285px, left: 23px */}
              <div style={{ position: "absolute", top: "285px", left: "190px" }}>
                <DotRow inView={inView} baseDelay={T.bottomDots} perDot={T.rightDotsPerDot} />
              </div>

              {/* Bottom description — top: 325px, slide-synced */}
              <div
                style={{
                  position: "absolute",
                  top: "325px",
                  left: "23px",
                  right: 0,
                  height: "72px",
                  ...fadeStyle(T.bottomDesc, 12),
                }}
              >
                {NUMS.map((n) => (
                  <div
                    key={n}
                    style={{
                      position: "absolute",
                      inset: 0,
                      color: "rgba(255,255,255,0.7)",
                      fontFamily: "Geist, sans-serif",
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "24px",
                      letterSpacing: "-0.32px",
                      whiteSpace: "pre-line",
                      opacity: active === n ? 1 : 0,
                      transform: active === n ? "translateY(0)" : "translateY(8px)",
                      transition,
                      pointerEvents: active === n ? "auto" : "none",
                    }}
                  >
                    {SLIDES[n].bottom}
                  </div>
                ))}
              </div>

              {/* Product image — slightly outside on the right */}
              <div
                style={{
                  position: "absolute",
                  right: "-20px",
                  top: "50%",
                  width: "203px",
                  height: "459px",
                  transform: "translateY(-50%)",
                }}
              >
                {NUMS.map((n) => {
                  const isActive = active === n;
                  // Use product-image appearance timing for initial entrance
                  return (
                    <img
                      key={n}
                      src={SLIDES[n].image}
                      alt=""
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        opacity: inView ? (isActive ? 1 : 0) : 0,
                        transform: inView
                          ? isActive
                            ? "translateY(0)"
                            : "translateY(12px)"
                          : "translateY(24px)",
                        transition: `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${
                          isActive && !inView ? 0 : isActive ? T.productImage : 0
                        }ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${
                          isActive ? T.productImage : 0
                        }ms`,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
