import { Twitter, Linkedin, Github } from "lucide-react";
import { A } from "@/lib/assets";

const COLUMNS = [
  { heading: "Product", links: ["Payments", "Wallets", "Fraud Control", "Compliance"] },
  { heading: "Company", links: ["About Us", "Careers", "Contact"] },
  { heading: "Resources", links: ["Documentation", "API Reference", "Status"] },
];

export default function Footer() {
  return (
    <footer style={{ background: "#172110", color: "#FFFFFF", fontFamily: "'Inter Tight', sans-serif" }}>
      <div style={{ maxWidth: "75rem", margin: "0 auto", padding: "clamp(3rem, 6vw, 5rem) clamp(1rem, 4vw, 2.5rem) 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr repeat(3, 1fr)", gap: "clamp(2rem, 4vw, 3rem)" }}>
          <div>
            <img src={`${A}/logo.svg`} alt="Bancuip" style={{ height: "1.5rem", width: "auto", filter: "brightness(0) invert(1)" }} />
            <p style={{ marginTop: "1.25rem", maxWidth: "20rem", fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.6, color: "rgba(255,255,255,0.55)" }}>
              The complete infrastructure for payments, wallets, transaction monitoring, fraud control, compliance
              workflows, and financial automation in one secure platform.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.02em", color: "rgba(255,255,255,0.45)", marginBottom: 16 }}>
                {col.heading}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    style={{ fontSize: "0.875rem", fontWeight: 400, color: "rgba(255,255,255,0.75)", transition: "color 200ms ease" }}
                    onMouseOver={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                    onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "clamp(3rem, 5vw, 4rem)",
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(255,255,255,0.10)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <span style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.45)" }}>
            © {new Date().getFullYear()} Bancuip. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 16 }}>
            <a href="#" aria-label="Twitter" style={{ color: "rgba(255,255,255,0.55)" }} onMouseOver={(e) => (e.currentTarget.style.color = "#FFFFFF")} onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}>
              <Twitter size={18} />
            </a>
            <a href="#" aria-label="LinkedIn" style={{ color: "rgba(255,255,255,0.55)" }} onMouseOver={(e) => (e.currentTarget.style.color = "#FFFFFF")} onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}>
              <Linkedin size={18} />
            </a>
            <a href="#" aria-label="GitHub" style={{ color: "rgba(255,255,255,0.55)" }} onMouseOver={(e) => (e.currentTarget.style.color = "#FFFFFF")} onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}>
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
