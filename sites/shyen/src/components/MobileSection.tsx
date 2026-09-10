import { useInView } from "@/hooks/use-in-view";
const Phone = "https://qclay.design/lovable/shyen/phone.png";

export default function MobileSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.15 });

  const headingLine1 = ["Shyen", "is", "not", "only"];
  const headingLine2 = ["on", "big", "screens."];
  const allWords = [...headingLine1, ...headingLine2];

  const ease = "cubic-bezier(0.22,1,0.36,1)";

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ background: "#EEF2D8" }}
    >
      <div
        className="mx-auto max-w-[1440px]"
        style={{ paddingTop: 144, paddingLeft: 24, paddingRight: 24 }}
      >
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
            {[headingLine1, headingLine2].map((line, lineIdx) => {
              const startIdx = lineIdx === 0 ? 0 : headingLine1.length;
              return (
                <span key={lineIdx} style={{ display: "block", paddingBottom: "0.15em", paddingTop: "0.1em" }}>
                  {line.map((w, i) => {
                    const globalIdx = startIdx + i;
                    return (
                      <span
                        key={i}
                        style={{
                          display: "inline-block",
                          marginRight: i < line.length - 1 ? "0.28em" : 0,
                          opacity: inView ? 1 : 0,
                          transform: inView ? "translateY(0)" : "translateY(40px)",
                          transition: `opacity 800ms ${ease} ${globalIdx * 90}ms, transform 800ms ${ease} ${globalIdx * 90}ms`,
                        }}
                      >
                        {w}
                      </span>
                    );
                  })}
                </span>
              );
            })}
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
              transform: inView ? "translateY(0)" : "translateY(30px)",
              transition: `opacity 800ms ${ease} ${allWords.length * 90 + 100}ms, transform 800ms ${ease} ${allWords.length * 90 + 100}ms`,
            }}
          >
            <span style={{ display: "block" }}>
              A meditation app tailored to your biology
            </span>
            <span style={{ display: "block" }}>and lifestyle, powered by AI.</span>
          </p>

          <div
            style={{
              marginTop: 24,
              display: "flex",
              justifyContent: "center",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(30px)",
              transition: `opacity 800ms ${ease} ${allWords.length * 90 + 300}ms, transform 800ms ${ease} ${allWords.length * 90 + 300}ms`,
            }}
          >
            <button
              type="button"
              style={{
                display: "flex",
                height: 56,
                padding: "8px 32px",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
                borderRadius: 48,
                border: "1px solid rgba(18, 34, 22, 0.30)",
                background: "transparent",
                color: "#122216",
                fontFamily: "Geist, sans-serif",
                fontSize: 17,
                fontWeight: 500,
                lineHeight: "normal",
                letterSpacing: "-0.34px",
                cursor: "pointer",
              }}
            >
              Join waitlist
            </button>
          </div>

          <div
            style={{
              marginTop: 33,
              display: "flex",
              justifyContent: "center",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(80px)",
              transition: `opacity 1100ms ${ease} ${allWords.length * 90 + 500}ms, transform 1100ms ${ease} ${allWords.length * 90 + 500}ms`,
            }}
          >
            <img
              src={Phone}
              alt="Shyen mobile app"
              style={{
                display: "block",
                width: "100%",
                maxWidth: 490,
                height: "auto",
              }}
              draggable={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
