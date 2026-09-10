import { useRef, useEffect, useState } from 'react';
import { Brain, FlaskConical, Eye, Sparkles, GitBranch, Gauge, ChevronLeft, ChevronRight, type LucideIcon } from 'lucide-react';

interface Agent {
  icon: LucideIcon;
  name: string;
  role: string;
  description: string;
  metrics: { label: string; value: number }[];
}

const agents: Agent[] = [
  {
    icon: Brain,
    name: 'Atlas',
    role: 'Design Agent',
    description: 'Generates conversation flows, maps intents and crafts the personality of every interaction.',
    metrics: [
      { label: 'Flows mapped', value: 94 },
      { label: 'Intent coverage', value: 88 },
    ],
  },
  {
    icon: FlaskConical,
    name: 'Echo',
    role: 'Testing Agent',
    description: 'Runs thousands of edge-case simulations before launch, catching what humans miss.',
    metrics: [
      { label: 'Edge cases', value: 97 },
      { label: 'Pass rate', value: 91 },
    ],
  },
  {
    icon: Eye,
    name: 'Sentry',
    role: 'Monitoring Agent',
    description: 'Watches every conversation in production, flagging drift and failures in real time.',
    metrics: [
      { label: 'Uptime', value: 99 },
      { label: 'Drift detect', value: 96 },
    ],
  },
  {
    icon: Sparkles,
    name: 'Muse',
    role: 'Optimization Agent',
    description: 'Analyzes patterns and suggests improvements to continuously lift performance.',
    metrics: [
      { label: 'Lift found', value: 85 },
      { label: 'Auto-tuning', value: 78 },
    ],
  },
  {
    icon: GitBranch,
    name: 'Forge',
    role: 'Integration Agent',
    description: 'Connects your agents to existing tools, APIs and knowledge bases seamlessly.',
    metrics: [
      { label: 'Integrations', value: 92 },
      { label: 'API coverage', value: 89 },
    ],
  },
  {
    icon: Gauge,
    name: 'Pulse',
    role: 'Analytics Agent',
    description: 'Turns raw conversation data into clear, actionable insights for your team.',
    metrics: [
      { label: 'Insights/day', value: 95 },
      { label: 'Accuracy', value: 93 },
    ],
  },
];

export function MobileAgentCardsSection() {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  const next = () => setIndex((p) => (p + 1) % agents.length);
  const prev = () => setIndex((p) => (p - 1 + agents.length) % agents.length);

  const agent = agents[index];
  const Icon = agent.icon;

  return (
    <section id="agents-mobile" className="relative py-16 section-padding md:hidden">
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl font-bold tracking-tight">
          Six agents. One workflow.
        </h2>
        <p className="mt-3 text-[var(--text-secondary)] text-sm">
          Swipe to meet each one
        </p>
      </div>

      <div
        className="relative"
        onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const diff = touchStart - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 40) {
            if (diff > 0) next();
            else prev();
          }
        }}
      >
        <div className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-subtle)]">
          <div className="flex items-center justify-between mb-5">
            <div className="agent-orb">
              <Icon className="w-5 h-5 text-[var(--accent)] relative z-10" />
            </div>
            <div className="flex items-center gap-2">
              <div className="agent-status-dot" />
              <span className="text-xs text-[var(--text-tertiary)] font-mono">online</span>
            </div>
          </div>

          <h3 className="font-display text-xl font-semibold mb-1">{agent.name}</h3>
          <p className="text-xs text-[var(--accent)] font-mono mb-3">{agent.role}</p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
            {agent.description}
          </p>

          <div className="space-y-3">
            {agent.metrics.map((m, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-xs text-[var(--text-tertiary)]">{m.label}</span>
                  <span className="text-xs font-mono text-[var(--text-secondary)]">{m.value}%</span>
                </div>
                <div className="agent-metric-bar">
                  <div className="agent-metric-bar-fill" style={{ width: `${m.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-lg glass flex items-center justify-center"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {agents.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className="w-2 h-2 rounded-full transition-all"
                style={{
                  background: i === index ? 'var(--accent)' : 'var(--border-strong)',
                  width: i === index ? '20px' : '8px',
                }}
                aria-label={`Go to agent ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-lg glass flex items-center justify-center"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
