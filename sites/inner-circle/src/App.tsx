import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import VideoScrubber from "@/components/VideoScrubber";
import SecondVideoScrubber from "@/components/SecondVideoScrubber";
import ScrollExitSplitText from "@/components/ScrollExitSplitText";
import SoapTiles from "@/components/SoapTiles";
import CylindricalTextDrum from "@/components/CylindricalTextDrum";
import Marquee from "@/components/Marquee";
import Logo from "@/components/Logo";
import {
  NovaWordmark,
  OrbitWordmark,
  FluxWordmark,
  VertexWordmark,
  PrismWordmark,
  EchoWordmark,
  DriftWordmark,
} from "@/components/Logos";
import { NAVIGATION_ITEMS } from "@/data";
import type { NavigationItem } from "@/types";

const MAX_PROGRESS = 3.5;
const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
const clamp01 = (n: number) => clamp(n, 0, 1);

function updateActiveSection(progress: number): string {
  if (progress < 0.18) return "hero";
  if (progress < 0.45) return "projects";
  if (progress < 0.68) return "expertise";
  if (progress < 1.15) return "about";
  return "contact";
}

function easeInOutCubic(p: number) {
  return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
}

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lerpedScrollProgress, setLerpedScrollProgress] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState("hero");

  const scrollProgressRef = useRef(0);
  const navAnimRef = useRef<number | null>(null);
  const lerpFrameRef = useRef(0);
  const lastTouchYRef = useRef(0);

  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  // Gesture controller
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const cancelNav = () => {
      if (navAnimRef.current !== null) {
        cancelAnimationFrame(navAnimRef.current);
        navAnimRef.current = null;
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      cancelNav();
      const next = clamp(scrollProgressRef.current + e.deltaY * 0.0006, 0, MAX_PROGRESS);
      scrollProgressRef.current = next;
      setScrollProgress(next);
      setActiveSectionId(updateActiveSection(next));
    };

    const onTouchStart = (e: TouchEvent) => {
      lastTouchYRef.current = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      cancelNav();
      const currentY = e.touches[0].clientY;
      const deltaTouchY = lastTouchYRef.current - currentY;
      lastTouchYRef.current = currentY;
      const next = clamp(scrollProgressRef.current + deltaTouchY * 0.0015, 0, MAX_PROGRESS);
      scrollProgressRef.current = next;
      setScrollProgress(next);
      setActiveSectionId(updateActiveSection(next));
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  // Lerp smoothing loop
  useEffect(() => {
    let currentLerp = 0;
    const tick = () => {
      const target = scrollProgressRef.current;
      currentLerp += (target - currentLerp) * 0.08;
      if (Math.abs(target - currentLerp) < 0.0001) currentLerp = target;
      setLerpedScrollProgress(currentLerp);
      lerpFrameRef.current = requestAnimationFrame(tick);
    };
    lerpFrameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(lerpFrameRef.current);
  }, []);

  const handleNavigateToSection = (item: NavigationItem) => {
    const startValue = scrollProgressRef.current;
    const endValue = item.scrollRatio;
    const duration = 1200;
    const startTime = performance.now();

    if (navAnimRef.current !== null) cancelAnimationFrame(navAnimRef.current);

    const step = (now: number) => {
      const elapsed = now - startTime;
      const p = clamp01(elapsed / duration);
      const eased = easeInOutCubic(p);
      const next = startValue + (endValue - startValue) * eased;
      scrollProgressRef.current = next;
      setScrollProgress(next);
      setActiveSectionId(updateActiveSection(next));
      if (p < 1) {
        navAnimRef.current = requestAnimationFrame(step);
      } else {
        navAnimRef.current = null;
      }
    };
    navAnimRef.current = requestAnimationFrame(step);
  };

  const secondScreenProgress = clamp01((lerpedScrollProgress - 1.15) / 0.5);
  const easedRisingProgress = 1 - Math.pow(1 - secondScreenProgress, 3);
  const smoothBlurAmount = Math.sin((secondScreenProgress * Math.PI) / 2) * 64;

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#00E0C7] text-white">
      <div className="relative w-full h-full overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full z-10 transition-transform duration-[100ms] ease-out"
          style={{ filter: secondScreenProgress > 0 ? `blur(${smoothBlurAmount}px)` : "none" }}
        >
          <VideoScrubber scrollProgress={Math.min(1, lerpedScrollProgress)} />

          <div className="absolute bottom-[40px] left-[1%] right-[1%] w-[98%] pointer-events-none z-20 select-none flex justify-center items-center">
            <ScrollExitSplitText
              scrollProgress={Math.min(1, lerpedScrollProgress)}
              containerClassName="w-full text-[10.4vw] leading-none font-michroma font-normal uppercase text-white whitespace-nowrap text-center transition-all duration-300 will-change-transform"
              style={{ letterSpacing: "-0.07em" }}
            >
              INNER CIRCLE
            </ScrollExitSplitText>
          </div>

          <SoapTiles scrollProgress={lerpedScrollProgress} />
        </div>

        <Header activeSectionId={activeSectionId} onNavigate={handleNavigateToSection} />

        <div
          className="absolute bottom-0 left-0 w-full h-full bg-[#050a12] rounded-t-[48px] overflow-hidden z-40"
          style={{
            transform: `translateY(${(1 - easedRisingProgress) * 100}%)`,
            visibility: secondScreenProgress > 0 ? "visible" : "hidden",
            willChange: "transform",
          }}
        >
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-16 h-[5px] bg-white rounded-full z-50 pointer-events-none" />
          <SecondVideoScrubber scrollProgress={lerpedScrollProgress} />
          <CylindricalTextDrum scrollProgress={lerpedScrollProgress} />

          <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 left-0 w-full sm:w-[65%] md:w-[60%] pl-6 sm:pl-12 md:pl-20 pr-6 sm:pr-12 md:pr-16 z-50 pointer-events-auto">
            <div className="w-full border-t border-white/[0.08] pt-6">
              <Marquee gap="80px" speed={25} fade>
                <Logo size={28} />
                <NovaWordmark />
                <OrbitWordmark />
                <FluxWordmark />
                <VertexWordmark />
                <PrismWordmark />
                <EchoWordmark />
                <DriftWordmark />
              </Marquee>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
