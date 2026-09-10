import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import AnimatedLines from '@/components/AnimatedLines'

const heroImage = 'https://images.pexels.com/photos/14036107/pexels-photo-14036107.jpeg?auto=compress&cs=tinysrgb&w=1920'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.35, 0.6])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] w-full overflow-hidden">
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 z-0"
      >
        <img
          src={heroImage}
          alt="Mountain landscape at sunrise"
          className="h-full w-full object-cover"
        />
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black"
        />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/70">
            Curated Journeys — Est. 2016
          </span>
        </motion.div>

        <AnimatedLines
          text="Voyages crafted with a story."
          className="font-display text-white text-[12vw] leading-[0.95] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] xl:text-[6.5vw]"
          baseDelay={0.6}
          stagger={0.12}
          duration={0.7}
          amount={0.2}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-8 max-w-xl font-sans text-base lg:text-lg text-white/80 leading-relaxed"
        >
          We design journeys that feel like chapters — immersive, unhurried, and personal.
          Not itineraries. Stories you step into.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#journeys"
            className="px-8 py-3.5 bg-white text-[#1a1a1a] font-sans text-sm font-medium rounded-full hover:bg-white/90 transition-all"
          >
            Explore Upcoming Journeys
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 border border-white/30 text-white font-sans text-sm font-medium rounded-full hover:bg-white/10 transition-all"
          >
            Plan Your Own
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="text-white/60" size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}
