import { useRef, useEffect, useState } from 'react';
import { FlaskConical, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

interface PlaybookStep {
  phase: string;
  title: string;
  description: string;
  tests: string;
  status: 'pass' | 'warn' | 'fail';
}

const playbook: PlaybookStep[] = [
  {
    phase: '01',
    title: 'Baseline validation',
    description: 'Echo runs your core conversation paths against expected outcomes.',
    tests: '247 tests',
    status: 'pass',
  },
  {
    phase: '02',
    title: 'Edge case simulation',
    description: 'Thousands of unusual inputs, typos and mixed-language phrases.',
    tests: '1,840 tests',
    status: 'pass',
  },
  {
    phase: '03',
    title: 'Adversarial probing',
    description: 'Simulated prompt injection, jailbreaks and manipulation attempts.',
    tests: '312 tests',
    status: 'pass',
  },
  {
    phase: '04',
    title: 'Performance under load',
    description: 'Concurrent conversation spikes and API timeout recovery.',
    tests: '96 tests',
    status: 'warn',
  },
  {
    phase: '05',
    title: 'Accessibility audit',
    description: 'Screen reader compatibility, cognitive load and readability.',
    tests: '58 tests',
    status: 'pass',
  },
];

const statusIcons = {
  pass: CheckCircle2,
  warn: AlertTriangle,
  fail: XCircle,
};

const statusColors = {
  pass: 'var(--accent)',
  warn: 'var(--warm)',
  fail: '#ff5f57',
};

export function TestingPlaybookSection() {
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
    <section id="playbook" className="relative py-24 lg:py-32 section-padding">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-5">
            <FlaskConical className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span className="text-xs font-medium text-[var(--text-secondary)]">Testing playbook</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Echo doesn't just test — it stress-tests.
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] text-lg">
            Five phases of automated testing, from baseline validation to
            adversarial probing. Every release goes through all of them.
          </p>
        </div>

        <div ref={ref} className="space-y-3">
          {playbook.map((step, i) => {
            const Icon = statusIcons[step.status];
            return (
              <div
                key={i}
                className="flex items-start gap-4 bg-[var(--bg-card)] rounded-xl p-5 border border-[var(--border-subtle)] hover:border-[var(--border-default)] transition-all duration-700 group"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateX(0)' : 'translateX(-20px)',
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <span className="font-mono text-sm text-[var(--text-tertiary)] pt-1 w-8 shrink-0">
                  {step.phase}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-semibold text-sm">{step.title}</h4>
                    <span className="text-xs font-mono text-[var(--text-tertiary)] shrink-0">
                      {step.tests}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="shrink-0 pt-1">
                  <Icon
                    className="w-5 h-5"
                    style={{ color: statusColors[step.status] }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
