import { useEffect, useRef } from "react";

const COLS = 12;
const ROWS = 16;
const TILE = 32;
const GAP = 1;
const BASE_FILL_RATIO = 0.35;
const HOVER_FILL_RATIO = 0.7;
const HOVER_BASE_RADIUS = 4; // in cells

type Sprites = Record<string, HTMLCanvasElement>;
let spriteCachePromise: Promise<Sprites> | null = null;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function rasterize(img: HTMLImageElement, dpr: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = TILE * dpr;
  c.height = TILE * dpr;
  const ctx = c.getContext("2d")!;
  ctx.drawImage(img, 0, 0, TILE * dpr, TILE * dpr);
  return c;
}

function getSprites(): Promise<Sprites> {
  if (!spriteCachePromise) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const names = ["tile-empty", "tile-1", "tile-2", "tile-3", "tile-4", "tile-5"];
    spriteCachePromise = Promise.all(
      names.map((n) => loadImage(`/tiles/${n}.svg`).then((img) => [n, rasterize(img, dpr)] as const)),
    ).then((entries) => Object.fromEntries(entries));
  }
  return spriteCachePromise;
}

type Cell = { on: boolean; sprite: number };

function fisherYates<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function PixelGrid({ side }: { side: "left" | "right" }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cellsRef = useRef<Cell[]>([]);
  const hoveredRef = useRef<Set<number>>(new Set());
  const spritesRef = useRef<Sprites | null>(null);

  const width = COLS * (TILE + GAP) - GAP;
  const height = ROWS * (TILE + GAP) - GAP;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const total = COLS * ROWS;
    cellsRef.current = Array.from({ length: total }, () => ({ on: false, sprite: 1 }));

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = () => {
      const sprites = spritesRef.current;
      if (!sprites) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cells = cellsRef.current;
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const idx = row * COLS + col;
          const cell = cells[idx];
          const sprite = cell.on ? sprites[`tile-${cell.sprite}`] : sprites["tile-empty"];
          const x = col * (TILE + GAP) * dpr;
          const y = row * (TILE + GAP) * dpr;
          ctx.drawImage(sprite, x, y, TILE * dpr, TILE * dpr);
        }
      }
    };

    let cancelled = false;
    let cleanupFns: Array<() => void> = [];

    getSprites().then((sprites) => {
      if (cancelled) return;
      spritesRef.current = sprites;

      const cells = cellsRef.current;
      const baseIndices = fisherYates(Array.from({ length: total }, (_, i) => i)).slice(
        0,
        Math.round(total * BASE_FILL_RATIO),
      );

      const setOn = (idx: number) => {
        cells[idx] = { on: true, sprite: 1 + Math.floor(Math.random() * 5) };
      };

      if (reduced) {
        baseIndices.forEach(setOn);
        draw();
      } else {
        let i = 0;
        const perTick = Math.max(1, Math.ceil(baseIndices.length / 18));
        const revealTick = () => {
          const slice = baseIndices.slice(i, i + perTick);
          slice.forEach(setOn);
          i += perTick;
          draw();
          if (i < baseIndices.length) {
            const raf = requestAnimationFrame(revealTick);
            cleanupFns.push(() => cancelAnimationFrame(raf));
          } else {
            startAmbient();
          }
        };
        const raf = requestAnimationFrame(revealTick);
        cleanupFns.push(() => cancelAnimationFrame(raf));
      }

      function startAmbient() {
        let timeoutId: number;
        const tick = () => {
          const hovered = hoveredRef.current;
          for (let n = 0; n < 3; n++) {
            const idx = Math.floor(Math.random() * total);
            if (hovered.has(idx)) continue;
            if (Math.random() < BASE_FILL_RATIO) {
              setOn(idx);
            } else {
              cells[idx] = { on: false, sprite: 1 };
            }
          }
          draw();
          timeoutId = window.setTimeout(tick, 120 + Math.random() * 180);
        };
        timeoutId = window.setTimeout(tick, 120 + Math.random() * 180);
        cleanupFns.push(() => window.clearTimeout(timeoutId));

        let flickerTimeoutId: number;
        const flickerTick = () => {
          const hovered = Array.from(hoveredRef.current);
          const count = Math.ceil(hovered.length * 0.18);
          const shuffled = fisherYates(hovered).slice(0, count);
          shuffled.forEach((idx) => {
            if (Math.random() < HOVER_FILL_RATIO) setOn(idx);
          });
          draw();
          flickerTimeoutId = window.setTimeout(flickerTick, 70 + Math.random() * 90);
        };
        flickerTimeoutId = window.setTimeout(flickerTick, 70 + Math.random() * 90);
        cleanupFns.push(() => window.clearTimeout(flickerTimeoutId));
      }

      if (reduced) return;

      let rafPending = false;
      let lastClientX = -9999;
      let lastClientY = -9999;

      const reconcileHover = () => {
        rafPending = false;
        const rect = canvas.getBoundingClientRect();
        const localX = ((lastClientX - rect.left) / rect.width) * COLS;
        const localY = ((lastClientY - rect.top) / rect.height) * ROWS;
        const t = performance.now();
        const newHovered = new Set<number>();

        if (localX >= -HOVER_BASE_RADIUS - 2 && localX <= COLS + HOVER_BASE_RADIUS + 2) {
          for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
              const dx = col + 0.5 - localX;
              const dy = row + 0.5 - localY;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const angle = Math.atan2(dy, dx);
              const rMod =
                Math.sin(angle * 3 + t * 0.0011) * 0.55 +
                Math.sin(angle * 5 - t * 0.0017 + 1.3) * 0.3 +
                Math.sin(angle * 2 + t * 0.0007 + 2.1) * 0.2;
              const n = Math.random();
              const rMax = HOVER_BASE_RADIUS * (1 + rMod * 0.25) * (0.95 + n * 0.3);
              const idx = row * COLS + col;

              if (dist <= rMax - 0.5) {
                newHovered.add(idx);
              } else if (dist <= rMax + 0.4) {
                const noise = (Math.sin(col * 12.9898 + row * 78.233 + t * 0.002) + 1) * 0.5;
                if (noise > 0.45) newHovered.add(idx);
              }
            }
          }
        }

        const cells = cellsRef.current;
        const prevHovered = hoveredRef.current;
        prevHovered.forEach((idx) => {
          if (!newHovered.has(idx)) {
            cells[idx] = { on: false, sprite: 1 };
          }
        });
        newHovered.forEach((idx) => {
          if (Math.random() < HOVER_FILL_RATIO) {
            cells[idx] = { on: true, sprite: 1 + Math.floor(Math.random() * 5) };
          } else {
            cells[idx] = { on: false, sprite: 1 };
          }
        });
        hoveredRef.current = newHovered;
        draw();
      };

      const onPointerMove = (e: PointerEvent) => {
        lastClientX = e.clientX;
        lastClientY = e.clientY;
        if (!rafPending) {
          rafPending = true;
          requestAnimationFrame(reconcileHover);
        }
      };
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      cleanupFns.push(() => window.removeEventListener("pointermove", onPointerMove));
    });

    return () => {
      cancelled = true;
      cleanupFns.forEach((fn) => fn());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const maskPosition = side === "left" ? "30% 50%" : "70% 50%";

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        [side]: 0,
        top: "50%",
        transform: "translateY(-40%)",
        zIndex: 0,
        pointerEvents: "none",
        WebkitMaskImage: `radial-gradient(ellipse 80% 80% at ${maskPosition}, black 0%, transparent 75%)`,
        maskImage: `radial-gradient(ellipse 80% 80% at ${maskPosition}, black 0%, transparent 75%)`,
      }}
    />
  );
}
