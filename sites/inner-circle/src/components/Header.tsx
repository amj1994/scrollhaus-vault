import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import { NAVIGATION_ITEMS } from "@/data";

export default function Header({
  activeSectionId,
  onNavigate,
}: {
  activeSectionId: string;
  onNavigate: (item: (typeof NAVIGATION_ITEMS)[number]) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="absolute top-4 left-4 right-4 sm:top-8 sm:left-8 sm:right-8 md:top-[64px] md:left-[64px] md:right-[64px] flex items-center justify-between z-40">
        <button
          type="button"
          className="flex items-center gap-3 text-left"
          onClick={() => onNavigate({ id: "hero", label: "Hero", scrollRatio: 0 })}
        >
          <Logo size={48} />
          <div className="hidden sm:block font-manrope font-normal tracking-wide text-[12px] leading-[16px] text-white">
            <div>Full Workflow Automation.</div>
            <div>We Manage Everything. You</div>
            <div>Unwind.</div>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {NAVIGATION_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item)}
              className={`font-manrope font-medium text-[12px] leading-[16px] tracking-wider px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300 ${
                activeSectionId === item.id ? "text-[#00E0C7]" : "text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 bg-[#050a12]/98 backdrop-blur-xl z-30 flex flex-col justify-center px-6">
          {NAVIGATION_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onNavigate(item);
                setMenuOpen(false);
              }}
              className={`text-left font-michroma text-[16px] uppercase tracking-widest py-4 px-6 border-b border-white/5 ${
                activeSectionId === item.id ? "text-[#00E0C7] font-semibold" : "text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
