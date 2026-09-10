import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useHoverPlayVideo } from '../../hooks/useHoverPlayVideo'

const features = [
  {
    video: 'https://qclay.design/lovable/fintech/Icon 1_1.mp4',
    title: 'Real time Payment Tracking.',
    desc: 'Monitor incoming and outgoing payments in real time with complete visibility across every transaction.',
  },
  {
    video: 'https://qclay.design/lovable/fintech/Icon 2_1.mp4',
    title: 'Analytics and Reports.',
    desc: 'Access detailed financial reports and actionable insights to support smarter business decisions.',
  },
  {
    video: 'https://qclay.design/lovable/fintech/Icon 3_1.mp4',
    title: 'Improve Expense Management.',
    desc: 'Track, categorize, and control business expenses to improve budgeting and financial efficiency.',
  },
  {
    video: 'https://qclay.design/lovable/fintech/Icon 4_1.mp4',
    title: 'Manage and Team Permissions.',
    desc: 'Assign roles and manage access levels securely, ensuring the right people have the right controls.',
  },
]

const whiteWords = ['Everything', 'you', 'need', 'to']
const goldWords = ['manage', 'business', 'finances.']

const goldGradient = {
  background: 'linear-gradient(to bottom, #FFCE62 0%, #895C1E 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  paddingBottom: '0.15em',
}

const wordVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut', delay: i * 0.09 },
  }),
}

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.15 },
  }),
}

const lineVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut', delay: 0.1 },
  },
}

const paraWords = 'Supporting your growth with seamless payments, liquidity solutions, expense control, and working capital management.'.split(' ')

const paraWordVariant = {
  hidden: { opacity: 0, y: 8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut', delay: i * 0.05 },
  }),
}

function FeatureCard({ video, title, desc, index }) {
  const { videoRef, onMouseEnter, onMouseLeave, onEnded } = useHoverPlayVideo()

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) {
      onMouseEnter()
    }
  }, [])

  return (
    <motion.div
      className="flex-1 flex flex-col items-center gap-10 cursor-pointer max-w-[240px] max-[768px]:flex-none max-[768px]:max-w-[280px]"
      variants={cardVariant}
      custom={index}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <video
        ref={videoRef}
        src={video}
        muted
        playsInline
        preload="auto"
        onEnded={onEnded}
        className="w-full h-48 object-contain"
      />
      <div className="w-full flex flex-col gap-5">
        <p className="text-center text-white text-3xl font-normal font-halant leading-7">{title}</p>
        <p className="text-center text-white/80 text-sm font-normal">{desc}</p>
      </div>
    </motion.div>
  )
}

export default function FeatureGrid() {
  return (
    <section className="w-full bg-black pt-[124px] pb-20 px-[112px] max-[768px]:pt-16 max-[768px]:pb-12 max-[768px]:px-5">

      <div className="flex justify-center mb-[136px] max-[768px]:mb-16">
        <motion.h2
          className="text-center text-6xl font-normal font-halant leading-[57.60px] max-[768px]:text-3xl max-[768px]:leading-tight"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {whiteWords.map((word, i) => (
            <motion.span
              key={i}
              className="text-white"
              variants={wordVariant}
              custom={i}
              style={{ display: 'inline-block', marginRight: '0.27em' }}
            >
              {word}
            </motion.span>
          ))}
          <br />
          <span>
            {goldWords.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariant}
                custom={whiteWords.length + i}
                style={{
                  ...goldGradient,
                  display: 'inline-block',
                  marginRight: i < goldWords.length - 1 ? '0.27em' : 0,
                }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </motion.h2>
      </div>

      <motion.div
        className="flex justify-between gap-8 max-[768px]:flex-col max-[768px]:items-center max-[768px]:gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {features.map((f, i) => (
          <FeatureCard key={f.title} {...f} index={i} />
        ))}
      </motion.div>

      <motion.div
        className="mt-[100px] max-[768px]:mt-16 border-t border-white/25"
        variants={lineVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />

      <motion.p
        className="mt-12 text-center text-white/80 text-xl font-normal max-w-[623px] mx-auto max-[768px]:text-base max-[768px]:max-w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {paraWords.map((word, i) => (
          <motion.span
            key={i}
            variants={paraWordVariant}
            custom={i}
            style={{ display: 'inline-block', marginRight: i < paraWords.length - 1 ? '0.27em' : 0 }}
          >
            {word}
          </motion.span>
        ))}
      </motion.p>
    </section>
  )
}
