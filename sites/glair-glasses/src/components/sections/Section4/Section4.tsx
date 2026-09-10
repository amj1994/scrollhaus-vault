import { useRef } from "react";
import { motion, useMotionValueEvent, useTransform, type MotionValue } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { LetterFadeIn } from "@/components/ui/LetterFadeIn";

interface Section4Props {
  scrollYProgress: MotionValue<number>;
}

export function Section4({ scrollYProgress }: Section4Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoProgress = useTransform(scrollYProgress, [0, 0.35], [0, 1], { clamp: true });

  useMotionValueEvent(videoProgress, "change", (latest) => {
    const video = videoRef.current;
    if (video && video.duration) {
      video.currentTime = latest * video.duration;
    }
  });

  return (
    <AnimatedSection id="section-4" className="h-screen min-h-[720px] w-full bg-black text-white">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/assets/Glasses4secBG.mp4"
        preload="auto"
        muted
        playsInline
      />

      <div
        className="pointer-events-none absolute mix-blend-color-dodge blur-[1.5px]"
        style={{
          width: 984,
          height: 1639,
          right: "-140px",
          top: "-320px",
          transform: "rotate(-82.49deg)",
          transformOrigin: "top left",
          background: "linear-gradient(180deg, transparent 0%, #9DBFB8 45%, transparent 100%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1840px] flex-col px-10 pt-8">
        <div className="relative flex items-center justify-between py-5">
          <motion.div
            className="absolute left-0 right-0 top-0 h-px origin-center bg-white/50"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          />
          <span className="text-center text-base font-medium uppercase leading-4">
            <LetterFadeIn text="Design" className="text-slate-400" />
            <LetterFadeIn text=" by Glair" className="text-white" />
          </span>
          <LetterFadeIn
            text="Futuristic Design, Built for Everyday Life"
            className="text-lg font-medium leading-6 text-white"
          />
        </div>

        <div className="flex flex-1 items-center justify-center">
          <p className="max-w-[820px] -translate-y-[170px] scale-[0.8] text-center text-[42px] font-medium leading-[44px]">
            <LetterFadeIn text="GLAIR combines " className="text-white" />
            <LetterFadeIn
              text="advanced materials, timeless style, and invisible tech"
              className="text-[#9DBFB8]"
            />
            <LetterFadeIn text=" — so you can wear it all day, anywhere." className="text-white" />
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}
