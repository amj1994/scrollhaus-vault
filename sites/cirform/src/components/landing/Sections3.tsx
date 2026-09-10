import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Logo } from "./Sections1";
const ASSET_BASE = "https://qclay.design/lovable/circom/";
const globalTrustLogo = `${ASSET_BASE}global-trust.svg`;
const finoraBankLogo = `${ASSET_BASE}finora-bank.svg`;
const nexaBankLogo = `${ASSET_BASE}nexa-bank.svg`;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });
  ScrollTrigger.normalizeScroll(false);
}

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ----------------------------- 8. TESTIMONIALS ----------------------------- */

const testimonials = [
  { brand: "GlobalTrust", logo: globalTrustLogo, quote: "The scalability and reliability are unmatched. We've processed millions in monthly transactions without a single system failure.", name: "Daniel Reed, CTO", role: "GlobalTrust Financia" },
  { brand: "Finora Bank", logo: finoraBankLogo, quote: "Switching to this platform transformed how we handle digital payments. Transaction time dropped & customer satisfaction went through the roof.", name: "Sarah Malik, Chief Head of Digital", role: "Transformation, Finora Bank" },
  { brand: "NexaBank", logo: nexaBankLogo, quote: "We wanted a secure modern stack, and this team delivered beyond every backbone of our digital roadmap.", name: "Thomas Nguyen, Chief", role: "Operations Officer, NexaBank" },
];

function WeightLetter({ char }: { char: string }) {
  const [w, setW] = useState(400);
  return (
    <motion.span
      onMouseMove={(e) => {
        if (e.movementX > 0) setW(200);
        else if (e.movementX < 0) setW(700);
      }}
      animate={{ fontWeight: w }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="inline-block cursor-default"
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  useEffect(() => {
    if (!inView) return;
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-card", {
        y: 80, opacity: 0, rotationY: 8, duration: 1, stagger: 0.12, ease: "expo.out",
        transformOrigin: "left center",
        scrollTrigger: { trigger: ".testimonials-section", start: "top 75%", toggleActions: "play none none none" },
      });
    });
    return () => ctx.revert();
  }, [inView]);

  return (
    <section ref={ref} className="testimonials-section relative overflow-hidden bg-testimonials-flow pt-24 pb-12">
      <div className="relative z-10 max-w-[1180px] mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-[clamp(30px,4vw,48px)] leading-[1.1] tracking-tight">
            <span className="font-display block">
              {"Trusted by high".split("").map((c, i) => (
                <WeightLetter key={`a-${i}`} char={c} />
              ))}
            </span>
            <span className="block">
              {"growth finance team".split("").map((c, i) => (
                <WeightLetter key={`b-${i}`} char={c} />
              ))}
            </span>
          </h2>
          <span className="chip-dark">Customer stories</span>
        </div>

        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <motion.div
            animate={{ x: ["0%", "calc(-50% - 8px)"] }}
            transition={{ duration: 26, ease: "linear", repeat: Infinity }}
            className="flex w-max gap-4"
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, boxShadow: "0 25px 65px -30px rgba(0,0,0,.2)" }}
                className="testimonial-card will-change-transform w-[min(360px,calc(100vw-48px))] shrink-0 rounded-2xl border border-ink/10 bg-white p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,.15)] md:w-[370px]"
              >
                <div className="text-sm text-ink-soft mb-4 flex items-center gap-2">
                  <img src={t.logo} alt="" loading="lazy" decoding="async" className="h-5 w-6 object-contain opacity-45 grayscale" />
                  {t.brand}
                </div>
                <p className="text-[14px] leading-relaxed text-ink">
                  <span className="inline-block w-4 h-4 align-middle mr-1 rounded bg-ink"/> {t.quote}
                </p>
                <div className="mt-5 text-sm">
                  <div className="font-medium">{t.name}</div>
                  <div className="text-ink-soft text-xs">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="mx-auto mt-7 h-1 w-28 overflow-hidden rounded-full bg-ink/15" aria-hidden>
          <motion.div
            className="h-full w-1/3 rounded-full bg-ink"
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 8.67, ease: "linear", repeat: Infinity }}
          />
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- 9. FAQ ----------------------------- */

const faqs = [
  { q: "Is my financial data secure on your platform?", a: "Yes — all data is encrypted in transit and at rest using AES-256, with continuous SOC 2 Type II monitoring and ISO 27001 controls." },
  { q: "How quickly can we get started after signing up?", a: "Most institutions are live in under two weeks. Our solutions team handles migration, KYC integrations, and white-label setup." },
  { q: "What makes your platform different from other?", a: "Unified ledger, real-time analytics and a customer-first UX — no other platform combines them at this depth." },
  { q: "Do you offer custom solutions for large financial organizations?", a: "Yes. Enterprise plans include dedicated infrastructure, custom SLAs and named solutions engineers." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  useEffect(() => {
    if (!inView) return;
    const ctx = gsap.context(() => {
      gsap.from(".faq-item", {
        clipPath: "inset(0 0 100% 0)",
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".faq-section", start: "top 70%", toggleActions: "play none none none" },
      });
    });
    return () => ctx.revert();
  }, [inView]);

  return (
    <section id="faq" ref={ref} className="faq-section relative overflow-hidden bg-faq-flow py-24">
      <div className="max-w-[760px] mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: easeOut }}
          className="text-[clamp(30px,4vw,48px)] tracking-tight"
        >
          Have a <span className="font-display">question</span>?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: easeOut }}
          className="text-ink-soft mt-4"
        >
          Clear answers to the most common questions about<br/>our banking, eligibility, and costs.
        </motion.p>
        <div className="mt-12 space-y-3 text-left">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="faq-item rounded-full bg-white border border-ink/10 px-6 py-1 shadow-[0_8px_30px_-20px_rgba(0,0,0,.15)]"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-3.5 hover:text-brand-deep transition-colors"
              >
                <span className="text-sm font-medium text-inherit">{f.q}</span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: easeOut }}
                  className="text-inherit text-lg"
                >+</motion.span>
              </button>
              <AnimatePresence initial={false} mode="wait">
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className="overflow-hidden text-sm text-ink-soft"
                  >
                    <div className="pb-4 pr-6">{f.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- 10. FOOTER CTA ----------------------------- */

export function FooterCTA() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-cta-heading", {
        y: 60, opacity: 0, duration: 1.2, ease: "expo.out",
        scrollTrigger: { trigger: ".footer-cta", start: "top 80%", toggleActions: "play none none none" },
      });
      gsap.to(".footer-radial", {
        scale: 1.4, ease: "none",
        scrollTrigger: { trigger: ".footer-cta", start: "top bottom", end: "bottom top", scrub: 1.2 },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer-cta relative text-white overflow-hidden" style={{ background: "var(--gradient-footer)" }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-64 bg-footer-transition" />
      <div className="footer-radial absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[700px] rounded-full bg-[radial-gradient(closest-side,#5a7bff66,transparent_70%)]"/>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-28 pb-10">
        <div className="text-center">
          <h2 className="footer-cta-heading text-[clamp(34px,5vw,56px)] leading-[1.1] tracking-tight font-medium">
            Ready to shape the future<br/>
            of <span className="font-display">digital banking?</span>
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8"
          >
            <a href="#" className="btn-pill">Start Free trail today</a>
          </motion.div>
        </div>

        <div className="mt-32 grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 md:col-span-4">
            <Logo light />
            <div className="text-sm text-white/60 mt-4 space-y-1">
              <div>hello@support.cirform.com</div>
              <div>+1 291 985-11-92</div>
            </div>
          </div>
          <div className="col-span-6 md:col-span-3 text-sm space-y-2 text-white/80">
            <div className="flex items-center gap-1">Career</div>
            <div className="flex items-center gap-1">Business <span className="opacity-60">▾</span></div>
            <div>Products</div>
            <div>Docs</div>
          </div>
          <div className="col-span-6 md:col-span-3 text-sm space-y-2 text-white/80">
            <div>FAQ</div>
            <div>Delivery</div>
          </div>
          <div className="col-span-12 md:col-span-2 flex justify-end">
            <a href="#top" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition">↑</a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
          <span>© 2025 — Copyright/All Rights reserved</span>
          <span>Privacy</span>
        </div>
      </div>
    </footer>
  );
}
