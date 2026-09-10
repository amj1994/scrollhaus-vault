import type { ReactNode } from "react";

export default function Marquee({
  children,
  gap = "80px",
  speed = 25,
  fade = true,
}: {
  children: ReactNode;
  gap?: string;
  speed?: number;
  fade?: boolean;
}) {
  return (
    <div className={fade ? "marquee-container" : "flex overflow-hidden w-full relative"}>
      <div className="marquee-track" style={{ gap, animationDuration: `${speed}s` }}>
        <div className="flex items-center" style={{ gap }}>
          {children}
        </div>
        <div className="flex items-center" style={{ gap }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
