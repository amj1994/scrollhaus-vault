import { useLayoutEffect } from "react";
import type { RefObject } from "react";
import { gsap } from "@/lib/gsap";

const REVEAL_START = "top 52%";

export function usePromoReveal(root: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = root.current;
    if (!scope) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const title = scope.querySelector<HTMLElement>(".promo__title");
      const ctaRow = scope.querySelector<HTMLElement>(".promo__cta");
      const lead = scope.querySelector<HTMLElement>(".promo__lead");
      const body = scope.querySelector<HTMLElement>(".promo__body");
      const cardSpend = scope.querySelector<HTMLElement>(".card-spend");
      const cardDark = scope.querySelector<HTMLElement>(".card-dark");

      // Logo marquee is intentionally left untouched — no selectors for it here.

      if (!title || !ctaRow || !lead || !body || !cardSpend || !cardDark) return;

      const spendInner = [
        cardSpend.querySelector<HTMLElement>("h3"),
        ...Array.from(cardSpend.querySelectorAll<HTMLElement>("li")),
        cardSpend.querySelector<HTMLElement>(".btn"),
      ].filter((el): el is HTMLElement => el !== null);

      // Send money / Exchange money fly in from the right (x), separately
      // from the deco + title which keep a simple fade+y.
      const miniSend = cardDark.querySelector<HTMLElement>(".mini-send");
      const miniExch = cardDark.querySelector<HTMLElement>(".mini-exch");
      const darkRest = [
        cardDark.querySelector<HTMLElement>(".card-dark__deco"),
        cardDark.querySelector<HTMLElement>(".card-dark__title"),
      ].filter((el): el is HTMLElement => el !== null);

      // --- Reduced motion: skip straight to the final, settled state ---
      if (prefersReduced) {
        gsap.set(
          [title, ctaRow, lead, body, cardSpend, cardDark, ...spendInner, miniSend, miniExch, ...darkRest].filter(
            (el): el is HTMLElement => el !== null
          ),
          { clearProps: "all" }
        );
        return;
      }

      gsap.set([title, ctaRow, lead, body], { opacity: 0, y: 22, filter: "blur(10px)" });
      gsap.set([cardSpend, cardDark], { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(spendInner, { opacity: 0, y: 16, filter: "blur(10px)" });
      gsap.set(darkRest, { opacity: 0, y: 16, filter: "blur(10px)" });
      // mini-exch keeps a permanent +24px CSS offset (it crops at the card's
      // edge by design) — the fly-in starts further right and lands back on
      // that same +24, not 0, so the entrance doesn't cancel the CSS offset.
      if (miniSend) gsap.set(miniSend, { opacity: 0, x: 60 });
      if (miniExch) gsap.set(miniExch, { opacity: 0, x: 24 + 60 });

      // Left column: heading → CTAs → lead → body, gently staggered.
      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: title,
            start: REVEAL_START,
            once: true,
          },
        })
        .to(title, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7 }, 0)
        .to(ctaRow, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 }, 0.15)
        .to(lead, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 }, 0.32)
        .to(body, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 }, 0.46);

      // Cards now reveal from their own scroll positions, not from the section top.
      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: cardSpend,
            start: REVEAL_START,
            once: true,
          },
        })
        .to(
          cardSpend,
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.85, ease: "power4.out" },
          0
        )
        .to(spendInner, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, stagger: 0.09 }, 0.65);

      const darkTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: cardDark,
          start: REVEAL_START,
          once: true,
        },
      });

      darkTl
        .to(cardDark, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.85, ease: "power4.out" }, 0)
        .to(darkRest, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, stagger: 0.1 }, 0.65);

      // ...while Send money / Exchange money specifically fly in from the
      // right, Send money arriving just ahead of Exchange money.
      if (miniSend) darkTl.to(miniSend, { opacity: 1, x: 0, duration: 0.75 }, 0.65);
      if (miniExch) darkTl.to(miniExch, { opacity: 1, x: 24, duration: 0.75 }, 0.77);
    }, scope);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [root]);
}
