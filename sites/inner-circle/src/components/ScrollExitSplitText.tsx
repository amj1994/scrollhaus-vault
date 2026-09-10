import { useEffect, useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import gsap from "gsap";

export default function ScrollExitSplitText({
  children,
  scrollProgress,
  containerClassName,
  style,
}: {
  children: string;
  scrollProgress: number;
  containerClassName?: string;
  style?: CSSProperties;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const words = children.split(" ");
    container.innerHTML = "";
    const chars: HTMLSpanElement[] = [];

    words.forEach((word, wi) => {
      [...word].forEach((letter) => {
        const span = document.createElement("span");
        span.className = "char inline-block will-change-transform";
        span.textContent = letter;
        container.appendChild(span);
        chars.push(span);
      });
      if (wi < words.length - 1) {
        const space = document.createElement("span");
        space.className = "char inline-block will-change-transform";
        space.innerHTML = "&nbsp;";
        container.appendChild(space);
        chars.push(space);
      }
    });

    const tl = gsap.timeline({ paused: true });
    tl.fromTo(
      chars,
      { opacity: 1, yPercent: 0, y: 0, scaleY: 1, scaleX: 1, transformOrigin: "50% 0%" },
      { opacity: 0, yPercent: 300, y: "25vh", scaleY: 1.2, scaleX: 0.9, stagger: 0.03, ease: "power2.inOut" },
    );
    timelineRef.current = tl;

    return () => {
      tl.kill();
      timelineRef.current = null;
    };
  }, [children]);

  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl) return;
    gsap.to(tl, { progress: scrollProgress, duration: 0.6, ease: "power1.out", overwrite: "auto" });
  }, [scrollProgress]);

  return <div ref={containerRef} className={containerClassName} style={style} />;
}
