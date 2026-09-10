import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedLines } from "@/components/ui/AnimatedLines";
import { useElementSize } from "@/lib/useElementSize";

// The block sits at top-[72.9%] of the box, so this is how much of the box's
// own height is left below it for the block to render into.
const CARD_TOP_FRACTION = 0.729;

export function Section7() {
  const [boxRef, boxSize] = useElementSize<HTMLDivElement>();
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardH, setCardH] = useState(0);

  useLayoutEffect(() => {
    setCardH(cardRef.current?.offsetHeight ?? 0);
  }, [boxSize]);

  // The fluid box already shrinks to fit a short viewport (via the
  // calc((100vh - 4rem) * 1840 / 800) term below) — that's fine and expected
  // even on an ordinary narrower desktop, since the box staying under 1840px
  // wide does NOT by itself mean the block no longer fits (there's normally
  // slack below it). Only shrink the block once the actual remaining room
  // below its top offset is smaller than its own real content height — i.e.
  // only on a viewport that's genuinely too short for it, not merely narrow
  // (this block has no whitespace-nowrap text, so it wraps instead of
  // overflowing sideways and needs no separate width safeguard).
  const availableH = boxSize.height * (1 - CARD_TOP_FRACTION);
  const cardScale = cardH > 0 && availableH > 0 ? Math.min(1, availableH / cardH) : 1;

  return (
    <section
      id="section-7"
      className="relative flex w-full flex-col items-center justify-center px-5 py-16 lg:h-screen lg:min-h-[720px] lg:px-10 lg:py-8"
    >
      <div className="w-full max-w-md overflow-hidden rounded-[32px] bg-neutral-100 lg:hidden">
        <img
          src="/assets/Sec7BG.png"
          alt="GLAIR smart glasses temple showing the featherlight carbon-titanium frame"
          className="h-56 w-full object-cover"
        />
        <div className="flex flex-col items-start gap-2 p-5">
          <AnimatedLines
            text="Featherlight Frame"
            className="font-sans text-lg font-bold leading-6 text-neutral-900"
          />
          <AnimatedLines
            text="Carbon-titanium build weighs **less than 38g** — comfortable from morning to night."
            className="font-sans text-sm font-medium leading-5 text-neutral-900/80"
            boldClassName="font-semibold text-neutral-900"
          />
        </div>
      </div>

      <div
        ref={boxRef}
        className="relative hidden aspect-[1840/800] overflow-hidden rounded-[48px] bg-neutral-100 lg:block"
        style={{ width: "min(100%, 1840px, calc((100vh - 4rem) * 1840 / 800))" }}
      >
        <motion.img
          src="/assets/Sec7BG.png"
          alt="GLAIR smart glasses temple showing the featherlight carbon-titanium frame"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ rotate: -30, scale: 2.3 }}
          whileInView={{ rotate: 0, scale: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />

        <div
          ref={cardRef}
          className="absolute left-[2.17%] top-[72.9%] flex w-[21.7%] flex-col items-start gap-3"
          style={{ transform: `scale(${cardScale})`, transformOrigin: "top left" }}
        >
          <AnimatedLines
            text="Featherlight Frame"
            className="font-sans text-[24px] font-bold leading-7 text-neutral-900"
          />
          <AnimatedLines
            text="Carbon-titanium build weighs **less than 38g** — comfortable from morning to night."
            className="font-sans text-[15px] font-medium leading-[22px] text-neutral-900/80"
            boldClassName="font-semibold text-neutral-900"
          />
        </div>
      </div>
    </section>
  );
}
