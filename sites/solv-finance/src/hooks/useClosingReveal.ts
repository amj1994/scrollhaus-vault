import { useLayoutEffect } from "react";
import type { RefObject } from "react";
import { gsap } from "@/lib/gsap";

const REVEAL_START = "top 52%";

function only(...els: (HTMLElement | null)[]): HTMLElement[] {
  return els.filter((el): el is HTMLElement => el !== null);
}

export function useClosingReveal(root: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const scope = root.current;
    if (!scope) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // --- CTA block ---
      const ctaBlock = scope.querySelector<HTMLElement>(".cta-block");
      const heading = scope.querySelector<HTMLElement>(".cta-block h2");
      const paragraph = scope.querySelector<HTMLElement>(".cta-block p");
      const expertsLabel = scope.querySelector<HTMLElement>(".cta__experts-label");
      const sep = scope.querySelector<HTMLElement>(".cta__sep");
      const btn = scope.querySelector<HTMLElement>(".cta__btn");
      const avatars = Array.from(scope.querySelectorAll<HTMLElement>(".cta__avatars img"));
      const badge = scope.querySelector<HTMLElement>(".cta__badge");
      // Left-to-right pop order: the 3 avatars, then the "+3" badge, which
      // sits visually last in the overlapping stack.
      const popTargets = [...avatars, ...only(badge)];

      // --- Footer ---
      const footer = scope.querySelector<HTMLElement>(".footer");
      const footerLogo = scope.querySelector<HTMLElement>(".footer__logo");
      const footerNav = scope.querySelector<HTMLElement>(".footer__nav");
      const footerAbout = scope.querySelector<HTMLElement>(".footer__about");
      const footerContact = scope.querySelector<HTMLElement>(".footer__contact");
      const footerSocial = scope.querySelector<HTMLElement>(".footer__social");
      const footerCopy = scope.querySelector<HTMLElement>(".footer__copy");
      const footerLang = scope.querySelector<HTMLElement>(".footer__lang-wrap");
      const footerGroups = only(
        footerLogo,
        footerNav,
        footerAbout,
        footerContact,
        footerSocial,
        footerCopy,
        footerLang
      );

      if (!heading || !paragraph) return;

      const simpleFades = only(heading, paragraph, expertsLabel, sep, btn);

      // --- Reduced motion: skip straight to the final, settled state ---
      if (prefersReduced) {
        gsap.set(
          [...simpleFades, ...popTargets, ...only(footer), ...footerGroups],
          { clearProps: "all" }
        );
        return;
      }

      gsap.set(only(heading), { opacity: 0, y: 20, filter: "blur(10px)" });
      gsap.set(only(paragraph), { opacity: 0, y: 18, filter: "blur(10px)" });
      gsap.set(only(expertsLabel, sep, btn), { opacity: 0, y: 14, filter: "blur(10px)" });
      gsap.set(popTargets, { scale: 0 });
      gsap.set(only(footer), { opacity: 0, y: 48, filter: "blur(10px)" });
      gsap.set(footerGroups, { opacity: 0, y: 22, filter: "blur(10px)" });

      // Heading, then text, then the rest of the row.
      const ctaTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: ctaBlock ?? heading,
          start: REVEAL_START,
          once: true,
        },
      });

      ctaTl.to(only(heading), { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.65 }, 0)
        .to(only(paragraph), { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 }, 0.2)
        .to(only(expertsLabel, sep, btn), { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, stagger: 0.06 }, 0.45);

      // Avatars + "+3" badge pop in last, one at a time, left to right —
      // a real scale "pop" (back.out overshoots slightly then settles),
      // not a plain fade.
      ctaTl.to(
        popTargets,
        { scale: 1, duration: 0.55, ease: "back.out(1.8)", stagger: 0.12 },
        0.85
      );

      // Footer starts only when the footer itself reaches the viewport.
      if (footer) {
        const footerTl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: footer,
            start: REVEAL_START,
            once: true,
          },
        });

        footerTl.to(footer, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.75 }, 0);
        footerTl.to(
          footerGroups,
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, stagger: 0.09 },
          0.25
        );
      }
    }, scope);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [root]);
}
