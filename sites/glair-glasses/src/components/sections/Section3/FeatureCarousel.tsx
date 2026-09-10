import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FEATURE_CARDS } from "./cards";

const CYCLE_MS = 3800;
const SLOT_COUNT = 5;
const CENTER_SLOT = 2;

const TIER_STYLE: Record<number, { opacity: number; scale: number; blur: number }> = {
  0: { opacity: 1, scale: 1, blur: 0 },
  1: { opacity: 0.55, scale: 0.94, blur: 1.5 },
  2: { opacity: 0.2, scale: 0.88, blur: 3 },
};

const MARGIN_TOP: Record<number, number> = { 0: 50, 1: -62, 2: -42, 3: -42, 4: -72 };

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

interface CardInstance {
  id: number;
  cardIndex: number;
}

function createInitialInstances(): CardInstance[] {
  return [-2, -1, 0, 1, 2].map((offset, slot) => ({
    id: slot,
    cardIndex: mod(offset, FEATURE_CARDS.length),
  }));
}

export function FeatureCarousel() {
  const [instances, setInstances] = useState<CardInstance[]>(createInitialInstances);
  const nextId = useRef(SLOT_COUNT);
  const nextCardIndex = useRef(mod(2 + 1, FEATURE_CARDS.length));

  useEffect(() => {
    const id = setInterval(() => {
      setInstances((prev) => {
        const shifted = prev.slice(1);
        const newInstance: CardInstance = { id: nextId.current++, cardIndex: nextCardIndex.current };
        nextCardIndex.current = mod(nextCardIndex.current + 1, FEATURE_CARDS.length);
        return [...shifted, newInstance];
      });
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  const centerCardIndex = instances[CENTER_SLOT]?.cardIndex ?? 0;

  return (
    <div className="flex translate-y-[110px] items-center gap-4">
      <div className="hidden translate-y-[25px] flex-col items-center gap-[10px] md:flex" aria-hidden="true">
        {FEATURE_CARDS.map((card, i) => (
          <motion.span
            key={card.id}
            className="h-[5px] w-[5px] shrink-0 rounded-full"
            animate={{ backgroundColor: centerCardIndex === i ? "#6ee7b7" : "rgba(38,38,38,0.2)" }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      <div className="relative flex w-full max-w-[490px] flex-col items-center">
        <AnimatePresence initial={false} mode="popLayout">
          {instances.map((instance, slot) => {
            const card = FEATURE_CARDS[instance.cardIndex];
            const tier = TIER_STYLE[Math.abs(slot - CENTER_SLOT)];
            return (
              <motion.div
                key={instance.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: tier.opacity, scale: tier.scale, filter: `blur(${tier.blur}px)` }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{ zIndex: 10 - Math.abs(slot - CENTER_SLOT), marginTop: MARGIN_TOP[slot] }}
                className="relative flex w-full items-center justify-center gap-4 rounded-3xl border border-white/15 bg-transparent px-4 py-1.5 backdrop-blur-lg"
              >
                <img src={card.image} alt="" className="h-24 w-40 shrink-0 rounded-2xl object-cover" />
                <div className="flex flex-1 flex-col gap-2.5 py-2.5 pl-4">
                  <span className="text-lg font-bold leading-4 text-white">{card.title}</span>
                  <span className="text-base font-medium leading-5 text-white/80">{card.description}</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
