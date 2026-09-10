import { useRef, useEffect, useState } from 'react';
import { TrendingUp, Clock, Users, Zap } from 'lucide-react';

interface Story {
  company: string;
  industry: string;
  quote: string;
  metrics: { icon: typeof TrendingUp; label: string; value: string }[];
  logo: string;
}

const stories: Story[] = [
  {
    company: 'Nimbus Health',
    industry: 'Healthtech',
    quote: 'BotNest cut our bot deployment from six weeks to four days. Echo caught 40+ edge cases our QA team never considered.',
    metrics: [
      { icon: TrendingUp, label: 'Resolution rate', value: '+34%' },
      { icon: Clock, label: 'Time to launch', value: '4 days' },
    ],
    logo: 'NH',
  },
  {
    company: 'Cartwheel',
    industry: 'E-commerce',
    quote: 'We went from a brittle FAQ bot to a full conversational experience. Sentry flags drift before our customers even notice.',
    metrics: [
      { icon: Users, label: 'CSAT score', value: '4.7/5' },
      { icon: Zap, label: 'Auto-fixes', value: '120/wk' },
    ],
    logo: 'CW',
  },
  {
    company: 'Voltline',
    industry: 'Fintech',
    quote: 'The agents don\'t just monitor — they propose changes. Muse suggested a flow tweak that lifted completed transactions by 18%.',
    metrics: [
      { icon: TrendingUp, label: 'Conversion', value: '+18%' },
      { icon: Clock, label: 'Manual review', value: '-60%' },
    ],
    logo: 'VL',
  },
];

function StoryCard({ story, index }: { story: Story; index: number }) {
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
    <div
      ref={ref}
      className="bg-[var(--bg-card)] rounded-2xl p-8 border border-[var(--border-subtle)] hover:border-[var(--border-default)] transition-all duration-700 h-full"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transitionDelay: `${index * 120}ms`,
      }}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-[var(--accent-dim)] flex items-center justify-center font-display font-bold text-[var(--accent)] text-sm">
          {story.logo}
        </div>
        <div>
          <h4 className="font-semibold text-sm">{story.company}</h4>
          <p className="text-xs text-[var(--text-tertiary)]">{story.industry}</p>
        </div>
      </div>

      <blockquote className="text-[var(--text-secondary)] leading-relaxed text-sm mb-6">
        "{story.quote}"
      </blockquote>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--border-subtle)]">
        {story.metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[var(--bg-elevated)] flex items-center justify-center">
                <Icon className="w-4 h-4 text-[var(--accent)]" />
              </div>
              <div>
                <p className="text-xs text-[var(--text-tertiary)]">{m.label}</p>
                <p className="text-sm font-mono font-semibold">{m.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ClientStories() {
  return (
    <section id="stories" className="relative py-24 lg:py-32 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-5">
            <TrendingUp className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span className="text-xs font-medium text-[var(--text-secondary)]">Client stories</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Teams shipping faster, with fewer surprises.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((s, i) => (
            <StoryCard key={s.company} story={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
