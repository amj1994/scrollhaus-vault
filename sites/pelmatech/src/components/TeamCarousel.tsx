import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MaskedImage } from "@/components/AnimatedHeading";

import blurDoctorSrc from "@/assets/blur-doctor.png";
import happyDoctorSrc from "@/assets/happy-doctor.png";
import youngDoctorSrc from "@/assets/young-doctor.png";

const TT_HOVES = '"TT Hoves", "Helvetica Neue", Helvetica, Arial, sans-serif';

const TEAM = [
  { img: blurDoctorSrc, role: "SURGEON GENERAL", name: "Dr. Helga Brooks" },
  { img: happyDoctorSrc, role: "PEDIATRICIAN", name: "Dr. Kwame Mbeki" },
  { img: youngDoctorSrc, role: "THERAPIST", name: "Dr. Matteo Dubois" },
  { img: happyDoctorSrc, role: "NEUROLOGIST", name: "Dr. Hana Sato" },
  { img: blurDoctorSrc, role: "CARDIOLOGIST", name: "Dr. Aria Vance" },
];

const INTRO_WIDTH = 324;
const GAP = 11.26;
const VISIBLE = 3.25;
const MAX_INDEX = Math.max(0, Math.ceil(TEAM.length - VISIBLE));

export default function TeamCarousel({ intro }: { intro: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex" style={{ gap: GAP }}>
        <div className="shrink-0" style={{ width: INTRO_WIDTH }}>
          {intro}
        </div>

        <div className="relative overflow-hidden flex-1 min-w-0">
          <motion.div
            className="flex"
            style={{
              gap: GAP,
              width: `calc(${TEAM.length} * ((100% - ${(VISIBLE - 1) * GAP}px) / ${VISIBLE}) + ${(TEAM.length - 1) * GAP}px)`,
            }}
            animate={{ x: `calc(${-index} * (100% + ${GAP}px) / ${TEAM.length})` }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {TEAM.map((m, i) => (
              <div
                key={i}
                className="shrink-0"
                style={{
                  width: `calc((100% - ${(TEAM.length - 1) * GAP}px) / ${TEAM.length})`,
                  fontFamily: TT_HOVES,
                }}
              >
                <div className="aspect-[3/4] overflow-hidden bg-muted">
                  <MaskedImage src={m.img} alt={m.name} className="w-full h-full" delay={i * 0.08} />
                </div>
                <div className="pt-6">
                  <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">{m.role}</p>
                  <p className="text-xl mt-2 font-medium">{m.name}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="flex items-center justify-center gap-4 rounded-full cursor-pointer"
              style={{
                width: 126,
                height: 126,
                background: "rgba(72, 72, 72, 0.16)",
                backdropFilter: "blur(84px)",
                WebkitBackdropFilter: "blur(84px)",
              }}
            >
              <button
                type="button"
                className="flex items-center justify-center text-white disabled:opacity-30 transition cursor-pointer"
                disabled={index === 0}
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
              >
                <ArrowLeft className="w-7 h-7" />
              </button>
              <button
                type="button"
                className="flex items-center justify-center text-white disabled:opacity-30 transition cursor-pointer"
                disabled={index >= MAX_INDEX}
                onClick={() => setIndex((i) => Math.min(MAX_INDEX, i + 1))}
              >
                <ArrowRight className="w-7 h-7" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
