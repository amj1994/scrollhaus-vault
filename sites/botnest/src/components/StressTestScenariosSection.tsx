import { useRef, useEffect, useState } from 'react';
import { Zap, TrendingUp, AlertTriangle, Globe } from 'lucide-react';

interface Scenario {
  icon: typeof Zap;
  title: string;
  metric: string;
  metricLabel: string;
  description: string;
  bars: number[];
}

const scenarios: Scenario[] = [
  {
    icon: Zap,
    title: 'Traffic spike',
    metric: '10,000',
    metricLabel: 'concurrent chats',
    description: 'Simulated Black Friday surge. Agents maintained sub-200ms response times throughout.',
    bars: [30, 35, 40, 85, 95, 90, 88, 92, 75, 60, 45, 40],
  },
  {
    icon: AlertTriangle,
    title: 'API outage',
    metric: '0',
    metricLabel: 'dropped conversations',
    description: 'Backend goes down for 3 minutes. Sentry detects, reroutes and recovers without user impact.',
    bars: [60, 62, 65, 10, 5, 0, 0, 55, 60, 63, 61, 60],
  },
  {
    icon: Globe,
    title: 'Multi-language',
    metric: '24',
    metricLabel: 'languages tested',
    description: 'Mixed-language inputs, code-switching and regional variations all handled correctly.',
    bars: [50, 55, 48, 70, 65, 72, 68, 80, 75, 78, 82, 85],
  },
  {
    icon: TrendingUp,
    title: 'Long conversation',
    metric: '47',
    metricLabel: 'turns, no degradation',
    description: 'Extended multi-turn dialogues stay coherent and on-personality across the entire session.',
    bars: [40, 45, 50, 55, 52, 58, 60, 62, 65, 68, 70, 72],
  },
];

export function StressTestScenariosSection() {
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
    <section className="relative py-24 lg:py-32 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-5">
            <Zap className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span className="text-xs font-medium text-[var(--text-secondary)]">Stress tests</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            What happens when things go wrong?
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] text-lg">
            Echo simulates the worst-case scenarios so your agents are ready
            before they happen.
          </p>
        </div>

        <div ref={ref} className="grid sm:grid-cols-2 gap-5">
          {scenarios.map((scenario, i) => {
            const Icon = scenario.icon;
            return (
              <div
                key={i}
                className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-subtle)] hover:border-[var(--border-default)] transition-all duration-700"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(24px)',
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="agent-orb w-10 h-10 rounded-lg">
                      <Icon className="w-4 h-4 text-[var(--accent)] relative z-10" />
                    </div>
                    <h4 className="font-semibold text-sm">{scenario.title}</h4>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-lg font-bold text-[var(--accent)]">{scenario.metric}</p>
                    <p className="text-xs text-[var(--text-tertiary)]">{scenario.metricLabel}</p>
                  </div>
                </div>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  {scenario.description}
                </p>

                {/* Mini bar chart */}
                <div className="flex items-end gap-1 h-12">
                  {scenario.bars.map((bar, j) => (
                    <div
                      key={j}
                      className="flex-1 rounded-t bg-gradient-to-t from-[var(--accent-dim)] to-[var(--accent)] transition-all duration-500"
                      style={{
                        height: visible ? `${bar}%` : '0%',
                        transitionDelay: `${i * 100 + j * 30 + 300}ms`,
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
