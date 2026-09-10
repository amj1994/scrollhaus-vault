import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Token {
  word: string;
  bold: boolean;
}

interface AnimatedLinesProps {
  text?: string;
  lines?: string[];
  className?: string;
  boldClassName?: string;
  delay?: number;
}

function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  const regex = /\*\*(.+?)\*\*|(\S+)/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text))) {
    if (match[1] !== undefined) {
      match[1]
        .split(" ")
        .filter(Boolean)
        .forEach((word) => tokens.push({ word, bold: true }));
    } else if (match[2] !== undefined) {
      tokens.push({ word: match[2], bold: false });
    }
  }
  return tokens;
}

export function AnimatedLines({ text, lines: fixedLines, className, boldClassName = "font-semibold", delay = 0 }: AnimatedLinesProps) {
  const measureRef = useRef<HTMLDivElement>(null);
  const [measuredLines, setMeasuredLines] = useState<Token[][] | null>(null);
  const tokens = text ? tokenize(text) : [];

  useLayoutEffect(() => {
    if (fixedLines) return;
    setMeasuredLines(null);
  }, [text, fixedLines]);

  useLayoutEffect(() => {
    if (fixedLines || measuredLines !== null) return;
    const container = measureRef.current;
    if (!container) return;
    const spans = Array.from(container.querySelectorAll<HTMLSpanElement>("span[data-word]"));
    const groups: Token[][] = [];
    let currentTop: number | null = null;
    let currentTokens: Token[] = [];
    spans.forEach((span, i) => {
      const top = span.offsetTop;
      if (currentTop === null || top === currentTop) {
        currentTokens.push(tokens[i]);
      } else {
        groups.push(currentTokens);
        currentTokens = [tokens[i]];
      }
      currentTop = top;
    });
    if (currentTokens.length) groups.push(currentTokens);
    setMeasuredLines(groups);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [measuredLines, text, fixedLines]);

  const lines: Token[][] | null = fixedLines
    ? fixedLines.map((line) => [{ word: line, bold: false }])
    : measuredLines;

  if (!lines) {
    return (
      <div ref={measureRef} className={className} style={{ visibility: "hidden" }}>
        {tokens.map((token, i) => (
          <span key={i} data-word="" className={token.bold ? boldClassName : undefined}>
            {token.word}{" "}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      {lines.map((line, i) => (
        <div key={i} style={{ overflow: "hidden" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.5, delay: delay + i * 0.08, ease: "easeOut" }}
          >
            {line.map((token, j) => (
              <span key={j} className={token.bold ? boldClassName : undefined}>
                {token.word}
                {j < line.length - 1 ? " " : ""}
              </span>
            ))}
          </motion.span>
        </div>
      ))}
    </div>
  );
}
