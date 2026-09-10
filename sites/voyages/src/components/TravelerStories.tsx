import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import AnimatedLines from '@/components/AnimatedLines'

const stories = [
  {
    quote: `I've taken a lot of trips. This was the first one that felt like it was written for me. The pace, the people, the moments that weren't on any itinerary — that's what I keep coming back to.`,
    name: 'Sarah K.',
    trip: 'Saharan Crossroads, 2025',
    image: 'https://images.pexels.com/photos/977418/pexels-photo-977418.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    quote: `Our guide didn't just know the trail. He knew the family that runs the teahouse at the pass, the story behind the cairn at 4,200 meters, and exactly when to stop talking and let the mountain do the work.`,
    name: 'Daniel R.',
    trip: 'The Wild Edge, 2025',
    image: 'https://images.pexels.com/photos/34081654/pexels-photo-34081654.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    quote: `I came for the cherry blossoms. I left with a calligraphy teacher in Kanazawa who still sends me postcards. That's the kind of thing that doesn't happen on a packaged tour.`,
    name: 'Mei L.',
    trip: 'Lanterns & Quiet, 2025',
    image: 'https://images.pexels.com/photos/34238049/pexels-photo-34238049.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
]

export default function TravelerStories() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const [index, setIndex] = useState(0)

  const next = () => setIndex((index + 1) % stories.length)
  const prev = () => setIndex((index - 1 + stories.length) % stories.length)

  return (
    <section id="stories" ref={ref} className="relative py-24 lg:py-40 px-6 lg:px-10 bg-[#f0ebe6]">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-16 lg:mb-24 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#1a1a1a]/50">
            07 — Traveler Stories
          </span>
          <AnimatedLines
            text="In their words."
            className="mt-6 font-display text-4xl md:text-5xl lg:text-7xl leading-[1.0] text-[#1a1a1a]"
            baseDelay={0.1}
            stagger={0.1}
            amount={0.3}
          />
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center"
            >
              <div className="lg:col-span-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <img
                    src={stories[index].image}
                    alt={stories[index].name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="lg:col-span-8">
                <Quote className="text-[#1a1a1a]/15" size={48} strokeWidth={1} />
                <blockquote className="mt-6 font-display text-2xl md:text-3xl lg:text-4xl leading-[1.4] text-[#1a1a1a]">
                  "{stories[index].quote}"
                </blockquote>
                <div className="mt-8 flex items-center gap-4">
                  <div>
                    <div className="font-sans-tight font-medium text-[#1a1a1a]">
                      {stories[index].name}
                    </div>
                    <div className="font-mono text-xs text-[#1a1a1a]/50 mt-1">
                      {stories[index].trip}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 flex items-center justify-between">
            <div className="flex gap-2">
              {stories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === index ? 'w-12 bg-[#1a1a1a]' : 'w-6 bg-[#1a1a1a]/20'
                  }`}
                  aria-label={`Story ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-[#1a1a1a]/15 flex items-center justify-center hover:bg-[#1a1a1a] hover:text-white transition-all"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-[#1a1a1a]/15 flex items-center justify-center hover:bg-[#1a1a1a] hover:text-white transition-all"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
