import { useEffect } from "react";
import type { RefObject } from "react";

interface MarqueeOptions {
  /** px per second — constant visual speed regardless of content width. */
  speed?: number;
}

/**
 * Pixel-exact seamless infinite marquee, the same technique as
 * LogoMarquee: `trackRef`'s element must contain two identical child
 * groups (a visible one, then a duplicate marked `aria-hidden`); this
 * measures the duplicate's `offsetLeft` (= exactly the width of one full
 * set + its trailing gap) and exposes it as `--marquee-shift` /
 * `--marquee-dur` custom properties on the track, which a CSS
 * `@keyframes` animation then reads.
 *
 * Re-measures on resize. Does nothing (leaves the CSS `animation: none`
 * fallback in charge) if either ref isn't mounted.
 */
export function useMarquee(
  trackRef: RefObject<HTMLElement | null>,
  duplicateRef: RefObject<HTMLElement | null>,
  { speed = 42 }: MarqueeOptions = {}
) {
  useEffect(() => {
    const track = trackRef.current;
    const duplicate = duplicateRef.current;
    if (!track || !duplicate) return;

    const measure = () => {
      track.style.animation = "none";
      // Measure the duplicate's position relative to the track itself
      // (not offsetLeft, which is relative to the nearest positioned
      // ancestor and gets thrown off by any margin on the track — e.g.
      // the reversed "shift" row in Capital.tsx has margin-left:-90px).
      const shift =
        duplicate.getBoundingClientRect().left - track.getBoundingClientRect().left;
      if (shift > 0) {
        track.style.setProperty("--marquee-shift", `${shift}px`);
        track.style.setProperty("--marquee-dur", `${shift / speed}s`);
      }
      // Force reflow, then restore the animation so it restarts cleanly.
      void track.offsetWidth;
      track.style.animation = "";
    };

    measure();

    // ResizeObserver instead of a window "resize" listener — catches any
    // change to the track's actual rendered size (a flex-wrap reflow, a
    // late font swap, etc.), not just the window itself resizing. A plain
    // resize listener can miss those, leaving stale --marquee-shift/-dur
    // values that no longer match the content, which shows up as the
    // copies overlapping instead of lining up cleanly at the loop point.
    let debounceT: number;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(debounceT);
      debounceT = window.setTimeout(measure, 120);
    });
    ro.observe(track);

    return () => {
      window.clearTimeout(debounceT);
      ro.disconnect();
    };
  }, [trackRef, duplicateRef, speed]);
}
