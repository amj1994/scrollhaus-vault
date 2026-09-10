import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
};

type RingStar = Star & { radiusOffset: number };

type StarFieldProps = {
  count?: number;
  className?: string;
  ring?: boolean;
  ringCount?: number;
  ringRadiusFactor?: number;
  ringBandWidth?: number;
};

function randRange(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function pickWeighted<T>(entries: [number, () => T][]): T {
  const r = Math.random();
  let acc = 0;
  for (const [weight, make] of entries) {
    acc += weight;
    if (r <= acc) return make();
  }
  return entries[entries.length - 1][1]();
}

function gaussian(mean: number, stdDev: number) {
  const u1 = Math.max(Math.random(), 1e-9);
  const u2 = Math.random();
  const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return mean + z0 * stdDev;
}

export default function StarField({
  count = 600,
  className = "absolute inset-0 pointer-events-none",
  ring = false,
  ringCount = 240,
  ringRadiusFactor = 0.36,
  ringBandWidth = 52,
}: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<Star[]>([]);
  const ringStarsRef = useRef<RingStar[]>([]);
  const sizeRef = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const buildStars = (w: number, h: number) => {
      const stars: Star[] = [];
      for (let i = 0; i < count; i++) {
        const r = pickWeighted<number>([
          [0.65, () => randRange(0.25, 0.5)],
          [0.27, () => randRange(0.5, 0.8)],
          [0.08, () => randRange(0.8, 1.3)],
        ]);
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r,
          opacity: randRange(0.2, 0.95),
          twinkleSpeed: randRange(0.4, 1.6),
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }
      starsRef.current = stars;

      if (ring) {
        const cx = w / 2;
        const cy = h / 2;
        const ringR = Math.min(w, h) * ringRadiusFactor;
        const half = ringBandWidth / 2;
        const ringStars: RingStar[] = [];
        for (let i = 0; i < ringCount * 2; i++) {
          const angle = Math.random() * Math.PI * 2;
          const offset = gaussian(0, half * 0.65);
          const dist = ringR + offset;
          const x = cx + Math.cos(angle) * dist;
          const y = cy + Math.sin(angle) * dist;
          const r = pickWeighted<number>([
            [0.7, () => randRange(0.15, 0.3)],
            [0.23, () => randRange(0.3, 0.5)],
            [0.07, () => randRange(0.5, 0.7)],
          ]);
          ringStars.push({
            x,
            y,
            r,
            opacity: randRange(0.25, 0.8),
            twinkleSpeed: randRange(0.3, 1.3),
            twinkleOffset: Math.random() * Math.PI * 2,
            radiusOffset: offset,
          });
        }
        ringStarsRef.current = ringStars;
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      sizeRef.current = { w, h };
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars(w, h);
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    let raf = 0;
    const start = performance.now();

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);

      if (ring) {
        const cx = w / 2;
        const cy = h / 2;
        const ringR = Math.min(w, h) * ringRadiusFactor;
        const inner = ringR - ringBandWidth * 4;
        const outer = ringR + ringBandWidth * 4;
        const grad = ctx.createRadialGradient(cx, cy, Math.max(0, inner), cx, cy, Math.max(1, outer));
        grad.addColorStop(0, "rgba(255,255,255,0)");
        grad.addColorStop(0.42, "rgba(255,255,255,0.022)");
        grad.addColorStop(0.5, "rgba(255,255,255,0.038)");
        grad.addColorStop(0.58, "rgba(255,255,255,0.022)");
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      for (const s of starsRef.current) {
        const twinkle = 0.55 + 0.45 * (Math.sin(t * s.twinkleSpeed + s.twinkleOffset) * 0.5 + 0.5);
        const alpha = s.opacity * twinkle;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0, Math.min(1, alpha))})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (s.r > 1.1) {
          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4);
          glow.addColorStop(0, `rgba(255,255,255,${alpha * 0.3})`);
          glow.addColorStop(1, "rgba(255,255,255,0)");
          ctx.beginPath();
          ctx.fillStyle = glow;
          ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (ring) {
        const half = ringBandWidth * 0.65;
        for (const s of ringStarsRef.current) {
          const twinkle = 0.55 + 0.45 * (Math.sin(t * s.twinkleSpeed + s.twinkleOffset) * 0.5 + 0.5);
          const falloff = Math.max(0.15, 1 - Math.abs(s.radiusOffset) / half);
          const alpha = s.opacity * twinkle * falloff;
          ctx.beginPath();
          ctx.fillStyle = `rgba(255,255,255,${Math.max(0, Math.min(1, alpha))})`;
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fill();
          if (s.r > 1.0) {
            const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 5);
            glow.addColorStop(0, `rgba(255,255,255,${alpha * 0.4})`);
            glow.addColorStop(1, "rgba(255,255,255,0)");
            ctx.beginPath();
            ctx.fillStyle = glow;
            ctx.arc(s.x, s.y, s.r * 5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, ring, ringCount, ringRadiusFactor, ringBandWidth]);

  return <canvas ref={canvasRef} className={className} style={{ zIndex: 0 }} />;
}
