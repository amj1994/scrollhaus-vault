import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { A } from "@/lib/assets";
import { AnimatedWords } from "@/components/AnimatedWords";

const INTER_TIGHT = "'Inter Tight', sans-serif";
const PLAYFAIR = "'Playfair Display', serif";
const SF_ROUNDED = "'SF Pro Rounded', system-ui, sans-serif";

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const PILL_ROW_HEIGHT = 56;
const PILL_GAP = 18;
const ACTIVE_HEIGHT = 80;
const ACTIVE_GAP = 22;
const ITEMS = [
  "Modern Minimalist",
  "Cozy Scandinavian",
  "Rustic Wooden design",
  "Bold Industrial",
  "Coastal Retreat",
  "Japandi Calm",
  "Art Deco Luxe",
];

function Pill({ label, isActive }: { label: string; isActive: boolean }) {
  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className={
        isActive
          ? "bg-white/25 backdrop-blur-xl shadow-xl flex items-center"
          : "bg-white/15 backdrop-blur-md rounded-full border border-white/10 flex items-center"
      }
      style={
        isActive
          ? { width: "calc(100% - 60px)", marginLeft: 30, marginRight: 30, height: ACTIVE_HEIGHT, padding: 8.5, borderRadius: 24, gap: 8.5 }
          : { width: 261, height: PILL_ROW_HEIGHT, padding: "0 12px", gap: 8.5 }
      }
    >
      <motion.div
        layoutId={`icon-${label}`}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="rounded-full bg-white/30 flex items-center justify-center shrink-0"
        style={isActive ? { width: 63, height: 63 } : { width: 44, height: 44 }}
      >
        {isActive ? (
          <img src={A.ArrowUp} alt="" className="w-6 h-6" />
        ) : (
          <div className="w-full h-full rounded-full bg-white/10" />
        )}
      </motion.div>

      <div className="relative flex-1 h-[44px] text-left ml-1">
        <motion.div
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0 flex flex-col justify-center"
        >
          <span className="text-white text-lg font-medium" style={{ fontFamily: SF_ROUNDED }}>
            {label}
          </span>
          <span className="text-white/70 text-[11px] tracking-[0.15em]" style={{ fontFamily: SF_ROUNDED }}>
            GROUNDAI CHOICE
          </span>
        </motion.div>
        <motion.div
          animate={{ opacity: isActive ? 0 : 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0 flex flex-col justify-center gap-1.5"
        >
          <div className="h-2 w-[140px] bg-white/50 rounded-full" />
          <div className="h-2 w-[70px] bg-white/35 rounded-full" />
        </motion.div>
      </div>
    </motion.div>
  );
}

function StyleCard({ delay }: { delay: number }) {
  const [active, setActive] = useState(2);
  const len = ITEMS.length;
  const half = Math.floor(len / 2);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % len);
    }, 2800);
    return () => window.clearInterval(id);
  }, [len]);

  return (
    <motion.div
      className="flex flex-1"
      variants={CARD_VARIANTS}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay, duration: 1.1, ease: "easeOut" }}
    >
      <div className="relative flex-1 h-[585px] rounded-3xl overflow-hidden bg-stone-300">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${A.backgroundCard})` }}
        />
        <div className="absolute inset-0 bg-black/10" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full" style={{ height: ACTIVE_HEIGHT }}>
            {ITEMS.map((item, i) => {
              let diff = ((i - active + len + half) % len) - half;
              const isActive = diff === 0;
              const visible = Math.abs(diff) <= 2;
              const y = diff === 0 ? 0 : diff < 0 ? diff * (PILL_ROW_HEIGHT + PILL_GAP) - ACTIVE_GAP : diff * (PILL_ROW_HEIGHT + PILL_GAP) + ACTIVE_GAP;
              const opacity = !visible ? 0 : Math.abs(diff) === 2 ? 0.55 : 1;

              return (
                <motion.div
                  key={item}
                  animate={{ y, opacity }}
                  transition={{ y: { type: "spring", stiffness: 260, damping: 28 }, opacity: { duration: 0.4, ease: "easeInOut" } }}
                  className="absolute left-0 right-0 flex justify-center pointer-events-none"
                >
                  <Pill label={item} isActive={isActive} />
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="pointer-events-none absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/30 to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
    </motion.div>
  );
}

function MorphBubble() {
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setFilled(true), 1100);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <motion.div
      layout
      animate={{ backgroundColor: filled ? "#9E948B" : "#FAFAFA14" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="mx-[45px] h-[135px] rounded-3xl p-[22px] overflow-hidden relative"
    >
      <AnimatePresence mode="wait">
        {!filled ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-start"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FFFFFF54] shrink-0" />
            <div className="ml-[12px] flex-1 flex flex-col gap-[9px]">
              <div className="h-[6px] w-[31px] bg-[#FFFFFF3D] rounded-full mt-[17px]" />
              <div className="h-[6px] w-[85%] bg-[#FFFFFF3D] rounded-full" />
              <div className="h-[6px] w-[55%] bg-[#FFFFFF3D] rounded-full" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="filled"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="flex items-center gap-[12px] h-[44px]">
              <div className="w-10 h-10 rounded-xl bg-white/70 flex items-center justify-center overflow-hidden">
                <img src={A.womem} alt="Me" className="w-full h-full object-cover" />
              </div>
              <span className="text-white text-base leading-none" style={{ fontFamily: SF_ROUNDED }}>
                Me
              </span>
            </div>
            <p className="text-white text-[15px] leading-snug mt-[-9px] ml-[56px]" style={{ fontFamily: SF_ROUNDED }}>
              My interior won't update, any ideas on how to use GroundAI?
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ChatCard({ delay }: { delay: number }) {
  return (
    <motion.div
      className="flex flex-1"
      variants={CARD_VARIANTS}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay, duration: 1.1, ease: "easeOut" }}
    >
      <div
        className="relative flex-1 h-[585px] rounded-3xl overflow-hidden flex flex-col pt-10 pb-10 justify-between"
        style={{ backgroundColor: "#141413" }}
      >
        <div className="flex-1 flex flex-col justify-center gap-[10px] mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mx-[58px] h-[108px] rounded-2xl flex items-start pt-[22px] pl-[22px] relative"
            style={{ backgroundColor: "#FAFAFA14" }}
          >
            <div className="w-10 h-10 rounded-xl shrink-0" style={{ backgroundColor: "#FFFFFF54" }} />
            <div className="ml-[12px] flex-1 flex flex-col gap-[9px] pr-[22px]">
              <div className="h-[6px] w-[31px] rounded-full mt-[17px]" style={{ backgroundColor: "#FFFFFF3D" }} />
              <div className="h-[6px] w-[85%] rounded-full" style={{ backgroundColor: "#FFFFFF3D" }} />
              <div className="h-[6px] w-[55%] rounded-full" style={{ backgroundColor: "#FFFFFF3D" }} />
            </div>
          </motion.div>

          <MorphBubble />
        </div>

        <div className="flex justify-between items-end pl-[32px] pr-[32px]">
          <div className="w-64 text-white text-4xl leading-10" style={{ fontFamily: SF_ROUNDED }}>
            <AnimatedWords text="Engage and delight customers" baseDelay={0.5} step={0.1} useInView />
          </div>
          <div className="flex items-center">
            <div
              className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xl text-white z-30"
              style={{ borderColor: "#141413", backgroundColor: "#5F5D4D", fontFamily: SF_ROUNDED }}
            >
              01
            </div>
            <div
              className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xl text-white/40 -ml-3 z-20"
              style={{ borderColor: "#141413", backgroundColor: "#252522", fontFamily: SF_ROUNDED }}
            >
              2
            </div>
            <div
              className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xl text-white/40 -ml-3 z-10"
              style={{ borderColor: "#141413", backgroundColor: "#252522", fontFamily: SF_ROUNDED }}
            >
              3
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const ADAPT_ITEMS = [
  { label: "Style preference", color: "#887C71" },
  { label: "Room layout rules", color: "#9E948B" },
  { label: "Furniture & décor choices", color: "#9E948B" },
];

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-[22px] h-[22px] text-neutral-400"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}

function AdaptableCard({ delay }: { delay: number }) {
  return (
    <motion.div
      className="flex flex-1"
      variants={CARD_VARIANTS}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay, duration: 1.1, ease: "easeOut" }}
    >
      <div
        className="relative flex-1 h-[585px] rounded-3xl overflow-hidden flex flex-col px-[33px] pt-[44px] pb-10"
        style={{ backgroundColor: "#9E948B" }}
      >
        <div className="flex flex-col gap-[26px]">
          <h3 className="text-white text-5xl font-normal leading-[1.05]" style={{ fontFamily: INTER_TIGHT }}>
            It&apos;s completely
            <br />
            adaptable.
          </h3>
          <p className="text-white/60 text-lg leading-snug max-w-[340px]" style={{ fontFamily: SF_ROUNDED }}>
            <AnimatedWords
              text="Customize GroundAI to fit your style and needs—whether you want modern minimalism, cozy comfort, or bold luxury."
              baseDelay={0.6}
              step={0.04}
              duration={0.4}
              y={8}
              wordClassName="inline-block mr-[5px]"
              useInView
            />
          </p>
        </div>

        <div className="mt-auto z-10 flex flex-col gap-[12px]">
          {ADAPT_ITEMS.map((it, idx) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 1.1 + idx * 0.18, duration: 0.55, ease: "easeOut" }}
              className="w-full py-[15px] px-[27px] rounded-2xl bg-white flex items-center justify-between"
            >
              <span className="text-lg" style={{ color: it.color, fontFamily: SF_ROUNDED }}>
                {it.label}
              </span>
              <PlusIcon />
            </motion.div>
          ))}
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 -bottom-10 h-[140px] -mx-4 z-20"
          style={{
            background:
              "linear-gradient(to top, rgba(158,148,139,1) 0%, rgba(158,148,139,1) 35%, rgba(158,148,139,0.7) 65%, rgba(158,148,139,0) 80%)",
          }}
        />
      </div>
    </motion.div>
  );
}

export default function CraftExperiences() {
  return (
    <section className="bg-white">
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 pt-16 pb-20">
        <h2
          className="text-center text-5xl md:text-6xl font-normal leading-[1.1] mb-12 text-neutral-900"
          style={{ fontFamily: INTER_TIGHT }}
        >
          <em style={{ fontFamily: PLAYFAIR, fontStyle: "italic" }}>Craft experiences</em> your
          <br />
          customers will remember
        </h2>

        <div className="flex flex-col lg:flex-row justify-between items-stretch gap-6">
          <StyleCard delay={0} />
          <ChatCard delay={0.35} />
          <AdaptableCard delay={0.7} />
        </div>
      </div>
    </section>
  );
}
