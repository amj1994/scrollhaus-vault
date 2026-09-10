import { useEffect, useRef, useState } from "react";
import { motion, type MotionValue } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { LetterFadeIn } from "@/components/ui/LetterFadeIn";
import { AnimatedLines } from "@/components/ui/AnimatedLines";
import { LensHud } from "./LensHud";
import { STEPS } from "./steps";
import { useScrollStepCycle } from "./useScrollStepCycle";

const LINE_TRANSITION = { duration: 0.6, ease: "easeInOut" as const };
const TEXT_FADE_TRANSITION = { duration: 0.3 };
const MONUMENT_W = 2560;
// The monument box is authored at 2560x1424, but its actual visible content
// (glasses image, connector lines, HUD text, step copy — measured across all
// 3 steps) only ever spans y:526..962 inside that box, i.e. ~436px tall; the
// rest is empty reserved space. Sizing the height-safety-scale off the full
// 1424 box shrinks the monument far more than necessary — using the real
// content height means the shrink only kicks in once the slot is actually
// too short for the content itself, not for the box's empty margins.
const MONUMENT_CONTENT_H = 437;

interface Section2Props {
  scrollYProgress: MotionValue<number>;
}

/** Tracks the monument slot's own rendered box, which shrinks below its
 * content's natural size on short viewports (overflow-hidden removes the
 * flex item's implicit min-height) — so the monument's scale can account
 * for however little height actually ends up available, not just width. */
function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, size] as const;
}

export function Section2({ scrollYProgress }: Section2Props) {
  const { currentStep, phase } = useScrollStepCycle(scrollYProgress);
  const active = STEPS[currentStep];
  const isRetracting = phase === "undrawing";
  const [slotRef, slotSize] = useElementSize<HTMLDivElement>();
  // Scale by whichever dimension is tighter, so the monument's real content
  // never exceeds the slot's actual box — on a short viewport that's the
  // height, not the width the original calc(100vw / 2560px) scale assumed.
  // Normally width wins (matching the original look untouched); height only
  // becomes binding once the viewport is genuinely too short for the content.
  const monumentScale =
    slotSize.width > 0 && slotSize.height > 0
      ? Math.min(slotSize.width / MONUMENT_W, slotSize.height / MONUMENT_CONTENT_H)
      : 0;

  return (
    <AnimatedSection id="section-2" className="w-full bg-black text-white">
      <div className="relative flex min-h-screen flex-col pb-32">
        <div className="mx-auto flex w-full max-w-[1840px] flex-col px-10 pt-8">
        <div className="relative flex items-center justify-between py-5">
          <motion.div
            className="absolute left-0 right-0 top-0 h-px origin-center bg-white/50"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <span className="text-base font-medium uppercase leading-4">
            <LetterFadeIn text="How It" className="text-[#9DBFB8]" />
            <LetterFadeIn text=" Works" className="text-white" />
          </span>
          <LetterFadeIn
            text="One Device. Unlimited Vision"
            className="text-lg font-medium leading-6 text-white"
          />
        </div>

        <h2 className="mt-[30px] max-w-[820px] font-sans text-[33px] font-medium leading-tight md:text-[45px] md:leading-[47.4px]">
          <LetterFadeIn text="GLAIR is a pair of " className="text-white" />
          <LetterFadeIn text="smart glasses" className="text-[#9DBFB8]" />
          <LetterFadeIn text=" powered by artificial intelligence." className="text-white" />
        </h2>
        </div>

        <div ref={slotRef} className="flex w-full flex-1 items-center justify-center overflow-hidden">
          <div className="relative flex h-0 w-0 items-center justify-center">
            <div
              className="absolute left-1/2 top-1/2 flex shrink-0 flex-col"
              style={{
                width: "2560px",
                height: "1424px",
                transformOrigin: "center center",
                transform: `translate(-50%, -50%) scale(${monumentScale})`,
              }}
            >
        <div className="relative mx-auto mt-16 grid w-full max-w-[1840px] flex-1 grid-cols-[240px_minmax(0,1200px)_240px] items-center justify-center gap-6 px-10">
          <div className="absolute left-[-320px] top-1/2 flex -translate-y-1/2 flex-col items-center gap-[10px] opacity-60">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-[10px] w-[10px] rounded-full"
                animate={{ backgroundColor: i === currentStep ? "#9DBFB8" : "rgba(255,255,255,0.4)" }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
          <div aria-hidden="true" />

          <div className="relative w-full max-w-[1200px]">
            <div className="scale-[1.15]">
              <div className="relative aspect-[911/288] w-full overflow-hidden bg-black">
                <img
                  src="/assets/Section2Glasses.png"
                  alt="GLAIR smart glasses"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              <div key={currentStep}>
                <div
                  className="pointer-events-none absolute top-[27%] flex items-center opacity-80"
                  style={{
                    left: `calc(50% - ${active.lines.long.leftPx}px)`,
                    right: "54px",
                    transform: `translate(-8px, ${active.lines.long.translateYPx}px)`,
                  }}
                >
                  <motion.div
                    className="h-1.5 w-1.5 rounded-full bg-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isRetracting ? 0 : 1 }}
                    transition={LINE_TRANSITION}
                  />
                  <motion.div
                    className="h-0.5 flex-1 origin-left bg-white"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isRetracting ? 0 : 1 }}
                    transition={LINE_TRANSITION}
                  />
                </div>
                <div
                  className="pointer-events-none absolute top-[32%] flex items-center opacity-80"
                  style={{
                    right: "54px",
                    width: `${active.lines.short.widthPx - 35}px`,
                    transform: `translate(-8px, ${active.lines.short.translateYPx}px)`,
                  }}
                >
                  <motion.div
                    className="h-1.5 w-1.5 rounded-full bg-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isRetracting ? 0 : 1 }}
                    transition={LINE_TRANSITION}
                  />
                  <motion.div
                    className="h-0.5 flex-1 origin-left bg-white"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isRetracting ? 0 : 1 }}
                    transition={LINE_TRANSITION}
                  />
                </div>
              </div>
            </div>

            {active.hud && (
              <motion.div
                key={currentStep}
                className="pointer-events-none absolute inset-0"
                animate={{ opacity: isRetracting ? 0 : 1 }}
                transition={TEXT_FADE_TRANSITION}
              >
                <LensHud hud={active.hud} leftPercent={11} />
                <LensHud hud={active.hud} leftPercent={59} isRightLens />
              </motion.div>
            )}
          </div>

          <div className="relative flex w-60 shrink-0 translate-x-[70px] flex-col gap-14 justify-self-end">
            <div className="flex flex-col gap-14 scale-[1.44]">
              <motion.div
                className="flex items-start gap-[5px] text-lg font-medium leading-6 text-white/40"
                animate={{ opacity: isRetracting ? 0 : 1 }}
                transition={TEXT_FADE_TRANSITION}
              >
                <span>Step</span>
                <AnimatedLines key={currentStep} text={String(active.step)} />
              </motion.div>
              <div
                className="flex min-h-[190px] flex-col gap-6 border-l-2 border-slate-400 py-1.5 pl-5"
                style={{ transform: "translateY(-38px)" }}
              >
                <motion.div animate={{ opacity: isRetracting ? 0 : 1 }} transition={TEXT_FADE_TRANSITION}>
                  <AnimatedLines
                    key={currentStep}
                    text={active.title}
                    className="text-xl font-bold leading-5 text-white"
                  />
                </motion.div>
                <motion.div animate={{ opacity: isRetracting ? 0 : 1 }} transition={TEXT_FADE_TRANSITION}>
                  <AnimatedLines
                    key={currentStep}
                    text={active.description}
                    className="text-lg font-medium leading-6 text-white/80"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
            </div>
          </div>
        </div>

      <div className="absolute inset-x-0 bottom-0 z-30 px-10 pb-6">
        <motion.p
          className="max-w-72 text-lg font-medium leading-6 text-white/80"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          They help you navigate, translate, recognize, and remember — instantly, hands-free,
          through a seamless visual interface.
        </motion.p>
      </div>
      </div>

      <div className="h-[10vh] w-full" aria-hidden="true" />
    </AnimatedSection>
  );
}
