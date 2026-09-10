const aiLogo = "https://qclay.design/lovable/shyen/AI.png";
const threeVideo = "https://qclay.design/lovable/shyen/three.mp4";
const thoPackage = "https://qclay.design/lovable/shyen/tho_package.png";
const firstPackage = "https://qclay.design/lovable/shyen/first_package.png";
const threePackage = "https://qclay.design/lovable/shyen/three_package.png";
import { useInView } from "@/hooks/use-in-view";

const CARDS = [
  { img: thoPackage, num: "02" },
  { img: firstPackage, num: "03" },
  { img: threePackage, num: "04" },
];

const HEADLINE_LINES = [
  ["Find", "what", "your", "mind"],
  ["and", "body", "need", "with"],
  ["Shyen", "AI."],
];

export default function ProductsSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.18 });

  const T = {
    headlineBase: 0,
    perWord: 70,
    headlineDone: 0,
    videoCard: 600, // begins before headline finishes
    card1: 1050,
    card2: 1200,
    videoLabel: 1300, // before card 2 finishes
    card3: 1380,
    paragraph: 1700,
    button: 1900,
  };

  const fadeStyle = (delay: number, y = 24) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : `translateY(${y}px)`,
    transition: `opacity 800ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 800ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  });

  let wordIdx = 0;
  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ background: "#FBFFE6" }}
    >
      <div className="mx-auto max-w-[1240px] px-6">
        <div style={{ display: "flex", gap: "45px", paddingTop: "150.5px", paddingBottom: "150.5px" }}>
          {/* Left */}
          <div style={{ paddingTop: "150px", flex: "0 0 auto", width: "524px" }}>
            <h2
              style={{
                color: "#122216",
                fontFamily: "Halant, serif",
                fontSize: "64px",
                fontWeight: 400,
                lineHeight: "60px",
                letterSpacing: "-3.2px",
                margin: 0,
              }}
            >
              {HEADLINE_LINES.map((line, li) => (
                <span key={li} style={{ display: "block" }}>
                  {line.map((w, i) => {
                    const delay = T.headlineBase + wordIdx * T.perWord;
                    wordIdx += 1;
                    return (
                      <span
                        key={i}
                        style={{
                          display: "inline-block",
                          paddingBottom: "0.15em",
                          paddingTop: "0.1em",
                          marginRight: i === line.length - 1 ? 0 : "0.24em",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            opacity: inView ? 1 : 0,
                            transform: inView ? "translateY(0)" : "translateY(30px)",
                            transition: `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
                          }}
                        >
                          {w}
                        </span>
                      </span>
                    );
                  })}
                </span>
              ))}
            </h2>
            <p
              style={{
                marginTop: "32px",
                marginBottom: "32px",
                color: "#122215",
                fontFamily: "Geist, sans-serif",
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: "26px",
                letterSpacing: "-0.4px",
                opacity: inView ? 0.5 : 0,
                transform: inView ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 800ms cubic-bezier(0.22,1,0.36,1) ${T.paragraph}ms, transform 800ms cubic-bezier(0.22,1,0.36,1) ${T.paragraph}ms`,
              }}
            >
              From calm moments to better habits, discover what your
              <br />
              mind and body truly need.
            </p>
            <button
              type="button"
              style={{
                display: "flex",
                height: "56px",
                padding: "8px 24px",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                borderRadius: "48px",
                border: "1px solid rgba(18,34,22,0.30)",
                background: "transparent",
                color: "#122216",
                fontFamily: "Geist, sans-serif",
                fontSize: "17px",
                fontWeight: 500,
                letterSpacing: "-0.34px",
                cursor: "pointer",
                ...fadeStyle(T.button, 16),
              }}
            >
              Discover More Products
            </button>
          </div>

          {/* Right */}
          <div style={{ flex: "0 0 auto" }}>
            <div
              style={{
                position: "relative",
                width: "671px",
                height: "442px",
                aspectRatio: "334/223",
                borderRadius: "32px",
                background: "#D3DBA1",
                overflow: "hidden",
                ...fadeStyle(T.videoCard, 30),
              }}
            >
              <video
                src={threeVideo}
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
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "30px",
                  bottom: "21px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 16px 8px 8px",
                  borderRadius: "999px",
                  background: "rgba(234,241,193,0.92)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  zIndex: 2,
                  ...fadeStyle(T.videoLabel, 12),
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "#FBFFE6",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img src={aiLogo} alt="" style={{ width: "20px", height: "20px" }} />
                </span>
                <span
                  style={{
                    color: "#122216",
                    fontFamily: "Geist, sans-serif",
                    fontSize: "15px",
                    fontWeight: 500,
                    letterSpacing: "-0.3px",
                  }}
                >
                  Shyen.AI
                </span>
                <span
                  style={{
                    color: "rgba(18,34,22,0.55)",
                    fontFamily: "Geist, sans-serif",
                    fontSize: "13px",
                    fontWeight: 400,
                    letterSpacing: "-0.26px",
                  }}
                >
                  Powered by
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "11px",
                paddingLeft: "7px",
                paddingRight: "7px",
              }}
            >
              {CARDS.map((c, i) => {
                const delay = [T.card1, T.card2, T.card3][i];
                return (
                  <div
                    key={c.num}
                    style={{
                      position: "relative",
                      width: "212px",
                      height: "200px",
                      borderRadius: "24px",
                      background: "#ECF0D3",
                      overflow: "hidden",
                      ...fadeStyle(delay, 24),
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        top: "14px",
                        right: "18px",
                        color: "#A7AF79",
                        fontFamily: "Halant, serif",
                        fontSize: "20px",
                        fontWeight: 400,
                        lineHeight: "23px",
                        letterSpacing: "-0.4px",
                      }}
                    >
                      {c.num}
                    </span>
                    <img
                      src={c.img}
                      alt=""
                      style={{
                        position: "absolute",
                        left: "50%",
                        bottom: 0,
                        transform: "translateX(-50%)",
                        width: "93px",
                        height: "182px",
                        aspectRatio: "70/137",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
