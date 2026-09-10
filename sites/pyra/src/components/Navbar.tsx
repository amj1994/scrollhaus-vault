import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6"
    >
      <span className="font-display text-sm tracking-[0.35em] text-[#f5ede6]">PYRA</span>
      <div className="hidden md:flex items-center gap-10 font-display text-[10px] tracking-[0.25em] text-[#f5ede6]/70">
        <a href="#story" className="hover:text-[#f5ede6] transition-colors">
          ORIGIN
        </a>
        <a href="#philosophy" className="hover:text-[#f5ede6] transition-colors">
          FLIGHT
        </a>
        <a href="#product" className="hover:text-[#f5ede6] transition-colors">
          THE RING
        </a>
      </div>
      <a
        href="#product"
        className="font-display text-[10px] tracking-[0.25em] border border-[#f5ede6]/30 px-4 py-2 rounded-full text-[#f5ede6] hover:bg-[#f5ede6]/10 transition-colors"
      >
        DISCOVER
      </a>
    </motion.nav>
  );
}
