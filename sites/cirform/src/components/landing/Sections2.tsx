import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });
  ScrollTrigger.normalizeScroll(false);
}

const ASSET_BASE = "https://qclay.design/lovable/circom/";
const womenImg = `${ASSET_BASE}women.png`;
const ellipse29 = `${ASSET_BASE}ellipse-29.png`;
const frame35 = `${ASSET_BASE}frame-35.png`;
const frame34Reference = `${ASSET_BASE}frame-34-reference.png`;
const hexLogo = `${ASSET_BASE}hex-logo.svg`;
const loaderPinwheel = `${ASSET_BASE}loader-pinwheel.svg`;
const qrCode = `${ASSET_BASE}qr-code.svg`;
const tilayrMinson = `${ASSET_BASE}tilayr-minson.png`;
const jullishWarla = `${ASSET_BASE}jullish-warla.png`;
const smithKarla = `${ASSET_BASE}smith-karla.png`;
const amritaNayn = `${ASSET_BASE}amrita-nayn.png`;
const sanyunBalisa = `${ASSET_BASE}sanyun-balisa.png`;
const ahmadSabyan = `${ASSET_BASE}ahmad-sabyan.png`;
const savedFeeWoman = `${ASSET_BASE}women-and-blue-filter.png`;
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/landing/Sections1";

function useCountUp(target: number, duration = 1, trigger = true) {
  const mv = useMotionValue(0);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const c = animate(mv, target, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setVal(v) });
    return c.stop;
  }, [target, trigger, duration, mv]);
  return Math.round(val);
}

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ----------------------------- 5. SMARTER BANKING ----------------------------- */

export function SmarterBanking() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!inView) return;
    const ctx = gsap.context(() => {
      if (barRef.current) {
        gsap.from(barRef.current, {
          width: 0, duration: 1.6, ease: "expo.out",
          scrollTrigger: { trigger: barRef.current, start: "top 80%", toggleActions: "play none none none" },
        });
      }
    });
    return () => ctx.revert();
  }, [inView]);


  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const cardVars = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } }
  };

  return (
    <section ref={ref} className="smarter-section py-28" style={{ background: "linear-gradient(180deg, #c9deff 0%, #d9e6ff 50%, #e8efff 100%)" }}>
      <div className="max-w-[1180px] mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: easeOut }}
          className="text-center text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-tight font-medium"
        >

          Smarter <span className="font-display">banking</span><br />
          <span className="font-display">Moments</span> start here
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-ink-soft mt-6 max-w-md mx-auto"
        >
          Our finance platform automates processes, enhances security, and empowers better decisions.
        </motion.p>

        <motion.div 
          variants={containerVars}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="mt-16 grid grid-cols-12 gap-6"
        >
          {/* Top-left small card "You" */}
          <motion.div
            variants={cardVars}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="smarter-card-left will-change-transform col-span-3 rounded-2xl p-4 relative overflow-hidden flex flex-col items-center mx-auto shadow-[var(--shadow-soft)] ml-[77px]"
            style={{
              width: 190,
              height: 183,
              border: "3px solid rgba(207, 224, 255, 0.6)",
            }}
          >

            <img
              src={ellipse29}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute top-0 left-1/2 h-auto w-full -translate-x-1/2 pointer-events-none select-none"
            />
            <div className="relative z-10 w-10 h-11 flex items-center justify-center">
              <svg width="28" height="30" viewBox="0 0 27 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.045 14.5c0-1.62-.02-3.24 0-4.86a4.4 4.4 0 0 1 .638-2.39 4.4 4.4 0 0 1 1.795-1.71C5.27 3.92 8.06 2.32 10.86.71A4.96 4.96 0 0 1 13.35 0c.88 0 1.74.24 2.49.71 2.74 1.57 5.47 3.15 8.2 4.72 1.59.91 2.54 2.23 2.56 4.1.03 3.48.09 6.95-.04 10.43a3.7 3.7 0 0 1-.53 1.92 3.7 3.7 0 0 1-1.4 1.43c-3.06 1.9-6.19 3.7-9.37 5.4a4.05 4.05 0 0 1-1.97.5 4.05 4.05 0 0 1-1.97-.5c-3.1-1.65-6.13-3.43-9.14-5.23-1.78-1.07-2.2-2.78-2.2-4.68 0-1.43 0-2.86 0-4.29Zm19.62 3.9c-.08-.26-.26-.3-.4-.38-1.73-1-3.46-2.02-5.22-2.99a.94.94 0 0 1-.57-.94c.05-2.03.02-4.05 0-6.07 0-.17.09-.38-.16-.54-1.99 1.15-3.99 2.3-6 3.45a.65.65 0 0 0-.31.59c0 2.21 0 4.43 0 6.64a.65.65 0 0 0 .4.68c1.89 1.07 3.77 2.15 5.65 3.24a.78.78 0 0 0 .87 0c1.21-.72 2.44-1.4 3.66-2.1.76-.45 1.52-.89 2.27-1.32Z" fill="#ffffff"/>
              </svg>
            </div>
            <div className="relative z-10 mt-2 w-px h-8 bg-white" />
            <div className="relative z-10 mt-auto pt-3 w-full flex justify-center">
              <div className="px-5 py-2 rounded-full bg-white text-ink text-sm font-medium shadow-sm">You</div>
            </div>
          </motion.div>

          {/* Center main card */}
          <motion.div 
            variants={cardVars}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="col-span-6 row-span-2 rounded-2xl bg-white border border-[#eef0f7] p-7 shadow-[var(--shadow-card)]"
          >
            <div className="space-y-5">
              <div>
                <div className="text-xs text-ink-soft mb-2">Moment</div>
                <div className="flex items-center gap-3">
                  <div
                    ref={barRef}
                    className="rounded-[24px] bg-gradient-to-r from-[#9ab8ff] to-[#3b6cff]"
                    style={{ width: 255, height: 77 }}
                  />

                  <span className="text-sm text-ink-soft">Digital Growth</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-ink-soft mb-2">Digital Data</div>
                <div className="flex items-center gap-3">
                  <div className="rounded-[24px] bg-[#f0f2fa]" style={{ width: 374, height: 77 }} />
                  <span className="text-sm text-ink-soft">Security<br/>Innovation</span>
                </div>
              </div>
              <div className="pt-2">
                <div className="font-medium text-ink">We reinvest in innovation</div>
                <p className="text-sm text-ink-soft mt-1.5 leading-relaxed">
                  By dedicating a portion of our growth to advancing secure and inclusive financial solutions.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Top-right "Empower" */}
          <motion.div
            variants={cardVars}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="smarter-card-right will-change-transform col-span-3 rounded-[28px] bg-white border-[5px] border-[#d7e9ff] shadow-[var(--shadow-soft)] overflow-hidden relative"
            style={{ width: 300, height: 361 }}
          >
            <div className="absolute left-[31px] top-[37px] text-[23px] leading-[0.98] tracking-[-0.04em] text-ink font-medium z-10">
              Empower smarter<br/>
              <span className="font-display italic font-normal tracking-[-0.02em]">banking operations</span>
            </div>
            <motion.img
              src={frame35}
              alt=""
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.3, ease: easeOut }}
              className="absolute left-[-23px] top-[184px] w-[300px] max-w-none select-none pointer-events-none"
            />
            <motion.img
              src={frame34Reference}
              alt=""
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.45, ease: easeOut }}
              className="absolute left-[151px] top-[131px] w-[149px] max-w-none select-none pointer-events-none"
            />
            <div
              className="absolute pointer-events-none z-20"
              style={{
                width: 413,
                height: 214,
                left: "50%",
                bottom: "40px",
                transform: "translateX(-50%)",
                borderRadius: 413,
                background: "radial-gradient(49.69% 45.78% at 51.3% 36.79%, #FFF 0%, rgba(255, 255, 255, 0) 100%)",
              }}
            />
            <div
              className="absolute pointer-events-none z-20"
              style={{
                width: 413,
                height: 214,
                left: "50%",
                bottom: "120px",
                transform: "translateX(-50%)",
                borderRadius: 413,
                background: "radial-gradient(28.18% 41.44% at 51.3% 36.79%, #FFF 0%, rgba(255, 255, 255, 0) 100%)",
              }}
            />
            {(["left", "right"] as const).map((side) => (
              <div key={side}>
                <div
                  className="absolute pointer-events-none z-20"
                  style={{
                    width: 413,
                    height: 214,
                    [side]: "-206px",
                    bottom: "-107px",
                    borderRadius: 413,
                    background: "radial-gradient(49.69% 45.78% at 51.3% 36.79%, #FFF 0%, rgba(255, 255, 255, 0) 100%)",
                  }}
                />
                <div
                  className="absolute pointer-events-none z-20"
                  style={{
                    width: 413,
                    height: 214,
                    [side]: "-206px",
                    bottom: "-107px",
                    borderRadius: 413,
                    background: "radial-gradient(28.18% 41.44% at 51.3% 36.79%, #FFF 0%, rgba(255, 255, 255, 0) 100%)",
                  }}
                />
              </div>
            ))}
          </motion.div>


          {/* Bottom-left small */}
          <motion.div
            variants={cardVars}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="smarter-card-left will-change-transform col-span-3 rounded-[28px] bg-white shadow-[var(--shadow-soft)] mx-auto flex flex-col ml-[-38px]"
            style={{
              width: 304,
              padding: "20px 14px 7px",
              marginRight: 24,
              marginTop: "-180px",
              border: "3px solid rgba(207, 224, 255, 0.6)",
            }}
          >
            <div className="text-[22px] leading-[1.15] text-ink font-medium mb-4 ">
              Smarter <span className="font-display italic font-normal block">financial<br/>technology</span>
            </div>
            <div className="flex flex-col gap-[14px] mt-2">
              {[
                { label: "Digital Data",   active: false, icon: "cube" },
                { label: "Modern banking", active: true,  icon: "bank" },
                { label: "Fast speed",     active: false, icon: "gauge" },
              ].map((row, i) => (
                <div
                  key={i}
                  className="flex items-center shrink-0"
                  style={{
                    width: 270,
                    padding: 5,
                    gap: 21,
                    borderRadius: 20,
                    background: "#FFF",
                    boxShadow: "0 1px 12px 0 rgba(14, 29, 55, 0.08)",
                  }}
                >
                  <span
                    className="flex items-center justify-center shrink-0 rounded-[18px]"
                    style={{
                      width: 72,
                      height: 72,
                      background: row.active
                        ? "#0b0b10"
                        : "linear-gradient(180deg, rgba(150, 206, 255, 0.84) 0%, rgba(59, 163, 255, 0.84) 86.11%)",
                    }}
                  >
                    {row.icon === "bank" && (
                      <svg width="28" height="28" viewBox="0 0 30 30" fill="none"><path d="M26.25 25H24.125V17.75C24.125 17 23.625 16.5 22.875 16.5C22.125 16.5 21.625 17 21.625 17.75V25H18.875V17.75C18.875 17 18.375 16.5 17.625 16.5C16.875 16.5 16.375 17 16.375 17.75V25H13.625V17.75C13.625 17 13.125 16.5 12.375 16.5C11.625 16.5 11.125 17 11.125 17.75V25H8.375V17.75C8.375 17 7.875 16.5 7.125 16.5C6.375 16.5 5.875 17 5.875 17.75V25H3.75C3 25 2.5 25.5 2.5 26.25C2.5 27 3 27.5 3.75 27.5H26.25C27 27.5 27.5 27 27.5 26.25C27.5 25.5 27 25 26.25 25Z" fill="#ffffff"/><path d="M26.25 7.5L16.875 2.875C15.625 2.25 14.25 2.25 13.125 2.875L3.75 7.5C3 7.875 2.5 8.75 2.5 9.5V12.375C2.5 13.625 3.5 14.625 4.75 14.625H25.25C26.5 14.625 27.5 13.625 27.5 12.375V9.5C27.5 8.625 27 7.875 26.25 7.5ZM25 12.125H5V9.625L14.25 5.125C14.75 4.875 15.375 4.875 15.875 5.125L25 9.75V12.125Z" fill="#ffffff"/></svg>
                    )}
                    {row.icon === "cube" && (
                      <svg width="28" height="28" viewBox="0 0 33 33" fill="none"><path d="M23.3 11.28 15.98 15.24 8.66 11.28c-.66-.4-1.46-.13-1.86.52-.27.66-.13 1.45.53 1.85L14.65 17.6v8.18c0 .79.53 1.32 1.33 1.32s1.34-.53 1.34-1.32V17.6l7.32-3.96c.66-.4.93-1.19.53-1.85-.4-.66-1.2-.93-1.87-.52z" fill="#ffffff"/><path d="M26.56 7.12 18.55 2.45c-1.6-.93-3.6-.93-5.2 0L5.47 7.12C3.74 8.05 2.67 10.05 2.67 12.05v8.8c0 2 1.07 4 2.8 4.93l8.01 4.66c.8.4 1.6.67 2.53.67s1.73-.27 2.54-.67l8.01-4.66c1.74-.93 2.8-2.93 2.8-4.93v-8.8c0-2-1.06-4-2.8-4.93zm.13 13.73c0 1.06-.53 2.13-1.47 2.66l-8 4.66c-.8.4-1.74.4-2.54 0l-8.01-4.66c-.94-.53-1.47-1.46-1.47-2.66v-8.8c0-1.06.53-2.13 1.47-2.66l8.01-4.66c.53-.13.93-.27 1.33-.27s.8.14 1.2.4l8.01 4.67c.93.53 1.47 1.46 1.47 2.66v8.66z" fill="#ffffff"/></svg>
                    )}
                    {row.icon === "gauge" && (
                      <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><path d="M16 18.67 21.33 13.33M4.45 25.33A13.33 13.33 0 1 1 27.55 25.33" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    )}
                  </span>
                  {row.active ? (
                    <span
                      className="text-[16px] font-medium bg-clip-text text-transparent"
                      style={{
                        backgroundImage:
                          "linear-gradient(270.08deg, #4C5BE9 -33.21%, #3078B8 2.69%, #000000 97.8%)",
                      }}
                    >
                      Modern banking
                    </span>
                  ) : (
                    <span className="text-[16px]">{row.label}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bottom-right person */}
          <motion.div variants={cardVars} whileHover={{ y: -6, transition: { duration: 0.2 } }} className="smarter-card-right will-change-transform col-span-3 rounded-2xl overflow-hidden bg-[#dceaff] border border-[#cdddf5] shadow-[var(--shadow-soft)]" style={{ width: 190, height: 183 }}>
            <img src={womenImg} alt="Customer" loading="lazy" decoding="async" className="w-full h-full object-cover"/>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16 max-w-2xl mx-auto text-[15px] text-ink-soft"
        >
          We continue to push the boundaries of digital finance. <span className="font-display text-ink">Every solution we create moves</span> the industry closer to a more connected, secure, and sustainable financial future.
        </motion.p>
      </div>
    </section>
  );
}

/* ----------------------------- 6. PERFORMANCE ----------------------------- */

export function Performance() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const wealth = useCountUp(8975, 1.5, inView);
  const donutRef = useRef<SVGCircleElement>(null);
  const months = [
    { l: "Jun", v: 46, pct: "8%" },
    { l: "Jul", v: 56, pct: "10%" },
    { l: "Aug", v: 52, pct: "9%" },
    { l: "Sep", v: 96, pct: "15.3%", highlight: true },
    { l: "Oct", v: 60, pct: "10.2%" },
  ];

  useEffect(() => {
    if (!inView) return;
    const circumference = 2 * Math.PI * 46;
    const ctx = gsap.context(() => {
      const bars = gsap.utils.toArray<HTMLElement>(".perf-bar");
      bars.forEach((bar, i) => {
        gsap.from(bar, {
          height: "0%",
          duration: 1.4,
          delay: 0.5 + i * 0.12,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: { trigger: ".perf-section", start: "top 65%", toggleActions: "play none none none" },
        });
      });
      if (donutRef.current) {
        gsap.fromTo(donutRef.current,
          { strokeDashoffset: circumference },
          {
            strokeDashoffset: circumference * 0.55,
            duration: 2,
            delay: 0.4,
            ease: "expo.out",
            scrollTrigger: { trigger: ".perf-section", start: "top 65%", toggleActions: "play none none none" },
          }
        );
      }
    });
    return () => ctx.revert();
  }, [inView]);

  return (
    <section id="performance" ref={ref} className="perf-section relative py-32 overflow-hidden" style={{ background: "linear-gradient(180deg, #2913E9 0%, #2F9EFF 43.12%, #105897 88.02%)" }}>

      {/* Smooth fades into surrounding sections */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 z-[1]" style={{ background: "linear-gradient(180deg, #e8efff 0%, rgba(232,239,255,0.5) 40%, rgba(232,239,255,0) 100%)" }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-60 z-[1]" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 60%, #000 100%)" }} />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-white/15 blur-3xl"/>

      <div className="relative max-w-[1120px] mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: easeOut }}
          className="text-white text-center text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-tight font-medium"
        >
          Close the performance<br/>
          gap in <span className="font-display">your investments</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-white/75 mt-5 max-w-xl mx-auto"
        >
          Most investors leave money on the table due to delayed insights, poor tracking, or outdated tools.
        </motion.p>

        {/* Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: easeOut }}
          className="relative mt-12 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/25 p-6 shadow-[0_40px_120px_-30px_rgba(0,30,90,.6)] overflow-hidden"
        >
          {/* Grid pattern — ends 30px above the Main net Wealth card, extends to bottom of bars */}
          <div
            className="absolute left-0 right-0 opacity-[0.22] pointer-events-none"
            style={{
              top: 58,
              bottom: 24,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.55) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative">
          {/* Tabs */}
          <div className="flex items-center justify-between border-b border-white/30 pb-3">
            <div className="flex gap-6 text-sm">
              <span className="text-white border-b-2 border-white pb-2 -mb-3">Analytics</span>
              <span className="text-white">Cashflow</span>
              <span className="text-white">Success rates</span>
            </div>
            <button className="text-xs px-3 py-1.5 rounded-full border border-white/40 bg-white/10 text-white flex items-center gap-1">
              Monthly <span>▾</span>
            </button>
          </div>

          <div className="grid grid-cols-12 gap-6 mt-6">
            {/* Donut */}
            <div className="col-span-4 rounded-2xl bg-white p-5 border border-ink/5 flex flex-col" style={{ width: 399, height: 462, maxWidth: "100%" }}>
              <div className="relative mx-auto" style={{ width: 277, height: 271 }}>
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="g1" gradientUnits="userSpaceOnUse" x1="85" y1="15" x2="15" y2="85" gradientTransform="rotate(73.56, 50, 50)">
                      <stop offset="13%" stopColor="#2913E9"/>
                      <stop offset="46.66%" stopColor="#2F9EFF"/>
                      <stop offset="100%" stopColor="#000000"/>
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="46" stroke="#ddeeff" strokeWidth="3" fill="none"/>
                  <circle
                    ref={donutRef}
                    cx="50" cy="50" r="46"
                    stroke="url(#g1)" strokeWidth="3" fill="none" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 46}`}
                    strokeDashoffset={2 * Math.PI * 46 * 0.55}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-[11px] text-ink-soft">Main net Wealth</div>
                  <div className="text-2xl font-medium tabular-nums">${(wealth/10).toFixed(1)}M</div>
                </div>
              </div>
              <div className="mt-auto grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="text-ink-soft">Last 30 days</div>
                  <div className="text-lg font-medium mt-1">18.2%</div>
                </div>
                <div>
                  <div className="text-ink-soft">Since previous 30 days</div>
                  <div className="text-lg font-medium mt-1">13.3%</div>
                </div>
              </div>
            </div>


            {/* Bars — no background container */}
            <div className="col-span-8 flex flex-col justify-end" style={{ height: 462 }}>
              <div className="flex items-end justify-between h-[360px] gap-7">
                {months.map((m, i) => (
                  <div key={m.l} className="flex-1 flex flex-col items-center justify-end h-full">
                    <div
                      className="text-[11px] font-medium text-white mb-2 px-2.5 py-1 tabular-nums"
                      style={m.highlight
                        ? {
                            borderRadius: 1000,
                            background: "linear-gradient(180deg, #ffffff 0%, #e8f4ff 100%)",
                            color: "#1E7BFF",
                            boxShadow: "0 6px 18px -6px rgba(255,255,255,0.45)",
                          }
                        : {
                            borderRadius: 1000,
                            background: "rgb(122, 176, 223)",
                            boxShadow: "0 6px 18px -6px rgba(30,123,255,0.7)",
                          }
                      }
                    >
                      {m.pct}
                    </div>
                    <div
                      data-height={`${m.v}%`}
                      className={`perf-bar w-[85px] rounded-t-md ${m.highlight ? "bg-white shadow-[0_-14px_34px_-8px_rgba(255,255,255,.75)]" : ""}`}
                      style={
                        m.highlight
                          ? { height: `${m.v}%` }
                          : {
                              height: `${m.v}%`,
                              background: "rgb(122, 176, 223)",
                            }
                      }
                    />

                    <div className="mt-2 text-xs text-white/80">{m.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
        </motion.div>

        {/* Footer meta — outside the dashboard, 32px below */}
        <div className="flex justify-between text-[11px] text-white" style={{ marginTop: 32 }}>
          <span>Data provider: Cirform.org/dashboard</span>
          <span>Updated 17 min ago</span>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- 7. EXPENSE GRID ----------------------------- */

export function ExpenseGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const lowFeeRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const tx = ["7","4","9","5","2",",","2","6"];
  const lowFeePeople = [
    { name: "Tilayr minson", amount: "-$34", image: tilayrMinson, style: { left: -18, top: 0 } },
    { name: "Amrita Nayn", amount: "$34", image: amritaNayn, style: { left: 226, top: 0 } },
    { name: "Jullish warla", amount: "-$27", image: jullishWarla, style: { left: -54, top: 52 } },
    { name: "Sanyun balisa", amount: "-$20", image: sanyunBalisa, style: { left: 198, top: 52 } },
    { name: "Smith karla", amount: "-$27", image: smithKarla, style: { left: 18, top: 104 } },
    { name: "Ahmad sabyan", amount: "", image: ahmadSabyan, style: { left: 244, top: 104 } },
  ];

  const card = (delay: number): any => ({
    initial: { opacity: 0, y: 30 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay, ease: easeOut },
  });

  useEffect(() => {
    if (!inView) return;
    const ctx = gsap.context(() => {
      gsap.from(".tx-row", {
        x: -40, opacity: 0, duration: 0.7, stagger: 0.1, ease: "expo.out",
        scrollTrigger: { trigger: ".expense-section", start: "top 70%", toggleActions: "play none none none" },
      });
    });
    return () => ctx.revert();
  }, [inView]);

  return (
    <section ref={ref} className="expense-section bg-black text-white py-24">

      <div className="max-w-[1120px] mx-auto px-6 grid grid-cols-12 gap-5">
        {/* Expense Management */}
        <motion.div
          {...card(0.05)}
          className="col-span-12 rounded-2xl text-ink px-6 pt-8 pb-6 shadow-[0_40px_100px_-30px_rgba(0,0,0,.6)] md:col-span-6 md:row-span-2"
          style={{ background: "linear-gradient(180deg, #1851B6 0%, #67ABEF 43%, #DDF8FF 100%)" }}
        >
          <h3 className="text-[23px] leading-none font-medium text-primary-foreground">Expense Management</h3>

          <div className="mt-8 rounded-[18px] bg-card px-3 py-3 flex items-center gap-4">
            <div
              className="w-[43px] h-[43px] shrink-0 rounded-[9px] flex items-center justify-center shadow-sm"
              style={{ background: "linear-gradient(180deg, #4C5BE9 10.67%, #2F9EFF 59.47%, #FFFFFF 100%)" }}
            >
              <img src={hexLogo} alt="" loading="lazy" decoding="async" className="w-[21px] h-auto" />
            </div>
            <span className="text-[19px] font-medium tracking-[-0.03em]">Smart credit account</span>
          </div>

          <div className="mt-3 rounded-[18px] bg-card px-7 pt-6 pb-5">
            <div className="flex gap-9 text-sm border-b border-border">
              <span className="border-b border-ink pb-3 -mb-px">Expenses</span>
              <span className="text-muted-foreground">investment</span>
            </div>

            <div className="text-[13px]">
              <div className="flex items-center justify-between py-4 border-b border-border">
                <span className="flex items-center gap-2.5">
                  <img src={loaderPinwheel} alt="" loading="lazy" decoding="async" className="w-4 h-4" />
                  Exo software Subscription
                </span>
                <span>-$318.99</span>
              </div>
              <div className="flex items-center justify-between py-4 border-b border-border">
                <span className="flex items-center gap-2.5">
                  <img src={qrCode} alt="" loading="lazy" decoding="async" className="w-4 h-4" />
                  Custom Scanner creation
                </span>
                <span>-$67.99</span>
              </div>
              <div className="flex items-center justify-between pt-6">
                <span>Total Expenses</span>
                <span className="text-[23px] leading-none tracking-[-0.03em]">-$368.98</span>
              </div>
            </div>

            <div className="mt-6 flex gap-2 justify-end">
              <Button variant="outline" size="sm" className="h-9 rounded-full px-4 text-xs font-normal">Generate new</Button>
              <Button size="sm" className="h-9 rounded-full px-6 text-xs font-normal">Download</Button>
            </div>
          </div>
        </motion.div>

        {/* Low fee transactions */}
        <motion.div
          {...card(0.15)}
          className="relative col-span-12 h-[312px] overflow-hidden rounded-2xl border border-white/10 bg-[#12171c] px-8 pt-8 md:col-span-6 md:h-[312px]"
        >
          <h3 className="relative z-20 text-[25px] font-medium tracking-[-0.035em]">Low fee transactions</h3>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.1, ease: easeOut }}
            className="absolute left-0 right-0 top-[88px] h-[166px] overflow-hidden"
          >
            <div ref={lowFeeRef} className="absolute left-0 top-0 flex h-full will-change-transform" style={{ animation: "lowfee-marquee 28s linear infinite", animationDelay: "1.2s" }}>
              {[0, 1].map((copy) => (
                <div key={copy} className="relative h-full shrink-0" style={{ width: 528 }} aria-hidden={copy === 1}>
                  {lowFeePeople.map((person) => (
                    <div
                      key={`${copy}-${person.name}`}
                      className="absolute flex h-[48px] w-[230px] items-center rounded-[11px] border border-white/[0.05] bg-white/[0.04] px-2 shadow-[0_10px_24px_rgba(0,0,0,0.24)]"
                      style={person.style}
                    >
                      <img src={person.image} alt={person.name} loading="lazy" decoding="async" className="h-10 w-10 shrink-0 rounded-full object-cover" />
                      <span className="ml-3 min-w-0 truncate text-[15px] text-white/65">{person.name}</span>
                      {person.amount && <span className="ml-auto shrink-0 pl-3 text-[15px] text-white/75">{person.amount}</span>}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[126px] bg-gradient-to-b from-transparent via-[#12171c]/60 to-[#12171c]" />
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#12171c] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#12171c] to-transparent" />
          <div className="pointer-events-none absolute left-1/2 top-[-78px] z-10 h-24 w-[360px] -translate-x-1/2 rounded-full bg-white/20 blur-3xl" />

          <Button
            className="absolute left-1/2 top-[158px] z-30 inline-flex h-[48px] w-[320px] max-w-[calc(100%-32px)] -translate-x-1/2 items-center justify-between rounded-full bg-white pl-5 pr-[4px] text-[16px] font-medium text-ink shadow-[0_0_28px_rgba(109,202,255,0.42)] hover:bg-white/95"
          >
            <span>Make new transaction</span>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-white" aria-hidden="true">&#8594;</span>
          </Button>
        </motion.div>

        {/* Cirform 70% */}
        <motion.div
          {...card(0.25)}
          className="relative col-span-12 h-[266px] overflow-hidden rounded-[18px] border border-white/10 bg-[#15191d] md:col-span-6 md:h-[215px]"
        >
          <div className="absolute left-5 top-9 z-20 [&>div]:gap-3 [&_span]:text-[26px]">
            <Logo light />
          </div>

          <div className="absolute bottom-8 left-5 z-20">
            <div className="text-[62px] font-medium leading-none tracking-[-0.045em]">
              <Counting70 inView={inView} />%
            </div>
            <div className="mt-2 text-[14px] text-white/60">Saved fee per month</div>
          </div>

          <div className="absolute inset-y-[18px] right-[18px] w-[51.5%] overflow-hidden rounded-[15px]">
            <img
              src={savedFeeWoman}
              alt="Woman reviewing financial notes"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-[#064cff]/35 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0635ec]/80 via-[#0864ff]/30 to-[#03152d]/20" />

            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5">
              {[
                { label: "Saved 3%", className: "bg-white/20 text-white/55" },
                { label: "Saved 7%", className: "bg-white/60 text-white" },
                { label: "Saved 10%", className: "bg-white/25 text-white/55" },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`flex h-[44px] w-[139px] items-center justify-center rounded-full text-[14px] font-medium backdrop-blur-md ${item.className}`}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Future of global banking + capital transactions */}
        <motion.div
          {...card(0.3)}
          className="col-span-12 grid min-h-[360px] overflow-hidden rounded-2xl border border-white/10 bg-[#15191d] md:grid-cols-2"
        >
          <div className="flex min-w-0 flex-col px-8 py-8 md:px-9">
            <span className="chip-dark w-fit text-[11px]">Future of Global Banking</span>
            <div className="mt-auto pt-16">
              <h3 className="max-w-[390px] text-[25px] font-medium leading-[1.02] tracking-[-0.035em]">
                Our technology handles millions of<br className="hidden lg:block" /> transactions monthly
              </h3>
              <p className="mt-4 max-w-[430px] text-[13px] leading-[1.35] text-white/60">
                Over $78 billion securely processed through our platform<br className="hidden lg:block" /> powering the world's most reliable digital finance systems.
              </p>
            </div>
          </div>

          <div className="m-[18px] flex min-w-0 flex-col justify-center rounded-[16px] bg-gradient-to-br from-white via-[#e9fbff] to-[#69a9ff] px-7 text-ink md:ml-0">
            <div className="text-[13px] text-ink">Average Capital transactions</div>
            <div className="mt-5 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 text-[31px] font-medium tabular-nums">
              <span className="shrink-0">$</span>
              <div className="flex min-w-0 items-center gap-1.5">
                {tx.map((d, i) => (
                  <TickerDigit key={i} target={d} delay={i * 0.1} trigger={inView} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TickerDigit({ target, delay, trigger }: { target: string; delay: number; trigger: boolean }) {
  const [d, setD] = useState("0");
  useEffect(() => {
    if (!trigger) return;
    let i = 0;
    const it = setInterval(() => {
      setD(String(Math.floor(Math.random() * 10)));
      i++;
      if (i > 15 + delay * 30) {
        clearInterval(it);
        setD(target);
      }
    }, 50);
    const t = setTimeout(() => clearInterval(it), 800 + delay * 800);
    return () => { clearInterval(it); clearTimeout(t); };
  }, [trigger, target, delay]);
  if (target === ",") {
    return <span className="inline-flex h-[64px] w-2 shrink-0 items-end justify-center pb-1 text-[31px] font-normal">,</span>;
  }
  return (
    <span className="inline-flex h-[64px] min-w-0 flex-1 items-center justify-center rounded-[14px] border border-ink bg-transparent text-[31px] font-normal">
      {d === "," ? "," : d}
    </span>
  );
}

function Counting70({ inView }: { inView: boolean }) {
  const val = useCountUp(70, 1.4, inView);
  return <>{val}</>;
}
