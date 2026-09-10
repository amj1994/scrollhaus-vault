import { useInView } from "@/hooks/use-in-view";
const googlePlay = "https://qclay.design/lovable/shyen/google_play.svg";
const appleMarket = "https://qclay.design/lovable/shyen/apple_market.svg";
const instagram = "https://qclay.design/lovable/shyen/instagram.svg";
const linkedin = "https://qclay.design/lovable/shyen/linkedin.svg";
const youtube = "https://qclay.design/lovable/shyen/youtube.svg";
const logoFooter = "https://qclay.design/lovable/shyen/logo_footer.svg";

const ease = "cubic-bezier(0.22,1,0.36,1)";

const iconBtn: React.CSSProperties = {
  display: "flex",
  width: 46,
  height: 46,
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
  borderRadius: 56,
  background: "rgba(234, 241, 193, 0.10)",
};

const linkStyle: React.CSSProperties = {
  color: "rgba(234, 241, 193, 0.70)",
  fontFamily: "Geist, sans-serif",
  fontSize: 16,
  fontWeight: 400,
  lineHeight: "16px",
  textDecoration: "none",
};

const titleStyle: React.CSSProperties = {
  color: "rgba(234, 241, 193, 0.70)",
  fontFamily: "Halant, serif",
  fontSize: 15,
  fontWeight: 400,
  lineHeight: "16px",
  letterSpacing: "0.45px",
  textTransform: "uppercase",
  opacity: 0.5,
  margin: 0,
};

function fadeUp(inView: boolean, delay: number, distance = 20): React.CSSProperties {
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : `translateY(${distance}px)`,
    transition: `opacity 700ms ${ease} ${delay}ms, transform 700ms ${ease} ${delay}ms`,
  };
}

function fadeRight(inView: boolean, delay: number): React.CSSProperties {
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : "translateX(-20px)",
    transition: `opacity 700ms ${ease} ${delay}ms, transform 700ms ${ease} ${delay}ms`,
  };
}

export default function Footer() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.1 });

  // Timing
  const d = {
    description: 0,
    appRow: 200, // first item starts
    appStep: 120,
    logo: 700,
    col1Title: 800,
    col1Step: 100,
    col2Title: 1300,
    col2Step: 100,
    legal: 2000,
    legalStep: 120,
  };

  return (
    <footer
      ref={ref}
      style={{
        background: "#122115",
        position: "relative",
        width: "100%",
        overflow: "hidden",
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 48,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 80, flexWrap: "wrap", marginTop: 110 }}>
        {/* LEFT */}
        <div style={{ maxWidth: 640 }}>
          <p
            style={{
              margin: 0,
              color: "#EAF1C1",
              fontFamily: "Halant, serif",
              fontSize: 28,
              fontWeight: 400,
              lineHeight: "28px",
              letterSpacing: "-0.56px",
              ...fadeUp(inView, d.description, 30),
            }}
          >
            <span style={{ display: "block" }}>Shyen is 24/7 support for your mind. Created by</span>
            <span style={{ display: "block" }}>renowned clinicians, it gives you the support you</span>
            <span style={{ display: "block" }}>need, right when you need it.</span>
          </p>

          {/* App download row */}
          <div
            style={{
              marginTop: 48,
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: 8 }}>
              <a href="#" style={{ ...iconBtn, ...fadeUp(inView, d.appRow) }} aria-label="Google Play">
                <img src={googlePlay} alt="" style={{ width: 18, height: 20 }} />
              </a>
              <a href="#" style={{ ...iconBtn, ...fadeUp(inView, d.appRow + d.appStep) }} aria-label="App Store">
                <img src={appleMarket} alt="" style={{ width: 25, height: 25 }} />
              </a>
            </div>

            <div
              style={{
                marginLeft: 16,
                color: "rgba(234, 241, 193, 0.70)",
                fontFamily: "Geist, sans-serif",
                fontSize: 16,
                fontWeight: 300,
                lineHeight: "16px",
                letterSpacing: "0.16px",
                ...fadeUp(inView, d.appRow + d.appStep * 2),
              }}
            >
              <span style={{ display: "block" }}>Download</span>
              <span style={{ display: "block", marginTop: 4 }}>the App</span>
            </div>

            <div
              style={{
                marginLeft: 12,
                display: "flex",
                padding: "8px 12px",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
                borderRadius: 40,
                border: "1px solid #FAFF67",
                ...fadeUp(inView, d.appRow + d.appStep * 3),
              }}
            >
              <span
                style={{
                  color: "#FAFF67",
                  fontFamily: "Geist, sans-serif",
                  fontSize: 11,
                  fontWeight: 400,
                  letterSpacing: "0.11px",
                }}
              >
                COMING SOON
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT columns */}
        <div style={{ display: "flex", gap: 133 }}>
          <div>
            <h4 style={{ ...titleStyle, ...fadeUp(inView, d.col1Title) }}>SHYEN AI</h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, marginTop: 28, display: "flex", flexDirection: "column", gap: 24 }}>
              {["Home", "Meditations", "Our Products", "About us"].map((l, i) => (
                <li key={l} style={fadeUp(inView, d.col1Title + d.col1Step * (i + 1))}>
                  <a href="#" style={linkStyle}>{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ ...titleStyle, ...fadeUp(inView, d.col2Title) }}>GET IN TOUCH</h4>
            <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 24 }}>
              <a href="mailto:Team@shyenai.support" style={{ ...linkStyle, ...fadeUp(inView, d.col2Title + d.col2Step) }}>Team@shyenai.support</a>
              <a href="tel:+9154355539430" style={{ ...linkStyle, marginTop: -14, ...fadeUp(inView, d.col2Title + d.col2Step * 2) }}>+91 5435 5539 430</a>
              <div style={{ ...linkStyle, ...fadeUp(inView, d.col2Title + d.col2Step * 3) }}>Follow us</div>
              <div style={{ display: "flex", gap: 8, marginTop: -4 }}>
                <a href="#" style={{ ...iconBtn, ...fadeUp(inView, d.col2Title + d.col2Step * 4) }} aria-label="Instagram">
                  <img src={instagram} alt="" style={{ width: 16, height: 17 }} />
                </a>
                <a href="#" style={{ ...iconBtn, ...fadeUp(inView, d.col2Title + d.col2Step * 5) }} aria-label="LinkedIn">
                  <img src={linkedin} alt="" style={{ width: 16, height: 15 }} />
                </a>
                <a href="#" style={{ ...iconBtn, ...fadeUp(inView, d.col2Title + d.col2Step * 6) }} aria-label="YouTube">
                  <img src={youtube} alt="" style={{ width: 17, height: 14 }} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer logo */}
      <div style={fadeUp(inView, d.logo, 30)}>
        <img
          src={logoFooter}
          alt=""
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            maxWidth: "72%",
            WebkitMaskImage: "linear-gradient(to top, transparent 18%, black 109%)",
            maskImage: "linear-gradient(to top, transparent 18%, black 109%)",
          }}
          draggable={false}
        />
      </div>

      {/* Bottom legal area */}
      <div
        style={{
          marginTop: -50,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 20,
        }}
      >
        <span
          style={{
            color: "#EAF1C1",
            fontFamily: "Halant, serif",
            fontSize: 16,
            fontWeight: 400,
            letterSpacing: "-0.32px",
            opacity: 0.5,
            marginRight: 50,
            ...fadeRight(inView, d.legal),
          }}
        >
          © 2026 shyen.ai, All Rights Reserved
        </span>
        <a
          href="#"
          style={{
            color: "rgba(234, 241, 193, 0.70)",
            fontFamily: "Geist, sans-serif",
            fontSize: 13,
            fontWeight: 400,
            lineHeight: "16px",
            textDecorationLine: "underline",
            opacity: 0.5,
            ...fadeRight(inView, d.legal + d.legalStep),
          }}
        >
          Privacy & Policy
        </a>
        <a
          href="#"
          style={{
            color: "rgba(234, 241, 193, 0.70)",
            fontFamily: "Geist, sans-serif",
            fontSize: 13,
            fontWeight: 400,
            lineHeight: "16px",
            textDecorationLine: "underline",
            opacity: 0.5,
            ...fadeRight(inView, d.legal + d.legalStep * 2),
          }}
        >
          Terms & conditions
        </a>
      </div>
    </footer>
  );
}
