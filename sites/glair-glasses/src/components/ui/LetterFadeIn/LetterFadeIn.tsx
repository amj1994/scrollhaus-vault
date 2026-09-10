import { motion, type Variants } from "framer-motion";
import { useMemo } from "react";

interface LetterFadeInProps {
  text: string;
  className?: string;
  maxDelay?: number;
  startDelay?: number;
  duration?: number;
}

const letterVariants: Variants = {
  hidden: { opacity: 0 },
  visible: ({ delay, duration }: { delay: number; duration: number }) => ({
    opacity: 1,
    transition: { duration, delay, ease: "easeOut" },
  }),
};

export function LetterFadeIn({
  text,
  className,
  maxDelay = 1.2,
  startDelay = 0,
  duration = 0.8,
}: LetterFadeInProps) {
  const letters = useMemo(() => text.split(""), [text]);
  const delays = useMemo(
    () => letters.map(() => startDelay + Math.random() * maxDelay),
    [letters, maxDelay, startDelay],
  );

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
    >
      {letters.map((char, i) => (
        <motion.span key={i} custom={{ delay: delays[i], duration }} variants={letterVariants}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
