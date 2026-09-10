import { motion } from "framer-motion";
import { HERO_VIDEO, FEATHER_IMG } from "@/lib/assets";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0a0503]">
      {HERO_VIDEO ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={FEATHER_IMG}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      ) : (
        <img src={FEATHER_IMG} alt="" className="absolute inset-0 w-full h-full object-cover" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-[11px] tracking-[0.4em] text-[#f2b27a] mb-6"
        >
          BORN FROM FIRE
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[15vw] md:text-[9vw] leading-[0.9] tracking-tight text-[#f5ede6]"
        >
          PYRA
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-6 max-w-md text-sm md:text-base text-[#f5ede6]/70 font-light"
        >
          One feather, one flame, one ring — forged from the myth of rebirth.
        </motion.p>
        <motion.a
          href="#product"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-10 font-display text-[10px] tracking-[0.3em] border border-[#f5ede6]/40 px-8 py-4 rounded-full text-[#f5ede6] hover:bg-[#f5ede6] hover:text-[#0a0503] transition-colors"
        >
          ENTER THE FLAME
        </motion.a>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 w-px h-12 bg-gradient-to-b from-[#f5ede6]/60 to-transparent"
      />
    </section>
  );
}
