import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import AnimatedLines from '@/components/AnimatedLines'
import AnimatedWords from '@/components/AnimatedWords'

export default function Story() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="relative py-24 lg:py-40 px-6 lg:px-10 bg-[#f8f3ef]">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : undefined}
              transition={{ duration: 0.6 }}
              className="sticky top-32"
            >
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#1a1a1a]/50">
                01 — The Premise
              </span>
              <AnimatedLines
                text="We don't sell trips. We author chapters."
                className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-[#1a1a1a]"
                baseDelay={0.2}
                stagger={0.1}
                amount={0.3}
              />
            </motion.div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <p className="font-sans-tight text-xl lg:text-2xl leading-[1.6] text-[#1a1a1a]/80">
                  <AnimatedWords
                    text="Every journey we craft begins with a conversation, not a checklist."
                    isInView={inView}
                    baseDelay={0.4}
                    stagger={0.04}
                    duration={0.5}
                  />
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <p className="font-sans text-base lg:text-lg leading-[1.8] text-[#1a1a1a]/60">
                  We learn your rhythm — the kind of mornings you prefer, whether you'd
                  rather wander a medina at dawn or sleep through the call to prayer,
                  whether a twelve-hour train ride sounds like misery or the reason you
                  came. Then we design around the answer.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.7, delay: 0.8 }}
              >
                <p className="font-sans text-base lg:text-lg leading-[1.8] text-[#1a1a1a]/60">
                  Our trips run small — never more than twelve travelers, often fewer —
                  and every lodging, guide, and detour is chosen by someone who's been
                  there, recently, and would go back tomorrow.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : undefined}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="pt-6 border-t border-[#1a1a1a]/10"
              >
                <div className="flex flex-wrap gap-x-12 gap-y-6">
                  {[
                    { num: '40+', label: 'Journeys designed' },
                    { num: '12', label: 'Max travelers per trip' },
                    { num: '23', label: 'Countries covered' },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="font-display text-3xl lg:text-4xl text-[#1a1a1a]">
                        {stat.num}
                      </div>
                      <div className="font-mono text-xs uppercase tracking-wider text-[#1a1a1a]/50 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
