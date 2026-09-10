import { useState } from "react";
const PersonIcon = "https://qclay.design/lovable/shyen/Person.svg";
const MoonIcon = "https://qclay.design/lovable/shyen/Moon.svg";
const SmilyIcon = "https://qclay.design/lovable/shyen/Smily.svg";
const LogoDark = "https://qclay.design/lovable/shyen/Logo_dark.svg";
const HorizontalSvg = "https://qclay.design/lovable/shyen/horizontal.svg";
const LineSvg = "https://qclay.design/lovable/shyen/line.svg";
const BoolSvg = "https://qclay.design/lovable/shyen/bool.svg";
const SliderBg = "https://qclay.design/lovable/shyen/slider_bg.png";
const BeforeNumber = "https://qclay.design/lovable/shyen/before_number.svg";
const UpRight = "https://qclay.design/lovable/shyen/UpRight.svg";

type Item = {
  icon: string;
  label: string;
  title: string;
  list: string[];
};

const ITEMS: Item[] = [
  {
    icon: PersonIcon,
    label: "Relaxation & Focus",
    title: "Relaxation & Focus",
    list: [
      "Practice guided breathing to instantly reduce stress and reset your mind",
      "Track your mood patterns to understand what affects your energy",
      "Take mindful breaks during the day to avoid burnout",
      "Build a consistent routine with AI-powered recommendations",
    ],
  },
  {
    icon: MoonIcon,
    label: "Sleep and Recovery",
    title: "Sleep and Recovery",
    list: [
      "Wind down with guided routines that prepare your mind for sleep",
      "Track recovery patterns synced with your wearables",
      "Personalized AI tips for deeper, restorative rest",
      "Build a consistent sleep rhythm that energizes your day",
    ],
  },
  {
    icon: SmilyIcon,
    label: "Mental Clarity & Mood",
    title: "Mental Clarity & Mood",
    list: [
      "Track your mood patterns to understand what affects your energy",
      "Daily check-ins powered by Shyen AI mood intelligence",
      "Identify triggers and improve emotional balance",
      "Boost clarity with personalized mindfulness practices",
    ],
  },
  {
    icon: LogoDark,
    label: "Shyen AI tips",
    title: "Shyen AI tips",
    list: [
      "Personalized AI tips tailored to your daily mental state",
      "Smart recommendations that evolve with your habits",
      "Instant guidance for stress, focus, and recovery",
      "Unlimited science-backed insights from Shyen AI",
    ],
  },
];

const ICON_SIZE = 80;
const GAP = 72;
const STEP = ICON_SIZE + GAP; // 152px

const LINE_W = 220;
const LINE_H = 1088;
// Per spec: bool sits at top:635px within the line container (the curve bend)
const BOOL_TOP_IN_LINE = 635;
// Offset of the bend (where bool sits) from the line container's vertical center
const BOOL_OFFSET = BOOL_TOP_IN_LINE - LINE_H / 2; // 91

export default function HoverSliderSection() {
  const [active, setActive] = useState<number | null>(null);
  const hasActive = active !== null;
  const activeItem = hasActive ? ITEMS[active!] : null;

  const itemCenter = (i: number) => i * STEP + ICON_SIZE / 2;
  const menuHeight = ITEMS.length * ICON_SIZE + (ITEMS.length - 1) * GAP;

  // When centered, the bend sits at menuHeight/2. Shift so bend lands at itemCenter(active).
  const targetY = hasActive ? itemCenter(active!) : menuHeight / 2;
  const lineTranslate = targetY - menuHeight / 2 - BOOL_OFFSET;

  return (
    <section className="relative w-full overflow-hidden" style={{ background: "#FBFFE6" }}>
      <div className="mx-auto max-w-[1440px]" style={{ paddingTop: 140, paddingBottom: 140 }}>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            minHeight: menuHeight + 80,
          }}
        >
          {/* LEFT COLUMN */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: `${GAP}px`,
            }}
          >
            {ITEMS.map((it, i) => {
              const isActive = active === i;
              const dim = !isActive;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setActive(i)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 24,
                    cursor: "pointer",
                    opacity: dim ? 0.5 : 1,
                    transition: "opacity 500ms cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: 80,
                      height: 80,
                      justifyContent: "center",
                      alignItems: "center",
                      aspectRatio: "1/1",
                      borderRadius: 96,
                      border: isActive
                        ? "2px solid rgba(18,34,22,0.10)"
                        : "2px solid transparent",
                      background: "#DDE3B9",
                      boxShadow: "0 0 36px 0 rgba(255,255,255,0.60) inset",
                      transition: "border-color 400ms ease",
                      flexShrink: 0,
                    }}
                  >
                    <img src={it.icon} alt="" style={{ width: 32, height: 32 }} />
                  </div>
                  <span
                    style={{
                      color: "#122216",
                      fontFamily: "Halant, serif",
                      fontSize: 32,
                      fontWeight: 400,
                      lineHeight: "26px",
                      letterSpacing: "-1.6px",
                    }}
                  >
                    {it.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* INDICATOR WRAPPER (no clipping — divider can exceed bounds) */}
          <div
            style={{
              position: "absolute",
              left: 560,
              top: "50%",
              transform: "translateY(-50%)",
              width: LINE_W,
              height: menuHeight,
              pointerEvents: "none",
            }}
          >
            {/* Vertical divider — extends beyond section, soft fade at edges */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                marginLeft: 94,
                height: 1400,
                width: 10,
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
                pointerEvents: "none",
              }}
            >
              <img
                src={HorizontalSvg}
                alt=""
                style={{ width: 10, height: 1400, display: "block" }}
              />
            </div>
            {/* Curve + marker — soft edge fade, no hard clipping */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                width: LINE_W,
                height: menuHeight,
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  width: LINE_W,
                  height: LINE_H,
                  transform: `translateY(calc(-50% + ${lineTranslate}px))`,
                  transition: "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
                  willChange: "transform",
                }}
              >
                <img
                  src={LineSvg}
                  alt=""
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: LINE_W,
                    height: LINE_H,
                  }}
                />
                <img
                  src={BoolSvg}
                  alt=""
                  style={{
                    position: "absolute",
                    left: 20,
                    top: BOOL_TOP_IN_LINE,
                    width: 56,
                    height: 56,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div
            style={{
              marginLeft: "auto",

              width: 560,
              minHeight: menuHeight,
            }}
          >
            {hasActive && activeItem && (
              <RightContent item={activeItem} key={activeItem.label} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function RightContent({ item }: { item: Item }) {
  return (
    <div>
      {/* Panel */}
      <div
        style={{
          position: "relative",
          minWidth: 512,
          height: 314,
          borderRadius: 24,
          border: "1px solid #FFF",
          background: `#122216 url(${SliderBg}) center/cover no-repeat`,
          boxShadow: "0 20px 68px 0 rgba(255,255,255,0.43) inset",
          overflow: "hidden",
          animation: "hssFadeUp 600ms cubic-bezier(0.22,1,0.36,1) 0ms both",
        }}
      >
        <PanelInner item={item} />
      </div>

      {/* Title */}
      <h3
        style={{
          marginTop: 48,
          marginBottom: 0,
          color: "#122216",
          fontFamily: "Halant, serif",
          fontSize: 40,
          fontWeight: 400,
          lineHeight: "40px",
          letterSpacing: "-2px",
          animation: "hssFadeUp 600ms cubic-bezier(0.22,1,0.36,1) 700ms both",
        }}
      >
        <span style={{ display: "block" }}>Relaxation &amp; Focus designed to</span>
        <span style={{ display: "block" }}>calm your mind and sharpen</span>
        <span style={{ display: "block" }}>your clarity</span>
      </h3>

      {/* Paragraph */}
      <p
        style={{
          marginTop: 23,
          marginBottom: 0,
          color: "#122216",
          fontFamily: "Geist, sans-serif",
          fontSize: 20,
          fontWeight: 400,
          lineHeight: "23px",
          letterSpacing: "-0.4px",
          opacity: 0.7,
          animation: "hssFadeUp 600ms cubic-bezier(0.22,1,0.36,1) 820ms both",
        }}
      >
        <span style={{ display: "block" }}>Find your balance with AI-guided support that helps you</span>
        <span style={{ display: "block" }}>reduce stress, stay present, and improve your focus</span>
        <span style={{ display: "block" }}>throughout the day.</span>
      </p>

      {/* CTA */}
      <div
        style={{
          marginTop: 48,
          display: "flex",
          height: 60,
          padding: 20,
          alignItems: "center",
          gap: 8,
          alignSelf: "stretch",
          borderRadius: 100,
          border: "1px solid #FBFFE6",
          background: "#BECB6D",
          boxShadow:
            "0 0 0 1.5px rgba(19,35,23,0.10), 0 0 54px 0 #FFF inset, 0 0 14px 0 #FFF inset",
          animation: "hssFadeUp 600ms cubic-bezier(0.22,1,0.36,1) 940ms both",
        }}
      >
        <img src={LogoDark} alt="" style={{ width: 25.102, height: 25.097 }} />
        <span
          style={{
            marginLeft: 8,
            color: "#122216",
            fontFamily: "Halant, serif",
            fontSize: 18,
            fontWeight: 400,
            lineHeight: "20px",
            letterSpacing: "-0.36px",
          }}
        >
          Get unlimited tips from Shyen AI
        </span>
        <div
          style={{
            marginLeft: "auto",
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "#F0F3DF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={UpRight} alt="" style={{ width: 24, height: 24 }} />
        </div>
      </div>

      <style>{`
        @keyframes hssFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function PanelInner({ item }: { item: Item }) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 24,
          top: 30,
          color: "#FFF",
          fontFamily: "Halant, serif",
          fontSize: 32,
          fontWeight: 400,
          lineHeight: "26px",
          letterSpacing: "-1.6px",
          animation: "hssFadeUp 500ms cubic-bezier(0.22,1,0.36,1) 180ms both",
        }}
      >
        {item.title}
      </div>
      <div
        style={{
          position: "absolute",
          left: 24,
          right: 24,
          top: 30 + 26 + 18,
          display: "flex",
          padding: 20,
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 12,
          borderRadius: 16,
          border: "1.5px solid rgba(255,255,255,0.20)",
          background: "rgba(190,203,109,0.60)",
          boxShadow: "0 20px 124px 0 rgba(255,255,255,0.30) inset",
          backdropFilter: "blur(26px)",
          WebkitBackdropFilter: "blur(26px)",
          animation: "hssFadeUp 500ms cubic-bezier(0.22,1,0.36,1) 260ms both",
        }}
      >
        {item.list.map((row, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 16,
              animation: `hssFadeUp 450ms cubic-bezier(0.22,1,0.36,1) ${320 + i * 90}ms both`,
            }}
          >
            <img
              src={BeforeNumber}
              alt=""
              style={{ width: 17, height: 17, opacity: 0.6, marginTop: 2, flexShrink: 0 }}
            />
            <span
              style={{
                color: "#FFF",
                fontFamily: "Geist, sans-serif",
                fontSize: 16,
                fontWeight: 400,
                lineHeight: "20px",
                letterSpacing: "-0.32px",
              }}
            >
              {row}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
