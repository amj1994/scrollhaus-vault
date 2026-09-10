import { useRef, useEffect, useState } from 'react';
import { GitBranch, Database, Cloud, Slack, MessageSquare, Webhook, type LucideIcon } from 'lucide-react';

interface Integration {
  icon: LucideIcon;
  name: string;
  category: string;
}

const integrations: Integration[] = [
  { icon: Slack, name: 'Slack', category: 'Comms' },
  { icon: MessageSquare, name: 'Salesforce', category: 'CRM' },
  { icon: Database, name: 'Postgres', category: 'Database' },
  { icon: Cloud, name: 'AWS', category: 'Cloud' },
  { icon: Webhook, name: 'Webhooks', category: 'API' },
  { icon: GitBranch, name: 'GitHub', category: 'DevOps' },
];

export function AgentsIntegrationSection() {
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
    <section className="relative py-24 lg:py-32 section-padding overflow-hidden">
      <div className="absolute left-0 bottom-0 w-[300px] h-[300px] rounded-full bg-[var(--warm-dim)] blur-[100px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Visual: integration hub */}
          <div
            className="relative transition-all duration-1000 order-2 lg:order-1"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'scale(1)' : 'scale(0.95)',
            }}
          >
            <div className="relative flex items-center justify-center min-h-[400px]">
              {/* Center hub */}
              <div className="relative z-10 w-24 h-24 rounded-2xl bg-[var(--accent)] flex items-center justify-center accent-glow">
                <GitBranch className="w-10 h-10 text-[var(--bg-primary)]" strokeWidth={2} />
              </div>

              {/* Orbiting integration cards */}
              {integrations.map((int, i) => {
                const angle = (i / integrations.length) * Math.PI * 2;
                const radius = 150;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const Icon = int.icon;

                return (
                  <div
                    key={i}
                    className="absolute glass rounded-xl p-3 w-20 flex flex-col items-center gap-1.5 transition-all duration-700"
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                      opacity: visible ? 1 : 0,
                      transitionDelay: `${i * 100 + 300}ms`,
                    }}
                  >
                    <Icon className="w-5 h-5 text-[var(--accent)]" />
                    <span className="text-xs font-medium">{int.name}</span>
                  </div>
                );
              })}

              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                {integrations.map((_, i) => {
                  const angle = (i / integrations.length) * Math.PI * 2;
                  const radius = 150;
                  const cx = 50;
                  const cy = 50;
                  const x = cx + Math.cos(angle) * (radius / 4);
                  const y = cy + Math.sin(angle) * (radius / 4);
                  return (
                    <line
                      key={i}
                      x1={cx + '%'}
                      y1={cy + '%'}
                      x2={x + '%'}
                      y2={y + '%'}
                      stroke="var(--border-default)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      opacity={visible ? 0.6 : 0}
                      style={{ transition: `opacity 0.8s ease ${i * 100 + 200}ms` }}
                    />
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-5">
              <GitBranch className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span className="text-xs font-medium text-[var(--text-secondary)]">Integrations</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance mb-4">
              Forge connects your agents to everything.
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6">
              CRMs, databases, messaging platforms, internal APIs — Forge wires
              your agents into your existing stack without custom code. Just
              authenticate, map your fields and go live.
            </p>

            <div className="flex flex-wrap gap-2">
              {integrations.map((int, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] transition-all"
                  style={{
                    opacity: visible ? 1 : 0,
                    transition: `opacity 0.6s ease ${i * 80 + 400}ms`,
                  }}
                >
                  {int.name}
                </span>
              ))}
              <span className="px-3 py-1.5 rounded-lg bg-[var(--accent-dim)] border border-[var(--accent)] text-xs text-[var(--accent)] font-mono">
                + 50 more
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
