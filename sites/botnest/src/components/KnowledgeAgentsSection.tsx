import { useRef, useEffect, useState } from 'react';
import { BookOpen, FileText, Link2, Lightbulb, type LucideIcon } from 'lucide-react';

interface KnowledgeSource {
  icon: LucideIcon;
  title: string;
  description: string;
  count: string;
}

const sources: KnowledgeSource[] = [
  {
    icon: FileText,
    title: 'Documents',
    description: 'PDFs, help articles, internal wikis and policy docs. Forge ingests and indexes them all.',
    count: '2,400+ files',
  },
  {
    icon: Link2,
    title: 'Live data sources',
    description: 'Connect real-time databases and APIs so agents answer with current, not cached, information.',
    count: '12 connections',
  },
  {
    icon: Lightbulb,
    title: 'Team knowledge',
    description: 'Capture institutional knowledge from your team. Agents learn from how your best reps handle things.',
    count: '180 patterns',
  },
];

export function KnowledgeAgentsSection() {
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
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-5">
              <BookOpen className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span className="text-xs font-medium text-[var(--text-secondary)]">Knowledge layer</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance mb-4">
              Your agents know what your team knows.
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
              BotNest connects your agents to the knowledge they need —
              documents, live data, and the patterns your best people already
              use. No hallucinations, no stale answers.
            </p>
          </div>

          <div ref={ref} className="space-y-4">
            {sources.map((source, i) => {
              const Icon = source.icon;
              return (
                <div
                  key={i}
                  className="group bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-subtle)] hover:border-[var(--border-default)] transition-all duration-700"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: `${i * 120}ms`,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-[var(--bg-elevated)] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-[var(--accent)]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-display text-lg font-semibold">{source.title}</h4>
                        <span className="text-xs px-2 py-1 rounded-md bg-[var(--accent-dim)] text-[var(--accent)] font-mono">
                          {source.count}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {source.description}
                      </p>
                    </div>
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
