import { motion } from "framer-motion";
import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface AnimatedSectionProps {
  id: string;
  className?: string;
  children: ReactNode;
}

export const AnimatedSection = forwardRef<HTMLElement, AnimatedSectionProps>(
  ({ id, className, children }, ref) => {
    return (
      <motion.section
        ref={ref}
        id={id}
        className={cn("relative w-full overflow-hidden", className)}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.section>
    );
  },
);
AnimatedSection.displayName = "AnimatedSection";
