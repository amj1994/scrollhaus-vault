import { useState } from "react";
import Svg from "./ui/Svg";
import SplitText from "./ui/SplitText";
import { svg } from "@/assets/svg";
import { ChevronDown, Hamburger } from "./ui/icons";
import { NAV_LINKS } from "@/data";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav-wrap">
      <nav className="nav">
        <div className="nav__links">
          {NAV_LINKS.map((label) => (
            <a href="#" key={label}>
              {label}
              {label === "Products" && <ChevronDown />}
            </a>
          ))}
        </div>

        <a href="#" className="logo">
          <span className="logo__mark">
            <Svg markup={svg.logoMark} aria-hidden />
          </span>
          <SplitText text="Solv." className="logo-text" letterClassName="logo-letter" />
        </a>

        <div className="nav__right">
          <div className="nav__actions">
            <a href="#" className="nav__login">
              Login
            </a>
            <a href="#" className="nav__signup">
              Sign up
            </a>
          </div>
          <button
            className="nav__menu-btn"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Hamburger />
          </button>
        </div>
      </nav>

      <div className={`mobile-panel${open ? " open" : ""}`}>
        {NAV_LINKS.map((label) => (
          <a href="#" key={label} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a href="#" className="m-login" onClick={() => setOpen(false)}>
          Login
        </a>
        <a href="#" className="nav__signup" onClick={() => setOpen(false)}>
          Sign up
        </a>
      </div>
    </header>
  );
}
