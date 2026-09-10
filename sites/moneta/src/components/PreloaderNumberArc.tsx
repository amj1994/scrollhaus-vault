import { useEffect, useRef } from "react";

const CANVAS_WIDTH = 550;
const CANVAS_HEIGHT = 70;
const ARC_RADIUS = 310;
const CENTER_X = CANVAS_WIDTH / 2;
const CENTER_Y = 330;
const ANGLE_STEP = Math.PI / 16;
const FONT = `300 17px "Inter Tight", sans-serif`;
const VISIBLE_DISTANCE = 5;

export default function PreloaderNumberArc({ progress }: { progress: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animatedProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    targetProgressRef.current = progress;
    if (frameRef.current == null) {
      frameRef.current = requestAnimationFrame(tick);
    }
    return () => {
      if (frameRef.current != null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  const draw = (value: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const ratio = window.devicePixelRatio || 1;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(ratio, ratio);
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.clip();
    ctx.font = FONT;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let number = 0; number <= 100; number += 1) {
      const distance = number - value;
      const absDistance = Math.abs(distance);
      if (absDistance > VISIBLE_DISTANCE) continue;
      const angle = -Math.PI / 2 + distance * ANGLE_STEP;
      const x = CENTER_X + Math.cos(angle) * ARC_RADIUS;
      const y = CENTER_Y + Math.sin(angle) * ARC_RADIUS;
      if (x < -80 || x > 630 || y < -20 || y > 90) continue;
      const fade = Math.pow(1 - absDistance / VISIBLE_DISTANCE, 2.2);
      const opacity = Math.max(0, 0.95 * fade);
      const focal = Math.max(0, 1 - absDistance / 1.2);
      const scale = 1 + focal * 0.35;
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      if (focal > 0.05) {
        ctx.shadowColor = `rgba(180, 200, 255, ${focal * 0.9})`;
        ctx.shadowBlur = 18 * focal;
      }
      ctx.fillStyle = `rgba(255,255,255,${opacity})`;
      ctx.fillText(String(number), 0, 0);
      ctx.restore();
    }
    ctx.restore();
  };

  const tick = () => {
    const current = animatedProgressRef.current;
    const target = targetProgressRef.current;
    const delta = target - current;
    if (Math.abs(delta) < 0.001) {
      animatedProgressRef.current = target;
      draw(target);
      frameRef.current = null;
      return;
    }
    animatedProgressRef.current = current + delta * 0.045;
    draw(animatedProgressRef.current);
    frameRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ratio = window.devicePixelRatio || 1;
    canvas.width = CANVAS_WIDTH * ratio;
    canvas.height = CANVAS_HEIGHT * ratio;
    draw(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        bottom: 123,
        transform: "translateX(-50%)",
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        zIndex: 4,
        pointerEvents: "none",
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          WebkitMaskImage:
            "radial-gradient(ellipse 55% 100% at 50% 50%, black 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.4) 65%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 55% 100% at 50% 50%, black 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.4) 65%, transparent 100%)",
        }}
      />
    </div>
  );
}
