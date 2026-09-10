import { useEffect, useState } from "react";

const PHRASES = [
  "Create a finance dashboard design",
  "Branding with M letter",
  "Liquid glass effect",
  "Loader animation",
  "SaaS landing page",
];

type Mode = "typing" | "pausing" | "deleting";

export default function TypewriterPrompt() {
  const [text, setText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [mode, setMode] = useState<Mode>("typing");

  useEffect(() => {
    const phrase = PHRASES[phraseIdx];
    let t: ReturnType<typeof setTimeout>;
    if (mode === "typing") {
      if (text.length < phrase.length) {
        t = setTimeout(() => setText(phrase.slice(0, text.length + 1)), 22 + Math.random() * 25);
      } else {
        t = setTimeout(() => setMode("pausing"), 30);
      }
    } else if (mode === "pausing") {
      t = setTimeout(() => setMode("deleting"), 1400);
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(text.slice(0, -1)), 14);
      } else {
        setPhraseIdx((i) => (i + 1) % PHRASES.length);
        setMode("typing");
        return;
      }
    }
    return () => clearTimeout(t);
  }, [text, mode, phraseIdx]);

  return (
    <div
      style={{
        height: 32,
        fontFamily: "'Inter Tight', sans-serif",
        fontSize: 15,
        lineHeight: "22px",
        fontWeight: 400,
        color: "#0D1B4B",
        paddingBottom: 10,
        display: "flex",
        alignItems: "center",
      }}
    >
      <span style={{ whiteSpace: "pre" }}>{text}</span>
      <span
        style={{
          display: "inline-block",
          width: 2,
          height: 18,
          marginLeft: 2,
          background: "#0D1B4B",
          animation: "promptCaretBlink 1s steps(1) infinite",
        }}
      />
    </div>
  );
}
