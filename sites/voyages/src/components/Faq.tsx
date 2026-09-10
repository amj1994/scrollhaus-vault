import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import { Plus, Minus } from 'lucide-react'
import AnimatedLines from '@/components/AnimatedLines'

const faqs = [
  {
    q: 'How small are the groups, really?',
    a: 'Between four and twelve travelers, depending on the journey. We never add a thirteenth. If a trip doesn\'t reach its minimum, we\'ll either run it at a loss or refund you in full — your choice.',
  },
  {
    q: 'What\'s included in the price?',
    a: 'Lodging, all meals unless noted, internal transport, guides, park fees, and gratuities. International flights to the starting city are not included. We help you book those at cost.',
  },
  {
    q: 'Can I customize a trip or plan something private?',
    a: 'Yes. About a third of our work is private commissions — family trips, honeymoons, sabbaticals. Tell us your dates and your vision, and we\'ll design something from scratch.',
  },
  {
    q: 'What if I\'m a solo traveler?',
    a: 'You\'re in good company — roughly forty percent of our travelers come alone. We pair solo travelers in shared lodging at no supplement, or you can book a private room for an additional cost.',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'Full refund up to 90 days before departure. 50% refund up to 60 days. Beyond that, we hold the balance as credit toward a future journey for twelve months. Travel insurance is required.',
  },
  {
    q: 'Are your trips physically demanding?',
    a: 'It varies. We rate every journey on a 1–4 scale and list daily activity in the itinerary. If you can walk five miles at a comfortable pace, most of our trips will suit you. Trekking-focused journeys require more.',
  },
]

export default function Faq() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" ref={ref} className="relative py-24 lg:py-40 px-6 lg:px-10 bg-[#f8f3ef]">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#1a1a1a]/50">
                08 — Questions
              </span>
              <AnimatedLines
                text="Things people ask."
                className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-[#1a1a1a]"
                baseDelay={0.1}
                stagger={0.08}
                amount={0.3}
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 font-sans text-sm text-[#1a1a1a]/60 leading-relaxed max-w-xs"
              >
                Still curious? Write to us — a real person reads every message,
                usually within a day.
              </motion.p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="divide-y divide-[#1a1a1a]/10">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}
                >
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full text-left py-6 flex items-start justify-between gap-6 group"
                  >
                    <span className="font-sans-tight text-lg lg:text-xl text-[#1a1a1a] group-hover:text-[#1a1a1a]/70 transition-colors">
                      {faq.q}
                    </span>
                    <span className="shrink-0 mt-1">
                      {open === i ? (
                        <Minus size={20} className="text-[#1a1a1a]/40" />
                      ) : (
                        <Plus size={20} className="text-[#1a1a1a]/40" />
                      )}
                    </span>
                  </button>
                  <AnimatePresence>
                    {open === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 font-sans text-base text-[#1a1a1a]/60 leading-[1.7] max-w-2xl">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
