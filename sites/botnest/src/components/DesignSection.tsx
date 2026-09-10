import { useRef, useEffect, useState } from 'react';
import { PenTool, Workflow, Palette, type LucideIcon } from 'lucide-react';

interface DesignStep {
  icon: LucideIcon;
  title: string;
  description: string;
}

const steps: DesignStep[] = [
  {
    icon: PenTool,
    title: 'Sketch the conversation',
    description: 'Atlas turns your intent map into a full conversation design — branches, fallbacks and all.',
  },
  {
    icon: Palette,
    title: 'Define the personality',
    description: 'Set tone, vocabulary and emotional range. Your agent stays on-brand across every interaction.',
  },
  {
    icon: Workflow,
    title: 'Wire the flows',
    description: 'Connect triggers to actions. Atlas generates the logic, you approve the paths.',
  },
];

export function DesignSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { setVisible(true); observer.unobserve(e.target); }
      }),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-24 lg:py-32 section-padding overflow-hidden">
      <div className="absolute right-0 top-1/4 w-[400px] h-[400px] rounded-full bg-[var(--accent-dim)] blur-[120px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-5">
              <PenTool className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span className="text-xs font-medium text-[var(--text-secondary)]">Design phase</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance mb-4">
              Design agents that sound like you, not like a bot.
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
              Atlas takes your rough ideas and turns them into complete
              conversation architectures. Personality, tone, branching logic —
              all generated and ready for your review.
            </p>

            <div className="space-y-6">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div
                    key={i}
                    className="flex gap-4 transition-all duration-700"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateX(0)' : 'translateX(-20px)',
                      transitionDelay: `${i * 120}ms`,
                    }}
                  >
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[var(--accent)]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">{step.title}</h4>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Visual: conversation flow diagram */}
          <div
            className="relative transition-all duration-1000"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'scale(1)' : 'scale(0.95)',
            }}
          >
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-[var(--accent)]" />
                <span className="text-xs text-[var(--text-tertiary)] font-mono">atlas/flow_diagram</span>
              </div>

              <div className="space-y-3">
                {/* Root node */}
                <div className="flex justify-center">
                  <div className="px-4 py-2 rounded-lg bg-[var(--accent-dim)] border border-[var(--accent)] text-sm font-medium">
                    User greeting
                  </div>
                </div>

                {/* Branch lines */}
                <div className="flex justify-center gap-8 text-[var(--text-tertiary)] text-xs">
                  <span>↓</span>
                  <span>↓</span>
                  <span>↓</span>
                </div>

                {/* Three branches */}
                <div className="grid grid-cols-3 gap-2">
                  {['Support', 'Sales', 'Info'].map((branch, i) => (
                    <div key={i} className="bg-[var(--bg-card)] rounded-lg p-3 border border-[var(--border-subtle)] text-center">
                      <p className="text-xs font-medium mb-2">{branch}</p>
                      <div className="space-y-1.5">
                        <div className="h-1.5 rounded-full bg-[var(--bg-elevated)]">
                          <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: '70%' }} />
                        </div>
                        <div className="h-1.5 rounded-full bg-[var(--bg-elevated)]">
                          <div className="h-full rounded-full bg-[var(--warm)]" style={{ width: '45%' }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Fallback */}
                <div className="flex justify-center pt-2">
                  <div className="px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-tertiary)]">
                    Fallback → Human handoff
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
