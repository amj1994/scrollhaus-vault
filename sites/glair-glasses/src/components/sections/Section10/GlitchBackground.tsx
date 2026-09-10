import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import "./GlitchBackground.css";

interface GlitchBackgroundProps {
  src: string;
  alt?: string;
  className?: string;
}

const SLICE_CLIP_PATHS = [
  "inset(0 93.33% 0 0.00%)",
  "inset(0 86.67% 0 6.67%)",
  "inset(0 80.00% 0 13.33%)",
  "inset(0 73.33% 0 20.00%)",
  "inset(0 66.67% 0 26.67%)",
  "inset(0 60.00% 0 33.33%)",
  "inset(0 53.33% 0 40.00%)",
  "inset(0 46.67% 0 46.67%)",
  "inset(0 40.00% 0 53.33%)",
  "inset(0 33.33% 0 60.00%)",
  "inset(0 26.67% 0 66.67%)",
  "inset(0 20.00% 0 73.33%)",
  "inset(0 13.33% 0 80.00%)",
  "inset(0 6.67% 0 86.67%)",
  "inset(0 0.00% 0 93.33%)",
];

const SLICE_DELAYS = [
  "-2.8s", "-0.8s", "-4.4s", "0s", "-3.6s", "-1.6s", "-5.2s", "-0.4s",
  "-3.2s", "-2s", "-4.8s", "-1.2s", "-4s", "-2.4s", "-5.6s",
];

const GATE_DELAYS = [
  "0s", "0s", "0s", "0s", "0s", "0s", "0s", "-0.15s",
  "0s", "0s", "0s", "0s", "-0.3s", "0s", "0s",
];
const FLICKER_INDICES = new Set([2, 7, 12]);

export function GlitchBackground({ src, alt = "", className }: GlitchBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 h-full w-full overflow-hidden",
        inView && "glitch-in-view-vertical",
        className,
      )}
    >
      <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      {SLICE_CLIP_PATHS.map((clipPath, index) => (
        <div
          key={clipPath}
          aria-hidden="true"
          className={cn(
            "glitch-slice-vertical",
            FLICKER_INDICES.has(index) && "glitch-slice-vertical--flicker",
          )}
          style={{
            backgroundImage: `url(${src})`,
            clipPath,
            animationDelay: `${SLICE_DELAYS[index]}, ${GATE_DELAYS[index]}`,
          }}
        />
      ))}
    </div>
  );
}
