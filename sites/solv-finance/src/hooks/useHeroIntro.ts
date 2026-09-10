import { useLayoutEffect } from "react";
import type { RefObject } from "react";
import { gsap } from "@/lib/gsap";

const DESKTOP_NAV_BREAKPOINT = 900; // matches the CSS breakpoint that swaps nav for the hamburger menu
const NAV_ACTIONS_GAP = 4; // matches .nav__actions { gap: 4px } in CSS

interface Options {
  /** Called the moment the Cashflow card has arrived, so its chart can start drawing. */
  onCardVisible?: () => void;
}

export function useHeroIntro(
  root: RefObject<HTMLElement | null>,
  { onCardVisible }: Options = {}
) {
  useLayoutEffect(() => {
    const scope = root.current;
    if (!scope) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const title = scope.querySelector<HTMLElement>(".hero__title");
      const desc = scope.querySelector<HTMLElement>(".hero__desc");
      const ctaRow = scope.querySelector<HTMLElement>(".cta-row");
      const card = scope.querySelector<HTMLElement>(".card");
      const cardScroll = scope.querySelector<HTMLElement>(".card-scroll");
      const navWrap = scope.querySelector<HTMLElement>(".nav-wrap");
      const navLinks = scope.querySelectorAll<HTMLElement>(".nav__links a");
      const logoMark = scope.querySelector<HTMLElement>(".logo__mark");
      const logoLetters = scope.querySelectorAll<HTMLElement>(".logo-letter");
      const signUp = scope.querySelector<HTMLElement>(".nav__actions .nav__signup");
      const login = scope.querySelector<HTMLElement>(".nav__actions .nav__login");

      if (!title || !desc || !ctaRow || !card) return;

      // --- Reduced motion: skip straight to the final, settled state ---
      if (prefersReduced) {
        const allTargets = [
          navWrap,
          ...Array.from(navLinks),
          logoMark,
          ...Array.from(logoLetters),
          signUp,
          login,
          title,
          desc,
          ctaRow,
          card,
          cardScroll,
        ].filter((el): el is HTMLElement => el !== null);
        gsap.set(allTargets, { clearProps: "all" });
        onCardVisible?.();
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.1 });
      const isDesktopNav = window.innerWidth > DESKTOP_NAV_BREAKPOINT;

      // Step 1: the nav shell (pill backgrounds) appears.
      gsap.set(navWrap, { opacity: 0, y: -10 });
      tl.to(navWrap, { opacity: 1, y: 0, duration: 0.45 }, 0);

      // Step 2: the logo scales in, then "Solv." reveals letter-by-letter.
      // The logo itself is visible at every breakpoint (only .nav__links and
      // .nav__actions get display:none on mobile), so it always animates.
      if (logoMark && logoLetters.length > 0) {
        gsap.set(logoMark, { opacity: 0, scale: 0, transformOrigin: "50% 50%" });
        gsap.set(logoLetters, { opacity: 0, y: 10 });
        tl.to(logoMark, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" }, 0.3)
          .to(logoLetters, { opacity: 1, y: 0, duration: 0.35, stagger: 0.035 }, 0.5);
      }

      let heroTextStart = 0.85;

      // Step 3 (desktop only — on mobile these are display:none, replaced by
      // the hamburger menu): nav links fly up, then Sign up (which starts
      // centered in the actions pill, measured from Login's real width)
      // slides right into place as Login fades in behind it.
      if (isDesktopNav && navLinks.length > 0 && signUp && login) {
        const loginWidth = login.getBoundingClientRect().width;

        gsap.set(navLinks, { opacity: 0, y: 16 });
        gsap.set(login, { opacity: 0 });
        gsap.set(signUp, { x: -(loginWidth + NAV_ACTIONS_GAP) / 2 });

        tl.to(navLinks, { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 }, 0.35)
          .to(signUp, { x: 0, duration: 0.55, ease: "power3.inOut" }, 0.95)
          .to(login, { opacity: 1, duration: 0.4 }, 1.3);

        heroTextStart = 1.6;
      }

      tl.addLabel("heroText", heroTextStart);

      // --- Hero text (blur-in) + card (parallel) ---
      gsap.set(title, { opacity: 0, y: 18, filter: "blur(18px)" });
      gsap.set(desc, { opacity: 0, y: 16, filter: "blur(10px)" });
      gsap.set(ctaRow, { opacity: 0, y: 14 });
      gsap.set(card, { opacity: 0, y: 26, scale: 0.97 });
      if (cardScroll) gsap.set(cardScroll, { opacity: 0, y: 10 });

      tl.to(title, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9 }, "heroText")
        .to(
          card,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            onComplete: () => onCardVisible?.(),
          },
          "heroText"
        )
        .to(desc, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.75 }, "heroText+=0.18")
        .to(ctaRow, { opacity: 1, y: 0, duration: 0.55 }, "heroText+=0.4");

      if (cardScroll) {
        tl.to(cardScroll, { opacity: 1, y: 0, duration: 0.5 }, "heroText+=0.35");
      }

      // Gentle infinite float, picking up once the card has settled.
      tl.to(
        card,
        { y: -9, duration: 2.75, ease: "sine.inOut", yoyo: true, repeat: -1 },
        "heroText+=1.2"
      );
    }, scope);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [root]);
}
