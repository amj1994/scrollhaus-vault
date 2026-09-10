import { useRef, useEffect, useState } from 'react';
import { Rocket, Eye, RefreshCw, type LucideIcon } from 'lucide-react';

interface PostLaunchItem {
  icon: LucideIcon;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
}

const items: PostLaunchItem[] = [
  {
    icon: Eye,
    title: 'Real-time monitoring',
    description: 'Sentry watches every conversation. Drift, failures and anomalies get flagged within seconds.',
    metric: '< 5s',
    metricLabel: 'detection time',
  },
  {
    icon: RefreshCw,
    title: 'Auto-rollback',
    description: 'If a new version degrades performance, Sentry reverts to the last known-good config automatically.',
    metric: '100%',
    metricLabel: 'auto-recovery',
  },
  {
    icon: Rocket,
    title: 'Continuous shipping',
    description: 'Approve Muse\'s suggestions and they go live instantly. No redeploys, no downtime.',
    metric: '0',
    metricLabel: 'downtime deploys',
  },
];

export function PostLaunchSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { setVisible(true); observer.unobserve(e.target); }
      }),
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-24 lg:py-32 section-padding border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-5">
            <Rocket className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span className="text-xs font-medium text-[var(--text-secondary)]">Post-launch</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Launch is just the beginning.
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] text-lg">
            Your agents keep getting better after they go live. Sentry watches,
            Muse optimizes, and you stay in control.
          </p>
        </div>

        <div ref={ref} className="grid md:grid-cols-3 gap-5">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-subtle)] hover:border-[var(--border-default)] transition-all duration-700 group"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(24px)',
                  transitionDelay: `${i * 120}ms`,
                }}
              >
                <div className="agent-orb w-12 h-12 rounded-xl mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-[var(--accent)] relative z-10" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  {item.description}
                </p>
                <div className="flex items-baseline gap-2 pt-4 border-t border-[var(--border-subtle)]">
                  <span className="font-mono text-2xl font-bold text-[var(--accent)]">{item.metric}</span>
                  <span className="text-xs text-[var(--text-tertiary)]">{item.metricLabel}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
