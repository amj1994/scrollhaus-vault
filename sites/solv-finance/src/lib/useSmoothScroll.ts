import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Smooth scrolling via Lenis, synced to GSAP's ticker and ScrollTrigger.
 * This is the backbone for scroll-hijacking / pinned / scrubbed animations:
 * every ScrollTrigger reads Lenis's virtual scroll position, so pin + scrub
 * feel buttery instead of janky.
 *
 * Respects prefers-reduced-motion by disabling smoothing.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Always refresh ScrollTrigger after mount + on window load so triggers
    // measure against the final, hydrated layout — otherwise in production
    // (SSR) triggers latch onto stale positions from before images/fonts
    // load and animations either fire early or never fire at all.
    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    window.addEventListener("load", refresh);

    if (prefersReduced) {
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("load", refresh);
      };
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // Drive Lenis from GSAP's ticker for a single synced RAF loop.
    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      // GSAP ticker time is in seconds; Lenis expects milliseconds.
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Kick a refresh after Lenis is wired so triggers pick up the real
    // scroll geometry.
    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);
}
