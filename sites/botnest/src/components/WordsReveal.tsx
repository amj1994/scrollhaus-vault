import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface WordsRevealProps {
  text: string;
  className?: string;
  highlightClassName?: string;
  highlightWords?: string[];
  delay?: number;
}

export function WordsReveal({
  text,
  className,
  highlightClassName = 'gradient-text',
  highlightWords = [],
  delay = 0,
}: WordsRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(' ');

  return (
    <span ref={ref} className={cn('inline', className)}>
      {words.map((word, i) => {
        const isHighlight = highlightWords.some((hw) =>
          word.toLowerCase().includes(hw.toLowerCase())
        );
        return (
          <span
            key={i}
            className={cn(
              'inline-block transition-all duration-700',
              isHighlight && highlightClassName,
              visible
                ? 'opacity-100 translate-y-0 blur-0'
                : 'opacity-0 translate-y-4 blur-sm'
            )}
            style={{
              transitionDelay: `${delay + i * 40}ms`,
            }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </span>
        );
      })}
    </span>
  );
}
