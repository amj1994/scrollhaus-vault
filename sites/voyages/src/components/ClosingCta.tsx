import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import AnimatedLines from '@/components/AnimatedLines'
import PixelButton from '@/components/PixelButton'

const bgImage = 'https://images.pexels.com/photos/38569619/pexels-photo-38569619.jpeg?auto=compress&cs=tinysrgb&w=1920'

export default function ClosingCta() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '20%'])
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.15])

  return (
    <section id="contact" ref={ref} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 z-0">
        <img src={bgImage} alt="Desert dunes at sunrise" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
      </motion.div>

      <div className="relative z-10 text-center px-6 py-24 max-w-4xl mx-auto">
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-white/60"
        >
          Your chapter starts here
        </motion.span>

        <AnimatedLines
          text="Where will the story take you?"
          className="mt-8 font-display text-white text-[10vw] sm:text-[8vw] md:text-[6vw] lg:text-[5.5vw] leading-[0.95]"
          baseDelay={0.3}
          stagger={0.1}
          duration={0.7}
          amount={0.3}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="mt-8 max-w-xl mx-auto font-sans text-base lg:text-lg text-white/70 leading-relaxed"
        >
          Tell us where you're drawn, when you can go, and what kind of traveler you are.
          We'll write back within two days with a first draft.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <PixelButton
            href="mailto:hello@voyagesandchapters.com"
            className="px-10 py-4 rounded-full border border-white/20"
            contentClassName="inline-flex items-center gap-3 font-sans text-sm font-medium"
            pixelColor="#ffffff"
            textColor="#ffffff"
            hoverTextColor="#1a1a1a"
            pixelSize={5}
            speed={0.5}
            hoverBorderColor="#ffffff"
          >
            Start a conversation
            <ArrowUpRight size={16} />
          </PixelButton>
          <a
            href="#journeys"
            className="px-10 py-4 border border-white/30 text-white font-sans text-sm font-medium rounded-full hover:bg-white/10 transition-all"
          >
            Browse upcoming journeys
          </a>
        </motion.div>
      </div>
    </section>
  )
}
