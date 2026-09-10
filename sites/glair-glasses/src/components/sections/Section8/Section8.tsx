import { useLayoutEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useElementSize } from "@/lib/useElementSize";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const CARDS = [
  {
    id: "swappable-lenses",
    bg: "/assets/LeftCardBG_Section8.png",
    top: "71.875%",
    title: ["Swappable", "Magnetic Lenses"],
    description: (
      <>
        <strong className="font-semibold text-neutral-900">Clear or tinted</strong> — switch in seconds, no
        tools needed.
      </>
    ),
    light: false,
  },
  {
    id: "unisex-fit",
    bg: "/assets/RightCardBG_Section8.png",
    top: "76.75%",
    title: ["Unisex Fit"],
    description: (
      <>
        Balanced form that <strong className="font-semibold text-white">works with any face shape</strong> or
        style.
      </>
    ),
    light: true,
  },
] as const;

// Matches each card's own top-[X%] offset above — how much of the box's
// height is left below it for that card to render into.
const CARD_TOP_FRACTIONS = [0.71875, 0.7675];

/**
 * Re-measures each card's natural (untransformed) content box and its
 * widest whitespace-nowrap title line's natural (unconstrained) width
 * whenever the box resizes — re-measuring directly off the DOM
 * (offsetWidth/offsetHeight/scrollWidth, all transform-independent) rather
 * than a second independent ResizeObserver, which was observed to report
 * stale sizes for these nested motion.div elements. cardW/cardH is "how much
 * room is actually available" (the card box's own width already resolves to
 * its real rendered size); titleW is "how wide the title really wants to
 * be" via scrollWidth, which reveals overflow even though the title's own
 * parent forces it narrower.
 */
function useCardMeasurements(count: number, trigger: unknown) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
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

export function Section8() {
  const [boxRef, boxSize] = useElementSize<HTMLDivElement>();
  const { cardRefs, titleRefs, sizes } = useCardMeasurements(CARDS.length, boxSize);
  // The fluid box already shrinks to fit a short viewport (via the
  // calc((100vh - 4rem) * 1840 / 800) term below) — that's fine and expected
  // even on an ordinary narrower desktop, since the box staying under 1840px
  // wide does NOT by itself mean the card no longer fits (there's normally
  // slack below it, and its own % width already tracks the box). Only shrink
  // the card once the remaining height below its own top offset is smaller
  // than its own real content height — i.e. only on a viewport that's
  // genuinely too short, not merely narrower than the design canvas.
  const cardScales = sizes.map(({ cardH }, i) => {
    const availableH = boxSize.height * (1 - CARD_TOP_FRACTIONS[i]);
    return cardH > 0 && availableH > 0 ? Math.min(1, availableH / cardH) : 1;
  });
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
      id="section-8"
      className="relative flex w-full flex-col items-center justify-center px-5 py-16 lg:h-screen lg:min-h-[720px] lg:px-10 lg:py-8"
    >
      <div className="flex w-full max-w-md flex-col gap-4 lg:hidden">
        {CARDS.map((card) => (
          <div key={card.id} className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] bg-neutral-100">
            <img src={card.bg} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <motion.div
              className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 rounded-2xl bg-white/5 p-4 backdrop-blur-[6px]"
              style={{ WebkitBackdropFilter: "blur(6px)" }}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <motion.h3
                variants={itemVariants}
                className={
                  card.light
                    ? "font-sans text-lg font-bold leading-6 text-white"
                    : "font-sans text-lg font-bold leading-6 text-neutral-900"
                }
              >
                {card.title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </motion.h3>
              <motion.p
                variants={itemVariants}
                className={
                  card.light
                    ? "font-sans text-sm font-medium leading-5 text-white/80"
                    : "font-sans text-sm font-medium leading-5 text-neutral-900/80"
                }
              >
                {card.description}
              </motion.p>
            </motion.div>
          </div>
        ))}
      </div>

      <div
        ref={boxRef}
        className="relative hidden lg:flex lg:aspect-[1840/800] lg:gap-1"
        style={{ width: "min(100%, 1840px, calc((100vh - 4rem) * 1840 / 800))" }}
      >
        {CARDS.map((card, i) => (
          <div
            key={card.id}
            className="relative h-full flex-1 overflow-hidden rounded-[32px] bg-neutral-100"
          >
            <motion.img
              src={card.bg}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ scale: 1.25 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
            <div
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute left-[4.36%] flex w-[43.57%] flex-col items-start gap-3"
              style={{ top: card.top, transform: `scale(${cardScales[i]})`, transformOrigin: "top left" }}
            >
              <motion.div
                className="flex flex-col items-start gap-3 rounded-2xl bg-white/5 p-4 backdrop-blur-[6px]"
                style={{ WebkitBackdropFilter: "blur(6px)" }}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
              >
                <motion.h3
                  ref={(el) => {
                    titleRefs.current[i] = el;
                  }}
                  style={{ transform: `scale(${titleScales[i]})`, transformOrigin: "top left" }}
                  variants={itemVariants}
                  className={
                    card.light
                      ? "font-sans text-[24px] font-bold leading-7 text-white"
                      : "font-sans text-[24px] font-bold leading-7 text-neutral-900"
                  }
                >
                  {card.title.map((line) => (
                    <span key={line} className="block whitespace-nowrap">
                      {line}
                    </span>
                  ))}
                </motion.h3>
                <motion.p
                  variants={itemVariants}
                  className={
                    card.light
                      ? "font-sans text-[15px] font-medium leading-[22px] text-white/80"
                      : "font-sans text-[15px] font-medium leading-[22px] text-neutral-900/80"
                  }
                >
                  {card.description}
                </motion.p>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
