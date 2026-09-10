import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedLines } from "@/components/ui/AnimatedLines";
import { useElementSize } from "@/lib/useElementSize";

const COLORS = [
  {
    id: "graphite",
    label: "Graphite",
    dot: "/assets/LeftDot.svg",
    image: "/assets/LeftGlass.png",
    alt: "GLAIR smart glasses in Graphite",
  },
  {
    id: "pearl",
    label: "Pearl",
    dot: "/assets/RightDot.svg",
    image: "/assets/RightGlasses.png",
    alt: "GLAIR smart glasses in Pearl",
  },
] as const;

// The card sits at top-[65.9%] of the box, so this is how much of the box's
// own height is left below it for the card to render into.
const CARD_TOP_FRACTION = 0.659;

export function Section5() {
  const [selected, setSelected] = useState<(typeof COLORS)[number]["id"]>("graphite");
  const activeColor = COLORS.find((color) => color.id === selected)!;
  const [boxRef, boxSize] = useElementSize<HTMLDivElement>();
  const cardRef = useRef<HTMLDivElement>(null);
  // Plain wrapper around the nowrap title — has no width of its own, so its
  // scrollWidth reveals the title's true (possibly overflowing) content
  // width even though its parent forces it to the card's own (narrower) width.
  const titleRef = useRef<HTMLDivElement>(null);
  const [cardMeasured, setCardMeasured] = useState({ cardW: 0, cardH: 0, titleW: 0 });

  useLayoutEffect(() => {
    setCardMeasured({
      cardW: cardRef.current?.offsetWidth ?? 0,
      cardH: cardRef.current?.offsetHeight ?? 0,
      titleW: titleRef.current?.scrollWidth ?? 0,
    });
  }, [boxSize]);

  // The fluid box already shrinks to fit a short viewport (via the
  // calc((100vh - 4rem) * 1840 / 800) term below) — that's fine and expected
  // even on an ordinary narrower desktop, since the box staying under 1840px
  // wide does NOT by itself mean the card no longer fits (there's normally
  // slack below it). Only shrink the card once its real content actually
  // exceeds the vertical room it has (remaining height below its top
  // offset) — i.e. only on a viewport that's genuinely too short, not
  // merely narrower than the 1840px design canvas.
  const availableH = boxSize.height * (1 - CARD_TOP_FRACTION);
  const cardScale =
    cardMeasured.cardH > 0 && availableH > 0
      ? Math.min(1, availableH / cardMeasured.cardH)
      : 1;
  // The title's own nowrap width is fixed regardless of cardScale (scaling
  // the card scales the title by the same factor, so it never changes
  // whether the title is wider than its own card — a uniform scale can't
  // fix that). This is a SEPARATE, nested scale applied only to the title
  // itself, sized so its rendered width fits the card's rendered width.
  const titleScale =
    cardMeasured.titleW > 0 && cardMeasured.cardW > 0
      ? Math.min(1, cardMeasured.cardW / cardMeasured.titleW)
      : 1;

  return (
    <section
      id="section-5"
      className="relative flex h-full w-full flex-col items-center justify-center gap-3 px-5 py-6 lg:px-10 lg:py-8"
    >
      <div className="flex w-full max-w-md flex-col items-center gap-3 lg:hidden">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[32px] bg-neutral-100">
          <motion.img
            key={activeColor.id}
            src={activeColor.image}
            alt={activeColor.alt}
            className="absolute inset-0 h-full w-full object-contain p-8"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>

        <div className="flex items-center gap-3">
          {COLORS.map((color) => (
            <button
              key={color.id}
              type="button"
              onClick={() => setSelected(color.id)}
              aria-label={color.label}
              aria-pressed={selected === color.id}
              className="relative size-7"
            >
              <img src={color.dot} alt="" className="size-7 rounded-full" />
              {selected === color.id && (
                <span
                  className="absolute -left-1 -top-1 size-9 rounded-full outline outline-[3px] outline-slate-400"
                  style={{ outlineOffset: "-1.5px" }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="flex w-full flex-col items-center gap-2 rounded-2xl bg-neutral-100 p-4 text-center">
          <AnimatedLines
            lines={["Two", "Signature Colors"]}
            className="font-sans text-xl font-bold leading-6 text-neutral-900"
          />
          <AnimatedLines
            text="Available in Graphite (matte black) and Pearl (warm white)."
            className="font-sans text-sm font-medium leading-5 text-neutral-900/80"
          />
        </div>
      </div>

      <div
        ref={boxRef}
        className="relative hidden aspect-[1840/800] overflow-hidden rounded-[48px] bg-neutral-100 lg:block"
        style={{ width: "min(100%, 1840px, calc((100vh - 4rem) * 1840 / 800))" }}
      >
        <motion.img
          src="/assets/LeftGlass.png"
          alt="GLAIR smart glasses in Graphite"
          className="absolute left-[3.26%] top-[-6.5%] w-[46.63%]"
          animate={{ y: selected === "graphite" ? -25 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        <motion.img
          src="/assets/RightGlasses.png"
          alt="GLAIR smart glasses in Pearl"
          className="absolute left-[50.16%] top-[14.25%] w-[46.58%]"
          animate={{ y: selected === "pearl" ? -25 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        <div className="absolute left-[47.9%] top-[90.9%] flex items-center gap-3">
          {COLORS.map((color) => (
            <button
              key={color.id}
              type="button"
              onClick={() => setSelected(color.id)}
              aria-label={color.label}
              aria-pressed={selected === color.id}
              className="relative size-7"
            >
              <img src={color.dot} alt="" className="size-7 rounded-full" />
              {selected === color.id && (
                <span
                  className="absolute -left-1 -top-1 size-9 rounded-full outline outline-[3px] outline-slate-400"
                  style={{ outlineOffset: "-1.5px" }}
                />
              )}
            </button>
          ))}
        </div>

        <div
          ref={cardRef}
          className="absolute left-[2.17%] top-[65.9%] flex w-[20.87%] flex-col items-center justify-center gap-6 overflow-hidden rounded-2xl bg-transparent p-5"
          style={{ transform: `scale(${cardScale})`, transformOrigin: "top left" }}
        >
          <div ref={titleRef} style={{ transform: `scale(${titleScale})`, transformOrigin: "center" }}>
            <AnimatedLines
              lines={["Two", "Signature Colors"]}
              className="self-stretch whitespace-nowrap font-sans text-[24px] font-bold leading-7 text-neutral-900"
            />
          </div>
          <AnimatedLines
            text="Available in Graphite (matte black) and Pearl (warm white)."
            className="self-stretch font-sans text-[15px] font-medium leading-[22px] text-neutral-900/80"
          />
        </div>
      </div>
    </section>
  );
}
