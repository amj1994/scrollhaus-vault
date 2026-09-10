import './AgentCards.css';
import { Brain, FlaskConical, Eye, Sparkles, GitBranch, Gauge, type LucideIcon } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

interface Agent {
  icon: LucideIcon;
  name: string;
  role: string;
  description: string;
  metrics: { label: string; value: number }[];
  color: string;
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
    color: '#c4f542',
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
    color: '#ff8c42',
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
    color: '#c4f542',
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
    color: '#ff8c42',
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
    color: '#c4f542',
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
    color: '#ff8c42',
  },
];

function AgentCard({ agent, index }: { agent: Agent; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Icon = agent.icon;

  return (
    <div
      ref={ref}
      className="agent-card group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'all 0.6s cubic-bezier(0.4,0,0.2,1)',
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <div className="agent-card-inner relative bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-subtle)] hover:border-[var(--border-default)] transition-colors h-full">
        <div className="agent-card-glow rounded-2xl" />

        <div className="flex items-center justify-between mb-5">
          <div className="relative">
            <div className="agent-orb">
              <Icon className="w-5 h-5 text-[var(--accent)] relative z-10" strokeWidth={2} />
              <div className="agent-pulse-ring" />
            </div>
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
                <div
                  className="agent-metric-bar-fill"
                  style={{ width: visible ? `${m.value}%` : '0%' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AgentCards() {
  return (
    <section id="agents" className="relative py-24 lg:py-32 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-5">
            <Brain className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span className="text-xs font-medium text-[var(--text-secondary)]">Meet the team</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Six specialized agents. One unified workflow.
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] text-lg">
            Each agent owns a piece of the lifecycle — from design to
            deployment to ongoing optimization.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {agents.map((agent, i) => (
            <AgentCard key={agent.name} agent={agent} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
