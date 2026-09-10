import { motion } from "framer-motion";
import { RING_IMG } from "@/lib/assets";

export default function Product() {
  return (
    <section id="product" className="relative bg-[#0a0503] py-32 md:py-48 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-square overflow-hidden rounded-sm"
        >
          <img src={RING_IMG} alt="PYRA flame ring in rose gold" className="w-full h-full object-cover" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-display text-[10px] tracking-[0.35em] text-[#f2b27a] mb-6">
            THE FLAGSHIP
          </p>
          <h2 className="font-display text-3xl md:text-5xl leading-[1.1] tracking-tight text-[#f5ede6] mb-6">
            THE EMBER
            <br />
            SPIRE RING
          </h2>
          <p className="text-[#f5ede6]/65 font-light leading-relaxed max-w-md mb-8">
            An 18k rose gold band twisting into a faceted flame crown, lined with a
            trailing row of pear-cut diamonds. Hand-finished, one flame at a time.
          </p>

          <ul className="space-y-3 mb-10 text-sm text-[#f5ede6]/70 font-light">
            <li className="flex justify-between border-b border-[#f5ede6]/10 pb-3">
              <span>Material</span>
              <span className="text-[#f5ede6]">18k Rose Gold</span>
            </li>
            <li className="flex justify-between border-b border-[#f5ede6]/10 pb-3">
              <span>Center Stone</span>
              <span className="text-[#f5ede6]">Fire Opal, Spire Cut</span>
            </li>
            <li className="flex justify-between border-b border-[#f5ede6]/10 pb-3">
              <span>Accents</span>
              <span className="text-[#f5ede6]">Pear-Cut Diamonds</span>
            </li>
          </ul>

          <div className="flex items-center gap-6">
            <span className="font-display text-2xl text-[#f5ede6]">$4,850</span>
            <button className="font-display text-[10px] tracking-[0.3em] bg-[#f5ede6] text-[#0a0503] px-8 py-4 rounded-full hover:bg-[#f2b27a] transition-colors">
              CLAIM THE FLAME
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
