import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate, useScroll } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });
  ScrollTrigger.normalizeScroll(false);
}

const ASSET_BASE = "https://qclay.design/lovable/circom/";
const heroVideo = "/hero-bg.mp4";
const womenImg = `${ASSET_BASE}women.png`;
const usersImg = `${ASSET_BASE}users.png`;
const aboutLogo = `${ASSET_BASE}about-logo.svg`;

/* ----------------------------- Shared bits ----------------------------- */

export const Logo = ({ light = false }: { light?: boolean }) => (
  <div className={`flex items-center gap-2 font-semibold tracking-tight ${light ? "text-white" : "text-ink"}`}>
    <svg width="26" height="29" viewBox="0 0 27 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M.045 14.5C.045 12.9.025 11.26.045 9.65a4.86 4.86 0 0 1 .638-2.4 4.83 4.83 0 0 1 1.794-1.7C5.27 3.92 8.06 2.32 10.86.7A4.86 4.86 0 0 1 13.35-.01a4.86 4.86 0 0 1 2.49.72c2.74 1.57 5.47 3.14 8.2 4.72 1.59.91 2.55 2.23 2.56 4.1.03 3.48.09 6.95-.04 10.43a4.5 4.5 0 0 1-.61 1.92 4.9 4.9 0 0 1-1.92 1.42c-3.07 1.9-6.19 3.7-9.37 5.4a4.7 4.7 0 0 1-1.97.51 4.7 4.7 0 0 1-1.97-.51c-3.1-1.65-6.13-3.43-9.14-5.23A4.6 4.6 0 0 1 0 18.8c0-1.43 0-2.86 0-4.29Zm19.62 3.9c-.08-.25-.26-.3-.4-.37-1.73-1-3.46-2.02-5.22-2.99a1.5 1.5 0 0 1-.57-.49 1.5 1.5 0 0 1-.16-.72c.05-2.03.02-4.06 0-6.08 0-.17.09-.38-.15-.54-1.99 1.15-3.99 2.3-6 3.45a.55.55 0 0 0-.26.34c0 2.21 0 4.43 0 6.64 0 .14.04.28.11.4a.7.7 0 0 0 .3.28c1.89 1.07 3.77 2.15 5.65 3.24a.66.66 0 0 0 .43.11.66.66 0 0 0 .42-.11c1.21-.71 2.44-1.4 3.66-2.1.77-.44 1.52-.88 2.27-1.31Z" fill="currentColor"/>
    </svg>
    <span className="text-[17px]">Cirform</span>
  </div>
);

/* Animated number ticker */
function useCountUp(target: number, duration = 1, trigger = true, decimals = 0) {
  const mv = useMotionValue(0);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const controls = animate(mv, target, {
      duration, ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    });
    return controls.stop;
  }, [target, trigger, duration, mv]);
  return decimals === 0 ? Math.round(val) : Number(val.toFixed(decimals));
}

const formatNum = (n: number) => n.toLocaleString("en-US");

function SeamlessHeroVideo() {
  const videos = useRef<Array<HTMLVideoElement | null>>([]);
  const [activeVideo, setActiveVideo] = useState(0);
  const isCrossfading = useRef(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }, []);

  const crossfade = (from: number) => {
    if (from !== activeVideo || isCrossfading.current) return;
    const current = videos.current[from];
    const nextIndex = from === 0 ? 1 : 0;
    const next = videos.current[nextIndex];
    if (!current || !next) return;

    isCrossfading.current = true;
    next.currentTime = 0;
    next.play().then(() => {
      setActiveVideo(nextIndex);
      resetTimer.current = setTimeout(() => {
        current.pause();
        current.currentTime = 0;
        isCrossfading.current = false;
      }, 900);
    }).catch(() => {
      isCrossfading.current = false;
    });
  };

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ scale: 1.08 }}
      animate={{ scale: 1 }}
      transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
    >
      {[0, 1].map((index) => (
        <video
          key={index}
          ref={(element) => { videos.current[index] = element; }}
          src={heroVideo}
          autoPlay={index === 0}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          onTimeUpdate={(event) => {
            const video = event.currentTarget;
            if (video.duration && video.currentTime >= video.duration - 0.9) crossfade(index);
          }}
          onEnded={() => crossfade(index)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${activeVideo === index ? "opacity-90" : "opacity-0"}`}
        />
      ))}
    </motion.div>
  );
}

/* ----------------------------- 1. NAVBAR ----------------------------- */

export function Navbar({ scrolled }: { scrolled: boolean }) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1240px,calc(100%-2rem))]"
    >
      <div className="flex items-center justify-between rounded-full border border-white/10 bg-night/70 backdrop-blur-md px-4 py-2.5 text-white shadow-[0_10px_40px_-10px_rgba(0,0,0,.6)]">
        <Logo light />
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a className="link-quiet" href="#about">Career</a>
          <a className="link-quiet flex items-center gap-1" href="#about">Business <span className="opacity-60">▾</span></a>
          <a className="link-quiet" href="#performance">Products</a>
          <a className="link-quiet" href="#faq">Docs</a>
        </nav>
        <div className="flex items-center gap-2">
          <motion.div
            className="hidden md:flex items-center gap-2"
            animate={{ opacity: scrolled ? 1 : 0, x: scrolled ? 0 : 20 }}
            transition={{ duration: 0.5 }}
          >
            <img src={usersImg} alt="Finance advisors" className="h-7" />
          </motion.div>
          <a href="#" className="hidden sm:block text-sm link-quiet">Login</a>
          <a href="#" className="btn-pill !py-1.5 !px-4 text-sm">Sign up</a>
        </div>
      </div>
    </motion.header>
  );
}

/* ----------------------------- 2. HERO ----------------------------- */

function CurtainWord({ word, delay, className }: { word: string; delay: number; className?: string }) {
  return (
    <span className="inline-block overflow-hidden align-baseline mr-[0.22em]" style={{ paddingBottom: "0.12em" }}>
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.05, delay, ease: [0.22, 1, 0.36, 1] }}
        className={`inline-block ${className ?? ""}`}
      >
        {word}
      </motion.span>
    </span>
  );
}

export function Hero({ scrolled }: { scrolled: boolean }) {
  const revenue = useCountUp(10629, 1.2, true);
  const pct = useCountUp(26, 1, true);

  const { scrollY } = useScroll();
  const cardY = useTransform(scrollY, [0, 800], [0, 150]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".hero-content", {
        y: -80,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "40% top",
          scrub: 0.6,
        },
      });
      gsap.from(".revenue-card", {
        x: 120,
        opacity: 0,
        duration: 1.2,
        delay: 0.8,
        ease: "expo.out",
      });
    });
    return () => ctx.revert();
  }, []);



  return (
    <section className="hero-section relative min-h-[100svh] overflow-hidden bg-night text-white">
      {/* base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_50%,#0b1330_0%,#040716_60%,#000_100%)]" />
      <SeamlessHeroVideo />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-night" />

      {/* Content */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-6 pt-40 pb-12 min-h-[100svh] flex flex-col">
        <div className="hero-content will-change-transform flex-1 flex flex-col justify-center">
          <h1 className="text-[clamp(48px,7vw,92px)] leading-[1.02] font-medium tracking-[-0.02em] max-w-3xl">
            <span className="block">
              {["We", "create"].map((w, i) => (
                <CurtainWord key={`l1-${i}`} word={w} delay={0.1 + i * 0.08} />
              ))}
              <CurtainWord word="bright" delay={0.26} className="font-display" />
            </span>
            <span className="block">
              {["future", "for"].map((w, i) => (
                <CurtainWord
                  key={`l2-${i}`}
                  word={w}
                  delay={0.34 + i * 0.08}
                  className={i === 1 ? "font-display" : ""}
                />
              ))}
              <CurtainWord word="Banking" delay={0.5} className="font-display underline decoration-2 underline-offset-[6px]" />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-white/70 max-w-md text-[15px] leading-relaxed"
          >
            Empowering financial institutions with innovation,<br />
            trust, and seamless digital experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex items-center gap-6"
          >
            <motion.a
              href="#about"
              className="btn-pill"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Free trail
            </motion.a>
            <motion.a
              href="#about"
              className="text-white/80 text-sm link-quiet inline-flex"
              whileHover={{ x: 5, color: "#fff" }}
            >
              Learn more
            </motion.a>
          </motion.div>
        </div>

        {/* Revenue card */}
        <motion.div
          style={{ y: cardY }}
          className="revenue-card will-change-transform absolute right-6 top-32 w-[320px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 text-white shadow-[0_30px_80px_-30px_rgba(0,0,0,.8)]"
        >

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-white/80">
              <span className="inline-block h-4 w-4">
                <svg viewBox="0 0 24 14" fill="none"><path d="M21.95 1.25L12.29 10.91L8.61 5.39L1.25 12.75" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              Revenue
            </div>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white/60"/>
              <span className="w-1.5 h-1.5 rounded-full bg-white/30"/>
              <span className="w-1.5 h-1.5 rounded-full bg-white/30"/>
            </div>
          </div>
          <div className="mt-4 flex items-end gap-3">
            <div className="text-[40px] font-medium tracking-tight tabular-nums">${formatNum(revenue)}</div>
            <div className="text-xs text-white/60 pb-2">Last 30 days</div>
          </div>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white text-ink px-3 py-1 text-xs font-medium">
            +{pct}% <span className="text-ink-soft font-normal">Since previous 30 days</span>
          </div>
        </motion.div>

        {/* Bottom row */}
        <div className="relative flex items-end justify-between text-xs text-white/70 mt-auto pt-10">
          <div className="flex items-center gap-2 tracking-[.2em] uppercase">
            SCROLL <motion.span animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>↓</motion.span>
          </div>
          <motion.div
            animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? -10 : 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <span className="text-white/80">Meet with 10+ financial advisors</span>
            <div className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 pl-1 pr-3 py-1">
              <img src={usersImg} alt="Finance advisors" className="h-7" />
              <span className="text-white">Finance experts</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- 3. ABOUT ----------------------------- */

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px -15% 0px", once: true });
  const sentence = "We believe the future of banking is digital, transparent, and customer-first. Our platform empowers financial institutions to transform traditional operations into seamless digital experiences enhancing trust, efficiency, and innovation at every level.";
  const words = sentence.split(" ");
  const [recolored, setRecolored] = useState(false);

  // Count total letters and pre-compute the index of each empower-word letter
  // so the gradient can sweep left-to-right after the type-in completes.
  const empowerLetterIndex = new Map<string, number>();
  let empowerCounter = 0;
  let totalLetters = 0;
  words.forEach((w, wIdx) => {
    const isEmpower = wIdx >= 11 && wIdx <= 15;
    w.split("").forEach((_, lIdx) => {
      totalLetters++;
      if (isEmpower) {
        empowerLetterIndex.set(`${wIdx}-${lIdx}`, empowerCounter++);
      }
    });
  });
  const empowerTotal = empowerCounter;

  // Letter type-in animation timing (must stay in sync with GSAP below)
  const LETTER_STAGGER = 0.011;
  const LETTER_DURATION = 0.5;
  const typeInDuration = totalLetters * LETTER_STAGGER + LETTER_DURATION;

  useEffect(() => {
    if (!inView) return;
    // Trigger recolor once full text has finished appearing
    const t = setTimeout(() => setRecolored(true), typeInDuration * 1000 + 120);
    return () => clearTimeout(t);
  }, [inView, typeInDuration]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray<HTMLElement>(".about-letter");
      gsap.from(letters, {
        y: 60,
        opacity: 0,
        rotationX: 40,
        stagger: LETTER_STAGGER,
        duration: LETTER_DURATION,
        ease: "expo.out",
        transformOrigin: "top center",
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const baseGradient = 'linear-gradient(135deg, #c4bfe8 0%, #a8c4e8 50%, #b8cfe8 100%)';

  // Continuous horizontal gradient across the empower phrase:
  // first half stays solid #3078B8, then smoothly transitions to #000000.
  const colorForFraction = (f: number) => {
    const start = { r: 0x30, g: 0x78, b: 0xB8 };
    const end = { r: 0x00, g: 0x00, b: 0x00 };
    if (f <= 0.5) return `rgb(${start.r}, ${start.g}, ${start.b})`;
    const t = (f - 0.5) / 0.5;
    const r = Math.round(start.r + (end.r - start.r) * t);
    const g = Math.round(start.g + (end.g - start.g) * t);
    const b = Math.round(start.b + (end.b - start.b) * t);
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Total time across which the left-to-right gradient sweep plays
  const SWEEP_DURATION = 1.2;

  return (
    <section id="about" ref={ref} className="about-section bg-white py-32 perspective-[1000px]">
      <div className="max-w-[1100px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="flex justify-center mb-10"
        >
          <img src={aboutLogo} alt="About" className="h-7 w-auto" />
        </motion.div>
        <p style={{ fontSize: '44px', fontWeight: 500, lineHeight: '48px', letterSpacing: '-1.32px' }}>
          {words.map((word, wIdx) => {
            const isItalic = wIdx < 8;
            const isEmpower = wIdx >= 11 && wIdx <= 15;
            return (
              <span
                key={`w-${wIdx}`}
                style={{
                  display: 'inline-block',
                  marginRight: '0.32em',
                  fontFamily: isItalic ? '"Playfair Display", serif' : '"SF Pro Display", "Inter", sans-serif',
                  fontStyle: isItalic ? 'italic' : 'normal',
                }}
              >
                {word.split("").map((letter, lIdx) => {
                  const empIdx = empowerLetterIndex.get(`${wIdx}-${lIdx}`);
                  const sweepDelay =
                    isEmpower && empowerTotal > 0
                      ? ((empIdx ?? 0) / Math.max(empowerTotal - 1, 1)) * SWEEP_DURATION
                      : 0;
                  return (
                    <span
                      key={`l-${wIdx}-${lIdx}`}
                      className="about-letter"
                      style={{
                        display: 'inline-block',
                        position: 'relative',
                        backgroundImage: baseGradient,
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        color: 'transparent',
                      }}
                    >
                      {letter}
                      {isEmpower && empowerTotal > 0 && (
                        <span
                          aria-hidden
                          style={{
                            position: 'absolute',
                            inset: 0,
                            color: colorForFraction((empIdx ?? 0) / Math.max(empowerTotal - 1, 1)),
                            WebkitTextFillColor: colorForFraction((empIdx ?? 0) / Math.max(empowerTotal - 1, 1)),
                            backgroundImage: 'none',
                            opacity: recolored ? 1 : 0,
                            transition: 'opacity 0.55s ease-out',
                            transitionDelay: recolored ? `${sweepDelay}s` : '0s',
                            pointerEvents: 'none',
                          }}
                        >
                          {letter}
                        </span>
                      )}
                    </span>
                  );
                })}
              </span>
            );
          })}
        </p>
      </div>
    </section>

  );
}


/* ----------------------------- 4. NUMBERS SPEAK ----------------------------- */

const numberSlides = [
  { from: 0, to: 3, suffix: "M", label: "User worldwide" },
  { from: 998, to: 1000, suffix: "", label: "Transactions per day" },
  { from: 0, to: 70, suffix: "%", label: "Average users saved" },
];

export function NumbersSpeak() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1); // +1 = forward (right), -1 = back (left)
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-25% 0px" });

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setDir(1);
      setIdx((i) => (i + 1) % numberSlides.length);
    }, 3000);
    return () => clearInterval(id);
  }, [inView]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".numbers-display", {
        scale: 0.35,
        opacity: 0,
        y: 60,
        filter: "blur(14px)",
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: ".numbers-section", start: "top 75%", toggleActions: "play none none none" },
      });
      gsap.from(".numbers-label", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        delay: 0.45,
        ease: "expo.out",
        scrollTrigger: { trigger: ".numbers-section", start: "top 75%", toggleActions: "play none none none" },
      });
    });
    return () => ctx.revert();
  }, []);

  const slide = numberSlides[idx];
  const val = useCountUp(slide.to, 1.6, inView, 0);
  return (
    <section
      ref={ref}
      className="numbers-section relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #ffffff 35%, #e3edff 75%, #c9deff 100%)" }}
    >

      <div className="max-w-[900px] mx-auto px-6 text-center relative">
        <div className="flex justify-center mb-[84px]">
          <span className="chip">The numbers speak</span>
        </div>

        {/* Dotted arc */}
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none" style={{ width: 900, top: "-160px" }}>
            <svg width="900" height="220" viewBox="0 0 900 220" fill="none" aria-hidden className="block">
              <motion.path 
                d="M0 210 Q 450 -40 900 210" 
                stroke="rgba(25,37,68,0.55)" strokeWidth="2" strokeLinecap="round" strokeDasharray="0.1 10" fill="none"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              />
              <motion.path 
                d="M450 0 L450 75" stroke="rgba(25,37,68,0.55)" strokeWidth="2" strokeLinecap="round" strokeDasharray="0.1 8"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, ease: "easeOut", delay: 1 }}
              />
            </svg>
          </div>
          <div className="flex flex-col items-center relative" style={{ marginTop: "170px" }}>

            {/* Dust plume — fine dark specks drift up and to the right from the number,
                forming a long thinning trail like sand blown off the digits. */}
            <div
              key={`particles-${idx}`}
              className="absolute left-1/2 top-1/2 z-20 h-0 w-0 pointer-events-none"
              aria-hidden
            >
              {Array.from({ length: 140 }).map((_, i) => {
                const r1 = ((i * 53) % 100) / 100;
                const r2 = ((i * 91 + 17) % 100) / 100;
                const r3 = ((i * 37 + 11) % 100) / 100;
                const r4 = ((i * 71 + 5) % 100) / 100;
                const r5 = ((i * 29 + 41) % 100) / 100;
                const r6 = ((i * 17 + 23) % 100) / 100;

                // Emission origin: along the right half of the number's vertical extent,
                // biased toward the right edge — like dust being stripped off the glyphs.
                const ox = -20 + r5 * 120;             // -20 .. +100 px from center
                const oy = -50 + r6 * 100;             // spread across glyph height

                // Travel: up and to the right with shallow curve. Distance grows with r2
                // so the plume has both dense near-particles and far stragglers.
                const reach = 80 + r2 * 320;           // 80 .. 400 px travel
                const angle = -0.35 - r1 * 0.55;       // -0.35..-0.9 rad (above horizontal, biased right-up)
                const dx = Math.cos(angle) * reach;
                const dy = Math.sin(angle) * reach;    // negative (up)

                // Slight curl mid-flight
                const midX = dx * 0.45 + (r3 - 0.5) * 18;
                const midY = dy * 0.55 + (r4 - 0.5) * 12;

                const dur = 1.6 + r3 * 1.8;            // 1.6 .. 3.4 s
                const delay = r4 * 0.6;
                const size = 0.6 + r1 * 1.4;           // 0.6 .. 2.0 px — very fine
                const peakOpacity = 0.35 + r2 * 0.45;  // 0.35 .. 0.8

                return (
                  <motion.span
                    key={`${idx}-${i}`}
                    initial={{ x: ox, y: oy, opacity: 0 }}
                    animate={{
                      x: [ox, ox + midX, ox + dx],
                      y: [oy, oy + midY, oy + dy],
                      opacity: [0, peakOpacity, 0],
                    }}
                    transition={{
                      duration: dur,
                      delay,
                      ease: [0.22, 0.61, 0.36, 1],
                      times: [0, 0.45, 1],
                    }}
                    className="absolute left-0 top-0 rounded-full bg-[#1b2a4a]"
                    style={{ width: size, height: size }}
                  />
                );
              })}
            </div>

            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="numbers-display relative text-[clamp(80px,12vw,150px)] font-medium leading-none tracking-tight tabular-nums text-num-gradient"
            >
              {val}{slide.suffix}
            </motion.div>
            <motion.div
              key={`l${idx}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="numbers-label mt-6 text-[18px] text-ink"
            >
              {slide.label}
            </motion.div>

            <div className="mt-6 flex gap-2">
              {numberSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDir(i >= idx ? 1 : -1);
                    setIdx(i);
                  }}
                  className={`h-1.5 rounded-full transition-all ${i === idx ? "w-5 bg-brand-deep" : "w-1.5 bg-ink/20"}`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
