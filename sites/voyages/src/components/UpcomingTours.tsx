import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { ArrowUpRight, Calendar, MapPin } from 'lucide-react'
import AnimatedLines from '@/components/AnimatedLines'
import PixelButton from '@/components/PixelButton'

interface Tour {
  title: string
  location: string
  dates: string
  price: string
  image: string
  spots: string
  description: string
}

const tours: Tour[] = [
  {
    title: 'Saharan Crossroads',
    location: 'Morocco',
    dates: 'Oct 12 – 24, 2026',
    price: '$4,200',
    image: 'https://images.pexels.com/photos/4405248/pexels-photo-4405248.jpeg?auto=compress&cs=tinysrgb&w=900',
    spots: '6 spots left',
    description: 'Twelve days from Marrakech through the Atlas to the Erg Chebbi dunes, with riad stays, Berber tea, and a night under stars.',
  },
  {
    title: 'Fire & Ice',
    location: 'Iceland',
    dates: 'Nov 3 – 11, 2026',
    price: '$5,800',
    image: 'https://images.pexels.com/photos/20955085/pexels-photo-20955085.jpeg?auto=compress&cs=tinysrgb&w=900',
    spots: '4 spots left',
    description: 'Aurora-chasing across the south coast, glacier hikes, hot-spring soaks, and a private black-beach dinner.',
  },
  {
    title: 'Lanterns & Quiet',
    location: 'Japan',
    dates: 'Mar 28 – Apr 8, 2027',
    price: '$6,400',
    image: 'https://images.pexels.com/photos/10099611/pexels-photo-10099611.jpeg?auto=compress&cs=tinysrgb&w=900',
    spots: '8 spots left',
    description: 'Cherry blossom season through Kyoto and Kanazawa — temple mornings, tea ceremonies, and a ryokan on the Noto Peninsula.',
  },
  {
    title: 'The Wild Edge',
    location: 'Patagonia',
    dates: 'Jan 15 – 28, 2027',
    price: '$7,200',
    image: 'https://images.pexels.com/photos/16377558/pexels-photo-16377558.jpeg?auto=compress&cs=tinysrgb&w=900',
    spots: '5 spots left',
    description: 'Torres del Paine and El Chaltén over fourteen days. Guided treks, estancia stays, and a final-night asado under the spires.',
  },
]

export default function UpcomingTours() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="journeys" ref={ref} className="relative py-24 lg:py-40 px-6 lg:px-10 bg-[#f8f3ef]">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 lg:mb-24">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#1a1a1a]/50">
              03 — Upcoming Journeys
            </span>
            <AnimatedLines
              text="Where we're going next."
              className="mt-6 font-display text-4xl md:text-5xl lg:text-7xl leading-[1.0] text-[#1a1a1a]"
              baseDelay={0.1}
              stagger={0.1}
              amount={0.3}
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-sm font-sans text-sm lg:text-base text-[#1a1a1a]/60 leading-relaxed"
          >
            Small groups. Fixed dates. Every detail handled — you bring the curiosity,
            we bring the infrastructure.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {tours.map((tour, i) => (
            <motion.a
              key={tour.title}
              href="#contact"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="group relative flex flex-col"
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#1a1a1a]/5">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="font-mono text-xs text-white/80 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                    {tour.spots}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white/70">
                    <MapPin size={14} />
                    <span className="font-mono text-xs uppercase tracking-wider">{tour.location}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex-1 flex flex-col">
                <h3 className="font-display text-2xl lg:text-3xl text-[#1a1a1a] leading-tight">
                  {tour.title}
                </h3>
                <p className="mt-3 font-sans text-sm text-[#1a1a1a]/60 leading-relaxed flex-1">
                  {tour.description}
                </p>
                <div className="mt-5 flex items-center justify-between pt-4 border-t border-[#1a1a1a]/10">
                  <div>
                    <div className="flex items-center gap-1.5 text-[#1a1a1a]/50">
                      <Calendar size={12} />
                      <span className="font-mono text-xs">{tour.dates}</span>
                    </div>
                    <div className="mt-1 font-display text-xl text-[#1a1a1a]">{tour.price}</div>
                  </div>
                  <motion.div
                    animate={{
                      rotate: hovered === i ? 45 : 0,
                      scale: hovered === i ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowUpRight className="text-[#1a1a1a]" size={22} />
                  </motion.div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-16 flex justify-center"
        >
          <PixelButton
            href="#contact"
            className="px-10 py-4 rounded-full border border-[#1a1a1a]/15"
            contentClassName="inline-flex items-center gap-3 font-sans text-sm font-medium"
            pixelColor="#1a1a1a"
            pixelSize={5}
            speed={0.5}
          >
            See all journeys
            <ArrowUpRight size={16} />
          </PixelButton>
        </motion.div>
      </div>
    </section>
  )
}
