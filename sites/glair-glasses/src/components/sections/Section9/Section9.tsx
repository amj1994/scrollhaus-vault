import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { LetterFadeIn } from "@/components/ui/LetterFadeIn";
import { cn } from "@/lib/cn";

const CARD_WIDTH = 300;
const CARD_HEIGHT = 440;
const REVEAL_HEIGHT = 64;
const DOTS = 4;

const PHOTO_CARDS = [
  {
    id: "travel-abroad",
    image: "/assets/FirstCard9sec.png",
    title: "Travel Abroad",
    description: "Real-time translation and turn-by-turn navigation, right in your line of sight.",
  },
  {
    id: "learning-on-the-go",
    image: "/assets/ThirdCard9sec.png",
    title: "Learning On the Go",
    description: "Instant definitions, context, and translations for anything you read or hear.",
  },
  {
    id: "shopping",
    image: "/assets/FourthCard9sec.png",
    title: "Shopping",
    description: "Instant product info, price comparison, and nutritional analysis.",
  },
  {
    id: "elderly-support",
    image: "/assets/Fifth.png",
    title: "Elderly Support",
    description: "Reminders, fall detection, and one-tap contact with family, always in view.",
  },
  {
    id: "everyday-assistance",
    image: "/assets/SixthCard9sec.png",
    title: "Everyday Assistance",
    description: "Step-by-step guidance for daily tasks, hands-free and always ready.",
  },
] as const;

function cardEntrance(index: number) {
  return {
    initial: { opacity: 0, y: index % 2 === 0 ? 40 : -40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.5, ease: "easeOut" as const, delay: index * 0.12 },
  };
}

function PhotoCard({
  image,
  title,
  description,
}: {
  image: string;
  title: string;
  description: string;
}) {
  return (
    <div
      className="group relative shrink-0 snap-start cursor-pointer"
      style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
    >
      <div className="absolute inset-x-0 bottom-0 flex flex-col justify-center px-1" style={{ height: REVEAL_HEIGHT }}>
        <p className="font-sans text-[13px] font-medium leading-[18px] text-white/55">{description}</p>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-full overflow-hidden rounded-[28px] bg-neutral-900 transition-transform duration-300 ease-out group-hover:-translate-y-16">
        <img src={image} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
        <span className="absolute bottom-4 left-4 right-4 whitespace-nowrap font-sans text-[20px] font-semibold text-white">
          {title}
        </span>
      </div>
    </div>
  );
}

function Pill({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center whitespace-nowrap rounded-full border border-white/25 px-4 py-2 text-[13px] font-medium text-white/60">
      {children}
    </span>
  );
}

function InfoCard() {
  return (
    <div
      className="relative flex shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[28px] bg-white/5 p-5"
      style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
    >
      <div className="flex flex-wrap gap-2">
        <Pill>Depth up to 5m</Pill>
        <Pill>Spatial depth perception</Pill>
        <Pill>Spatial depth perception</Pill>
      </div>
      <p className="font-sans text-[15px] font-medium leading-[22px] text-white/75">
        The GLAIR lenses can project images with 3D depth, creating the sensation of objects existing in real
        space.
      </p>
    </div>
  );
}

export function Section9() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const progress = max > 0 ? el.scrollLeft / max : 0;
    setActiveDot(Math.round(progress * (DOTS - 1)));
  };

  return (
    <AnimatedSection id="section-9" className="min-h-screen w-full bg-black py-8 text-white">
      <img
        src="/assets/New9secBG.png"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full scale-[1.04] object-cover blur-[18px]"
      />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1840px] flex-col px-5 lg:px-10">
        <div className="relative flex items-center justify-between py-5">
          <motion.div
            className="absolute left-0 right-0 top-0 h-px origin-center bg-white/15"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          />
          <span className="text-[13px] font-medium uppercase tracking-wide text-white/60">
            <LetterFadeIn text="Use Cases" />
          </span>
          <LetterFadeIn text="Your AI advantage, anywhere" className="text-sm font-medium text-white/60" />
        </div>

        <h2 className="mt-8 max-w-[720px] font-sans text-[28px] font-medium leading-tight lg:text-[38px] lg:leading-[1.2]">
          <LetterFadeIn text="From travel to work, " className="text-white" />
          <LetterFadeIn text="GLAIR adapts to every moment" className="text-[#9DBFB8]" />
          <LetterFadeIn
            text=" — offering instant information, navigation, and insights without lifting a finger."
            className="text-white"
          />
        </h2>

        <div className="mt-12 flex flex-1 flex-col justify-center gap-6">
          <div
            ref={scrollerRef}
            onScroll={handleScroll}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-hidden pb-2 pt-16 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ touchAction: "pan-x" }}
          >
            <motion.div className="shrink-0 snap-start" {...cardEntrance(0)}>
              <PhotoCard {...PHOTO_CARDS[0]} />
            </motion.div>
            <motion.div className="shrink-0 snap-start" {...cardEntrance(1)}>
              <InfoCard />
            </motion.div>
            {PHOTO_CARDS.slice(1).map((card, i) => (
              <motion.div key={card.id} className="shrink-0 snap-start" {...cardEntrance(i + 2)}>
                <PhotoCard {...card} />
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: DOTS }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === activeDot ? "w-6 bg-[#9DBFB8]" : "w-1.5 bg-white/25",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
