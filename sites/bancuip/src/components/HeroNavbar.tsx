import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { A } from "@/lib/assets";

const NAV_LINKS = ["HOME", "ABOUT", "PHILOSOPHY", "MARKET CALLS", "RESEARCH", "TEAM"];

const ArrowButton = ({ children }: { children: React.ReactNode }) => (
  <button
    className="group relative inline-flex items-center justify-center overflow-hidden"
    style={{
      height: 38,
      padding: "13px 19.2px",
      gap: 10,
      borderRadius: 9,
      border: "1px solid rgba(250,250,250,0.20)",
      background: "#FFF",
      color: "#111111",
      fontSize: 14,
      fontWeight: 500,
      cursor: "pointer",
    }}
  >
    <span>{children}</span>
    <span style={{ position: "relative", width: 14, height: 14, overflow: "hidden", display: "inline-block" }}>
      <img
        src={`${A}/arrow-right.svg`}
        alt=""
        className="absolute inset-0 translate-x-0 transition-transform group-hover:translate-x-[150%]"
        style={{ transitionDuration: "500ms", transitionTimingFunction: "cubic-bezier(0.65,0,0.35,1)" }}
      />
      <img
        src={`${A}/arrow-right.svg`}
        alt=""
        className="absolute inset-0 -translate-x-[150%] transition-transform group-hover:translate-x-0"
        style={{ transitionDuration: "500ms", transitionTimingFunction: "cubic-bezier(0.65,0,0.35,1)" }}
      />
    </span>
  </button>
);

export default function HeroNavbar() {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <>
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          pointerEvents: "none",
          backdropFilter: aboutOpen ? "blur(8px)" : "blur(0px)",
          WebkitBackdropFilter: aboutOpen ? "blur(8px)" : "blur(0px)",
          background: aboutOpen ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0)",
          transition: "backdrop-filter 280ms ease, -webkit-backdrop-filter 280ms ease, background 280ms ease",
        }}
      />

      <nav
        className="fixed top-0 left-0 right-0 z-50 grid items-center hero-nav"
        style={{
          height: 70,
          gridTemplateColumns: "1fr auto 1fr",
          padding: "0 clamp(1rem, 3vw, 2rem)",
          background: "rgba(10,10,10,0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          fontFamily: "'Inter Tight', sans-serif",
        }}
      >
        <style>{`
          @media (max-width: 1024px) {
            .hero-nav-links { display: none !important; }
            .hero-nav { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 600px) {
            .hero-nav-contact { display: none !important; }
          }
        `}</style>

        <div className="flex items-center">
          <img src={`${A}/logo.svg`} alt="Bancuip" style={{ height: "1.375rem", width: "auto" }} />
        </div>

        <div className="hero-nav-links flex items-center justify-center" style={{ gap: 4 }}>
          {NAV_LINKS.map((label) => {
            const isAbout = label === "ABOUT";
            const active = label === "HOME" || (isAbout && aboutOpen);
            return (
              <button
                key={label}
                type="button"
                onMouseEnter={() => setAboutOpen(isAbout)}
                className="flex items-center transition-colors"
                style={{
                  gap: 4,
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  padding: "6px 14px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: active ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.65)",
                  transitionDuration: "200ms",
                }}
                onMouseOver={(e) => {
                  if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.95)";
                }}
                onMouseOut={(e) => {
                  if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                }}
              >
                {label}
                {isAbout && (
                  <ChevronDown
                    size={11}
                    color="rgba(255,255,255,0.65)"
                    style={{
                      transition: "transform 220ms ease",
                      transform: aboutOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-end" style={{ gap: "1rem" }}>
          <button
            type="button"
            className="hero-nav-contact transition-colors"
            style={{ fontSize: "0.875rem", fontWeight: 500, color: "rgba(255,255,255,0.65)", background: "transparent", border: "none", cursor: "pointer" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.95)")}
            onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
          >
            Contact us
          </button>
          <ArrowButton>Learn more</ArrowButton>
        </div>
      </nav>

      <div
        onMouseEnter={() => setAboutOpen(true)}
        onMouseLeave={() => setAboutOpen(false)}
        style={{
          position: "fixed",
          top: 70,
          left: 0,
          right: 0,
          zIndex: 60,
          background: "rgba(15,15,15,0.85)",
          backdropFilter: "blur(18px)",
          padding: "32px 0 40px",
          opacity: aboutOpen ? 1 : 0,
          pointerEvents: aboutOpen ? "auto" : "none",
          transition: "opacity 220ms ease",
        }}
      >
        <div
          style={{
            maxWidth: 560,
            margin: "0 auto",
            padding: "0 24px",
            opacity: aboutOpen ? 1 : 0,
            transform: aboutOpen ? "translateY(0)" : "translateY(-12px)",
            transition: `opacity 320ms ease ${aboutOpen ? "80ms" : "0ms"}, transform 380ms cubic-bezier(0.22,1,0.36,1) ${aboutOpen ? "80ms" : "0ms"}`,
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
            <div>
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, fontWeight: 500, marginBottom: 14, letterSpacing: "0.02em" }}>
                Company
              </div>
              {["About Us", "Careers", "Contact"].map((item) => (
                <button key={item} className="about-item" style={aboutItemStyle}>
                  {item}
                </button>
              ))}
            </div>
            <div>
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, fontWeight: 500, marginBottom: 14, letterSpacing: "0.02em" }}>
                Updates
              </div>
              {["Customer Stories", "News"].map((item) => (
                <button key={item} className="about-item" style={aboutItemStyle}>
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, fontWeight: 500, marginBottom: 14, letterSpacing: "0.02em" }}>
              More
            </div>
            <button className="about-item" style={aboutItemStyle}>
              Store ↗
            </button>
            <button className="about-item" style={aboutItemStyle}>
              Talent Network ↗
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const aboutItemStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.92)",
  fontSize: 14,
  fontWeight: 500,
  background: "transparent",
  border: "none",
  padding: "6px 0",
  cursor: "pointer",
  textAlign: "left",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  width: "100%",
};
