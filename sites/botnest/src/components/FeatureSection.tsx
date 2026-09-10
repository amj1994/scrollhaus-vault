import { useRef, useEffect, useState } from 'react';
import { Layers, Globe, Lock, Cpu, type LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Layers,
    title: 'Multi-agent orchestration',
    description: 'Coordinate multiple AI agents on a shared canvas. Each one handles a domain — design, testing, monitoring — while a central brain keeps them in sync.',
  },
  {
    icon: Globe,
    title: 'Real-time simulation',
    description: 'Before you ship, run your agents through thousands of realistic conversations. Catch edge cases, tone issues and dead ends before your users do.',
  },
  {
    icon: Lock,
    title: 'Enterprise-grade security',
    description: 'SOC 2 Type II, end-to-end encryption and granular access controls. Your conversation data never trains shared models.',
  },
  {
    icon: Cpu,
    title: 'Continuous optimization',
    description: 'Agents don\'t just run — they learn. Muse analyzes every interaction and proposes improvements you can approve with one click.',
  },
];

function FeatureRow({ feature, index }: { feature: Feature; index: number }) {
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

  const Icon = feature.icon;

  return (
    <div
      ref={ref}
      className="grid md:grid-cols-[auto_1fr_2fr] gap-4 md:gap-8 py-8 border-t border-[var(--border-subtle)] items-start transition-all duration-700 group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div className="agent-orb w-12 h-12 rounded-xl group-hover:scale-110 transition-transform">
        <Icon className="w-5 h-5 text-[var(--accent)] relative z-10" strokeWidth={2} />
      </div>
      <h3 className="font-display text-xl font-semibold pt-2">{feature.title}</h3>
      <p className="text-[var(--text-secondary)] leading-relaxed pt-2">{feature.description}</p>
    </div>
  );
}

export function FeatureSection() {
  return (
    <section id="features" className="relative py-24 lg:py-32 section-padding">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-5">
            <Layers className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span className="text-xs font-medium text-[var(--text-secondary)]">Platform</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Built for teams who ship AI experiences, not demos.
          </h2>
        </div>

        <div className="border-b border-[var(--border-subtle)]">
          {features.map((f, i) => (
            <FeatureRow key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
