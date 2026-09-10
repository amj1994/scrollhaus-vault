export default function Footer() {
  return (
    <footer className="relative bg-[#0a0503] border-t border-[#f5ede6]/10 px-6 md:px-16 py-14">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <span className="font-display text-sm tracking-[0.35em] text-[#f5ede6]">PYRA</span>
        <div className="flex items-center gap-8 font-display text-[10px] tracking-[0.25em] text-[#f5ede6]/50">
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
        <span className="font-display text-[10px] tracking-[0.2em] text-[#f5ede6]/30">
          © PYRA MMXXVI
        </span>
      </div>
    </footer>
  );
}
