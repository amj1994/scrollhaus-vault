const HN = { fontFamily: "'Helvetica Neue ME', 'Helvetica Neue', sans-serif" }

export default function ClosingSection() {
  return (
    <section className="relative min-h-screen bg-black flex flex-col justify-between overflow-hidden">
      <div className="w-full px-6 md:px-12 lg:px-16 pt-16 md:pt-20">
        <div className="h-px bg-white/10 w-full" />
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-16">
        <div className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-8">Convictions</div>
        <h2
          className="text-[8vw] sm:text-[7vw] md:text-[5vw] lg:text-[4vw] font-light leading-[1.15] tracking-[-0.02em] text-white/90 max-w-5xl"
          style={HN}
        >
          A line is a decision made slowly.
          <br className="hidden sm:block" />
          <span className="text-white/40"> We hold it steady until it belongs to you&mdash;</span>
          <br className="hidden sm:block" />
          <span> and then we stop.</span>
        </h2>
        <p className="mt-10 text-xs md:text-sm leading-[1.8] text-white/40 font-light max-w-md" style={HN}>
          Every piece starts as a long conversation and ends as something quiet. We work in single sessions,
          unhurried, one client at a time. Nothing is repeated, nothing is rushed&mdash;only carried through.
        </p>
      </div>

      <div className="px-6 md:px-12 lg:px-16 pb-10">
        <div className="h-px bg-white/10 w-full mb-8" />
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-2">Atelier</div>
            <div className="text-sm text-white/60 font-light leading-relaxed" style={HN}>
              Copenhagen, Denmark
              <br />
              By private session only
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <div className="text-[10px] tracking-[0.3em] uppercase text-white/30">Start your journey</div>
            <a href="#" className="group inline-flex items-center gap-3 text-white/80 hover:text-white transition-colors duration-300">
              <span className="text-sm font-light tracking-wide" style={HN}>Request a session</span>
              <span className="w-8 h-px bg-white/40 group-hover:w-12 group-hover:bg-white transition-all duration-300" />
            </a>
          </div>

          <div className="text-right mt-4 md:mt-0 text-[10px] tracking-[0.2em] uppercase text-white/20">&copy; ARGENT MMXXV</div>
        </div>
      </div>
    </section>
  )
}
