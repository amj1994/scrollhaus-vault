import { motion } from "framer-motion";
import { FEATHER_IMG } from "@/lib/assets";

export default function Story() {
  return (
    <section id="story" className="relative bg-[#0a0503] py-32 md:py-48 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="order-2 md:order-1"
        >
          <p className="font-display text-[10px] tracking-[0.35em] text-[#f2b27a] mb-6">
            THE ORIGIN
          </p>
          <h2 className="font-display text-3xl md:text-5xl leading-[1.1] tracking-tight text-[#f5ede6] mb-8">
            EVERY EMBER
            <br />
            HOLDS A MEMORY
          </h2>
          <p className="text-[#f5ede6]/65 font-light leading-relaxed max-w-md">
            Each PYRA piece begins as a single feather — traced barb by barb in molten
            gold, its warmth captured before it ever cools. What survives the fire is
            never the same shape it began as, and neither are we.
          </p>
          <p className="text-[#f5ede6]/65 font-light leading-relaxed max-w-md mt-4">
            Hand-finished in small batches, cast from 18k rose gold and set with
            hand-selected stones, so no two flames burn quite alike.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 md:order-2 relative aspect-[4/5] overflow-hidden rounded-sm"
        >
          <img src={FEATHER_IMG} alt="Macro phoenix feather" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0503]/40 via-transparent to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
