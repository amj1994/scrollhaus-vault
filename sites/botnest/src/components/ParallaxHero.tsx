import { useRef, useEffect, useState } from 'react';
import { ArrowRight, Play, Sparkles, Zap, Brain, Shield } from 'lucide-react';
import { WordsReveal } from './WordsReveal';

export function ParallaxHero() {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden grid-bg noise-overlay pt-16"
    >
      {/* Background gradient orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[var(--accent-dim)] blur-[120px] pointer-events-none"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[var(--warm-dim)] blur-[100px] pointer-events-none"
        style={{ transform: `translateY(${scrollY * -0.2}px)` }}
      />

      <div className="relative z-10 section-padding w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left column */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span className="text-xs font-medium text-[var(--text-secondary)]">
                AI agents that ship, test & scale
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight text-balance">
              <WordsReveal
                text="Deploy AI agents that actually work in production"
                highlightWords={['work', 'production']}
                className="block"
              />
            </h1>

            <p className="mt-6 text-lg text-[var(--text-secondary)] max-w-xl mx-auto lg:mx-0 leading-relaxed">
              BotNest gives you a full team of AI agents to design, test,
              optimize and monitor your customer experience — from first
              sketch to post-launch iteration.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="#schedule-demo"
                className="group inline-flex items-center justify-center gap-2 bg-[var(--accent)] text-[var(--bg-primary)] px-6 py-3.5 rounded-lg font-medium text-sm hover:bg-[var(--accent-hover)] transition-all hover:shadow-lg hover:shadow-[var(--accent-glow)]"
              >
                Book a demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#experience"
                className="group inline-flex items-center justify-center gap-2 glass text-[var(--text-primary)] px-6 py-3.5 rounded-lg font-medium text-sm hover:border-[var(--border-strong)] transition-all"
              >
                <Play className="w-4 h-4 text-[var(--accent)]" />
                See it in action
              </a>
            </div>

            <div className="mt-10 flex items-center gap-6 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[Brain, Zap, Shield].map((Icon, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full glass flex items-center justify-center border-2 border-[var(--bg-primary)]"
                  >
                    <Icon className="w-3.5 h-3.5 text-[var(--accent)]" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-[var(--text-tertiary)]">
                Trusted by 200+ product teams
              </p>
            </div>
          </div>

          {/* Right column - visual */}
          <div className="relative hidden lg:block">
            <div
              className="relative"
              style={{ transform: `translateY(${scrollY * 0.08}px)` }}
            >
              {/* Main visual card */}
              <div className="glass rounded-2xl p-6 accent-glow">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  <span className="ml-2 text-xs text-[var(--text-tertiary)] font-mono">
                    botnest · live
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    { icon: Brain, label: 'Design Agent', status: 'Active', value: '92%' },
                    { icon: Zap, label: 'Test Agent', status: 'Running', value: '87%' },
                    { icon: Shield, label: 'Monitor Agent', status: 'Watching', value: '99%' },
                  ].map((agent, i) => (
                    <div
                      key={i}
                      className="bg-[var(--bg-card)] rounded-xl p-4 border border-[var(--border-subtle)] hover:border-[var(--border-default)] transition-colors"
                      style={{
                        animation: `float 6s ease-in-out infinite`,
                        animationDelay: `${i * 0.5}s`,
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="agent-orb w-10 h-10 rounded-lg">
                            <agent.icon className="w-4 h-4 text-[var(--accent)] relative z-10" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{agent.label}</p>
                            <p className="text-xs text-[var(--text-tertiary)]">{agent.status}</p>
                          </div>
                        </div>
                        <span className="text-sm font-mono text-[var(--accent)]">{agent.value}</span>
                      </div>
                      <div className="agent-metric-bar">
                        <div
                          className="agent-metric-bar-fill"
                          style={{ width: agent.value }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating accent card */}
              <div
                className="absolute -bottom-6 -left-6 glass rounded-xl p-4 animate-float"
                style={{ animationDelay: '1s' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--accent)] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[var(--bg-primary)]" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-tertiary)]">Uptime</p>
                    <p className="text-sm font-mono font-semibold">99.98%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2">
        <span className="text-xs text-[var(--text-tertiary)]">Scroll to explore</span>
        <div className="w-5 h-9 rounded-full border border-[var(--border-strong)] flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-[var(--accent)] animate-pulse-glow" />
        </div>
      </div>
    </section>
  );
}
