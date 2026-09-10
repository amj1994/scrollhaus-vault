import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Users, Map, Compass, Home } from 'lucide-react'
import AnimatedLines from '@/components/AnimatedLines'

const reasons = [
  {
    icon: Users,
    title: 'Small by design',
    body: 'Never more than twelve travelers. Often as few as four. You will know everyone\'s name by day two.',
  },
  {
    icon: Map,
    title: 'Built from experience',
    body: 'Every route, lodge, and guide is chosen by someone who walked it within the last year. Not from a brochure.',
  },
  {
    icon: Compass,
    title: 'Room for the unplanned',
    body: 'We schedule loosely enough that a festival, a recommendation, or a wrong turn can become the best day.',
  },
  {
    icon: Home,
    title: 'Stays that matter',
    body: 'Family-run riads, mountain refuges, a farmhouse in Kanazawa. Places with a hand and a name behind them.',
  },
]

export default function WhyTravel() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="why" ref={ref} className="relative py-24 lg:py-40 px-6 lg:px-10 bg-[#f8f3ef]">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-16 lg:mb-24">
          <div className="lg:col-span-6">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#1a1a1a]/50">
              05 — Why Travel With Us
            </span>
            <AnimatedLines
              text="The difference is in what we leave out."
              className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-[#1a1a1a]"
              baseDelay={0.1}
              stagger={0.08}
              amount={0.3}
            />
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-sans text-base lg:text-lg leading-[1.8] text-[#1a1a1a]/60"
            >
              We could list a hundred features. Instead, four principles. Everything we do
              grows from these.
            </motion.p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1a1a1a]/10 rounded-2xl overflow-hidden">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="bg-[#f8f3ef] p-8 lg:p-10 group hover:bg-[#1a1a1a] transition-colors duration-500"
            >
              <reason.icon
                size={28}
                className="text-[#1a1a1a] group-hover:text-white transition-colors duration-500"
                strokeWidth={1.5}
              />
              <h3 className="mt-6 font-display text-2xl text-[#1a1a1a] group-hover:text-white transition-colors duration-500">
                {reason.title}
              </h3>
              <p className="mt-4 font-sans text-sm leading-relaxed text-[#1a1a1a]/60 group-hover:text-white/60 transition-colors duration-500">
                {reason.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
