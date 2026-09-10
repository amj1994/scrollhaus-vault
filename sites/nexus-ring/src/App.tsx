import { motion } from "framer-motion";
import { useSmoothScroll } from "@/lib/useSmoothScroll";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

const SPECS = [
  { label: "Battery Life", value: "7 Days", note: "single charge, always-on tracking" },
  { label: "Water Resistance", value: "10 ATM", note: "rated to 100m depth" },
  { label: "Sensors", value: "4-in-1", note: "heart rate · SpO2 · temp · motion" },
  { label: "Connectivity", value: "BLE 5.3", note: "companion app, iOS & Android" },
];

const COMPONENTS = [
  "Outer shell — matte graphite composite",
  "Inner liner ring — hypoallergenic contact layer",
  "Sensor cover lens — scratch-resistant glass",
  "Optical sensor module — PPG + SpO2 array",
  "Logic board — low-power tracking chip",
  "Cell — 15mAh solid-state battery",
  "Support bracket — structural frame",
  "Seal ring — IP68 moisture barrier",
];

export default function App() {
  useSmoothScroll();

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#f2f2f2]">
      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-5 md:px-12">
        <span
          className="font-display text-lg tracking-[0.15em]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          NEXUS
        </span>
        <nav className="hidden items-center gap-8 text-sm text-white/60 md:flex">
          <a href="#specs" className="transition-colors hover:text-white">Specs</a>
          <a href="#inside" className="transition-colors hover:text-white">Inside</a>
          <a href="#preorder" className="transition-colors hover:text-white">Pre-order</a>
        </nav>
        <a
          href="#preorder"
          className="rounded-full border border-white/20 px-5 py-2 text-sm text-white/90 backdrop-blur-sm transition-colors hover:border-white/50 hover:text-white"
        >
          Pre-order
        </a>
      </header>

      {/* Hero */}
      <section className="relative flex h-screen min-h-[720px] w-full items-center justify-center overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero-video.mp4"
          poster="/hero-poster.webp"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        <div className="relative z-10 flex w-full max-w-[1400px] flex-col items-start px-6 md:px-12">
          <motion.h1
            {...fadeUp}
            className="max-w-2xl font-display text-[13vw] leading-[0.95] tracking-tight md:text-[6vw]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            WEAR THE
            <br />
            FUTURE
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="mt-6 max-w-md text-base text-white/70 md:text-lg"
          >
            NEXUS is a seamless smart ring engineered for continuous health
            tracking — no screen, no strap, no compromise.
          </motion.p>
          <motion.a
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.3 }}
            href="#preorder"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
          >
            Reserve Yours
            <span aria-hidden="true">→</span>
          </motion.a>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-white/40">
          Scroll
        </div>
      </section>

      {/* Specs */}
      <section id="specs" className="relative w-full border-t border-white/10 bg-[#050505] py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <motion.div {...fadeUp} className="mb-16 flex flex-col items-start gap-3">
            <span className="text-xs uppercase tracking-[0.3em] text-white/40">Specifications</span>
            <h2
              className="font-display text-3xl md:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Engineered to disappear
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {SPECS.map((spec, i) => (
              <motion.div
                key={spec.label}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                className="flex flex-col gap-2 bg-[#0a0a0a] p-8"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-white/40">{spec.label}</span>
                <span
                  className="font-display text-2xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {spec.value}
                </span>
                <span className="text-sm text-white/50">{spec.note}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inside / exploded view */}
      <section id="inside" className="relative w-full border-t border-white/10 bg-[#050505] py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <motion.div {...fadeUp} className="mb-14 flex flex-col items-start gap-3">
            <span className="text-xs uppercase tracking-[0.3em] text-white/40">Inside Nexus</span>
            <h2
              className="font-display text-3xl md:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Eight parts. One seamless shell.
            </h2>
            <p className="max-w-xl text-white/60">
              Every component is stacked and sealed inside a single matte
              graphite band — no visible seams, no buttons, no screen.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a]"
          >
            <img
              src="/exploded-view.webp"
              alt="NEXUS Ring exploded view showing all internal components"
              className="w-full object-cover"
            />
          </motion.div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {COMPONENTS.map((c, i) => (
              <motion.div
                key={c}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                className="flex items-start gap-3 text-sm text-white/60"
              >
                <span className="mt-1 font-display text-white/30" style={{ fontFamily: "var(--font-display)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{c}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Pre-order */}
      <section
        id="preorder"
        className="relative flex w-full flex-col items-center border-t border-white/10 bg-[#050505] px-6 py-28 text-center md:py-36"
      >
        <motion.h2
          {...fadeUp}
          className="font-display max-w-2xl text-3xl md:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Reserve your NEXUS Ring
        </motion.h2>
        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="mt-4 max-w-md text-white/60"
        >
          Ships in matte graphite. Limited first production run.
        </motion.p>
        <motion.form
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
          onSubmit={(e) => e.preventDefault()}
          className="mt-9 flex w-full max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            placeholder="you@email.com"
            className="flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-white/40"
          />
          <button
            type="submit"
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
          >
            Notify Me
          </button>
        </motion.form>
      </section>

      <footer className="flex w-full flex-col items-center gap-4 border-t border-white/10 px-6 py-10 text-xs text-white/35 sm:flex-row sm:justify-between md:px-12">
        <span style={{ fontFamily: "var(--font-display)" }}>NEXUS</span>
        <span>© 2026 Nexus Ring. All rights reserved.</span>
      </footer>
    </div>
  );
}
