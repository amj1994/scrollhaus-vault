import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Instagram,
  MoveRight,
  Menu,
  X,
  Clock3,
} from "lucide-react";

import IntroSequence from "@/components/IntroSequence";
import StarField from "@/components/StarField";
import LineField from "@/components/LineField";

import logoSrc from "@/assets/logo.svg";
import noiseSrc from "@/assets/noise.png";
import ellipseArcSrc from "@/assets/ellipse-arc.png";
import bgFabricSrc from "@/assets/bg-fabric.png";
import bgSilhouettesSrc from "@/assets/bg-silhouettes.png";
import bgNikonSrc from "@/assets/bg-nikon.png";
import photoRalphPortraitSrc from "@/assets/photo-ralph-portrait.png";
import photoBasketballSrc from "@/assets/photo-basketball.png";
import photoHatSrc from "@/assets/photo-hat.png";
import photoRedSrc from "@/assets/photo-red.png";
import photoSculptureBwSrc from "@/assets/photo-sculpture-bw.png";
import photoSculptureColorSrc from "@/assets/photo-sculpture-color.png";
import photoTwinsSrc from "@/assets/photo-twins.png";
import photoBerriesSrc from "@/assets/photo-berries.png";
import photoFieldsBwSrc from "@/assets/photo-fields-bw.png";
import photoFieldsColorSrc from "@/assets/photo-fields-color.png";
import photoCarSrc from "@/assets/photo-car.png";
import photoGirlGrassSrc from "@/assets/photo-girl-grass.png";
import photoCameraSrc from "@/assets/photo-camera.png";
import getInTouchBgSrc from "@/assets/get-in-touch-bg.png";
import vectorSrc from "@/assets/Vector.svg";

const EASE = [0.22, 1, 0.36, 1] as const;
const INTRO_DELAY = 2.9;
const MATTE = "bg-[oklch(0.16_0.004_240)]";

const blurIn = (i = 0) => ({
  hidden: { opacity: 0, y: 24, filter: "blur(14px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, delay: INTRO_DELAY + i * 0.08, ease: EASE },
  },
});

const photoIn = (i = 0) => ({
  hidden: { opacity: 0, scale: 0.92, filter: "blur(12px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.2, delay: INTRO_DELAY + 0.1 + i * 0.1, ease: EASE },
  },
});

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0a12 12 0 0 0-4.4 23.2c-.1-1-.2-2.5 0-3.6l1.5-6.3s-.4-.7-.4-1.8c0-1.7 1-3 2.2-3 1 0 1.5.8 1.5 1.7 0 1-.7 2.6-1 4 .2.7.8 1.4 1.7 1.4 2 0 3.5-2.2 3.5-5.3 0-2.8-2-4.7-4.8-4.7-3.3 0-5.2 2.5-5.2 5 0 1 .4 2 .9 2.6.1.1.1.2.1.3-.1.4-.3 1.1-.3 1.3-.1.2-.2.3-.4.2-1.4-.7-2.3-2.7-2.3-4.4 0-3.6 2.6-6.9 7.6-6.9 4 0 7.1 2.8 7.1 6.6 0 4-2.5 7.2-6 7.2-1.2 0-2.3-.6-2.6-1.3l-.7 2.7c-.3 1-1 2.3-1.5 3.1A12 12 0 1 0 12 0z" />
    </svg>
  );
}

function Logo({ className, height = 24 }: { className?: string; height?: number }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span
        className={`font-display font-black text-white ${className ?? ""}`}
        style={{ fontSize: height * 0.6, lineHeight: `${height}px` }}
      >
        VALMAX
      </span>
    );
  }
  return (
    <img
      src={logoSrc}
      alt="VALMAX"
      className={className}
      style={{ height, width: "auto" }}
      onError={() => setFailed(true)}
    />
  );
}

function DecorativeImg({
  src,
  alt = "",
  className,
  style,
}: {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setFailed(true)}
    />
  );
}

function Photo({
  src,
  alt,
  className,
  imgClassName,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <div className={className} style={{ background: "oklch(0.18 0 0)" }} aria-hidden />;
  }
  return (
    <img
      src={src}
      alt={alt}
      className={`${className ?? ""} ${imgClassName ?? ""}`}
      onError={() => setFailed(true)}
    />
  );
}

function usePointerParallax(enabled: boolean) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const mx = e.clientX / window.innerWidth - 0.5;
      const my = e.clientY / window.innerHeight - 0.5;
      el.style.setProperty("--mx", String(mx));
      el.style.setProperty("--my", String(my));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled]);
  return ref;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

function TopBar() {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    update();
    const id = window.setInterval(update, 30000);
    return () => window.clearInterval(id);
  }, []);

  const links = ["Photographer", "Projects", "Mechanical Marvels", "Contact"];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-6 px-6 md:px-10">
      <div className="flex items-center justify-between gap-4">
        <motion.a
          href="/"
          aria-label="VALMAX"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: INTRO_DELAY - 0.2, ease: EASE }}
        >
          <Logo height={24} className="h-6 w-auto" />
        </motion.a>

        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 text-white/50 text-xs">
            <Clock3 className="w-3.5 h-3.5" />
            <span className="tabular-nums">{time} LOCAL</span>
          </div>
          <a
            href="mailto:hello@valmax.studio"
            className="group flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm text-white/80 hover:text-white hover:bg-white/[0.06] transition"
          >
            hello@valmax.studio
            <ArrowUpRight className="w-4 h-4 opacity-40 transition group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full border border-white/15 text-white hover:bg-white/[0.06] transition"
        >
          {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: open ? 1 : 0, y: open ? 0 : -8 }}
        transition={{ duration: 0.3, ease: EASE }}
        style={{ pointerEvents: open ? "auto" : "none" }}
        className="absolute right-6 md:right-10 top-20 w-64 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 p-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
      >
        <nav className="flex flex-col">
          {links.map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl text-sm text-white/80 hover:text-white hover:bg-white/[0.06] transition"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="mt-2 px-4 py-3 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
          <span>Follow</span>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition"
          >
            <Instagram className="w-3.5 h-3.5" />
            Instagram
          </a>
        </div>
      </motion.div>
    </header>
  );
}

type Card = {
  src: string;
  alt: string;
  className: string;
  depth: number;
  badge?: "ig" | "pin";
  album?: boolean;
};

const HERO_CARDS: Card[] = [
  { src: photoFieldsBwSrc, alt: "Fields", className: "top-[2%] left-[34%] w-[150px] aspect-[4/3]", depth: 18, badge: "ig" },
  { src: photoBerriesSrc, alt: "Berries", className: "top-[2%] right-[2%] w-[260px] aspect-[16/9]", depth: 22 },
  { src: photoBasketballSrc, alt: "Athlete", className: "top-[7%] left-[4%] w-[110px] aspect-[3/4]", depth: 28, badge: "ig" },
  { src: photoRedSrc, alt: "Portrait red", className: "top-[10%] right-[12%] w-[200px] aspect-[3/4]", depth: 26, badge: "pin", album: true },
  { src: photoHatSrc, alt: "Hat", className: "top-[18%] left-[3%] w-[220px] aspect-[3/4]", depth: 20, badge: "ig" },
  { src: photoSculptureBwSrc, alt: "Sculpture", className: "bottom-[calc(6%-10px)] left-[calc(34%-90px)] w-[160px] aspect-[4/5]", depth: 24, badge: "pin" },
  { src: photoTwinsSrc, alt: "Twins", className: "bottom-[6%] right-[22%] w-[230px] aspect-[16/10]", depth: 22 },
];

function RalphHero() {
  const reduced = usePrefersReducedMotion();
  const ref = usePointerParallax(!reduced);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`relative overflow-hidden ${MATTE} min-h-[110vh] pt-32 pb-24`}
      style={{ ["--mx" as string]: 0, ["--my" as string]: 0 }}
    >
      <StarField count={700} />
      <LineField variant="hero" />
      <DecorativeImg
        src={noiseSrc}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-[0.12] mix-blend-overlay pointer-events-none"
        style={{ zIndex: 1 }}
      />
      <DecorativeImg
        src={ellipseArcSrc}
        alt=""
        className="absolute pointer-events-none"
        style={{ top: "10%", left: "50%", width: 1500, opacity: 0.5, transform: "translateX(-78%)", zIndex: 0 }}
      />
      <DecorativeImg
        src={ellipseArcSrc}
        alt=""
        className="absolute pointer-events-none"
        style={{ top: "10%", left: "50%", width: 1500, opacity: 0.5, transform: "translateX(-22%)", zIndex: 0 }}
      />
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-white/[0.04] blur-3xl pointer-events-none"
        style={{ zIndex: 1 }}
      />

      <div className="relative z-10 grid place-items-center min-h-[80vh] px-6 text-center max-w-2xl mx-auto">
        <div>
          <motion.h1
            className="font-display font-black text-7xl md:text-[110px] leading-[0.95] tracking-tight"
            variants={blurIn(1)}
            initial="hidden"
            animate="show"
          >
            RALPH
            <br />
            EDWARDS
          </motion.h1>
          <motion.p
            className="mt-8 text-white/55 text-base md:text-[15px] leading-relaxed max-w-md mx-auto"
            variants={blurIn(3)}
            initial="hidden"
            animate="show"
          >
            Crafting digital experiences that captivate and inspire. Elevating your brand
            through design and innovation.
          </motion.p>
        </div>
      </div>

      {HERO_CARDS.map((card, i) => (
        <motion.div
          key={card.alt}
          className={`absolute z-20 ${card.className}`}
          variants={photoIn(i)}
          initial="hidden"
          animate="show"
          style={{
            transform: reduced
              ? undefined
              : "translate3d(calc(var(--mx) * " + (card.depth * -2) + "px), calc(var(--my) * " + (card.depth * -2) + "px), 0)",
            transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div className="group relative w-full h-full overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
            <Photo
              src={card.src}
              alt={card.alt}
              className="w-full h-full object-cover"
              imgClassName="transition-transform duration-[1200ms] group-hover:scale-105"
            />
            {card.badge && (
              <div className="absolute bottom-2 right-2 w-6 h-6 rounded-md bg-black/40 backdrop-blur-sm grid place-items-center text-white/80">
                {card.badge === "ig" ? (
                  <Instagram className="w-3 h-3" />
                ) : (
                  <PinterestIcon />
                )}
              </div>
            )}
            {card.album && (
              <div className="absolute left-4 bottom-5 pointer-events-none flex items-center gap-2.5">
                <div className="relative grid place-items-center">
                  <div className="absolute w-[55px] h-[55px] rounded-full bg-white/30 blur-[10px]" />
                  <div className="absolute w-[38px] h-[38px] rounded-full bg-white/50 blur-[4px]" />
                  <div
                    className="relative w-[25px] h-[25px] rounded-full bg-white"
                    style={{ boxShadow: "0 0 18px 4px rgba(255,255,255,0.7)" }}
                  />
                </div>
                <div
                  className="grid place-items-center rounded-full bg-black/35 backdrop-blur-md text-white text-[13px] border border-white/15"
                  style={{ width: 119, height: 39 }}
                >
                  View album
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </section>
  );
}

function OurPhotographer() {
  return (
    <section className={`relative overflow-hidden ${MATTE} px-6 md:px-12 py-32`}>
      <StarField count={500} />
      <LineField variant="photographer" />
      <DecorativeImg
        src={noiseSrc}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-[0.12] mix-blend-overlay pointer-events-none"
        style={{ zIndex: 1 }}
      />
      <DecorativeImg
        src={bgFabricSrc}
        alt=""
        className="absolute left-0 top-1/3 w-[280px] md:w-[340px] opacity-[0.13] pointer-events-none select-none"
        style={{ zIndex: 1 }}
      />
      <DecorativeImg
        src={bgSilhouettesSrc}
        alt=""
        className="absolute right-0 top-[12%] w-[360px] md:w-[460px] opacity-[0.16] pointer-events-none select-none"
        style={{ zIndex: 1 }}
      />
      <DecorativeImg
        src={bgNikonSrc}
        alt=""
        className="absolute right-[4%] bottom-0 w-[280px] md:w-[360px] opacity-[0.14] pointer-events-none select-none"
        style={{ zIndex: 1 }}
      />
      <div
        className="absolute -left-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-white/[0.02] blur-3xl pointer-events-none"
        style={{ zIndex: 1 }}
      />

      <div className="relative z-[2] grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto items-start">
        <motion.div
          className="relative w-full max-w-[440px] justify-self-center md:justify-self-end p-4 pb-20"
          style={{ background: "#efeae0", boxShadow: "0 40px 100px -30px rgba(0,0,0,0.8)" }}
          initial={{ opacity: 0, y: 60, filter: "blur(16px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <motion.h2
            className="absolute -top-16 md:-top-19 left-1/2 -translate-x-1/2 font-display font-medium text-4xl md:text-5xl leading-[0.95] uppercase text-white whitespace-nowrap"
            initial={{ opacity: 0, y: 30, filter: "blur(14px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            Our photographer
          </motion.h2>
          <Photo
            src={photoRalphPortraitSrc}
            alt="Ralph Edwards portrait"
            className="w-full aspect-[3/4] object-cover"
          />
          <div className="absolute bottom-6 left-6 text-black font-display font-black text-2xl leading-none">
            RALPH
            <br />
            EDWARDS
          </div>
        </motion.div>

        <div className="space-y-8 max-w-xl">
          <motion.h2
            className="font-display font-medium text-4xl md:text-5xl leading-[1.05] uppercase w-full md:w-[600px] md:mt-[-28px]"
            initial={{ opacity: 0, y: 30, filter: "blur(14px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            will select the
            <br />
            best images and ideas
            <br />
            for you
          </motion.h2>
          <motion.div
            className="space-y-4 text-white/55 text-[15px] leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
          >
            <p>
              Once upon a time, nestled in a quaint little town, there lived an author named
              Alice. She wasn&apos;t your typical writer; her stories weren&apos;t just ink on
              paper; they were portals to worlds beyond imagination. Alice had a peculiar gift
              — she could breathe life into her characters, making them dance off the pages
              and into the hearts of her readers.
            </p>
            <p>
              Alice&apos;s love for storytelling began in her childhood. She would spend hours
              in her attic, surrounded by dusty old books, dreaming up adventures for her
              imaginary friends. As she grew older, her passion for writing only intensified.
              She studied literature at university, honing her craft and delving deeper into
              the mysteries of storytelling.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

type Project = {
  src: string;
  alt: string;
  tall: boolean;
  mt: string;
  width: string;
};

const PROJECTS: Project[] = [
  { src: photoCarSrc, alt: "Company Photo", tall: false, mt: "md:mt-20", width: "w-[216px]" },
  { src: photoFieldsColorSrc, alt: "Landscape Series", tall: true, mt: "md:mt-25", width: "w-[220px]" },
  { src: photoGirlGrassSrc, alt: "Classy Photo Shoot", tall: false, mt: "md:mt-10", width: "w-[230px]" },
  { src: photoSculptureColorSrc, alt: "Photo Brand", tall: false, mt: "md:mt-4", width: "w-[200px]" },
];

function AllTypes() {
  return (
    <section className={`relative overflow-hidden ${MATTE} px-6 md:px-12 py-32`}>
      <StarField count={550} ring ringCount={260} ringRadiusFactor={0.37} ringBandWidth={50} />
      <LineField variant="projects" />
      <DecorativeImg
        src={noiseSrc}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-[0.12] mix-blend-overlay pointer-events-none"
        style={{ zIndex: 1 }}
      />

      <div className="relative z-[2] max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <motion.h2
            className="font-display font-black text-5xl md:text-6xl uppercase leading-[0.95]"
            initial={{ opacity: 0, y: 24, filter: "blur(14px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            All types of
            <br />
            projects
          </motion.h2>
          <div>
            <p className="text-white/55 text-[15px] max-w-md">
              Welcome to the Innovation Hub: Where Ideas Take Shape. Explore the Intersection
              of Creativity and Technology. Dive Into Our Portfolio and Witness the Power of
              Ingenuity.
            </p>
            <button
              type="button"
              className="group mt-6 flex items-center gap-3 text-sm uppercase tracking-widest text-white/70 hover:text-white transition"
            >
              View the artwork
              <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-start">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.alt}
              className={`${p.mt} ${p.width} mx-auto`}
              initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, delay: i * 0.12, ease: EASE }}
            >
              <div className="group overflow-hidden ring-1 ring-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
                <Photo
                  src={p.src}
                  alt={p.alt}
                  className={`w-full ${p.tall ? "aspect-[3/4]" : "aspect-[4/5]"} object-cover`}
                  imgClassName="transition-transform duration-[1500ms] group-hover:scale-110"
                />
              </div>
              <div className="text-center space-y-3 mt-4">
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white">
                  {p.alt}
                </h3>
                <div className="inline-flex items-center gap-2 text-xs text-white/60 border border-white/15 rounded-full px-3 py-1.5 hover:bg-white/5 transition cursor-pointer">
                  photo shoot
                  <span className="w-4 h-4 border border-white/20 rounded-full grid place-items-center">
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MechanicalMarvels() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const [vectorFailed, setVectorFailed] = useState(false);

  return (
    <>
      <div className="relative px-6 md:px-12 pt-28 pb-12 overflow-hidden">
        <StarField count={450} />
        <LineField variant="marvels" />
        <DecorativeImg
          src={noiseSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.12] mix-blend-overlay pointer-events-none"
          style={{ zIndex: 1 }}
        />

        <div className="relative z-[2]">
          <motion.h2
            className="font-display font-medium uppercase text-5xl md:text-[90px] leading-[0.95] tracking-tight max-w-[1200px] flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 40, filter: "blur(16px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: EASE }}
          >
            <span>Mechanical</span>
            <img
              src={photoCameraSrc}
              alt=""
              className="inline-block h-10 md:h-20 w-auto rounded-md"
            />
            <span>Marvels: Unveiling the artistry of automation</span>
          </motion.h2>

          <div className="flex justify-between items-center mt-16 text-xs uppercase tracking-widest text-white/50">
            <button type="button" className="group flex items-center gap-2">
              View the artwork
              <MoveRight className="w-3.5 h-3.5 -rotate-45 transition-transform group-hover:translate-x-1" />
            </button>
            <button type="button" className="group flex items-center gap-2">
              Scroll to view more
              <MoveRight className="w-3.5 h-3.5 rotate-90 transition-transform group-hover:translate-y-1" />
            </button>
          </div>
        </div>
      </div>

      <div ref={sectionRef} className="relative h-[80vh] overflow-hidden">
        <motion.div className="absolute left-0 right-0" style={{ top: "-10%", bottom: "-10%", y }}>
          <DecorativeImg
            src={getInTouchBgSrc}
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />
        <LineField variant="marvelsBottom" />

        <div className="relative h-full grid place-items-center px-6 text-center">
          <div>
            <motion.h3
              className="font-display font-black uppercase text-4xl md:text-7xl leading-[1] tracking-tight"
              initial={{ opacity: 0, y: 40, filter: "blur(16px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: EASE }}
            >
              Get in touch to our
              <br />
              <span className="text-lime">Modern maintenance.</span>
            </motion.h3>

            <div className="flex items-center justify-center gap-1">
              <motion.button
                type="button"
                className="mt-10 inline-flex bg-white text-black rounded-full px-6 py-2 text-sm font-medium hover:bg-white/90 uppercase transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.3, ease: EASE }}
              >
                Get in touch
              </motion.button>
              <div
                className="rounded-full border border-white flex items-center justify-center"
                style={{ width: 18.86, height: 18.53, marginTop: "4rem" }}
              >
                {vectorFailed ? (
                  <ArrowUpRight style={{ width: 5.86, height: 5.53 }} />
                ) : (
                  <img
                    src={vectorSrc}
                    alt=""
                    style={{ width: 5.86, height: 5.53 }}
                    onError={() => setVectorFailed(true)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-6 md:px-12 py-6 flex items-center justify-between text-xs text-white/40">
      <span>All right reserved — 2024</span>
      <a href="#privacy" className="hover:text-white transition">
        Privacy Policy
      </a>
    </footer>
  );
}

export default function ValmaxLanding() {
  return (
    <div className="relative bg-[oklch(0.06_0_0)] text-white">
      <IntroSequence onDone={() => {}} />
      <TopBar />
      <RalphHero />
      <OurPhotographer />
      <AllTypes />
      <MechanicalMarvels />
      <Footer />
    </div>
  );
}
