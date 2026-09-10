import { useRef, useEffect, useState } from 'react';
import { ArrowRight, Calendar, Check } from 'lucide-react';

export function ScheduleDemoSection() {
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

  const benefits = [
    '30-minute personalized walkthrough',
    'See your use case on live agents',
    'Custom deployment roadmap',
    'No commitment, no pressure',
  ];

  return (
    <section id="schedule-demo" className="relative py-24 lg:py-32 section-padding overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--accent-dim)] blur-[150px] pointer-events-none" />

      <div ref={ref} className="max-w-3xl mx-auto relative">
        <div
            className="glass-strong rounded-3xl p-8 md:p-12 text-center transition-all duration-1000 accent-glow"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'scale(1)' : 'scale(0.95)',
            }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent-dim)] mb-6">
              <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span className="text-xs font-medium text-[var(--accent)]">Book a demo</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance mb-4">
              See BotNest run your conversations.
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8 max-w-xl mx-auto">
              Get a personalized demo where we set up agents for your actual use
              case — live, not a slide deck.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-8 max-w-lg mx-auto text-left">
              {benefits.map((b, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 transition-all duration-500"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: `${i * 80 + 400}ms`,
                  }}
                >
                  <div className="w-5 h-5 rounded-full bg-[var(--accent-dim)] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[var(--accent)]" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-[var(--text-secondary)]">{b}</span>
                </div>
              ))}
            </div>

            <a
              href="#"
              className="group inline-flex items-center justify-center gap-2 bg-[var(--accent)] text-[var(--bg-primary)] px-8 py-4 rounded-xl font-semibold text-base hover:bg-[var(--accent-hover)] transition-all hover:shadow-lg hover:shadow-[var(--accent-glow)]"
            >
              Schedule your demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <p className="mt-4 text-xs text-[var(--text-tertiary)]">
              Available slots this week · Responds within 2 hours
            </p>
          </div>
      </div>
    </section>
  );
}
