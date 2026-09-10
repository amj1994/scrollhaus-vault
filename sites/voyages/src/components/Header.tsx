import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Journeys', href: '#journeys' },
  { label: 'Stories', href: '#stories' },
  { label: 'Why Us', href: '#why' },
  { label: 'FAQ', href: '#faq' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#f8f3ef]/90 backdrop-blur-md border-b border-black/5' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#" className="flex items-center gap-2">
            <span className="font-display text-2xl lg:text-3xl tracking-tight text-[#1a1a1a]">
              Voyages
            </span>
            <span className="font-display text-2xl lg:text-3xl tracking-tight text-[#1a1a1a]/40">
              &amp;
            </span>
            <span className="font-display text-2xl lg:text-3xl tracking-tight text-[#1a1a1a]">
              Chapters
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans text-sm text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#1a1a1a] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href="#contact"
              className="font-sans text-sm px-5 py-2.5 border border-[#1a1a1a]/20 rounded-full hover:bg-[#1a1a1a] hover:text-white transition-all duration-300"
            >
              Start Planning
            </a>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden bg-[#f8f3ef] border-t border-black/5 overflow-hidden"
        >
          <nav className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-sans text-base text-[#1a1a1a]/80 hover:text-[#1a1a1a]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="font-sans text-sm px-5 py-2.5 border border-[#1a1a1a]/20 rounded-full text-center hover:bg-[#1a1a1a] hover:text-white transition-all"
            >
              Start Planning
            </a>
          </nav>
        </motion.div>
      )}
    </motion.header>
  )
}
