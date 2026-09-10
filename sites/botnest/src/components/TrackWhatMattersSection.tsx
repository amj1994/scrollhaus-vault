import { useRef, useEffect, useState } from 'react';
import { Gauge, Activity, Users, Clock, TrendingUp, type LucideIcon } from 'lucide-react';

interface TrackingMetric {
  icon: LucideIcon;
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
}

const metrics: TrackingMetric[] = [
  { icon: Activity, label: 'Active conversations', value: '1,247', trend: '+12%', trendUp: true },
  { icon: Gauge, label: 'Avg response time', value: '180ms', trend: '-8%', trendUp: true },
  { icon: Users, label: 'Unique users today', value: '8,932', trend: '+24%', trendUp: true },
  { icon: Clock, label: 'Avg session length', value: '3m 42s', trend: '+5%', trendUp: true },
  { icon: TrendingUp, label: 'Resolution rate', value: '94.2%', trend: '+3.1%', trendUp: true },
  { icon: Gauge, label: 'Agent uptime', value: '99.98%', trend: 'stable', trendUp: true },
];

export function TrackWhatMattersSection() {
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
    <section className="relative py-24 lg:py-32 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-5">
              <Gauge className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span className="text-xs font-medium text-[var(--text-secondary)]">Analytics</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance mb-4">
              Track what matters, not just what's easy to count.
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
              Pulse gives you a real-time view of how your agents are
              performing — not vanity metrics, but the numbers that actually
              tell you if your AI is helping people.
            </p>
          </div>

          {/* Dashboard mockup */}
          <div
            ref={ref}
            className="glass rounded-2xl p-6 transition-all duration-1000"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'scale(1)' : 'scale(0.95)',
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse-glow" />
                <span className="text-xs text-[var(--text-tertiary)] font-mono">pulse/dashboard</span>
              </div>
              <span className="text-xs text-[var(--text-secondary)]">Live</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {metrics.map((m, i) => {
                const Icon = m.icon;
                return (
                  <div
                    key={i}
                    className="bg-[var(--bg-card)] rounded-xl p-4 border border-[var(--border-subtle)] transition-all duration-500"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateY(0)' : 'translateY(12px)',
                      transitionDelay: `${i * 80 + 300}ms`,
                    }}
                  >
                    <Icon className="w-4 h-4 text-[var(--accent)] mb-2" />
                    <p className="text-xs text-[var(--text-tertiary)] mb-1">{m.label}</p>
                    <p className="font-mono text-lg font-semibold">{m.value}</p>
                    <p className={`text-xs font-mono mt-1 ${m.trendUp ? 'text-[var(--accent)]' : 'text-[var(--warm)]'}`}>
                      {m.trend}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
