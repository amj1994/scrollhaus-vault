import { useState } from "react";
import { useInView } from "@/hooks/use-in-view";
const BgGreen = "https://qclay.design/lovable/shyen/bg_green_big.png";
const BgDoctorGreen = "https://qclay.design/lovable/shyen/bg_doctor_green.png";
const BgOrange = "https://qclay.design/lovable/shyen/orange_br_big.png";
const BgTwoSector = "https://qclay.design/lovable/shyen/two_sector.png";
const Doctor = "https://qclay.design/lovable/shyen/doctor.png";
const Doctor2 = "https://qclay.design/lovable/shyen/doctor2.png";
const Quote = "https://qclay.design/lovable/shyen/quote.svg";
const BeforeNumber = "https://qclay.design/lovable/shyen/before_number.svg";
const LeftArrow = "https://qclay.design/lovable/shyen/left.svg";
const RightArrow = "https://qclay.design/lovable/shyen/right.svg";
const LogoDevelop = "https://qclay.design/lovable/shyen/develop_health_b.png";
const LogoHealthAI = "https://qclay.design/lovable/shyen/health_ai_b.png";
const LogoAIInHealth = "https://qclay.design/lovable/shyen/ai_in_health_b.png";
const LogoQuantum = "https://qclay.design/lovable/shyen/quantum_b.png";
const LogoAIMedical = "https://qclay.design/lovable/shyen/ai_medical_b.png";

type Slide = {
  reviewBg: string;
  cardBg: string;
  image: string;
  textLines: string[];
  author: string;
};

const SLIDES: Slide[] = [
  {
    reviewBg: BgGreen,
    cardBg: BgDoctorGreen,
    image: Doctor,
    textLines: [
      "Aa a doc I struggled with focus and stress daily.",
      "Shyen AI gave me a routine that works, like a",
      "personal guide for my mind, always there when",
      "needed.",
    ],
    author: "Dr. Philip Deibel",
  },
  {
    reviewBg: BgOrange,
    cardBg: BgTwoSector,
    image: Doctor2,
    textLines: [
      "Shyen is one of the best ai tool for calming and",
      "health, i m now more focused on my work.. and i m",
      "loving it...",
    ],
    author: "Lara simaon",
  },
  {
    reviewBg: BgGreen,
    cardBg: BgDoctorGreen,
    image: Doctor,
    textLines: [
      "Aa a doc I struggled with focus and stress daily.",
      "Shyen AI gave me a routine that works, like a",
      "personal guide for my mind, always there when",
      "needed.",
    ],
    author: "Dr. Philip Deibel",
  },
  {
    reviewBg: BgOrange,
    cardBg: BgTwoSector,
    image: Doctor2,
    textLines: [
      "Shyen is one of the best ai tool for calming and",
      "health, i m now more focused on my work.. and i m",
      "loving it...",
    ],
    author: "Lara simaon",
  },
];

const REVIEW_W = 850;
const CARD_W = 350;
const INNER_GAP = 20;
const SLIDE_GAP = 40;
const SLIDE_W = REVIEW_W + INNER_GAP + CARD_W; // 1220

const PARTNER_LOGOS = [
  { src: LogoDevelop, alt: "Develop Health" },
  { src: LogoHealthAI, alt: "Health AI" },
  { src: LogoAIInHealth, alt: "AI in Health Research Network" },
  { src: LogoQuantum, alt: "Quantum Health AI" },
  { src: LogoAIMedical, alt: "AI Medical Technology" },
];

export default function StoriesSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const [drag, setDrag] = useState(0);
  const [base, setBase] = useState(0);
  const [start, setStart] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const maxOffset = -(SLIDES.length - 1) * (SLIDE_W + SLIDE_GAP);
  const offset = Math.max(maxOffset, Math.min(0, base + drag));

  const goTo = (idx: number) => {
    const clamped = Math.max(0, Math.min(SLIDES.length - 1, idx));
    setBase(-clamped * (SLIDE_W + SLIDE_GAP));
    setDrag(0);
    setActiveIndex(clamped);
  };

  const onDown = (e: React.PointerEvent) => {
    setStart(e.clientX);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (start === null) return;
    setDrag(e.clientX - start);
  };
  const onUp = () => {
    if (start === null) return;
    let nextIdx = activeIndex;
    if (drag < -100) nextIdx = activeIndex + 1;
    else if (drag > 100) nextIdx = activeIndex - 1;
    nextIdx = Math.max(0, Math.min(SLIDES.length - 1, nextIdx));
    setActiveIndex(nextIdx);
    setBase(-nextIdx * (SLIDE_W + SLIDE_GAP));
    setDrag(0);
    setStart(null);
  };

  const headingWords = ["The", "real", "stories.", "Real", "impact."];
  const partnerTrack = [...PARTNER_LOGOS, ...PARTNER_LOGOS];

  return (
    <section ref={ref} className="relative w-full overflow-hidden" style={{ background: "#EEF2D8" }}>
      <div className="mx-auto max-w-[1440px]" style={{ paddingTop: 144 }}>
        <div style={{ textAlign: "center" }}>
          <h2
            style={{
              margin: 0,
              color: "#122216",
              fontFamily: "Halant, serif",
              fontSize: 72,
              fontWeight: 400,
              lineHeight: "72px",
              letterSpacing: "-3.6px",
            }}
          >
            <span style={{ display: "block" }}>
              {headingWords.slice(0, 3).map((w, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    marginRight: i < 2 ? "0.28em" : 0,
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(30px)",
                    transition: `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${i * 80}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${i * 80}ms`,
                  }}
                >
                  {w}
                </span>
              ))}
            </span>
            <span style={{ display: "block" }}>
              {headingWords.slice(3).map((w, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    marginRight: i < 1 ? "0.28em" : 0,
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(30px)",
                    transition: `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${(3 + i) * 80}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${(3 + i) * 80}ms`,
                  }}
                >
                  {w}
                </span>
              ))}
            </span>
          </h2>
          <p
            style={{
              marginTop: 24,
              marginBottom: 0,
              color: "#122215",
              fontFamily: "Geist, sans-serif",
              fontSize: 20,
              fontWeight: 400,
              lineHeight: "26px",
              letterSpacing: "-0.4px",
              opacity: inView ? 0.5 : 0,
              transform: inView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 700ms cubic-bezier(0.22,1,0.36,1) 500ms, transform 700ms cubic-bezier(0.22,1,0.36,1) 500ms",
            }}
          >
            <span style={{ display: "block" }}>See how Shyen helps others, and find out</span>
            <span style={{ display: "block" }}>what it can do for you.</span>
          </p>
        </div>
      </div>

      {/* Slider — breaks out of max-w to reveal next slide peek on the right */}
      <div
        style={{
          marginTop: 48,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 800ms cubic-bezier(0.22,1,0.36,1) 700ms, transform 800ms cubic-bezier(0.22,1,0.36,1) 700ms",
        }}
      >
        <div
          style={{
            overflow: "hidden",
            touchAction: "pan-y",
            cursor: start !== null ? "grabbing" : "grab",
            userSelect: "none",
            WebkitMaskImage:
              "linear-gradient(to right, black 0%, black 92%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, black 0%, black 92%, transparent 100%)",
          }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          <div
            style={{
              display: "flex",
              gap: SLIDE_GAP,
              paddingLeft: "max(120px, calc((100vw - 1440px) / 2 + 120px))",
              paddingRight: 120,
              transform: `translateX(${offset}px)`,
              transition:
                start !== null
                  ? "none"
                  : "transform 900ms cubic-bezier(0.22,1,0.36,1)",
              willChange: "transform",
            }}
          >
            {SLIDES.map((s, i) => (
              <SlideItem
                key={i}
                slide={s}
                index={i}
                inView={inView}
                fade={i >= activeIndex ? 1 : 0}
                dragging={start !== null}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px]" style={{ paddingBottom: 144 }}>


        {/* Navigation row */}
        <div
          style={{
            marginTop: 48,
            paddingLeft: 120,
            paddingRight: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: inView ? 1 : 0,
            transition: "opacity 700ms cubic-bezier(0.22,1,0.36,1) 1100ms",
          }}
        >
          {/* Numbers */}
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <img src={BeforeNumber} alt="" style={{ width: 36, height: 36 }} draggable={false} />
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              {SLIDES.map((_, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      color: "#122216",
                      fontFamily: "Halant, serif",
                      fontSize: 28,
                      fontWeight: 400,
                      lineHeight: "29.598px",
                      letterSpacing: "-0.56px",
                      opacity: isActive ? 1 : 0.4,
                      transition: "opacity 300ms ease",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Arrows */}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <ArrowButton
              src={LeftArrow}
              disabled={activeIndex === 0}
              onClick={() => goTo(activeIndex - 1)}
            />
            <ArrowButton
              src={RightArrow}
              disabled={activeIndex >= SLIDES.length - 1}
              onClick={() => goTo(activeIndex + 1)}
            />
          </div>
        </div>

        {/* Divider */}
        <div style={{ marginTop: 52, display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: 1272,
              maxWidth: "calc(100% - 240px)",
              borderTop: "1.5px solid rgba(18, 34, 22, 0.10)",
            }}
          />
        </div>

        {/* Partners marquee */}
        <div
          style={{
            marginTop: 56,
            position: "relative",
            overflow: "hidden",
            paddingLeft: 120,
            paddingRight: 120,
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, #000 12%, #000 88%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0, #000 12%, #000 88%, transparent 100%)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 96,
              width: "max-content",
              animation: "storiesMarquee 40s linear infinite",
              willChange: "transform",
            }}
          >
            {partnerTrack.map((l, i) => (
              <div
                key={i}
                style={{
                  flexShrink: 0,
                  height: 56,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={l.src}
                  alt={l.alt}
                  style={{ height: "100%", width: "auto", objectFit: "contain", display: "block" }}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes storiesMarquee {
          from { transform: translate3d(0,0,0); }
          to { transform: translate3d(-50%,0,0); }
        }
      `}</style>
    </section>
  );
}

function ArrowButton({
  src,
  disabled,
  onClick,
}: {
  src: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 48.537,
        height: 48.537,
        borderRadius: "50%",
        background: "#FFF",
        opacity: disabled ? 0.4 : 1,
        boxShadow: "0 1px 20px 0 #EEEADE",
        border: "none",
        padding: 0,
        cursor: disabled ? "default" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 300ms ease",
      }}
    >
      <img src={src} alt="" style={{ width: 32, height: 32 }} draggable={false} />
    </button>
  );
}

function SlideItem({
  slide,
  index,
  inView,
  fade,
  dragging,
}: {
  slide: Slide;
  index: number;
  inView: boolean;
  fade: number;
  dragging: boolean;
}) {
  const baseDelay = 900 + index * 120;
  return (
    <div
      style={{
        display: "flex",
        gap: INNER_GAP,
        flexShrink: 0,
        opacity: inView ? (dragging ? Math.max(fade, 0.5) : fade) : 0,
        transition: dragging ? "none" : "opacity 700ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Review card */}
      <div
        style={{
          position: "relative",
          width: REVIEW_W,
          height: 400,
          borderRadius: 24,
          background: `#BECB6D url(${slide.reviewBg}) center/cover no-repeat`,
          overflow: "hidden",
          transform: inView ? "translateY(0)" : "translateY(40px)",
          transition: `transform 800ms cubic-bezier(0.22,1,0.36,1) ${baseDelay}ms`,
        }}
      >
        <img
          src={Quote}
          alt=""
          style={{ position: "absolute", left: 54, top: 49, width: 29, height: 33 }}
          draggable={false}
        />
        <div
          style={{
            position: "absolute",
            left: 54,
            top: 49 + 33 + 40,
            right: 54,
            color: "#FFF",
            fontFamily: "Halant, serif",
            fontSize: 32,
            fontWeight: 400,
            lineHeight: "33px",
            letterSpacing: "-0.64px",
          }}
        >
          {slide.textLines.map((l, i) => (
            <span key={i} style={{ display: "block" }}>{l}</span>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            left: 54,
            bottom: 49,
            color: "#FFF",
            fontFamily: "Geist, sans-serif",
            fontSize: 20,
            fontWeight: 500,
            lineHeight: "26px",
            letterSpacing: "-0.4px",
          }}
        >
          {slide.author}
        </div>
      </div>

      {/* Doctor card */}
      <div
        style={{
          position: "relative",
          width: CARD_W,
          height: 400,
          borderRadius: 24,
          background: `#BECB6D url(${slide.cardBg}) center/cover no-repeat`,
          overflow: "hidden",
          transform: inView ? "translateY(0)" : "translateY(40px)",
          transition: `transform 800ms cubic-bezier(0.22,1,0.36,1) ${baseDelay + 140}ms`,
        }}
      >
        <img
          src={slide.image}
          alt=""
          draggable={false}
          style={{
            position: "absolute",
            left: "50%",
            bottom: 0,
            transform: "translateX(-50%)",
            width: 381,
            height: 453,
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
    </div>
  );
}
