import { useEffect, useId, useRef, useState } from "react";
import { animate, motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { LetterFadeIn } from "@/components/ui/LetterFadeIn";

const HEADER_ICONS = [
  { src: "/assets/Glasses.svg", alt: "Glasses" },
  { src: "/assets/Star.svg", alt: "Favorites" },
  { src: "/assets/Pencil.svg", alt: "Annotate" },
  { src: "/assets/Figure.svg", alt: "Modes" },
  { src: "/assets/List.svg", alt: "Notes" },
];

const LENS_PATH =
  "M336.752 1C430.229 1 515.07 25.0382 576.514 69.8223C637.93 114.587 676 180.094 676 263.188C676 346.33 637.884 430.794 576.383 494.479C514.887 558.16 430.074 601 336.752 601C243.493 601 159.562 550.238 98.9131 478.569C38.2605 406.897 1.00007 314.436 1 231.271C1 148.194 38.1765 90.6936 98.6689 53.9102C159.226 17.0875 243.205 1.00002 336.752 1Z";
const LENS_LOCAL_W = 677;
const LENS_LOCAL_H = 602;
const LENS_CX = LENS_LOCAL_W / 2;
const LENS_CY = LENS_LOCAL_H / 2;
const CANVAS_W = 1920;
const CANVAS_H = 980;
const LENS_ORIGIN_X = 623;
const LENS_ORIGIN_Y = 189;
const LENS_SCALE = 1.12;
const GROUP_SCALE = 0.9;
const GROUP_SCALE_MOBILE = 0.6;
const MOBILE_BREAKPOINT_PX = 900;
const GROUP_SHIFT_Y = -35;
const LENS_ENTRANCE_TRANSITION = { duration: 1.4, ease: "easeInOut" as const };
const HUD_REVEAL_DELAY = LENS_ENTRANCE_TRANSITION.duration;
const TIMER_COUNT_SECONDS = 34;
const TIMER_COUNT_DURATION = 4;
const PROGRESS_BAR_DELAY = HUD_REVEAL_DELAY;
const PROGRESS_BAR_DURATION = TIMER_COUNT_DURATION;
const TRACK_SVG_VIEWBOX_WIDTH = 532;
const TRACK_SVG_BAR_INSET_X = 40;
const TRACK_SVG_BAR_WIDTH = 452;
const HERO_TEXT_EXTRA_DELAY = 1;

function formatTimestamp(totalSeconds: number) {
  return `0:${String(Math.max(0, Math.round(totalSeconds))).padStart(2, "0")}`;
}

function applyGroupTransform(
  [x, y]: [number, number],
  width: number,
  height: number,
  scale: number,
): [number, number] {
  const originX = width / 2;
  const originY = height / 2;
  return [originX + scale * (x - originX), originY + scale * (y - originY) + GROUP_SHIFT_Y];
}

function projectCanvasPoint(
  canvasX: number,
  canvasY: number,
  width: number,
  height: number,
): [number, number] {
  const coverScale = Math.max(width / CANVAS_W, height / CANVAS_H);
  const offsetX = (width - CANVAS_W * coverScale) / 2;
  const offsetY = (height - CANVAS_H * coverScale) / 2;
  return [canvasX * coverScale + offsetX, canvasY * coverScale + offsetY];
}

function projectPoint(x: number, y: number, width: number, height: number): [number, number] {
  const canvasX = (x - LENS_CX) * LENS_SCALE + LENS_CX + LENS_ORIGIN_X;
  const canvasY = (y - LENS_CY) * LENS_SCALE + LENS_CY + LENS_ORIGIN_Y;
  return projectCanvasPoint(canvasX, canvasY, width, height);
}

function projectPath(d: string, project: (x: number, y: number) => [number, number]) {
  const tokens = d.match(/[MCZ]|-?\d*\.?\d+(?:e-?\d+)?/gi) ?? [];
  let out = "";
  let i = 0;
  while (i < tokens.length) {
    const token = tokens[i];
    if (token === "M" || token === "C") {
      const pairs = token === "M" ? 1 : 3;
      out += token;
      for (let p = 0; p < pairs; p++) {
        const x = parseFloat(tokens[++i]);
        const y = parseFloat(tokens[++i]);
        const [px, py] = project(x, y);
        out += `${px} ${py}${p < pairs - 1 ? ", " : " "}`;
      }
      i++;
    } else if (token === "Z") {
      out += "Z ";
      i++;
    } else {
      i++;
    }
  }
  return out.trim();
}

function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, size] as const;
}

function useRelativeRect(containerRef: React.RefObject<HTMLElement | null>, active: boolean) {
  const ref = useRef<HTMLImageElement>(null);
  const [rect, setRect] = useState({ left: 0, top: 0, width: 0, height: 0 });

  useEffect(() => {
    const containerEl = containerRef.current;
    const el = ref.current;
    if (!active || !containerEl || !el) return;
    const update = () => {
      const containerBox = containerEl.getBoundingClientRect();
      const box = el.getBoundingClientRect();
      setRect({
        left: box.left - containerBox.left,
        top: box.top - containerBox.top,
        width: box.width,
        height: box.height,
      });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(containerEl);
    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef, active]);

  return [ref, rect] as const;
}

export function Section1() {
  const lensMaskId = useId();
  const [heroRef, heroSize] = useElementSize<HTMLDivElement>();
  const hasSize = heroSize.width > 0 && heroSize.height > 0;
  const [displaySeconds, setDisplaySeconds] = useState(0);
  useEffect(() => {
    const controls = animate(0, TIMER_COUNT_SECONDS, {
      duration: TIMER_COUNT_DURATION,
      delay: HUD_REVEAL_DELAY,
      ease: "linear",
      onUpdate: (value) => setDisplaySeconds(value),
    });
    return () => controls.stop();
  }, []);
  const [trackRef, trackRect] = useRelativeRect(heroRef, hasSize);

  const groupScale = hasSize && heroSize.width < MOBILE_BREAKPOINT_PX ? GROUP_SCALE_MOBILE : GROUP_SCALE;
  const projectLensPoint = (x: number, y: number): [number, number] =>
    applyGroupTransform(
      projectPoint(x, y, heroSize.width, heroSize.height),
      heroSize.width,
      heroSize.height,
      groupScale,
    );
  const projectRowPoint = (x: number, y: number): [number, number] =>
    applyGroupTransform(
      projectCanvasPoint(x, y, heroSize.width, heroSize.height),
      heroSize.width,
      heroSize.height,
      groupScale,
    );

  const lensPathPx = hasSize ? projectPath(LENS_PATH, projectLensPoint) : "";

  const [frameLeft, frameTop] = hasSize ? projectLensPoint(0, 0) : [0, 0];
  const [frameRight, frameBottom] = hasSize
    ? projectLensPoint(LENS_LOCAL_W, LENS_LOCAL_H)
    : [0, 0];
  const lensEntranceOffsetY = hasSize ? heroSize.height - frameTop : 0;

  const projectRow = (leftX: number, rightX: number, y: number) => {
    if (!hasSize) return { left: 0, top: 0, width: 0 };
    const [left, top] = projectRowPoint(leftX, y);
    const [right] = projectRowPoint(rightX, y);
    return { left, top, width: right - left };
  };

  const timestampRow = projectRow(668, 1236, 290);
  const timelineRow = projectRow(704, 1236, 630);
  const iconsRow = projectRow(704, 1236, 654);

  return (
    <AnimatedSection id="section-1" className="h-screen min-h-[720px] w-full bg-black text-white">
      <header className="absolute inset-x-0 top-8 z-30 flex justify-center px-6">
        <motion.nav
          className="flex items-center gap-7 rounded-full bg-white/5 px-6 py-3 backdrop-blur-[6px]"
          style={{ WebkitBackdropFilter: "blur(6px)" }}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img src="/assets/logo.svg" alt="GLAIR" className="h-[18px] w-auto" />
          {HEADER_ICONS.map((icon) => (
            <img key={icon.src} src={icon.src} alt={icon.alt} className="h-5 w-auto opacity-90" />
          ))}
        </motion.nav>
      </header>

      <div ref={heroRef} className="absolute inset-0 max-lg:-translate-y-[90px]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero-video.mp4"
          poster="/hero-poster.webp"
          autoPlay
          muted
          loop
          playsInline
        />

        {hasSize && (
          <svg width={0} height={0} className="absolute" aria-hidden="true">
            <defs>
              <mask
                id={lensMaskId}
                maskUnits="userSpaceOnUse"
                x={0}
                y={0}
                width={heroSize.width}
                height={heroSize.height}
              >
                <rect x={0} y={0} width={heroSize.width} height={heroSize.height} fill="white" />
                <motion.path
                  d={lensPathPx}
                  fill="black"
                  initial={{ y: lensEntranceOffsetY }}
                  animate={{ y: 0 }}
                  transition={LENS_ENTRANCE_TRANSITION}
                />
              </mask>
            </defs>
          </svg>
        )}

        {hasSize && (
          <div
            className="absolute inset-0 bg-transparent backdrop-blur-[6px]"
            style={{
              WebkitBackdropFilter: "blur(6px)",
              mask: `url(#${lensMaskId})`,
              WebkitMask: `url(#${lensMaskId})`,
            }}
          />
        )}

        {hasSize && (
          <motion.div
            className="pointer-events-none absolute"
            style={{
              left: frameLeft,
              top: frameTop,
              width: frameRight - frameLeft,
              height: frameBottom - frameTop,
            }}
            initial={{ y: lensEntranceOffsetY, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={LENS_ENTRANCE_TRANSITION}
          >
            <img
              src="/assets/EllipseFocusCenterHero.svg"
              alt=""
              className="absolute inset-0 h-full w-full"
            />
          </motion.div>
        )}

        {hasSize && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: HUD_REVEAL_DELAY, ease: "easeOut" }}
          >
            <div
              className="absolute flex items-center justify-between"
              style={{ left: timestampRow.left, top: timestampRow.top, width: timestampRow.width }}
            >
              <span className="font-condensed text-xl font-bold leading-5 text-[#3BFA45]">
                14:36 / Mon, Aug 5
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3BFA45]" />
                <span className="font-condensed text-xl font-bold leading-5 text-[#3BFA45]">
                  86%
                </span>
              </span>
            </div>

            <div
              className="absolute flex items-center gap-0"
              style={{ left: timelineRow.left, top: timelineRow.top, width: timelineRow.width }}
            >
              <span className="font-condensed text-xl font-bold leading-5 text-[#3BFA45]">
                {formatTimestamp(displaySeconds)}
              </span>
              <img
                ref={trackRef}
                src="/assets/TimeLinePlayer.svg"
                alt=""
                className="h-0.5 min-w-0 flex-1"
              />
              <span className="font-condensed text-xl font-bold leading-5 text-[#3BFA45]">
                0:34
              </span>
            </div>

            <motion.div
              className="absolute origin-left bg-[#3BFA45]"
              style={{
                left: trackRect.left + (trackRect.width * TRACK_SVG_BAR_INSET_X) / TRACK_SVG_VIEWBOX_WIDTH,
                top: trackRect.top,
                width: (trackRect.width * TRACK_SVG_BAR_WIDTH) / TRACK_SVG_VIEWBOX_WIDTH,
                height: trackRect.height,
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: PROGRESS_BAR_DURATION,
                delay: PROGRESS_BAR_DELAY,
                ease: "linear",
              }}
            />

            <div
              className="absolute"
              style={{
                left: trackRect.left + trackRect.width * 0.08,
                top: iconsRow.top,
                width: trackRect.width * 0.84,
                height: 18,
              }}
            >
              <img
                src="/assets/GreenDynamic.svg"
                alt="Volume"
                className="absolute left-0 top-1/2 h-[18px] w-[22px] -translate-y-1/2"
              />
              <img
                src="/assets/GreenStop.svg"
                alt="Pause"
                className="absolute left-1/2 top-1/2 h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2"
              />
              <img
                src="/assets/GreenThreeDot.svg"
                alt="More"
                className="absolute right-0 top-1/2 h-[5px] w-[20px] -translate-y-1/2"
              />
            </div>
          </motion.div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 px-10 pb-10">
        <h1 className="mb-10 font-sans text-5xl leading-[0.95] md:text-6xl">
          <LetterFadeIn text="Your Second" className="block text-white/40" startDelay={HERO_TEXT_EXTRA_DELAY} />
          <LetterFadeIn
            text="Layer of Vision"
            className="block font-medium text-white"
            startDelay={HERO_TEXT_EXTRA_DELAY}
          />
        </h1>

        <div className="relative flex flex-col items-start justify-between gap-8 pt-5 md:flex-row md:items-end">
          <motion.div
            className="absolute left-0 right-0 top-0 h-px origin-center bg-white/10"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 + HERO_TEXT_EXTRA_DELAY }}
          />
          <p className="text-sm text-white/50 md:self-start">
            <LetterFadeIn text="Translate. Navigate. Remember. Hands-free." startDelay={HERO_TEXT_EXTRA_DELAY} />
          </p>

          <div className="flex flex-col items-start gap-5">
            <p className="max-w-[320px] text-left text-sm text-white/90">
              <LetterFadeIn
                text="Experience the first wearable that blends AI with your real world — seamlessly, instantly, anywhere."
                startDelay={HERO_TEXT_EXTRA_DELAY}
              />
            </p>
            <div className="flex items-center gap-5">
              <motion.button
                className="relative flex h-[34px] w-[120px] items-center justify-center gap-1.5 text-[10px] font-medium text-[#111111]"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: HERO_TEXT_EXTRA_DELAY }}
              >
                <img
                  src="/assets/BGButtonPreOrder.svg"
                  alt=""
                  className="absolute inset-0 h-full w-full"
                />
                <span className="relative">PRE-ORDER</span>
                <img src="/assets/ArrowRight.svg" alt="" className="relative h-[7.6px] w-auto" />
              </motion.button>
              <motion.span
                className="flex items-center gap-2 text-[10px] tracking-widest text-white/60"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: HERO_TEXT_EXTRA_DELAY }}
              >
                <img src="/assets/MouseDown.svg" alt="" className="h-[17px] w-auto" />
                SCROLL TO LEARN MORE
              </motion.span>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
