import { User, Settings } from "lucide-react";

const CENTER_LINKS = ["Get Started", "Create strategy", "Pricing", "Contact", "Solution", "E-Commerce"];

function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M4 8 L14 3 L24 8 L14 13 Z" fill="#4ECDC4" opacity={1} />
      <path d="M6 12 L16 7 L26 12 L16 17 Z" fill="#4ECDC4" opacity={0.85} />
    </svg>
  );
}

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full"
      style={{ padding: "18px 32px", background: "transparent" }}
    >
      <div className="flex items-center" style={{ gap: 10 }}>
        <Logo />
        <span style={{ fontFamily: "var(--font-heading)", fontSize: 18, fontWeight: 600, color: "#111111" }}>
          Pallet Ross
        </span>
      </div>

      <div className="flex items-center">
        {CENTER_LINKS.map((label) => (
          <button
            key={label}
            type="button"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 14,
              color: "#111111",
              padding: "14px 8px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            {label === "Create strategy" && (
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ECDC4", marginRight: 6, display: "inline-block" }} />
            )}
            {label}
          </button>
        ))}
      </div>

      <div className="flex items-center" style={{ gap: 4 }}>
        <button type="button" style={{ padding: 8, background: "transparent", border: "none", color: "#111", cursor: "pointer" }}>
          <User size={20} />
        </button>
        <button type="button" style={{ padding: 8, background: "transparent", border: "none", color: "#111", cursor: "pointer" }}>
          <Settings size={20} />
        </button>
      </div>
    </nav>
  );
}
