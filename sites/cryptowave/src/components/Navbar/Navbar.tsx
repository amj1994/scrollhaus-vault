import { useEffect, useId, useState } from "react";
import { LogoMark, MenuIcon } from "../icons";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { index: "01", label: "CryptoCurrencies", href: "#crypto-currencies" },
  { index: "02", label: "Digital Assets", href: "#digital-assets" },
  { index: "03", label: "Create a Wallet", href: "#create-wallet" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const query = window.matchMedia("(min-width: 900px)");
    const handleChange = () => setMenuOpen(false);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [menuOpen]);

  return (
      <header className={styles.header}>
        <div className={styles.inner}>
          <a href="#top" className={styles.logo} aria-label="CryptoWave home">
            <LogoMark size={42} />
          </a>

          <nav className={styles.links} aria-label="Primary">
            {NAV_LINKS.map((link) => (
                <a key={link.index} href={link.href} className={styles.link}>
                  <span className={styles.linkIndex}>[{link.index}]</span>
                  {link.label}
                </a>
            ))}
          </nav>

          <button
              type="button"
              className={styles.menuToggle}
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>

        <nav
            id={menuId}
            aria-label="Primary mobile"
            className={`${styles.mobilePanel} ${menuOpen ? styles.mobilePanelOpen : ""}`}
        >
          {NAV_LINKS.map((link) => (
              <a
                  key={link.index}
                  href={link.href}
                  className={styles.mobileLink}
                  onClick={() => setMenuOpen(false)}
              >
                <span className={styles.linkIndex}>[{link.index}]</span>
                {link.label}
              </a>
          ))}
        </nav>
      </header>
  );
}