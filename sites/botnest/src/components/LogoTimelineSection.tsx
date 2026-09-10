import { useRef, useEffect, useState } from 'react';

const logos = ['Nimbus', 'Cartwheel', 'Voltline', 'Halcyon', 'Driftpoint', 'Mesa', 'Northwind', 'Kestrel'];

export function LogoTimelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { setVisible(true); observer.unobserve(e.target); }
      }),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-16 section-padding border-y border-[var(--border-subtle)] overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto">
        <p className="text-center text-xs uppercase tracking-widest text-[var(--text-tertiary)] mb-8">
          Powering conversational AI for
        </p>

        <div className="relative">
          <div className="flex overflow-hidden">
            <div className="flex animate-marquee gap-12 items-center shrink-0">
              {[...logos, ...logos].map((logo, i) => (
                <span
                  key={i}
                  className="font-display text-2xl font-semibold text-[var(--text-tertiary)] whitespace-nowrap transition-all hover:text-[var(--text-secondary)] cursor-default"
                  style={{
                    opacity: visible ? 1 : 0,
                    transition: 'opacity 0.8s ease',
                    transitionDelay: `${i * 50}ms`,
                  }}
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>

          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--bg-primary)] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--bg-primary)] to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
