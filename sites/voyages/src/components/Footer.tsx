import { Instagram, Mail, Compass } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white py-16 lg:py-24 px-6 lg:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-16">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2">
              <Compass size={24} strokeWidth={1.5} />
              <span className="font-display text-2xl">Voyages &amp; Chapters</span>
            </div>
            <p className="mt-6 font-sans text-sm text-white/50 leading-relaxed max-w-sm">
              A small travel studio designing immersive, story-driven journeys for
              travelers who'd rather go deep than tick boxes.
            </p>
            <div className="mt-8 flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-white hover:text-[#1a1a1a] transition-all">
                <Instagram size={16} />
              </a>
              <a href="mailto:hello@voyagesandchapters.com" className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-white hover:text-[#1a1a1a] transition-all">
                <Mail size={16} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-wider text-white/40 mb-5">Journeys</h4>
            <ul className="space-y-3">
              {['Upcoming', 'Private tours', 'Past journeys', 'Gift a journey'].map((link) => (
                <li key={link}>
                  <a href="#" className="font-sans text-sm text-white/60 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-wider text-white/40 mb-5">Studio</h4>
            <ul className="space-y-3">
              {['About us', 'Our guides', 'Press', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="font-sans text-sm text-white/60 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-white/40 mb-5">
              The Dispatch
            </h4>
            <p className="font-sans text-sm text-white/50 mb-4 leading-relaxed">
              Occasional letters from the road. No marketing, no urgency.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-white/5 border border-white/15 rounded-full px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-colors"
              />
              <button className="px-4 py-2.5 bg-white text-[#1a1a1a] rounded-full text-sm font-medium hover:bg-white/90 transition-all">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-4">
          <p className="font-mono text-xs text-white/30">
            © 2026 Voyages &amp; Chapters. Crafted with care.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-mono text-xs text-white/30 hover:text-white/60 transition-colors">
              Privacy
            </a>
            <a href="#" className="font-mono text-xs text-white/30 hover:text-white/60 transition-colors">
              Terms
            </a>
            <a href="#" className="font-mono text-xs text-white/30 hover:text-white/60 transition-colors">
              Responsible Travel
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
