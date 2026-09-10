import { useRef, useEffect, useState } from 'react';
import { Layers, type LucideIcon } from 'lucide-react';

interface ShowcaseItem {
  icon: LucideIcon;
  title: string;
  description: string;
  badge: string;
}

const items: ShowcaseItem[] = [
  {
    icon: Layers,
    title: 'Shared agent canvas',
    description: 'See all six agents on one canvas. Drag, connect and rewire workflows visually.',
    badge: 'Visual',
  },
  {
    icon: Layers,
    title: 'Version-controlled prompts',
    description: 'Every prompt change is tracked, diffed and rollback-able. Treat your AI logic like code.',
    badge: 'Git-style',
  },
  {
    icon: Layers,
    title: 'Live A/B testing',
    description: 'Run two conversation variants side by side. Muse picks the winner based on real outcomes.',
    badge: 'Experiment',
  },
];

export function FeatureShowcaseSection() {
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
    <section className="relative py-24 lg:py-32 section-padding border-t border-[var(--border-subtle)]">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="mb-12 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-5">
            <Layers className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span className="text-xs font-medium text-[var(--text-secondary)]">Platform features</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Everything you need to run AI agents like a product team.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="group bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-subtle)] hover:border-[var(--border-default)] transition-all duration-700"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(24px)',
                  transitionDelay: `${i * 120}ms`,
                }}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="agent-orb w-10 h-10 rounded-lg group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4 text-[var(--accent)] relative z-10" />
                  </div>
                  <span className="text-xs px-2 py-1 rounded-md bg-[var(--accent-dim)] text-[var(--accent)] font-mono">
                    {item.badge}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
