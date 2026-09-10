export interface StepLineOffsets {
  long: { leftPx: number; translateYPx: number };
  short: { widthPx: number; translateYPx: number };
}

export interface StepHud {
  percent: string;
  timestamp: string;
  center: { line1: string; label1?: string; line2?: string; label2?: string };
}

export interface Step {
  step: number;
  title: string;
  description: string;
  lines: StepLineOffsets;
  hud?: StepHud;
}

export const STEPS: Step[] = [
  {
    step: 1,
    title: "Perceive",
    description:
      "Built-in cameras scan your surroundings in real time — detecting text, faces, objects, and locations.",
    lines: {
      long: { leftPx: 400, translateYPx: 10 },
      short: { widthPx: 100, translateYPx: 15 },
    },
  },
  {
    step: 2,
    title: "Process",
    description:
      "An onboard neural network processes what you see locally or via cloud — fast, private, and adaptive.",
    lines: {
      long: { leftPx: 390, translateYPx: 140 },
      short: { widthPx: 130, translateYPx: 100 },
    },
    hud: {
      percent: "86%",
      timestamp: "14:36 / Mon, Aug 5",
      center: { line1: "Translating…" },
    },
  },
  {
    step: 3,
    title: "Respond",
    description:
      "Results appear as subtle AR overlays or are delivered through audio. No phone, no hands — just glance and go.",
    lines: {
      long: { leftPx: 150, translateYPx: 60 },
      short: { widthPx: 180, translateYPx: 60 },
    },
    hud: {
      percent: "86%",
      timestamp: "14:36 / Mon, Aug 5",
      center: {
        line1: "駅はどこですか",
        label1: "CN",
        line2: "Where is the station?",
        label2: "EN",
      },
    },
  },
];
