import { useLayoutEffect } from "react";
import type { RefObject } from "react";
import { gsap } from "@/lib/gsap";

const REVEAL_START = "top 52%";
const RING_CIRCUMFERENCE = 133.52; // 2 * PI * r(21.25), matches the CSS default

function only(...els: (HTMLElement | null)[]): HTMLElement[] {
  return els.filter((el): el is HTMLElement => el !== null);
}

export function useTestimonialReveal(root: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = root.current;
    if (!scope) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const label = scope.querySelector<HTMLElement>(".quote__label");
      const slides = scope.querySelector<HTMLElement>(".quote__slides");
      const ring = scope.querySelector<SVGCircleElement>(".quote__arrow-ring circle");

      if (!label || !slides) return;

      // --- Reduced motion: skip straight to the final, settled state ---
      if (prefersReduced) {
        gsap.set(only(label, slides), { clearProps: "all" });
        if (ring) gsap.set(ring, { strokeDashoffset: 0 });
        return;
      }

      gsap.set(only(label, slides), { opacity: 0, y: 16, filter: "blur(10px)" });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: slides,
          start: REVEAL_START,
          once: true,
        },
      });

      tl.to(label, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 }, 0).to(
        slides,
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.65 },
        0.12
      );

      // The next-arrow's outline isn't there at all at first, then draws
      // itself around the button once, chasing its own tail until the two
      // ends meet and the ring closes — then it just stays closed.
      if (ring) {
        tl.fromTo(
          ring,
          { strokeDashoffset: RING_CIRCUMFERENCE },
          { strokeDashoffset: 0, duration: 2.25, ease: "power1.inOut" },
          0.5
        );
      }
    }, scope);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [root]);
}
