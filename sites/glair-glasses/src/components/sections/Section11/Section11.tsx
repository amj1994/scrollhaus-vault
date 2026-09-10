import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { LetterFadeIn } from "@/components/ui/LetterFadeIn";

const SOCIAL_LINKS = ["INSTAGRAM", "FACEBOOK", "X", "YOUTUBE", "LINKEDIN"];

export function Section11() {
  return (
    <AnimatedSection id="section-11" className="h-screen min-h-[720px] w-full bg-black text-white">
      <div className="absolute inset-0 -translate-y-10 scale-[0.8]">
        <motion.img
          src="/assets/NewFooterBg.png"
          alt=""
          className="h-full w-full object-contain object-top"
          initial={{ y: "100%" }}
          whileInView={{ y: "0%" }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-10 pb-20 text-center">
        <h2 className="font-sans text-5xl font-medium leading-[0.95] md:text-7xl">
          <LetterFadeIn text="Ready to See Smarter?" />
        </h2>
        <p className="mt-6 max-w-[300px] text-base text-white/90 md:text-lg">
          <LetterFadeIn text="GLAIR is coming. " className="text-[#9DBFB8]/80" />
          <LetterFadeIn text="Be among the first to experience the future of vision." />
        </p>

        <motion.button
          className="relative mt-8 flex h-[44px] w-[172px] items-center justify-center gap-2 text-[13px] font-medium text-[#111111]"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 1.4 }}
        >
          <img
            src="/assets/BGButtonPreOrder.svg"
            alt=""
            className="absolute inset-0 h-full w-full"
          />
          <span className="relative">PRE-ORDER NOW</span>
          <img src="/assets/ArrowRight.svg" alt="" className="relative h-[9px] w-auto" />
        </motion.button>
      </div>

      <footer className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center justify-between gap-2 bg-[#9DBFB8] px-10 py-4 text-[12px] font-medium text-black/80 sm:flex-row">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
          <span>HELLO@GLAIR.AI</span>
          {SOCIAL_LINKS.map((link) => (
            <span key={link}>{link}</span>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-black/70">
          <span>Terms of Service</span>
          <span>Privacy Policy</span>
          <span>© 2025 GLAIR. ALL RIGHTS RESERVED.</span>
        </div>
      </footer>
    </AnimatedSection>
  );
}
