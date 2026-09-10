import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { LetterFadeIn } from "@/components/ui/LetterFadeIn";
import { cn } from "@/lib/cn";
import { GlitchBackground } from "./GlitchBackground";

const SPEC_ROWS = [
  [
    { icon: "/assets/LensesSVG.svg", label: "Lenses", value: "MicroLED Projection" },
    { icon: "/assets/ResolutionSVG.svg", label: "Resolution", value: "1280×720 px" },
    { icon: "/assets/BrightnessSVG.svg", label: "Brightness", value: "1800 nits" },
    { icon: "/assets/FieldSVG.svg", label: "Field of View", value: "30°" },
  ],
  [
    { icon: "/assets/DualSVG.svg", label: "Dual Cameras", value: "12 MP × 2" },
    { icon: "/assets/SensorSVG.svg", label: "Depth Sensor", value: "LIDAR" },
    { icon: "/assets/TrackingSVG.svg", label: "Tracking", value: "Eye-tracking & Head-tracking" },
    { icon: "/assets/ProcessorSVG.svg", label: "Processor", value: "Custom Neural Chip" },
  ],
  [
    { icon: "/assets/AIsvg.svg", label: "AI", value: "On-device ML + Cloud AI" },
    { icon: "/assets/BatterySVG.svg", label: "Battery Life", value: "12+ hours (typical use)" },
    { icon: "/assets/ChargingSVG.svg", label: "Charging", value: "Fast charging + Wireless dock" },
    { icon: "/assets/ConnectivitySVG.svg", label: "Connectivity", value: "Wi-Fi 6E + 5G" },
  ],
  [
    { icon: "/assets/BluetoothSVG.svg", label: "Bluetooth", value: "5.4" },
    { icon: "/assets/LocationSVG.svg", label: "Location", value: "GPS / GNSS" },
    { icon: "/assets/AudioSVG.svg", label: "Audio", value: "Bone conduction speakers" },
    { icon: "/assets/MicrophonesSVG.svg", label: "Microphones", value: "Smart microphone array" },
  ],
] as const;

const CONTAINER_DURATION = 0.5;
const CARD_WAVE_STEP = 0.07;
const CARD_FADE_DURATION = 0.4;
const CARDS_START_DELAY = 0.15;
const BOTTOM_WRAPPER_DELAY = 0.9;
const BOTTOM_WRAPPER_DURATION = 0.2;
const BUTTON_DELAY = 1.0;
const BUTTON_DURATION = 0.2;
const IMAGES_DELAY = 1.05;
const IMAGES_DURATION = 0.2;
const TEXT_DELAY = 1.1;
const TEXT_MAX_DELAY = 0.1;
const TEXT_DURATION = 0.25;

function SpecCell({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex h-full flex-col justify-between gap-3 rounded-2xl bg-white/5 p-4">
      <div className="flex items-center gap-2 text-white/50">
        <img src={icon} alt="" className="h-4 w-4 shrink-0" />
        <span className="font-sans text-[13px] font-medium">{label}</span>
      </div>
      <p className="font-sans text-[15px] font-medium leading-tight text-white">{value}</p>
    </div>
  );
}

export function Section10() {
  const [expanded, setExpanded] = useState(false);

  return (
    <AnimatedSection id="section-10" className="min-h-screen w-full bg-black py-8 text-white">
      <GlitchBackground src="/assets/BG10Sec.png" />
      <div className="relative mx-auto flex h-full w-full max-w-[1840px] flex-col px-10">
        <div className="relative flex items-center justify-between py-5">
          <motion.div
            className="absolute left-0 right-0 top-0 h-px origin-center bg-white/15"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          />
          <span className="text-[13px] font-medium uppercase tracking-wide text-white/60">
            <LetterFadeIn text="Tech Specs" />
          </span>
          <LetterFadeIn
            text="Ultra-light. Ultra-fast. Unbelievably smart."
            className="text-sm font-medium text-white/60"
          />
        </div>

        <div className="flex flex-1 items-center justify-center py-8">
          <motion.div
            className="flex w-full max-w-[640px] flex-col items-center gap-6 rounded-[32px] bg-white/5 p-8 backdrop-blur-[6px]"
            style={{ WebkitBackdropFilter: "blur(6px)" }}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: CONTAINER_DURATION, ease: "easeOut" }}
          >
            <div className="flex w-full flex-col gap-2">
              <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
                {SPEC_ROWS.slice(0, 3)
                  .flat()
                  .map((spec, i) => {
                    const row = Math.floor(i / 4);
                    const col = i % 4;
                    const delay = CARDS_START_DELAY + (row + col) * CARD_WAVE_STEP;
                    return (
                      <motion.div
                        key={spec.label}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: CARD_FADE_DURATION, ease: "easeOut", delay }}
                      >
                        <SpecCell {...spec} />
                      </motion.div>
                    );
                  })}
              </div>
              <motion.div
                className="grid w-full grid-cols-2 gap-2 overflow-hidden sm:grid-cols-4"
                initial={false}
                animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {SPEC_ROWS[3].map((spec) => (
                  <SpecCell key={spec.label} {...spec} />
                ))}
              </motion.div>
            </div>

            <motion.div
              className="flex w-full flex-col items-center gap-6 overflow-hidden"
              initial={{ height: 0 }}
              whileInView={{ height: "auto" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: BOTTOM_WRAPPER_DURATION, ease: "easeOut", delay: BOTTOM_WRAPPER_DELAY }}
            >
              <motion.button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                className="flex flex-col items-center gap-1 text-white/50 transition-colors hover:text-white/80"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: BUTTON_DURATION, ease: "easeOut", delay: BUTTON_DELAY }}
              >
                <img
                  src="/assets/ArrowDown.svg"
                  alt=""
                  className={cn("h-3 w-3 transition-transform duration-300", expanded && "rotate-180")}
                />
                <span className="font-sans text-[11px] font-medium uppercase tracking-wide">
                  {expanded ? "View Less" : "View More"}
                </span>
              </motion.button>

              <motion.div
                className="flex w-full items-center justify-center gap-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: IMAGES_DURATION, ease: "easeOut", delay: IMAGES_DELAY }}
              >
                <img
                  src="/assets/FirstIMAGE.png"
                  alt=""
                  className="h-16 w-16 shrink-0 rounded-xl object-cover"
                />
                <img
                  src="/assets/SecondIMAGE.png"
                  alt="GLAIR glasses folded in charging case"
                  className="h-auto w-64 shrink-0 rounded-2xl object-cover sm:w-72"
                />
                <img
                  src="/assets/ThirdthIMAGE.png"
                  alt=""
                  className="h-16 w-16 shrink-0 rounded-xl object-cover"
                />
              </motion.div>

              <p className="max-w-[320px] text-center font-sans text-[12px] leading-relaxed text-white/35">
                <LetterFadeIn
                  text="Specifications may change without notice."
                  startDelay={TEXT_DELAY}
                  maxDelay={TEXT_MAX_DELAY}
                  duration={TEXT_DURATION}
                />
                <br />
                <LetterFadeIn
                  text="Battery life varies by use and settings."
                  startDelay={TEXT_DELAY}
                  maxDelay={TEXT_MAX_DELAY}
                  duration={TEXT_DURATION}
                />
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
