import { useLayoutEffect } from "react";
import type { RefObject } from "react";
import { gsap } from "@/lib/gsap";

const REVEAL_START = "top 52%";

function only(...els: (HTMLElement | null)[]): HTMLElement[] {
  return els.filter((el): el is HTMLElement => el !== null);
}

export function useFeeReveal(
  root: RefObject<HTMLElement | null>,
  opts?: { targetRevenue?: number; onRevenue?: (v: number) => void }
) {
  useLayoutEffect(() => {
    const scope = root.current;
    if (!scope) return;

    const targetRevenue = opts?.targetRevenue ?? 0;
    const onRevenue = opts?.onRevenue;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const heading = scope.querySelector<HTMLElement>(".fee__left h2");
      const paragraph = scope.querySelector<HTMLElement>(".fee__left p");
      const applyBtn = scope.querySelector<HTMLElement>(".fee__left .btn");
      const calc = scope.querySelector<HTMLElement>(".fee__calc");
      const calcTitle = scope.querySelector<HTMLElement>(".calc__title");
      const calcDivider = scope.querySelector<HTMLElement>(".calc__divider");

      const blocks = Array.from(scope.querySelectorAll<HTMLElement>(".calc__block"));
      const [revenueBlock, estimateBlock] = blocks;

      const revenueLabel = revenueBlock?.querySelector<HTMLElement>(".calc__label") ?? null;
      const revenueValue = revenueBlock?.querySelector<HTMLElement>(".calc__value") ?? null;

      const estimateLabel = estimateBlock?.querySelector<HTMLElement>(".calc__label") ?? null;
      const estimateValue = estimateBlock?.querySelector<HTMLElement>(".calc__value") ?? null;

      if (!heading || !paragraph || !calc) return;

      const allEls = [
        ...only(heading, paragraph, applyBtn, calcTitle, calcDivider),
        ...only(revenueLabel, revenueValue, estimateLabel, estimateValue),
      ];

      if (prefersReduced) {
        gsap.set([calc, ...allEls], { clearProps: "all" });
        onRevenue?.(targetRevenue);
        return;
      }

      gsap.set(only(heading, paragraph, applyBtn), { opacity: 0, y: 18, filter: "blur(10px)" });
      gsap.set(calc, { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(only(calcTitle, calcDivider), { opacity: 0, y: 10, filter: "blur(10px)" });
      gsap.set(only(revenueLabel, estimateLabel, estimateValue), { opacity: 0, y: 10, filter: "blur(10px)" });
      gsap.set(only(revenueValue), { opacity: 1 });

      // Reset the driven revenue to 0 at the start of the reveal.
      onRevenue?.(0);

      gsap
        .timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: heading,
            start: REVEAL_START,
            once: true,
          },
        })
        .to(only(heading, paragraph, applyBtn), { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, stagger: 0.12 }, 0);

      const calcTl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: calc,
          start: REVEAL_START,
          once: true,
        },
      });

      calcTl.to(calc, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power2.inOut" }, 0);
      calcTl.to(only(calcTitle, calcDivider), { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.55, stagger: 0.1 }, 0.85);
      calcTl.to(only(revenueLabel), { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5 }, 1.1);

      // Count-up drives React state — the number, slider fill/knob, and
      // funding estimate all update from the same source of truth.
      const countProxy = { value: 0 };
      calcTl.to(
        countProxy,
        {
          value: targetRevenue,
          duration: 1.4,
          ease: "power1.out",
          onUpdate: () => {
            onRevenue?.(countProxy.value);
          },
        },
        1.35
      );

      calcTl.to(only(estimateLabel), { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5 }, 2.85);
      calcTl.to(only(estimateValue), { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.55 }, 3.0);
    }, scope);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [root]);
}
