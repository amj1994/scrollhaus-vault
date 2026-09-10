import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { FeatureCarousel } from "./FeatureCarousel";
import { LetterFadeIn } from "@/components/ui/LetterFadeIn";
import { GlitchBackground } from "./GlitchBackground";

export function Section3() {
  return (
    <AnimatedSection
      id="section-3"
      className="h-screen min-h-[720px] w-full bg-[#dedcd6] text-neutral-900"
    >
      <GlitchBackground src="/assets/BG3sec.png" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1840px] flex-col px-10 pt-8">
        <div className="relative flex items-center justify-between py-5">
          <motion.div
            className="absolute left-0 right-0 top-0 h-px origin-center bg-black/50"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          />
          <span className="text-base font-medium uppercase leading-4">
            <LetterFadeIn text="What Can " className="text-[#9DBFB8]" />
            <LetterFadeIn text="GLAIR Do?" className="text-neutral-900" />
          </span>
          <LetterFadeIn
            text="Smart Features. Smarter Living"
            className="text-lg font-medium leading-6 text-neutral-900"
          />
        </div>

        <h2 className="mt-[30px] max-w-[611px] origin-top-left scale-[0.8] font-sans text-[21px] font-medium leading-tight md:text-[36px] md:leading-[38.4px]">
          <LetterFadeIn text="Smart glasses aren't just a screen" className="block text-neutral-900" />
          <LetterFadeIn text="in front of your eyes. GLAIR is your" className="block text-neutral-900" />
          <LetterFadeIn text="assistant, translator, navigator, and" className="block text-[#9DBFB8]" />
          <LetterFadeIn text="memory — in one device." className="block text-[#9DBFB8]" />
        </h2>

        <div className="flex flex-1 items-center justify-center pb-20">
          <motion.div
            className="-translate-y-[140px] scale-[0.8]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <FeatureCarousel />
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
