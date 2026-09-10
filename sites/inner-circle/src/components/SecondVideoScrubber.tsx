import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const FALLBACK_DURATION = 4.2;
const DRUM_START = 1.45;
const DRUM_END = 3.5;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export default function SecondVideoScrubber({ scrollProgress }: { scrollProgress: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const currentRef = useRef(0);
  const progressRef = useRef(scrollProgress);
  const frameRef = useRef(0);

  useEffect(() => {
    progressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tick = () => {
      const duration = video.duration || FALLBACK_DURATION;
      const drumProgress = clamp01((progressRef.current - DRUM_START) / (DRUM_END - DRUM_START));
      const target = drumProgress * duration;
      currentRef.current += (target - currentRef.current) * 0.15;
      if (!video.seeking && Math.abs(video.currentTime - currentRef.current) > 0.01) {
        video.currentTime = currentRef.current;
      }
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onMove = (e: MouseEvent) => {
      const mx = e.clientX / window.innerWidth - 0.5;
      const my = e.clientY / window.innerHeight - 0.5;
      gsap.to(container, { x: -mx * 40, y: -my * 40, duration: 1.2, ease: "power2.out", overwrite: "auto" });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#050a12]">
      <div ref={containerRef} className="absolute inset-0 w-full h-full will-change-transform" style={{ scale: "1.05" }}>
        <video
          ref={videoRef}
          src="/second-scrub.mp4"
          playsInline
          muted
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-50"
          onLoadedData={() => setIsLoaded(true)}
        />
      </div>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#050a12f4] z-10">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-teal-500/20 animate-ping" />
              <div className="w-10 h-10 rounded-full border-4 border-teal-500/20 border-t-teal-500 animate-spin" />
            </div>
            <span className="font-manrope font-semibold text-[12px] uppercase tracking-[0.25em] text-teal-400 drop-shadow-[0_0_8px_rgba(0,194,172,0.4)]">
              Loading drum stream...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
