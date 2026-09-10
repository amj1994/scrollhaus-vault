import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Businesses', hasDropdown: true },
  { label: 'Treasury solutions' },
  { label: 'International payment' },
  { label: 'Services', hasDropdown: true },
  { label: 'Legend' },
  { label: 'Resources' },
  { label: 'Support' },
]

const navContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const navItem = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

function ChevronDown() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="opacity-50">
      <path d="M1 1L5 5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function HamburgerIcon({ open }) {
  return (
    <div className="relative w-[22px] h-4 flex flex-col justify-between">
      <motion.div
        className="h-[1.5px] w-full bg-white rounded-full"
        animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
      />
      <motion.div
        className="h-[1.5px] w-full bg-white rounded-full"
        animate={open ? { opacity: 0 } : { opacity: 1 }}
      />
      <motion.div
        className="h-[1.5px] w-full bg-white rounded-full"
        animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
      />
    </div>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-10 max-[1360px]:px-5 h-[80px] bg-[linear-gradient(to_bottom,rgba(0,0,0,1)_0%,rgba(0,0,0,0.85)_25%,rgba(0,0,0,0.55)_55%,rgba(0,0,0,0.2)_80%,rgba(0,0,0,0)_100%)]${mobileOpen ? ' max-[1360px]:bg-black' : ''}`}
      variants={navContainer}
      initial="hidden"
      animate="visible"
    >
      <a href="/" className="flex items-center gap-2 w-36 flex-shrink-0">
        <motion.img
          variants={navItem}
          src="https://qclay.design/lovable/fintech/logo.svg"
          alt="Vanguard"
          className="h-5 w-auto"
        />
        <motion.span
          variants={navItem}
          className="text-white text-2xl font-medium font-halant"
        >
          Vanguard
        </motion.span>
      </a>

      <div className="flex items-center gap-8 max-[1360px]:hidden">
        {navLinks.map(({ label, hasDropdown }) => (
          <motion.div key={label} variants={navItem} className="flex items-center gap-2.5 cursor-pointer group">
            <span className="text-white text-base font-normal hover:opacity-70 transition-opacity">
              {label}
            </span>
            {hasDropdown && <ChevronDown />}
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-3 max-[1360px]:hidden">
        <motion.button
          variants={navItem}
          className="h-11 px-5 rounded-full border border-white/50 text-white text-base font-medium font-geist hover:border-white transition-colors"
        >
          Login
        </motion.button>
        <motion.button
          variants={navItem}
          className="h-11 px-5 rounded-full bg-white text-black text-base font-medium font-geist hover:bg-white/90 transition-colors"
        >
          Sign up
        </motion.button>
      </div>

      <button
        type="button"
        aria-label="Toggle menu"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((v) => !v)}
        className="hidden max-[1360px]:flex items-center justify-center w-10 h-10 flex-shrink-0"
      >
        <HamburgerIcon open={mobileOpen} />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="hidden max-[1360px]:flex fixed top-[80px] left-0 right-0 bottom-0 overflow-y-auto flex-col gap-6 bg-black px-5 py-8"
          >
            {navLinks.map(({ label, hasDropdown }) => (
              <div key={label} className="flex items-center justify-between gap-2.5 cursor-pointer">
                <span className="text-white text-lg font-normal">{label}</span>
                {hasDropdown && <ChevronDown />}
              </div>
            ))}
            <div className="flex flex-col gap-3 mt-2">
              <button className="h-11 px-5 rounded-full border border-white/50 text-white text-base font-medium font-geist">
                Login
              </button>
              <button className="h-11 px-5 rounded-full bg-white text-black text-base font-medium font-geist">
                Sign up
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
