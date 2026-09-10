import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const FALLBACK_DURATION = 4.2;

export default function VideoScrubber({ scrollProgress }: { scrollProgress: number }) {
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
      const target = Math.min(Math.max(progressRef.current * duration, 0), duration);
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
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#00E0C7]">
      <div ref={containerRef} className="absolute inset-0 w-full h-full will-change-transform" style={{ scale: "1.05" }}>
        <video
          ref={videoRef}
          src="/hero-scrub.mp4"
          playsInline
          muted
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          onLoadedData={() => setIsLoaded(true)}
        />
      </div>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#00E0C7f4] z-10">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-teal-500/20 animate-ping" />
              <div className="w-10 h-10 rounded-full border-4 border-[#00c2ac]/20 border-t-[#00c2ac] animate-spin" />
            </div>
            <span className="font-manrope font-semibold text-[12px] uppercase tracking-[0.25em] text-[#00c2ac] drop-shadow-[0_0_8px_rgba(0,194,172,0.4)]">
              Loading scroll stream...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
