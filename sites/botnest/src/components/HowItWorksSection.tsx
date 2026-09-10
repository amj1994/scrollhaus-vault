import { useRef, useEffect, useState } from 'react';
import { PenTool, FlaskConical, Rocket, Gauge, type LucideIcon } from 'lucide-react';

interface Step {
  icon: LucideIcon;
  phase: string;
  title: string;
  description: string;
  agent: string;
}

const steps: Step[] = [
  {
    icon: PenTool,
    phase: 'Step 01',
    title: 'Design your agent',
    description: 'Tell Atlas what you need. It generates conversation flows, personality and branching logic in minutes.',
    agent: 'Atlas',
  },
  {
    icon: FlaskConical,
    phase: 'Step 02',
    title: 'Test before you ship',
    description: 'Echo runs thousands of simulations. Edge cases, adversarial inputs, load spikes — all covered.',
    agent: 'Echo',
  },
  {
    icon: Rocket,
    phase: 'Step 03',
    title: 'Deploy with confidence',
    description: 'Go live with one click. Forge handles integrations, Sentry starts monitoring immediately.',
    agent: 'Forge + Sentry',
  },
  {
    icon: Gauge,
    phase: 'Step 04',
    title: 'Optimize continuously',
    description: 'Muse analyzes every conversation and suggests improvements. Pulse tracks the metrics that matter.',
    agent: 'Muse + Pulse',
  },
];

export function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { setVisible(true); observer.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="relative py-24 lg:py-32 section-padding border-t border-[var(--border-subtle)]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-5">
            <Gauge className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span className="text-xs font-medium text-[var(--text-secondary)]">How it works</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            From idea to production in four steps.
          </h2>
        </div>

        <div ref={ref} className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-[var(--border-subtle)] hidden md:block" />

          <div className="space-y-8 md:space-y-12">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  className="relative flex gap-6 transition-all duration-700"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(24px)',
                    transitionDelay: `${i * 150}ms`,
                  }}
                >
                  {/* Node */}
                  <div className="relative z-10 shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)] flex items-center justify-center md:w-12 md:h-12">
                      <Icon className="w-5 h-5 text-[var(--accent)]" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-2">
                    <span className="text-xs font-mono text-[var(--text-tertiary)]">{step.phase}</span>
                    <h3 className="font-display text-xl font-semibold mt-1 mb-2">{step.title}</h3>
                    <p className="text-[var(--text-secondary)] leading-relaxed mb-3 max-w-lg">
                      {step.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg bg-[var(--accent-dim)] text-[var(--accent)] font-mono">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                      {step.agent}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
