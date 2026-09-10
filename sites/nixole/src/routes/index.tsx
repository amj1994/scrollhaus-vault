import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useSmoothScroll } from "@/lib/useSmoothScroll";

import mainLogo from "@/assets/main-logo.svg";
import browserMockup from "@/assets/browser-mockup.png";
import nutanixAvatar from "@/assets/nutanix-avatar.svg";
import frame207 from "@/assets/frame-207.svg";
import programmingArrow from "@/assets/programming-arrow.svg";
import upsideLogo from "@/assets/upside-logo.svg";

export const Route = createFileRoute("/")({
  component: Index,
});

// ---------- Reusable components ----------

function AnimatedWords({
  text,
  className,
  delayStart = 0,
  stagger = 0.06,
  inView = false,
}: {
  text: string;
  className?: string;
  delayStart?: number;
  stagger?: number;
  inView?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldAnimate = inView ? isInView : true;
  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((w, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.2em", verticalAlign: "bottom" }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", opacity: 0 }}
            animate={shouldAnimate ? { y: "0%", opacity: 1 } : undefined}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: delayStart + i * stagger }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function AnimatedDottedFrame({
  className,
  style,
  startDelay = 0,
}: {
  className?: string;
  style?: React.CSSProperties;
  startDelay?: number;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const [dots, setDots] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const total = path.getTotalLength();
    const pts: { x: number; y: number }[] = [];
    for (let d = 2; d <= total; d += 4) {
      const p = path.getPointAtLength(d);
      pts.push({ x: p.x, y: p.y });
    }
    setDots(pts);
  }, []);

  return (
    <svg
      className={className}
      style={style}
      width={141}
      height={107}
      viewBox="0 0 141 107"
      fill="none"
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        d="M140.75 3.75H5.75C2.98857 3.75 0.75 5.98858 0.75 8.75V95.75C0.75 98.5114 2.98858 100.75 5.75 100.75H40"
        stroke="none"
        fill="none"
      />
      {dots.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={1.5}
          fill="#fff"
          className="dot-pop"
          style={{ animationDelay: `${startDelay + i * 40}ms` }}
        />
      ))}
    </svg>
  );
}

function AiBadgeIcon() {
  return (
    <svg width={14} height={12} viewBox="0 0 12 10" fill="currentColor" style={{ opacity: 0.85 }}>
      <path d="M5.71198 0L9.56198 9.982H7.686L6.734 7.336H2.786L1.806 9.982H0L3.85 0H5.71198ZM6.272 6.02L4.788 1.82L3.234 6.02H6.272ZM11.998 0.014V9.982H10.234V0.014H11.998Z" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width={8} height={8} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function StarIcon({ half }: { half?: boolean }) {
  const d = "M12 2.5l2.95 6.2 6.8.78-5.05 4.66 1.4 6.66L12 17.6l-6.1 3.2 1.4-6.66L2.25 9.48l6.8-.78L12 2.5z";
  if (half) {
    return (
      <svg width={16} height={16} viewBox="0 0 24 24" className="star">
        <defs>
          <linearGradient id="half-star">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="rgba(0,0,0,0.15)" />
          </linearGradient>
        </defs>
        <path d={d} fill="url(#half-star)" />
      </svg>
    );
  }
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" className="star">
      <path d={d} />
    </svg>
  );
}

// Real Intel/Oracle/GoFundMe/Nutanix wordmark artwork wasn't provided in the
// source spec (it referenced the project's own file without inlining the
// path data) — these are plain text wordmarks in the same white/brand-neutral
// treatment rather than a guess at trademarked logo geometry.
function TextWordmark({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={`font-semibold tracking-tight text-white whitespace-nowrap ${className ?? ""}`}>{children}</span>;
}

function MarqueeGroup() {
  return (
    <div className="flex items-center gap-10 pr-10">
      <TextWordmark className="text-[22px]">intel</TextWordmark>
      <TextWordmark className="text-[20px] tracking-[0.15em]">ORACLE</TextWordmark>
      <TextWordmark className="text-[20px]">GoFundMe</TextWordmark>
      <TextWordmark className="text-[18px] tracking-[0.1em]">NUTANIX</TextWordmark>
      <img src={upsideLogo} alt="Upside" style={{ height: 24 }} />
    </div>
  );
}

const FEATURES = [
  { label: "AI Sales Agent", active: false },
  { label: "Lead Capture & Forms", active: false },
  { label: "Payments & Subscriptions", active: true },
  { label: "Automated Follow-ups", active: false },
  { label: "CRM for Academies", active: false },
];

const NAV_LINKS = [
  { label: "Home", active: true },
  { label: "How it works", active: false },
  { label: "Company", active: false, chevron: true },
  { label: "Case Studies", active: false },
];

function Index() {
  useSmoothScroll();

  return (
    <div className="w-full bg-background text-foreground">
      {/* Header */}
      <header className="mx-auto flex max-w-[1400px] items-center justify-between px-6 pt-6 md:px-10 md:pt-8">
        <a href="/" className="flex items-center" style={{ gap: 9.23 }}>
          <motion.img
            src={mainLogo}
            alt="Nixole"
            width={38}
            height={38}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 0 }}
          />
          <span className="flex overflow-hidden text-[28px] font-semibold text-black">
            {Array.from("Nixole").map((ch, i) => (
              <span key={i} style={{ display: "inline-block", overflow: "hidden" }}>
                <motion.span
                  style={{ display: "inline-block" }}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.5 + i * 0.06 }}
                >
                  {ch}
                </motion.span>
              </span>
            ))}
          </span>
        </a>

        <nav className="hidden items-center gap-9 text-[15px] font-medium md:flex">
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 + i * 0.08 }}
              className={
                link.active
                  ? "flex items-center gap-1 text-foreground underline underline-offset-[6px]"
                  : "flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
              }
              style={link.active ? { textDecorationThickness: 1.5 } : undefined}
            >
              {link.label}
              {link.chevron && <ChevronDownIcon />}
            </motion.a>
          ))}
        </nav>

        <motion.a
          href="#"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 1.3 }}
          className="rounded-full border border-border bg-white px-5 py-2.5 text-[14px] font-medium shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-colors hover:bg-muted"
        >
          Book a demo
        </motion.a>
      </header>

      {/* Hero */}
      <section className="mx-auto flex max-w-[1400px] flex-col items-center px-6 pt-16 text-center md:px-10 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.5 }}
          className="inline-flex items-center gap-2.5 rounded-lg py-1 pl-1 pr-[11px]"
          style={{ background: "rgba(192,192,192,0.17)" }}
        >
          <span className="flex h-[22px] w-[28px] items-center justify-center rounded-md bg-white">
            <AiBadgeIcon />
          </span>
          <span className="text-[14px]">Autonomous calls, enrollment &amp; payments</span>
        </motion.div>

        <h1
          className="mt-6 max-w-[1100px] font-medium"
          style={{ fontSize: "clamp(40px, 7vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.035em" }}
        >
          <span className="block">
            <AnimatedWords text="AI that converts patients" delayStart={1.7} />
          </span>
          <span className="mt-1 flex flex-wrap items-center justify-center gap-3">
            <AnimatedWords text="for your" delayStart={1.95} />
            <motion.video
              src="/nurse-video.mp4"
              poster="/nurse-poster.webp"
              autoPlay
              loop
              muted
              playsInline
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: 2.15 }}
              className="inline-block h-[88px] w-[88px] rounded-full object-cover align-middle md:h-[108px] md:w-[108px]"
            />
            <AnimatedWords text="medical practice" delayStart={2.1} className="text-foreground/25" />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 2.5 }}
          className="mt-8 max-w-[760px] text-[18px] leading-[1.5] text-muted-foreground"
        >
          Built for how patients actually decide. They Google. They hesitate. They miss calls.
          <br />
          Our AI handles every touchpoint — calls, WhatsApp — until they book an appointment.
        </motion.p>

        <div className="mt-10 flex items-center justify-center gap-3">
          <motion.a
            href="#"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 2.7 }}
            className="rounded-full border border-border bg-white px-6 py-3 text-[15px] font-medium transition-colors hover:bg-muted"
          >
            Book a demo
          </motion.a>
          <motion.a
            href="#"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 2.8 }}
            className="rounded-full px-6 py-3 text-[15px] font-semibold text-foreground"
            style={{ background: "oklch(0.88 0.18 95)" }}
          >
            Let&rsquo;s Talk
          </motion.a>
        </div>
      </section>

      {/* Showcase card */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 3.0 }}
        className="mesh-showcase mx-2 mt-16 rounded-[28px] p-5 md:p-7"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Left dark card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 3.2 }}
            className="relative flex min-h-[360px] flex-col rounded-[22px] p-6 text-white md:p-7"
            style={{ background: "#1E1D19" }}
          >
            <motion.span
              initial={{ opacity: 0.2, scale: 2.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 3.45 }}
              className="flex h-[22px] w-9 items-center justify-center self-start rounded-[6px] bg-white text-[12px] font-medium"
              style={{ color: "#111114" }}
            >
              Pro
            </motion.span>

            <h3 className="mt-5 text-[28px] font-medium leading-[1.15] tracking-tight text-white">
              <span className="block">
                <AnimatedWords text="All-in-One" delayStart={3.6} />
              </span>
              <span className="block">
                <AnimatedWords text="Enrollment Platform" delayStart={3.75} />
              </span>
            </h3>

            <p className="mt-auto pt-6 text-[16px] leading-[19px]" style={{ color: "rgba(255,255,255,0.36)" }}>
              From lead capture to recurring payments,
              <br />
              We run your enrollment with AI.
            </p>

            {/* Floating browser mockup */}
            <div className="pointer-events-none absolute bottom-0 right-0 hidden w-[330px] md:block" style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.45))" }}>
              <span
                className="absolute left-[1px] top-[40px] block h-2 w-2 rounded-full bg-white"
                style={{ border: "2px solid rgba(255,255,255,0.12)", backgroundClip: "content-box" }}
              />
              <AnimatedDottedFrame
                className="pointer-events-none absolute hidden md:block"
                style={{ left: -135.75, top: 43.25 }}
                startDelay={4200}
              />
              <img src={browserMockup} alt="Medical.AI dashboard" className="w-full" />
            </div>

            {/* Key Features popover */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 3.95 }}
              className="absolute bottom-[-24px] right-[214px] z-10 hidden flex-col rounded-[13.654px] border p-3 md:flex"
              style={{
                width: 210,
                height: 222,
                borderColor: "rgba(255,255,255,0.34)",
                background: "linear-gradient(164deg, rgba(255,255,255,0.04) 14.62%, rgba(255,255,255,0.40) 85.2%)",
                backdropFilter: "blur(214.5px)",
              }}
            >
              <div className="mb-2 flex items-center gap-2">
                <img src={programmingArrow} alt="" width={14} height={14} />
                <span className="text-[13px] font-medium text-white">Key Features</span>
              </div>
              <div className="relative -mx-3 mb-2 h-px" style={{ background: "rgba(255,255,255,0.19)" }}>
                <span
                  className="absolute -top-1 left-[-4px] block h-2 w-2 rounded-full bg-white"
                  style={{ border: "2px solid rgba(255,255,255,0.12)", backgroundClip: "content-box" }}
                />
              </div>
              <div className="flex flex-col gap-1">
                {FEATURES.map((f) => (
                  <div key={f.label} className="flex items-center gap-2 rounded px-1 py-1.5">
                    {f.active ? (
                      <span className="flex h-3 w-3 shrink-0 items-center justify-center rounded-[1.006px]" style={{ background: "#FFD209" }}>
                        <span className="text-white"><CheckIcon /></span>
                      </span>
                    ) : (
                      <span className="h-3 w-3 shrink-0 rounded-[3px] bg-white/15" />
                    )}
                    <span
                      className={f.active ? "rounded-[4.312px] px-1.5 py-0.5 text-[12px] font-medium" : "text-[12px] font-medium text-white/90"}
                      style={f.active ? { color: "#111114", background: "#F4F4F4" } : undefined}
                    >
                      {f.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right white card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 3.3 }}
            className="relative flex min-h-[360px] flex-col rounded-[22px] bg-white p-6 md:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2">
                <img src={frame207} alt="" style={{ height: 44 }} />
                <span className="text-[15px] font-medium text-foreground">What our customers say</span>
              </div>
              <div className="flex flex-col gap-[4.34px]">
                <span className="block rounded-[5.428px]" style={{ width: 4.343, height: 32.569, background: "#131318" }} />
                <span className="block rounded-[5.428px]" style={{ width: 4.343, height: 16.285, background: "#DCDCDC" }} />
              </div>
            </div>

            <p className="mt-12 text-[13px] text-muted-foreground">Feb 02, 2026</p>

            <p className="mt-2 max-w-[420px] text-[22px] font-medium leading-[1.3] tracking-tight">
              <AnimatedWords text="They converted 40% more leads" delayStart={3.6} className="text-foreground" />{" "}
              <AnimatedWords
                text="than our sales team — and never missed a follow-up."
                delayStart={3.75}
                stagger={0.04}
                className="text-muted-foreground"
              />
            </p>

            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <img src={nutanixAvatar} alt="Nutanix" style={{ height: 28 }} />
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 4 }).map((_, i) => <StarIcon key={i} />)}
                <StarIcon half />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trusted-by row */}
        <div className="mt-7 flex flex-col items-start gap-6 px-1 text-white md:flex-row md:items-center md:justify-between">
          <p className="max-w-md text-[13px] leading-[1.5]" style={{ color: "rgba(255,255,255,0.75)" }}>
            Trusted by industry leaders in X who don&rsquo;t just follow trends,
            <br />
            but define how the industry moves forward.
          </p>
          <div
            className="overflow-hidden md:max-w-[60%]"
            style={{
              maskImage: "linear-gradient(to right, transparent 0, #000 80px, #000 calc(100% - 80px), transparent 100%)",
            }}
          >
            <div className="flex animate-marquee">
              <MarqueeGroup />
              <MarqueeGroup />
            </div>
          </div>
        </div>
      </motion.section>

      <div style={{ height: 96 }} />
    </div>
  );
}
