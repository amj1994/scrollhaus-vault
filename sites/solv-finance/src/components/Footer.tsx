import Svg from "./ui/Svg";
import { svg } from "@/assets/svg";

const FOOTER_NAV = ["Service", "Members benefits", "Products", "Contacts."];
const LANGS = ["En", "Es", "Fr", "De", "Ru"];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <a href="#" className="footer__logo">
          <Svg markup={svg.logoMark} aria-hidden /> Solv
        </a>
        <nav className="footer__nav">
          {FOOTER_NAV.map((label) => (
            <a href="#" key={label}>
              {label}
            </a>
          ))}
        </nav>
      </div>

      <div className="footer__grid">
        <div className="footer__about">
          <p>
            AI-first ERP powering next-gen finance &amp; accounting. General
            ledger, revenue automation, close management.
          </p>
          <a href="#">More about us</a>
        </div>
        <div className="footer__contact">
          <div className="footer__col">
            <h4>Contact Us</h4>
            <a href="tel:+19992837744">+1 (999) 283-77-44</a>
            <a href="mailto:hello@Solvcompany.com">hello@Solvcompany.com</a>
          </div>
          <div className="footer__col">
            <h4>Location</h4>
            <p>
              10013, New York,
              <br />
              350 Broadway, Suite 402
            </p>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div
          className="footer__social"
          dangerouslySetInnerHTML={{ __html: svg.social }}
        />
        <p className="footer__copy">
          © 2026 — Copyright
          <br />
          All Rights reserved
        </p>
        <div className="footer__lang-wrap">
          <span className="footer__lang-label">Languages</span>
          <nav className="footer__lang" aria-label="Language">
            {LANGS.map((l, i) => (
              <a href="#" key={l} className={i === 0 ? "active" : undefined}>
                {l}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
