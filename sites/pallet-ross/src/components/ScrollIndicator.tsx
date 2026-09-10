import { ChevronUp, ChevronDown } from "lucide-react";

const btnStyle: React.CSSProperties = {
  width: 36,
  height: 36,
  border: "1.5px solid rgba(0,0,0,0.15)",
  borderRadius: 8,
  background: "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "background 0.2s",
};

export default function ScrollIndicator() {
  return (
    <div className="fixed z-40 flex flex-col" style={{ right: 24, top: "50%", transform: "translateY(-50%)", gap: 8 }}>
      <button
        type="button"
        aria-label="Scroll up"
        style={btnStyle}
        onClick={() => window.scrollBy({ top: -window.innerHeight, behavior: "smooth" })}
        onMouseOver={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.05)")}
        onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <ChevronUp size={16} color="#111" />
      </button>
      <button
        type="button"
        aria-label="Scroll down"
        style={btnStyle}
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
        onMouseOver={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.05)")}
        onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <ChevronDown size={16} color="#111" />
      </button>
    </div>
  );
}
