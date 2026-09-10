import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

const lensImage = 'https://images.pexels.com/photos/16970043/pexels-photo-16970043.jpeg?auto=compress&cs=tinysrgb&w=1600'
const innerImage = 'https://images.pexels.com/photos/6130817/pexels-photo-6130817.jpeg?auto=compress&cs=tinysrgb&w=1200'

export default function Lens() {
  const ref = useRef<HTMLElement>(null)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [active, setActive] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05])

  return (
    <section ref={ref} className="relative py-24 lg:py-32 px-6 lg:px-10 bg-[#1a1a1a] overflow-hidden">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 text-white">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/40">
              02 — The Lens
            </span>
            <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-white">
              Look closer.
              <br />
              <span className="text-white/40">Travel deeper.</span>
            </h2>
            <p className="mt-8 font-sans text-base lg:text-lg leading-[1.8] text-white/60 max-w-md">
              Move your cursor across the image. What looks like a single vista reveals
              layers — the way a good journey does. A mountain is never just a mountain.
              It's the road that got you there, the stranger who shared their bread,
              the silence at the summit that no photograph quite holds.
            </p>
            <div className="mt-10 flex items-center gap-4">
              <span className="font-mono text-xs text-white/40">DRAG TO EXPLORE</span>
              <span className="h-px flex-1 bg-white/20 max-w-[120px]" />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div
              className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-none select-none"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                setPos({
                  x: ((e.clientX - rect.left) / rect.width) * 100,
                  y: ((e.clientY - rect.top) / rect.height) * 100,
                })
              }}
              onMouseEnter={() => setActive(true)}
              onMouseLeave={() => setActive(false)}
            >
              <motion.img
                src={lensImage}
                alt="Misty mountain landscape"
                style={{ scale }}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <motion.div
                className="absolute inset-0"
                animate={{ opacity: active ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  clipPath: `circle(20% at ${pos.x}% ${pos.y}%)`,
                }}
              >
                <img
                  src={innerImage}
                  alt="Mountain road detail"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className="w-24 h-24 rounded-full border-2 border-white/80 shadow-lg" />
                </div>
              </motion.div>
              <div
                className={`absolute pointer-events-none transition-opacity duration-200 ${
                  active ? 'opacity-0' : 'opacity-100'
                }`}
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="px-6 py-3 bg-black/40 backdrop-blur-sm rounded-full">
                  <span className="font-mono text-xs text-white/80 uppercase tracking-wider">
                    Hover to reveal
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
