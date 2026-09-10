import { useEffect, useState } from 'react';
import { Bot, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Agents', href: '#agents' },
  { label: 'Features', href: '#features' },
  { label: 'Playbook', href: '#playbook' },
  { label: 'Stories', href: '#stories' },
  { label: 'How it works', href: '#how-it-works' },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'glass-strong border-b border-[var(--border-subtle)]'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="section-padding h-16 flex items-center justify-between md:h-18">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-[var(--accent)] flex items-center justify-center transition-transform group-hover:scale-110">
            <Bot className="w-5 h-5 text-[var(--bg-primary)]" strokeWidth={2.5} />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">
            BotNest
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors rounded-lg hover:bg-[var(--bg-elevated)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#"
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors px-4 py-2"
          >
            Sign in
          </a>
          <a
            href="#schedule-demo"
            className="text-sm font-medium bg-[var(--accent)] text-[var(--bg-primary)] px-5 py-2.5 rounded-lg hover:bg-[var(--accent-hover)] transition-all hover:shadow-lg hover:shadow-[var(--accent-glow)]"
          >
            Book a demo
          </a>
        </div>

        <button
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[var(--bg-elevated)] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden glass-strong border-t border-[var(--border-subtle)]">
          <nav className="section-padding py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#schedule-demo"
              onClick={() => setMenuOpen(false)}
              className="mt-2 text-sm font-medium bg-[var(--accent)] text-[var(--bg-primary)] px-5 py-3 rounded-lg text-center"
            >
              Book a demo
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
