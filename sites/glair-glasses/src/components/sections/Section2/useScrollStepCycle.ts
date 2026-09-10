import { useMotionValueEvent, type MotionValue } from "framer-motion";
import { useState } from "react";
import { STEPS } from "./steps";

export type StepPhase = "drawing" | "holding" | "undrawing";

const DRAW_FRACTION = 600 / 3700;
const UNDRAW_FRACTION = 600 / 3700;

function computeStepState(progress: number, stepCount: number): { currentStep: number; phase: StepPhase } {
  const zoneWidth = 1 / stepCount;
  const clamped = Math.min(Math.max(progress, 0), 1 - 1e-9);
  const currentStep = Math.min(stepCount - 1, Math.floor(clamped / zoneWidth));
  const localProgress = (clamped - currentStep * zoneWidth) / zoneWidth;

  let phase: StepPhase;
  if (localProgress < DRAW_FRACTION) {
    phase = "drawing";
  } else if (localProgress < 1 - UNDRAW_FRACTION) {
    phase = "holding";
  } else {
    phase = "undrawing";
  }

  return { currentStep, phase };
}

export function useScrollStepCycle(scrollYProgress: MotionValue<number>) {
  const [state, setState] = useState(() => computeStepState(scrollYProgress.get(), STEPS.length));

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = computeStepState(latest, STEPS.length);
    setState((prev) =>
      prev.currentStep === next.currentStep && prev.phase === next.phase ? prev : next,
    );
  });

  return state;
}
