import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import AnimatedLines from '@/components/AnimatedLines'

const intentions = [
  {
    label: 'Slow & restorative',
    description: 'Long mornings, thermal baths, regions where nobody rushes. You return lighter than you left.',
    image: 'https://images.pexels.com/photos/35859002/pexels-photo-35859002.png?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    label: 'Cultural immersion',
    description: 'Cook with a family in Hanoi. Learn calligraphy in Kyoto. Drink tea with a nomad in Morocco.',
    image: 'https://images.pexels.com/photos/10099611/pexels-photo-10099611.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    label: 'Wilderness & challenge',
    description: 'Multi-day treks, high altitudes, the kind of tired that feels earned. We handle logistics; you walk.',
    image: 'https://images.pexels.com/photos/16377558/pexels-photo-16377558.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    label: 'Creative & photographic',
    description: 'Golden-hour chases, studio visits, and neighborhoods most travelers never find.',
    image: 'https://images.pexels.com/photos/19190945/pexels-photo-19190945.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
]

export default function TravelIntention() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const [active, setActive] = useState(0)

  return (
    <section ref={ref} className="relative py-24 lg:py-40 px-6 lg:px-10 bg-[#f0ebe6]">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 lg:mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#1a1a1a]/50">
            04 — Travel Intentions
          </span>
          <AnimatedLines
            text="What kind of journey are you after?"
            className="mt-6 font-display text-4xl md:text-5xl lg:text-7xl leading-[1.0] text-[#1a1a1a] max-w-4xl"
            baseDelay={0.1}
            stagger={0.08}
            amount={0.3}
          />
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="space-y-2">
              {intentions.map((intent, i) => (
                <motion.button
                  key={intent.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : undefined}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  onClick={() => setActive(i)}
                  className={`w-full text-left p-5 lg:p-6 rounded-xl transition-all duration-300 border ${
                    active === i
                      ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                      : 'bg-transparent text-[#1a1a1a] border-[#1a1a1a]/10 hover:border-[#1a1a1a]/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl lg:text-2xl">{intent.label}</span>
                    <motion.div animate={{ rotate: active === i ? 0 : -45, x: active === i ? 0 : -4 }}>
                      <ArrowRight
                        size={18}
                        className={active === i ? 'text-white' : 'text-[#1a1a1a]/40'}
                      />
                    </motion.div>
                  </div>
                  <motion.p
                    initial={false}
                    animate={{
                      height: active === i ? 'auto' : 0,
                      opacity: active === i ? 1 : 0,
                      marginTop: active === i ? 12 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden font-sans text-sm leading-relaxed text-white/70"
                  >
                    {intent.description}
                  </motion.p>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-[4/5] lg:aspect-[5/6] rounded-2xl overflow-hidden">
              {intentions.map((intent, i) => (
                <motion.img
                  key={i}
                  src={intent.image}
                  alt={intent.label}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={false}
                  animate={{
                    opacity: active === i ? 1 : 0,
                    scale: active === i ? 1 : 1.05,
                  }}
                  transition={{ duration: 0.6 }}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="font-mono text-xs uppercase tracking-wider text-white/70">
                    Intention {String(active + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 font-display text-3xl lg:text-4xl text-white">
                    {intentions[active].label}
                  </h3>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
