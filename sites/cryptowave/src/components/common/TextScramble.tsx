import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

interface TextScrambleProps {
  text?: string;
  lines?: string[];
  className?: string;
  duration?: number;
  speed?: number;
  delay?: number;
  whileInView?: boolean;
  as?: React.ElementType;
}

export function TextScramble({
  text,
  lines,
  className,
  duration = 1.2,
  speed = 30,
  delay = 0.1,
  whileInView = true,
  as: Tag = "span",
}: TextScrambleProps) {
  const ref = useRef<HTMLHeadingElement | HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const fullText = lines ? lines.join("\n") : (text ?? "");
  const [displayedText, setDisplayedText] = useState(fullText);

  useEffect(() => {
    if (whileInView && !isInView) return;

    let timerId: ReturnType<typeof setInterval> | undefined;
    let frame = 0;
    const totalFrames = Math.max(1, Math.floor((duration * 1000) / speed));
    const delayMs = delay * 1000;

    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const revealedCount = Math.floor(progress * fullText.length);

        const current = fullText
          .split("")
          .map((char, index) => {
            if (char === " " || char === "\n") return char;
            if (index < revealedCount) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");

        setDisplayedText(current);

        if (frame >= totalFrames) {
          setDisplayedText(fullText);
          clearInterval(interval);
        }
      }, speed);

      timerId = interval;
    }, delayMs);

    return () => {
      clearTimeout(startTimeout);
      if (timerId) clearInterval(timerId);
    };
  }, [isInView, fullText, duration, speed, delay, whileInView]);

  if (lines) {
    const currentLines = displayedText.split("\n");
    return (
      <Tag ref={ref} className={className}>
        {currentLines.map((line, idx) => (
          <span key={idx} style={{ display: "block" }}>
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} className={className}>
      {displayedText}
    </Tag>
  );
}
