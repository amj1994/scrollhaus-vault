import { useLayoutEffect } from "react";
import type { RefObject } from "react";
import { gsap } from "@/lib/gsap";

const REVEAL_START = "top 52%";

function only(...els: (HTMLElement | null)[]): HTMLElement[] {
  return els.filter((el): el is HTMLElement => el !== null);
}

export function useCapitalReveal(root: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = root.current;
    if (!scope) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const heading = scope.querySelector<HTMLElement>(".capital__head h2");
      const learnMore = scope.querySelector<HTMLElement>(".capital__head .btn");

      // Card 1 — "No spend restrictions". The card itself is never touched;
      // only its heading, tag rows, and paragraph animate.
      const card1 = scope.querySelector<HTMLElement>(".cap-panel");
      const card1Heading = scope.querySelector<HTMLElement>(".cap-panel h4");
      const tagsTop = scope.querySelector<HTMLElement>(".tags-row:not(.tags-row--shift)");
      const tagsBottom = scope.querySelector<HTMLElement>(".tags-row--shift");
      const card1Text = scope.querySelector<HTMLElement>(".cap-panel p");

      // Card 2 — "Intuitive Performance."
      const card2 = scope.querySelector<HTMLElement>(".cap-card--lav");
      const card2Heading = scope.querySelector<HTMLElement>(".cap-card--lav > h3");
      const balLabel = scope.querySelector<HTMLElement>(".bal-label");
      const balRow = scope.querySelector<HTMLElement>(".bal-row");
      const legend = scope.querySelector<HTMLElement>(".legend");
      const segSegments = Array.from(scope.querySelectorAll<HTMLElement>(".segbar span"));

      // Card 3 — the photo card's text overlay.
      const photoCard = scope.querySelector<HTMLElement>(".cap-photo");
      const photoTitle = scope.querySelector<HTMLElement>(".cap-photo__title");
      const photoText = scope.querySelector<HTMLElement>(".cap-photo__text");

      const allEls = [
        ...only(heading, learnMore, card1Heading, tagsTop, tagsBottom, card1Text),
        ...only(card2Heading, balLabel, balRow, legend),
        ...segSegments,
        ...only(photoTitle, photoText),
      ];

      if (allEls.length === 0) return;

      // --- Reduced motion: skip straight to the final, settled state ---
      if (prefersReduced) {
        gsap.set(allEls, { clearProps: "all" });
        return;
      }

      gsap.set(only(heading, learnMore), { opacity: 0, y: 18, filter: "blur(10px)" });
      gsap.set(only(card1Heading, card2Heading), { opacity: 0, y: 14, filter: "blur(10px)" });
      // Tag rows now drift infinitely via a CSS animation (see .tags-row /
      // .tags-row--shift in global.css) — GSAP must only fade their opacity
      // in, never touch x/transform, or it would fight the running CSS
      // animation for control of the same property.
      gsap.set(only(tagsTop, tagsBottom), { opacity: 0 });
      gsap.set(only(card1Text), { opacity: 0, y: 12, filter: "blur(10px)" });
      gsap.set(only(balLabel, balRow, legend), { opacity: 0, y: 10, filter: "blur(10px)" });
      gsap.set(segSegments, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(only(photoTitle, photoText), { opacity: 0, y: 12, filter: "blur(10px)" });

      // Section heading + Learn more.
      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: heading,
            start: REVEAL_START,
            once: true,
          },
        })
        .to(only(heading, learnMore), { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, stagger: 0.08 }, 0);

      // Card 1: only starts when the first card itself reaches the viewport.
      const card1Trigger = card1 ?? card1Heading;
      if (card1Trigger) {
        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: card1Trigger,
              start: REVEAL_START,
              once: true,
            },
          })
          .to(only(card1Heading), { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 }, 0)
          .to(only(tagsTop, tagsBottom), { opacity: 1, duration: 0.7 }, 0.2)
          .to(only(card1Text), { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5 }, 0.55);
      }

      // Card 2: starts from the performance card, not the whole section.
      const card2Trigger = card2 ?? card2Heading;
      if (card2Trigger) {
        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: card2Trigger,
              start: REVEAL_START,
              once: true,
            },
          })
          .to(only(card2Heading), { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 }, 0)
          .to(only(balLabel), { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45 }, 0.24)
          .to(only(balRow), { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45 }, 0.36)
          .to(only(legend), { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45 }, 0.48)
          .to(segSegments, { scaleX: 1, duration: 0.5, stagger: 0.09 }, 0.62);
      }

      // Card 3: photo overlay starts from the photo card.
      const photoTrigger = photoCard ?? photoTitle;
      if (photoTrigger) {
        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: photoTrigger,
              start: REVEAL_START,
              once: true,
            },
          })
          .to(only(photoTitle), { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 }, 0)
          .to(only(photoText), { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5 }, 0.2);
      }
    }, scope);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [root]);
}
