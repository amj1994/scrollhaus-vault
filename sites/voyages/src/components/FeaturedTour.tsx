import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import AnimatedWords from '@/components/AnimatedWords'
import PixelButton from '@/components/PixelButton'

const featuredImage = 'https://images.pexels.com/photos/15684889/pexels-photo-15684889.jpeg?auto=compress&cs=tinysrgb&w=1400'

const itinerary = [
  { day: 'Day 1–2', title: 'Cusco & acclimatization', detail: 'Arrive, rest, walk the old city. Coca tea, slow pace, 3,400m.' },
  { day: 'Day 3', title: 'Sacred Valley', detail: 'Pisac market, salt terraces of Maras, stay at a valley hacienda.' },
  { day: 'Day 4–6', title: 'The Inca Trail', detail: 'Three guided trekking days. Porters carry camp. You carry a daypack.' },
  { day: 'Day 7', title: 'Machu Picchu at dawn', detail: 'Enter through the Sun Gate. The way the Incas did.' },
  { day: 'Day 8–9', title: 'Return & decompress', detail: 'Train back through the Urubamba. One last night in Cusco.' },
]

export default function FeaturedTour() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '15%'])

  return (
    <section ref={ref} className="relative py-24 lg:py-40 px-6 lg:px-10 bg-[#1a1a1a] overflow-hidden">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 lg:mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/40">
            06 — Featured Journey
          </span>
          <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-7xl leading-[1.0] text-white">
            <AnimatedWords text="The Sacred Valley, on foot." isInView={inView} baseDelay={0.2} stagger={0.08} />
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <motion.img
                src={featuredImage}
                alt="Machu Picchu in mist"
                style={{ y: imageY }}
                className="absolute inset-0 h-[115%] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-mono text-xs uppercase tracking-wider text-white/60">Peru</span>
                <div className="mt-2 flex items-baseline gap-4">
                  <span className="font-display text-3xl text-white">$5,400</span>
                  <span className="font-sans text-sm text-white/60">9 days · Jan 2027</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 lg:pl-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-sans-tight text-xl lg:text-2xl leading-[1.5] text-white/80"
            >
              Nine days that trace the Inca world from Cusco's cobblestones to the Sun Gate
              at dawn — the way the empire's own messengers would have seen it.
            </motion.p>

            <div className="mt-12 space-y-px bg-white/10 rounded-xl overflow-hidden">
              {itinerary.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : undefined}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                  className="flex gap-6 p-5 lg:p-6 bg-[#1a1a1a] hover:bg-[#222] transition-colors"
                >
                  <span className="font-mono text-xs text-white/40 w-20 shrink-0 pt-1">
                    {item.day}
                  </span>
                  <div>
                    <h4 className="font-display text-lg text-white">{item.title}</h4>
                    <p className="mt-1 font-sans text-sm text-white/50 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10">
              <PixelButton
                href="#contact"
                className="px-10 py-4 rounded-full border border-white/15"
                contentClassName="inline-flex items-center gap-3 font-sans text-sm font-medium"
                pixelColor="#ffffff"
                textColor="#ffffff"
                hoverTextColor="#1a1a1a"
                pixelSize={5}
                speed={0.5}
                hoverBorderColor="#ffffff"
              >
                Reserve a spot
                <ArrowUpRight size={16} />
              </PixelButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
