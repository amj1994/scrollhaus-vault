import { useRef, useEffect, useState } from 'react';
import { Sparkles, ArrowUpRight, type LucideIcon } from 'lucide-react';

interface Optimization {
  icon: LucideIcon;
  title: string;
  before: string;
  after: string;
  impact: string;
}

const optimizations: Optimization[] = [
  {
    icon: Sparkles,
    title: 'Simplify greeting flow',
    before: '4 turns to reach intent',
    after: '1 turn to reach intent',
    impact: '+12% completion',
  },
  {
    icon: Sparkles,
    title: 'Adjust tone for escalations',
    before: 'Generic empathy phrases',
    after: 'Context-aware responses',
    impact: '+8% CSAT',
  },
  {
    icon: Sparkles,
    title: 'Add proactive handoff',
    before: 'User asks for human',
    after: 'Auto-detect frustration',
    impact: '-23% churn',
  },
];

export function OptimizeSection() {
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
      <div className="absolute top-0 right-1/4 w-[350px] h-[350px] rounded-full bg-[var(--accent-dim)] blur-[120px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-5">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span className="text-xs font-medium text-[var(--text-secondary)]">Optimization</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance mb-4">
              Muse doesn't just find problems — it proposes fixes.
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
              Every conversation is an opportunity. Muse analyzes patterns
              across all interactions, identifies where things break down and
              suggests specific changes you can approve with one click.
            </p>

            <div className="space-y-4">
              {optimizations.map((opt, i) => {
                const Icon = opt.icon;
                return (
                  <div
                    key={i}
                    className="bg-[var(--bg-card)] rounded-xl p-5 border border-[var(--border-subtle)] transition-all duration-700"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateY(0)' : 'translateY(20px)',
                      transitionDelay: `${i * 120}ms`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[var(--bg-elevated)] flex items-center justify-center">
                          <Icon className="w-4 h-4 text-[var(--accent)]" />
                        </div>
                        <h4 className="font-semibold text-sm">{opt.title}</h4>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-md bg-[var(--accent-dim)] text-[var(--accent)] font-mono font-semibold">
                        {opt.impact}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-[var(--text-tertiary)] line-through">{opt.before}</span>
                      <ArrowUpRight className="w-3 h-3 text-[var(--accent)]" />
                      <span className="text-[var(--text-secondary)] font-medium">{opt.after}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Visual: optimization dashboard */}
          <div
            className="glass rounded-2xl p-6 transition-all duration-1000"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'scale(1)' : 'scale(0.95)',
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse-glow" />
                <span className="text-xs text-[var(--text-tertiary)] font-mono">muse/suggestions</span>
              </div>
              <span className="text-xs text-[var(--accent)] font-mono">3 new</span>
            </div>

            {/* Trend chart */}
            <div className="bg-[var(--bg-card)] rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-[var(--text-tertiary)]">Performance trend (30 days)</p>
                <span className="text-xs font-mono text-[var(--accent)]">+18.2%</span>
              </div>
              <div className="relative h-32">
                <svg className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="optGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,90 L25,85 L50,78 L75,72 L100,68 L125,55 L150,50 L175,42 L200,38 L225,30 L250,25 L275,20 L300,15 L300,120 L0,120 Z"
                    fill="url(#optGrad)"
                    style={{ opacity: visible ? 1 : 0, transition: 'opacity 1s ease 0.5s' }}
                  />
                  <path
                    d="M0,90 L25,85 L50,78 L75,72 L100,68 L125,55 L150,50 L175,42 L200,38 L225,30 L250,25 L275,20 L300,15"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      strokeDasharray: 600,
                      strokeDashoffset: visible ? 0 : 600,
                      transition: 'stroke-dashoffset 1.5s ease 0.3s',
                    }}
                  />
                </svg>
              </div>
            </div>

            {/* Approval buttons */}
            <div className="flex gap-3">
              <button className="flex-1 bg-[var(--accent)] text-[var(--bg-primary)] py-2.5 rounded-lg text-sm font-medium hover:bg-[var(--accent-hover)] transition-colors">
                Approve all
              </button>
              <button className="flex-1 glass text-[var(--text-secondary)] py-2.5 rounded-lg text-sm font-medium hover:text-[var(--text-primary)] transition-colors">
                Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
