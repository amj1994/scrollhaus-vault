import { useEffect, useState } from "react";

const TILES = [
  { label: "Private Discord & Networking", baseXOffset: 120, delay: 0 },
  { label: "Weekly Market Alpha Drops", baseXOffset: 180, delay: 100 },
  { label: "Exclusive Web3 Tooling Access", baseXOffset: 240, delay: 200 },
];

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export default function SoapTiles({ scrollProgress }: { scrollProgress: number }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const visible = scrollProgress > 0.75;
  const easeProgress = clamp01((scrollProgress - 0.75) / 0.22);

  return (
    <div
      className={`absolute left-4 right-4 md:left-[64px] top-[38%] md:top-1/2 -translate-y-1/2 flex flex-col gap-2 md:gap-[10px] z-40 pointer-events-auto transition-all duration-[800ms] ease-out ${
        visible ? "" : "opacity-0 -translate-x-6 md:-translate-x-12 pointer-events-none"
      }`}
    >
      {TILES.map((tile, i) => {
        const responsiveOffset = isDesktop ? tile.baseXOffset : tile.baseXOffset * 0.25;
        const translateX = (easeProgress - 1) * responsiveOffset;
        const opacity = easeProgress;
        const blur = (1 - easeProgress) * 12;
        const baseHeight = isDesktop ? 138 : 52;
        let hoverShift = 0;
        if (isDesktop && hovered !== null && hovered !== i) {
          hoverShift = hovered < i ? baseHeight * 0.1 : -baseHeight * 0.1;
        }
        const scale = isDesktop && hovered === i ? 1.2 : 1;

        return (
          <div
            key={tile.label}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="group relative h-[52px] sm:h-[72px] md:h-[138px] text-black bg-white rounded-xl sm:rounded-2xl md:rounded-[34px] flex items-center justify-center px-4 sm:px-8 md:px-14 w-full md:w-auto md:self-start cursor-pointer origin-left transition-all duration-[400ms] whitespace-nowrap"
            style={{
              transform: `translateX(${translateX}px) translateY(${hoverShift}px) scale(${scale})`,
              opacity,
              filter: blur > 0.1 ? `blur(${blur}px)` : "none",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: `${tile.delay}ms`,
            }}
          >
            <span
              className="font-michroma font-medium text-[11px] sm:text-[14px] md:text-[23px] leading-[16px] sm:leading-[22px] md:leading-[34px] tracking-tight"
              style={{ letterSpacing: "-0.03em" }}
            >
              {tile.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
