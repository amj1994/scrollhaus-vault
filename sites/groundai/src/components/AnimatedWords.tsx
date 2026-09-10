import { motion } from "framer-motion";

export function AnimatedWords({
  text,
  baseDelay = 0,
  step = 0.045,
  duration = 0.5,
  y = 10,
  className,
  wordClassName = "inline-block mr-[0.25em]",
  useInView = false,
}: {
  text: string;
  baseDelay?: number;
  step?: number;
  duration?: number;
  y?: number;
  className?: string;
  wordClassName?: string;
  useInView?: boolean;
}) {
  const words = text.split(" ");
  const common = words.map((w, i) => {
    const props = useInView
      ? {
          initial: { opacity: 0, y },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.4 },
        }
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
        };
    return (
      <motion.span
        key={i}
        className={wordClassName}
        {...props}
        transition={{ delay: baseDelay + i * step, duration, ease: "easeOut" }}
      >
        {w}
      </motion.span>
    );
  });

  return <span className={className}>{common}</span>;
}
