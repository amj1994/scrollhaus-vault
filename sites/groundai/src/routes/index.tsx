import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

import { A } from "@/lib/assets";
import { AnimatedWords } from "@/components/AnimatedWords";
import TrustedBy from "@/components/TrustedBy";
import CraftExperiences from "@/components/CraftExperiences";
import Testimonials from "@/components/Testimonials";

const EASE = [0.22, 1, 0.36, 1] as const;
const INTER_TIGHT = "'Inter Tight', sans-serif";
const PLAYFAIR = "'Playfair Display', serif";
const SF_ROUNDED = "'SF Pro Rounded', system-ui, sans-serif";

const NAV_LINKS = ["Product", "Platform", "Customers", "Company"];

export const Route = createFileRoute("/")({
  component: Index,
});

function Hero() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative min-h-screen w-full text-white flex flex-col justify-between p-6 md:p-12 overflow-hidden">
      <video
        src={A.Hero}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20 z-0" />

      <motion.header
        initial={{ y: "45vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: EASE }}
        className="w-full max-w-[1360px] mx-auto flex justify-between items-center z-20 relative"
      >
        <div className="flex items-center gap-[20px]">
          <img src={A.logo} alt="GroundAI" className="h-9 w-auto" />
          <span className="text-white text-3xl font-medium" style={{ fontFamily: INTER_TIGHT }}>
            GroundAI
          </span>
        </div>

        <motion.nav
          layout
          initial={{ width: 110 }}
          animate={{ width: "auto" }}
          transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
          style={{ willChange: "width" }}
          className="hidden lg:flex bg-black/40 backdrop-blur-lg rounded-3xl items-center overflow-hidden h-[64px] flex-row-reverse"
        >
          <div className="p-1.5">
            <button
              type="button"
              className="h-12 px-6 rounded-full bg-white text-black text-xl font-medium hover:bg-neutral-100 transition-colors"
              style={{ fontFamily: SF_ROUNDED }}
            >
              Login
            </button>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="flex items-center gap-8 pl-8 pr-2 whitespace-nowrap"
          >
            {NAV_LINKS.map((l) => (
              <a key={l} href="#" className="text-white text-base opacity-90 hover:opacity-100 transition-opacity">
                {l}
              </a>
            ))}
          </motion.div>
        </motion.nav>

        <div className="relative lg:hidden">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-lg flex items-center justify-center"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full right-0 mt-3 w-60 bg-black/70 backdrop-blur-lg rounded-2xl p-4 flex flex-col gap-3"
              >
                {NAV_LINKS.map((l) => (
                  <a key={l} href="#" className="text-white text-base opacity-90 hover:opacity-100 transition-opacity">
                    {l}
                  </a>
                ))}
                <button
                  type="button"
                  className="h-11 px-6 rounded-full bg-white text-black text-lg font-medium hover:bg-neutral-100 transition-colors"
                  style={{ fontFamily: SF_ROUNDED }}
                >
                  Login
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <div className="w-full max-w-[800px] mx-auto flex flex-col justify-center items-center gap-6 md:gap-8 text-center my-auto z-10 px-4">
        <h1
          className="text-white text-[40px] sm:text-[52px] md:text-[64px] font-normal leading-[1.1] md:leading-[1.02]"
          style={{ fontFamily: INTER_TIGHT }}
        >
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="block"
          >
            Meet GroundAI.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="block"
          >
            <em style={{ fontFamily: PLAYFAIR, fontStyle: "italic" }}>Redefine space</em> with
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="block"
          >
            intelligent design
          </motion.span>
        </h1>

        <motion.button
          type="button"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="h-12 md:h-14 px-6 md:px-8 py-3 bg-white rounded-2xl inline-flex justify-center items-center text-black text-lg md:text-xl font-medium hover:bg-neutral-200 transition-colors shadow-lg mt-2 md:mt-0"
          style={{ fontFamily: SF_ROUNDED }}
        >
          Start free decoration
        </motion.button>
      </div>

      <footer className="w-full max-w-[1360px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6 z-10">
        <div className="w-full md:w-[480px] max-w-prose text-white/80 text-xl leading-[1.25] text-left">
          <AnimatedWords
            text="It helps you imagine, plan, and refine spaces through natural conversations. From choosing colors and layouts to suggesting furniture and décor, it adapts to your taste."
            baseDelay={1.2}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-row flex-wrap lg:flex-col items-center lg:items-end gap-2.5 w-full md:w-auto justify-end"
        >
          <div
            className="h-[56px] px-5 rounded-2xl border border-white/40 text-white text-xl whitespace-nowrap flex items-center justify-center"
            style={{ fontFamily: SF_ROUNDED }}
          >
            Solutions for complex spaces
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[56px] h-[56px] rounded-2xl border border-white/40 flex items-center justify-center overflow-hidden">
              <img src={A.womem} alt="" className="w-full h-full object-cover" />
            </div>
            <div
              className="h-[56px] px-5 rounded-2xl border border-white/40 text-white text-xl whitespace-nowrap flex items-center justify-center"
              style={{ fontFamily: SF_ROUNDED }}
            >
              Conversational &amp; Action
            </div>
          </div>
        </motion.div>
      </footer>
    </section>
  );
}

function Index() {
  return (
    <div>
      <Hero />
      <TrustedBy />
      <CraftExperiences />
      <Testimonials />
    </div>
  );
}
