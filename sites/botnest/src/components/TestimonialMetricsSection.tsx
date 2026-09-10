import { useRef, useEffect, useState } from 'react';
import { TrendingUp, Clock, Users, Zap, type LucideIcon } from 'lucide-react';

interface Metric {
  icon: LucideIcon;
  value: string;
  label: string;
  sublabel: string;
}

const metrics: Metric[] = [
  { icon: TrendingUp, value: '94%', label: 'Resolution rate', sublabel: 'across all deployed agents' },
  { icon: Clock, value: '4 days', label: 'Average time to launch', sublabel: 'from kickoff to production' },
  { icon: Users, value: '12M+', label: 'Conversations handled', sublabel: 'monthly across all clients' },
  { icon: Zap, value: '99.98%', label: 'Platform uptime', sublabel: 'monitored by Sentry agent' },
];

export function TestimonialMetricsSection() {
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
    <section className="relative py-24 lg:py-28 section-padding">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <div
                key={i}
                className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-subtle)] transition-all duration-700 hover:border-[var(--border-default)]"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <div className="agent-orb w-10 h-10 rounded-lg mb-4">
                  <Icon className="w-4 h-4 text-[var(--accent)] relative z-10" />
                </div>
                <p className="font-display text-3xl lg:text-4xl font-bold tracking-tight mb-1">
                  {m.value}
                </p>
                <p className="text-sm font-medium text-[var(--text-secondary)]">{m.label}</p>
                <p className="text-xs text-[var(--text-tertiary)] mt-1">{m.sublabel}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
