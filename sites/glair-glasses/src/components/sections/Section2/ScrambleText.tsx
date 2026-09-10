import { useEffect, useState } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
  durationMs?: number;
}

const TICK_MS = 40;

function shuffledIndices(count: number) {
  const arr = Array.from({ length: count }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function ScrambleText({ text, className, durationMs = 1200 }: ScrambleTextProps) {
  const [display, setDisplay] = useState(() => " ".repeat(text.length));

  useEffect(() => {
    const chars = Array.from(text);
    const revealableIndices = chars.map((_, i) => i).filter((i) => chars[i] !== " ");
    const order = shuffledIndices(revealableIndices.length).map((k) => revealableIndices[k]);
    const revealTime = new Map<number, number>();
    order.forEach((charIndex, orderPos) => {
      revealTime.set(
        charIndex,
        order.length > 1 ? (orderPos / (order.length - 1)) * durationMs : 0,
      );
    });

    setDisplay(" ".repeat(chars.length));
    const start = performance.now();

    const interval = setInterval(() => {
      const elapsed = performance.now() - start;
      const next = chars
        .map((ch, i) => (ch === " " ? " " : elapsed >= (revealTime.get(i) ?? 0) ? ch : " "))
        .join("");
      setDisplay(next);
      if (elapsed >= durationMs) clearInterval(interval);
    }, TICK_MS);

    return () => clearInterval(interval);
  }, [text, durationMs]);

  return <span className={className}>{display}</span>;
}
