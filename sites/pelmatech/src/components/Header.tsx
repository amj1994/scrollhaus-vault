import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import logoSrc from "@/assets/logo.svg";
import logoDarkSrc from "@/assets/logo-dark.svg";

const NAV_ITEMS = ["Home", "Artists", "Releases", "Contact"];

export default function Header() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setDark(window.scrollY > window.innerHeight - 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-6 left-0 right-0 z-50 px-8 flex items-center justify-between">
      <img
        src={dark ? logoDarkSrc : logoSrc}
        alt="Pelmatech"
        className="h-8 w-auto transition-opacity"
      />
      <nav
        className="flex items-center gap-1 text-white rounded-full pl-2 pr-2 py-2"
        style={{ background: "var(--header-bg)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
      >
        {NAV_ITEMS.map((item, i) => (
          <a
            key={item}
            href="#"
            className={`px-5 py-2 text-sm rounded-full transition ${
              i === 0 ? "bg-white/10 font-medium" : "opacity-80 hover:opacity-100"
            }`}
          >
            {item}
          </a>
        ))}
        <button
          type="button"
          className="ml-2 flex items-center gap-2 px-4 py-2 text-sm rounded-full hover:bg-white/10 transition"
        >
          <Menu className="w-4 h-4" />
          Menu
        </button>
      </nav>
    </header>
  );
}
