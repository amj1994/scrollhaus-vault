import { useLayoutEffect } from "react";
import type { RefObject } from "react";
import { gsap } from "@/lib/gsap";

const REVEAL_START = "top 52%";

function only(...els: (HTMLElement | null)[]): HTMLElement[] {
  return els.filter((el): el is HTMLElement => el !== null);
}

export function useArticlesReveal(root: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = root.current;
    if (!scope) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const heading = scope.querySelector<HTMLElement>(".articles__head h2");
      const more = scope.querySelector<HTMLElement>(".articles__more");
      const cards = Array.from(scope.querySelectorAll<HTMLElement>(".art-card"));

      if (!heading) return;

      // --- Reduced motion: skip straight to the final, settled state ---
      if (prefersReduced) {
        gsap.set([...only(heading, more), ...cards], { clearProps: "all" });
        return;
      }

      gsap.set(only(heading, more), { opacity: 0, y: 16, filter: "blur(10px)" });
      gsap.set(cards, { opacity: 0, y: 36, filter: "blur(10px)" });

      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: heading,
            start: REVEAL_START,
            once: true,
          },
        })
        .to(only(heading, more), { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, stagger: 0.08 }, 0);

      cards.forEach((card, index) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power3.out",
          delay: (index % 3) * 0.06,
          scrollTrigger: {
            trigger: card,
            start: REVEAL_START,
            once: true,
          },
        });
      });
    }, scope);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [root]);
}
