import { Bot, Twitter, Linkedin, Github, ArrowRight } from 'lucide-react';

const footerLinks = {
  Product: ['Agents', 'Features', 'Playbook', 'Integrations', 'Pricing'],
  Company: ['About', 'Blog', 'Careers', 'Contact'],
  Resources: ['Documentation', 'API Reference', 'Guides', 'Status'],
  Legal: ['Privacy', 'Terms', 'Security', 'SOC 2'],
};

export function FooterSection() {
  return (
    <footer className="relative border-t border-[var(--border-subtle)] section-padding pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1.5fr_3fr] gap-12 mb-12">
          {/* Brand column */}
          <div>
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[var(--accent)] flex items-center justify-center">
                <Bot className="w-5 h-5 text-[var(--bg-primary)]" strokeWidth={2.5} />
              </div>
              <span className="font-display text-lg font-semibold tracking-tight">BotNest</span>
            </a>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs mb-6">
              The AI agent platform for teams who ship production-grade
              conversational experiences.
            </p>

            <div className="flex gap-3">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:border-[var(--border-strong)] transition-colors group"
                  aria-label="Social link"
                >
                  <Icon className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-4">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="glass rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          <div>
            <h4 className="font-display text-lg font-semibold mb-1">Stay in the loop</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              Product updates, agent tips and industry insights. Monthly, no fluff.
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder="you@company.com"
              className="flex-1 sm:w-64 px-4 py-2.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-default)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
            />
            <button className="inline-flex items-center gap-1.5 bg-[var(--accent)] text-[var(--bg-primary)] px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[var(--accent-hover)] transition-colors shrink-0">
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-tertiary)]">
            © 2026 BotNest, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse-glow" />
            <span className="text-xs text-[var(--text-tertiary)] font-mono">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
