import { useLayoutEffect } from "react";
import type { RefObject } from "react";
import { gsap } from "@/lib/gsap";

const REVEAL_START = "top 52%";

function only(...els: (HTMLElement | null)[]): HTMLElement[] {
  return els.filter((el): el is HTMLElement => el !== null);
}

interface Options {
  /** Called once the heading/subtitle/list have fully faded in. */
  onRevealed?: () => void;
}

export function useFaqReveal(root: RefObject<HTMLElement | null>, { onRevealed }: Options = {}) {
  useLayoutEffect(() => {
    const scope = root.current;
    if (!scope) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const heading = scope.querySelector<HTMLElement>(".faq__intro h2");
      const subtitle = scope.querySelector<HTMLElement>(".faq__intro p");
      const items = Array.from(scope.querySelectorAll<HTMLElement>(".faq-item"));

      if (!heading || !subtitle) return;

      // --- Reduced motion: skip straight to the final, settled state ---
      if (prefersReduced) {
        gsap.set([heading, subtitle, ...items], { clearProps: "all" });
        onRevealed?.();
        return;
      }

      gsap.set(only(heading, subtitle), { opacity: 0, y: 18, filter: "blur(10px)" });
      gsap.set(items, { opacity: 0, y: 16, filter: "blur(10px)" });

      const introTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: heading,
          start: REVEAL_START,
          once: true,
        },
      });

      introTl.to(only(heading, subtitle), { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, stagger: 0.1 }, 0);

      if (items.length > 0) {
        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: items[0],
              start: REVEAL_START,
              once: true,
            },
          })
          .to(items, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.55, stagger: 0.08 }, 0)
          // Only once everything above has fully landed does the first
          // question's answer get told it's allowed to open.
          .call(() => onRevealed?.(), [], "+=0.05");
      } else {
        introTl.call(() => onRevealed?.(), [], "+=0.05");
      }
    }, scope);

    return () => ctx.revert();
    // Deliberately omit onRevealed: it's a fresh closure each render, but
    // React guarantees the underlying setState it calls stays stable, and
    // re-running this whole entrance effect (and its ScrollTrigger) every
    // time the accordion is clicked later would be wrong.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [root]);
}
