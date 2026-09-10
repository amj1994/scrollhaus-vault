import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedLines } from "@/components/ui/AnimatedLines";
import { useElementSize } from "@/lib/useElementSize";

const CARDS = [
  {
    id: "no-buttons",
    bg: "/assets/LeftCardBG.png",
    bgPosition: "center",
    title: ["No Buttons,", "No Noise"],
    description: "Clean lines. Seamless controls. Everything responds to voice or touch.",
  },
  {
    id: "discrete-tech",
    bg: "/assets/RightCardBG.png",
    bgPosition: "63% center",
    title: ["Discrete Tech", "Integration"],
    description: "Cameras and sensors are embedded invisibly into the frame.",
  },
] as const;

// The overlay sits at top-[67.6%] of the box, so this is how much of the
// box's own height is left below it for the card to render into.
const CARD_TOP_FRACTION = 0.676;

/**
 * Re-measures each card's natural (untransformed) content box and its
 * nowrap title's natural (unconstrained) width whenever the box resizes —
 * re-measuring directly off the DOM (offsetWidth/offsetHeight, both
 * transform-independent) instead of a second independent ResizeObserver,
 * which was observed to report stale sizes for these nested motion.div
 * elements. cardW/cardH is "how much room is actually available" (the w-full
 * card box already resolves to its real container width); titleW is "how
 * wide the whitespace-nowrap title really wants to be" — if that exceeds
 * cardW, the title itself would overflow sideways even though the card box
 * (being w-full) never visibly does.
 */
function useCardMeasurements(count: number, trigger: unknown) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Plain wrapper around each nowrap title — has no width of its own, so its
  // scrollWidth reveals the title's true (possibly overflowing) content
  // width even though the title's own parent forces it to a narrower w-full.
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [sizes, setSizes] = useState<{ cardW: number; cardH: number; titleW: number }[]>(
    Array.from({ length: count }, () => ({ cardW: 0, cardH: 0, titleW: 0 })),
  );

  useLayoutEffect(() => {
    setSizes(
      Array.from({ length: count }, (_, i) => ({
        cardW: cardRefs.current[i]?.offsetWidth ?? 0,
        cardH: cardRefs.current[i]?.offsetHeight ?? 0,
        titleW: titleRefs.current[i]?.scrollWidth ?? 0,
      })),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, trigger]);

  return { cardRefs, titleRefs, sizes };
}

export function Section6() {
  const [boxRef, boxSize] = useElementSize<HTMLDivElement>();
  const { cardRefs, titleRefs, sizes } = useCardMeasurements(CARDS.length, boxSize);
  // The fluid box already shrinks to fit a short viewport (via the
  // calc((100vh - 4rem) * 1840 / 800) term below) — that's fine and expected
  // even on an ordinary narrower desktop, since the box staying under 1840px
  // wide does NOT by itself mean the card no longer fits (there's normally
  // slack below it, and its own w-full width already tracks the box). Only
  // shrink the card once the remaining height below its top offset is
  // smaller than its own real content height — i.e. only on a viewport
  // that's genuinely too short, not merely narrower than the design canvas.
  const availableH = boxSize.height * (1 - CARD_TOP_FRACTION);
  const cardScales = sizes.map(({ cardH }) =>
    cardH > 0 && availableH > 0 ? Math.min(1, availableH / cardH) : 1,
  );
  // The title's own nowrap width is fixed regardless of cardScale (scaling
  // the card scales the title by the same factor, so it never changes
  // whether the title is wider than its own card — a uniform scale can't
  // fix that). This is a SEPARATE, nested scale applied only to each title
  // itself, sized so its rendered width fits its card's rendered width.
  const titleScales = sizes.map(({ cardW, titleW }) =>
    titleW > 0 && cardW > 0 ? Math.min(1, cardW / titleW) : 1,
  );

  return (
    <section
      id="section-6"
      className="relative flex w-full flex-col items-center justify-center px-5 py-16 lg:h-screen lg:min-h-[720px] lg:px-10 lg:py-8"
    >
      <div className="flex w-full max-w-md flex-col gap-4 lg:hidden">
        {CARDS.map((card) => (
          <div key={card.id} className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px]">
            <img
              src={card.bg}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: card.bgPosition }}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 to-transparent" />
            <div
              className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 rounded-2xl bg-white/5 p-4 backdrop-blur-[6px]"
              style={{ WebkitBackdropFilter: "blur(6px)" }}
            >
              <AnimatedLines
                lines={[...card.title]}
                className="font-sans text-lg font-bold leading-6 text-white"
              />
              <AnimatedLines
                text={card.description}
                className="font-sans text-sm font-medium leading-5 text-white/80"
              />
            </div>
          </div>
        ))}
      </div>

      <div
        ref={boxRef}
        className="relative hidden lg:flex lg:aspect-[1840/800] lg:gap-1"
        style={{ width: "min(100%, 1840px, calc((100vh - 4rem) * 1840 / 800))" }}
      >
        {CARDS.map((card, i) => {
          const isLeft = card.id === "no-buttons";
          const isRight = card.id === "discrete-tech";
          return (
            <div key={card.id} className="relative h-full flex-1 overflow-hidden rounded-[48px]">
              <motion.img
                src={card.bg}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: card.bgPosition }}
                initial={
                  isLeft ? { scale: 1, x: 0 } : isRight ? { rotate: -90 } : undefined
                }
                whileInView={
                  isLeft ? { scale: 1.1, x: -20 } : isRight ? { rotate: 0 } : undefined
                }
                viewport={isLeft || isRight ? { once: true, amount: 0.4 } : undefined}
                transition={isLeft || isRight ? { duration: 0.9, ease: "easeOut" } : undefined}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 to-transparent" />
              <div
                className="absolute left-[4.36%] top-[67.6%] flex w-[43.57%] flex-col items-start gap-3"
                style={{ transform: `scale(${cardScales[i]})`, transformOrigin: "top left" }}
              >
                <motion.div
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="flex w-full flex-col items-start gap-3 rounded-2xl bg-white/5 p-4 backdrop-blur-[6px]"
                  style={{ WebkitBackdropFilter: "blur(6px)" }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <div
                    ref={(el) => {
                      titleRefs.current[i] = el;
                    }}
                    style={{ transform: `scale(${titleScales[i]})`, transformOrigin: "top left" }}
                  >
                    <AnimatedLines
                      lines={[...card.title]}
                      className="whitespace-nowrap font-sans text-[24px] font-bold leading-7 text-white"
                      delay={1}
                    />
                  </div>
                  <AnimatedLines
                    text={card.description}
                    className="font-sans text-[15px] font-medium leading-[22px] text-white/80"
                    delay={1}
                  />
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
