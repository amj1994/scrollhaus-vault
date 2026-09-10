import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PHOENIX_IMG } from "@/lib/assets";

export default function Philosophy() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="philosophy"
      ref={ref}
      className="relative h-[110vh] w-full overflow-hidden bg-[#0a0503]"
    >
      <motion.img
        src={PHOENIX_IMG}
        alt="Phoenix in flight"
        style={{ y }}
        className="absolute inset-0 w-full h-[120%] object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0503]/70 via-black/20 to-[#0a0503]/80" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="font-display text-[10px] tracking-[0.35em] text-[#f2b27a] mb-6"
        >
          WHAT DOESN'T BURN, TRANSFORMS
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight text-[#f5ede6] max-w-3xl"
        >
          RISE, NEVER
          <br />
          REPEAT
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-8 max-w-md text-sm md:text-base text-[#f5ede6]/70 font-light"
        >
          The phoenix never returns as it was. Neither does a PYRA piece — each one
          is cast once, worn once into the world, and never recast the same way twice.
        </motion.p>
      </div>
    </section>
  );
}
