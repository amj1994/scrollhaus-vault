import { useEffect, useState } from "react";
const logoHeader = "https://qclay.design/lovable/shyen/logo-header.svg";
const headerVideo = "/hero-video.mp4";
const avatar = "https://qclay.design/lovable/shyen/header_elipse.png";
const logoBottom = "https://qclay.design/lovable/shyen/logo_bottom.svg";
const leftBg = "https://qclay.design/lovable/shyen/left.png";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const menuItems = [
    { label: "Home", href: "#" },
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how" },
    { label: "Stories", href: "#stories" },
    { label: "Contact", href: "#contact" },
  ];

  // Timeline (ms)
  const T = {
    video: 0,            // 1.2s reveal
    nav: 960,            // bar draws (0.7s) — at ~80% of video
    logo: 1500,          // logo + burger
    burger2: 1620,
    cta: 1700,           // join waitlist over video
    heading: 1900,       // words stagger
    paragraph: 2800,     // lines
    form: 3300,          // pulse
    avatar: 4000,        // avatar + loader
    testimonial: 4250,
    labels: 4600,        // 3 labels, 120ms apart
  };

  const headingWords = ["Your", "mind", "never", "gonna", "stop."];
  const paragraphLines = [
    "Shyen is 24/7 support for your mind. Created by",
    "renowned clinicians, it gives you the support you need,",
    "right when you need it.",
  ];

  return (
    <section className="hero-section relative w-full h-screen overflow-hidden bg-[#091814]">
      {/* Atmospheric blurred gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute z-0"
        style={{
          width: "1808px",
          height: "1808px",
          borderRadius: "1808px",
          background:
            "linear-gradient(325deg, #375B39 59.55%, #FAFF67 93.35%)",
          filter: "blur(150px)",
          left: "-300px",
          top: "-500px",
        }}
      />

      {/* Pulse keyframe */}
      <style>{`
        @keyframes heroFormPulse {
          0%   { opacity: 0; transform: scale(0.85); }
          60%  { opacity: 1; transform: scale(1.04); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Two columns */}
      <div className="relative z-10 grid h-full grid-cols-2">
        {/* LEFT */}
        <div
          className="relative h-full"
          style={{
            backgroundImage: `url(${leftBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute left-10 bottom-12 right-[133px]">
            {/* HEADING — word by word */}
            <h1
              className="text-white"
              style={{
                fontFamily: "Halant, serif",
                fontSize: "96px",
                fontWeight: 400,
                lineHeight: "80px",
                letterSpacing: "-7.68px",
              }}
            >
              {[headingWords.slice(0, 3), headingWords.slice(3)].map(
                (line, li) => (
                  <span key={li} style={{ display: "block" }}>
                    {line.map((w, wi) => {
                      const idx = li === 0 ? wi : 3 + wi;
                      const delay = T.heading + idx * 110;
                      return (
                        <span
                          key={wi}
                          style={{
                            display: "inline-block",
                            paddingBottom: "0.15em",
                            paddingTop: "0.1em",
                            marginRight: wi === line.length - 1 ? 0 : "0.18em",
                          }}
                        >
                          <span
                            style={{
                              display: "inline-block",
                              opacity: mounted ? 1 : 0,
                              transform: mounted
                                ? "translateY(0)"
                                : "translateY(35px)",
                              transition: `opacity 0.8s ${EASE} ${delay}ms, transform 0.9s ${EASE} ${delay}ms`,
                            }}
                          >
                            {w}
                          </span>
                        </span>
                      );
                    })}
                  </span>
                )
              )}
            </h1>

            {/* PARAGRAPH — line by line */}
            <p
              className="mt-6 text-white/70"
              style={{
                fontFamily: "Geist, sans-serif",
                fontSize: "20px",
                lineHeight: "26px",
                letterSpacing: "-0.4px",
              }}
            >
              {paragraphLines.map((line, i) => {
                const delay = T.paragraph + i * 100;
                return (
                  <span
                    key={i}
                    style={{
                      display: "block",
                      opacity: mounted ? 1 : 0,
                      transform: mounted ? "translateY(0)" : "translateY(20px)",
                      transition: `opacity 0.7s ${EASE} ${delay}ms, transform 0.7s ${EASE} ${delay}ms`,
                    }}
                  >
                    {line}
                  </span>
                );
              })}
            </p>

            {/* FORM — single pulse */}
            <form
              className="mt-8 flex items-center justify-between"
              style={{
                width: "583px",
                padding: "7px 8px 7px 7px",
                borderRadius: "58px",
                background: "rgba(0, 0, 0, 0.16)",
                backdropFilter: "blur(15px)",
                WebkitBackdropFilter: "blur(15px)",
                transformOrigin: "left center",
                opacity: mounted ? 1 : 0,
                animation: mounted
                  ? `heroFormPulse 0.7s ${EASE} ${T.form}ms both`
                  : "none",
              }}
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-transparent border-0 outline-none px-5 text-white placeholder:text-white/40"
                style={{
                  fontFamily: "Geist, sans-serif",
                  fontSize: "18px",
                  lineHeight: "20px",
                  letterSpacing: "-0.18px",
                }}
              />
              <PillButton>Join waitlist</PillButton>
            </form>
          </div>
        </div>

        {/* RIGHT — video column with curtain reveal */}
        <div
          className="relative h-full overflow-hidden"
          style={{
            clipPath: mounted ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
            WebkitClipPath: mounted ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
            transition: `clip-path 1.2s ${EASE}, -webkit-clip-path 1.2s ${EASE}`,
          }}
        >
          <video
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "center 33%" }}
            src={headerVideo}
            poster="/hero-poster.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40" />

          {/* Soft blur overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute z-10"
            style={{
              left: 0,
              right: 0,
              bottom: 0,
              top: "calc(100% - 246px)",
              background:
                "linear-gradient(179deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.06) 80%)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 30%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 30%)",
            }}
          />

          {/* CTA Join waitlist */}
          <div
            className="absolute z-20"
            style={{
              top: "59px",
              right: "40px",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(15px)",
              transition: `opacity 0.5s ${EASE} ${T.cta}ms, transform 0.5s ${EASE} ${T.cta}ms`,
            }}
          >
            <PillButton>Join waitlist</PillButton>
          </div>

          {/* Feature tags */}
          <div
            className="absolute z-20 flex flex-col items-end"
            style={{ right: "40px", bottom: "48px", gap: "8px" }}
          >
            {["AI Meditation", "Full Body syncing", "AI and Data into actions"].map(
              (t, i) => {
                const delay = T.labels + i * 120;
                return (
                  <span
                    key={t}
                    className="text-white"
                    style={{
                      display: "flex",
                      height: "40px",
                      padding: "8px 18px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "8px",
                      borderRadius: "48px",
                      background: "rgba(17, 33, 21, 0.20)",
                      backdropFilter: "blur(15px)",
                      WebkitBackdropFilter: "blur(15px)",
                      fontFamily: "Geist, sans-serif",
                      fontSize: "16px",
                      lineHeight: "normal",
                      letterSpacing: "-0.32px",
                      transformOrigin: "left center",
                      opacity: mounted ? 1 : 0,
                      transform: mounted ? "scaleX(1)" : "scaleX(0)",
                      transition: `opacity 0.5s ${EASE} ${delay}ms, transform 0.7s ${EASE} ${delay}ms`,
                    }}
                  >
                    {t}
                  </span>
                );
              }
            )}
          </div>

          {/* Testimonial — diagonal float */}
          <div
            className="absolute z-20"
            style={{
              left: "40px",
              bottom: "246px",
              width: "390px",
              opacity: mounted ? 1 : 0,
              transform: mounted
                ? "translate(0, 0)"
                : "translate(-40px, 40px)",
              transition: `opacity 0.9s ${EASE} ${T.testimonial}ms, transform 1s ${EASE} ${T.testimonial}ms`,
            }}
          >
            <div
              style={{
                padding: "20px",
                borderRadius: "24px",
                background: "rgba(17, 33, 21, 0.24)",
                boxShadow: "0 0 10px 0 rgba(17, 33, 21, 0.13) inset",
                backdropFilter: "blur(5px)",
                WebkitBackdropFilter: "blur(5px)",
              }}
            >
              <p
                className="text-white"
                style={{
                  fontFamily: "Geist, sans-serif",
                  fontSize: "18px",
                  lineHeight: "20px",
                  letterSpacing: "-0.36px",
                }}
              >
                "This helped me organize my thoughts when I felt overwhelmed,
                and finally had a place to express myself without fear of
                judgment."
              </p>
            </div>
            <div
              className="mt-3 flex items-center gap-3"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateX(0)" : "translateX(30px)",
                transition: `opacity 0.7s ${EASE} ${T.avatar}ms, transform 0.7s ${EASE} ${T.avatar}ms`,
              }}
            >
              <div
                className="h-9 w-9"
                style={{
                  borderRadius: "36px",
                  border: "1px solid rgba(255, 255, 255, 0.61)",
                  backgroundImage: `url(${avatar})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <span
                className="text-white"
                style={{
                  fontFamily: "Halant, serif",
                  fontSize: "20px",
                  lineHeight: "20px",
                  letterSpacing: "-0.4px",
                }}
              >
                Lara simon
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom-left rotating logo + loader */}
      <div
        className="absolute z-30 flex items-center gap-4"
        style={{
          left: "calc(50% + 40px)",
          bottom: "48px",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateX(0)" : "translateX(-30px)",
          transition: `opacity 0.7s ${EASE} ${T.avatar}ms, transform 0.7s ${EASE} ${T.avatar}ms`,
        }}
      >
        <img
          src={logoBottom}
          alt=""
          style={{
            width: "25.102px",
            height: "25.097px",
            opacity: 0.4,
            animation: "spin 12s linear infinite",
          }}
        />
        <div className="flex items-center gap-[6px]">
          <span
            className="block rounded-full"
            style={{
              width: "10px",
              height: "10px",
              background: "#FFF",
              animation: "loaderPulse 1.8s ease-in-out infinite",
              animationDelay: "0s",
            }}
          />
          <span
            className="block rounded-full"
            style={{
              width: "8px",
              height: "8px",
              background: "#FFF",
              animation: "loaderPulse 1.8s ease-in-out infinite",
              animationDelay: "0.6s",
            }}
          />
          <span
            className="block rounded-full"
            style={{
              width: "6px",
              height: "6px",
              background: "#FFF",
              animation: "loaderPulse 1.8s ease-in-out infinite",
              animationDelay: "1.2s",
            }}
          />
        </div>
      </div>

      {/* Navbar — bar draws L→R, logo + burger fade after */}
      <nav
        className="absolute z-30 flex items-center justify-between"
        style={{
          top: "40px",
          left: "40px",
          width: "676px",
          padding: "16px 20px",
          borderRadius: "16px",
          background: "rgba(17, 33, 21, 0.20)",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          transformOrigin: "left center",
          transform: mounted ? "scaleX(1)" : "scaleX(0)",
          transition: `transform 0.7s ${EASE} ${T.nav}ms`,
        }}
      >
        <img
          src={logoHeader}
          alt="Shyen"
          className="h-[26px] w-auto"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(10px)",
            transition: `opacity 0.6s ${EASE} ${T.logo}ms, transform 0.6s ${EASE} ${T.logo}ms`,
          }}
        />
        <div className="relative">
          <button
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="relative flex items-center justify-center w-7 h-7 cursor-pointer"
            style={{
              transform: menuOpen ? "scale(0.94)" : "scale(1)",
              transition: `transform 0.25s ${EASE}`,
            }}
          >
            {/* Perfect X: each bar is centered at the button's exact center
                via translate(-50%, -50%). Arms only differ by rotation sign,
                so the X is mathematically symmetric on any DPI. */}
            <span
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                width: "20px",
                height: "2px",
                borderRadius: "2px",
                background: "#FFF",
                transformOrigin: "50% 50%",
                backfaceVisibility: "hidden",
                transform: mounted
                  ? menuOpen
                    ? "translate(-50%, -50%) rotate(45deg)"
                    : "translate(-50%, calc(-50% - 6px))"
                  : "translate(-50%, calc(-50% - 6px)) scaleX(0)",
                transition: `transform 0.4s ${EASE}`,
                willChange: "transform",
              }}
            />
            <span
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                width: "20px",
                height: "2px",
                borderRadius: "2px",
                background: "#FFF",
                backfaceVisibility: "hidden",
                opacity: mounted ? (menuOpen ? 0 : 1) : 0,
                transform: mounted
                  ? "translate(-50%, -50%) scaleX(1)"
                  : "translate(-50%, -50%) scaleX(0)",
                transition: `transform 0.4s ${EASE}, opacity 0.2s ${EASE}`,
                willChange: "transform, opacity",
              }}
            />
            <span
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                width: "20px",
                height: "2px",
                borderRadius: "2px",
                background: "#FFF",
                transformOrigin: "50% 50%",
                backfaceVisibility: "hidden",
                transform: mounted
                  ? menuOpen
                    ? "translate(-50%, -50%) rotate(-45deg)"
                    : "translate(-50%, calc(-50% + 6px))"
                  : "translate(-50%, calc(-50% + 6px)) scaleX(0)",
                transition: `transform 0.4s ${EASE}`,
                willChange: "transform",
              }}
            />
          </button>

          {/* Dropdown */}
          <div
            className="absolute right-0 overflow-hidden"
            style={{
              top: "calc(100% + 18px)",
              width: "320px",
              borderRadius: "20px",
              background:
                "linear-gradient(180deg, rgba(22, 42, 28, 0.78) 0%, rgba(9, 24, 20, 0.78) 100%)",
              backdropFilter: "blur(28px) saturate(140%)",
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow:
                "0 30px 60px -20px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen
                ? "translateY(0) scale(1)"
                : "translateY(-10px) scale(0.97)",
              transformOrigin: "top right",
              pointerEvents: menuOpen ? "auto" : "none",
              transition: `opacity 0.32s ${EASE}, transform 0.32s ${EASE}`,
            }}
          >
            <div
              style={{
                padding: "18px 22px 12px",
                fontFamily: "Geist, sans-serif",
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              Menu
            </div>
            <ul className="flex flex-col px-3 pb-3">
              {menuItems.map((item, i) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-baseline justify-between text-white/85 hover:text-white"
                    style={{
                      padding: "14px 16px",
                      borderRadius: "12px",
                      transition: "background 0.25s ease, color 0.25s ease, transform 0.25s ease",
                      opacity: menuOpen ? 1 : 0,
                      transform: menuOpen ? "translateY(0)" : "translateY(-4px)",
                      transitionDelay: `${menuOpen ? 80 + i * 40 : 0}ms`,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "rgba(255,255,255,0.06)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <span
                      style={{
                        fontFamily: "Halant, serif",
                        fontSize: "22px",
                        fontWeight: 400,
                        letterSpacing: "-0.5px",
                        lineHeight: 1,
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "Geist, sans-serif",
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.35)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.08)",
                padding: "14px 22px 18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontFamily: "Geist, sans-serif",
                fontSize: "12px",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <span>shyen.ai</span>
              <span style={{ color: "rgba(255,255,255,0.7)" }}>
                Join waitlist →
              </span>
            </div>
          </div>

        </div>
      </nav>

      {/* Click-outside overlay */}
      {menuOpen && (
        <div
          aria-hidden
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-20"
        />
      )}
    </section>
  );
}

function PillButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="transition-transform duration-300 hover:scale-[1.02]"
      style={{
        height: "48px",
        padding: "8px 24px",
        borderRadius: "48px",
        background: "#FFF",
        color: "#091814",
        fontFamily: "Geist, sans-serif",
        fontSize: "17px",
        fontWeight: 500,
        letterSpacing: "-0.34px",
      }}
    >
      {children}
    </button>
  );
}
