import { motion } from 'framer-motion'
import PixelButton from '../PixelButton'

const goldGradient = {
  background: 'linear-gradient(to bottom, #FFCE62 0%, #895C1E 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  paddingBottom: '0.15em',
}

const line1Words = ['Built', 'for', 'modern', 'business.']
const line2Words = ['Not', 'outdated', 'banking.']
const vanguardWords = ['Vanguard', 'Banking']

const titleWord = {
  hidden: { opacity: 0, y: 10 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: 'easeOut', delay },
  }),
}

const simpleFade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut', delay: 0.1 },
  },
}

const labelWord = {
  hidden: { opacity: 0, y: 8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut', delay: i * 0.12 },
  }),
}

const paraFade = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.25 },
  }),
}

const buttonScale = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20, delay: 0.55 },
  },
}

export default function Award() {
  return (
    <section className="relative w-full h-[1130px] max-[768px]:h-auto bg-black overflow-hidden">

      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-[156px] w-[820px] text-center max-[768px]:relative max-[768px]:left-0 max-[768px]:translate-x-0 max-[768px]:top-0 max-[768px]:w-full max-[768px]:px-5 max-[768px]:pt-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="text-white text-6xl font-normal font-halant leading-[57.60px] whitespace-nowrap max-[768px]:text-3xl max-[768px]:leading-tight max-[768px]:whitespace-normal">
          {line1Words.map((w, i) => (
            <motion.span
              key={i}
              variants={titleWord}
              custom={i * 0.09}
              style={{ display: 'inline-block', marginRight: i < line1Words.length - 1 ? '0.27em' : 0 }}
            >
              {w}
            </motion.span>
          ))}
        </div>
        <div
          className="text-6xl font-normal font-halant leading-[57.60px] whitespace-nowrap pb-1 max-[768px]:text-3xl max-[768px]:leading-tight max-[768px]:whitespace-normal"
        >
          {line2Words.map((w, i) => (
            <motion.span
              key={i}
              variants={titleWord}
              custom={0.42 + i * 0.09}
              style={{ ...goldGradient, display: 'inline-block', marginRight: i < line2Words.length - 1 ? '0.27em' : 0 }}
            >
              {w}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <motion.video
        className="absolute left-1/2 -translate-x-1/2 top-[360px] w-[600px] h-auto max-[768px]:relative max-[768px]:left-0 max-[768px]:translate-x-0 max-[768px]:top-0 max-[768px]:mt-10 max-[768px]:w-[85%] max-[768px]:max-w-[420px] max-[768px]:mx-auto"
        src="https://qclay.design/lovable/fintech/Golden block.mp4"
        autoPlay
        muted
        loop
        playsInline
        variants={simpleFade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />

      <motion.p
        className="absolute left-1/2 -translate-x-1/2 top-[510px] whitespace-nowrap text-center uppercase tracking-widest max-[768px]:relative max-[768px]:left-0 max-[768px]:translate-x-0 max-[768px]:top-0 max-[768px]:mt-8 max-[768px]:whitespace-normal max-[768px]:px-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {vanguardWords.map((w, i) => (
          <motion.span
            key={i}
            variants={labelWord}
            custom={i}
            style={{
              fontSize: '16px',
              fontWeight: 400,
              background: 'linear-gradient(to bottom, #FFCE62 0%, #895C1E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              paddingBottom: '0.15em',
              display: 'inline-block',
              marginRight: i < vanguardWords.length - 1 ? '0.3em' : 0,
            }}
          >
            {w}
          </motion.span>
        ))}
      </motion.p>

      <motion.svg
        className="absolute left-1/2 -translate-x-1/2 top-[616px] max-[768px]:relative max-[768px]:left-0 max-[768px]:translate-x-0 max-[768px]:top-0 max-[768px]:block max-[768px]:mx-auto max-[768px]:mt-8"
        width="2"
        height="160"
        viewBox="0 0 2 160"
        overflow="visible"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <defs>
          <linearGradient id="awardLineGrad" x1="0" y1="0" x2="0" y2="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFCE62" />
            <stop offset="70%" stopColor="#895C1E" />
            <stop offset="100%" stopColor="#895C1E" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.line
          x1="1" y1="160" x2="1" y2="0"
          stroke="url(#awardLineGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: {
                pathLength: { duration: 1.0, ease: 'easeOut', delay: 0.1 },
                opacity: { duration: 0.1, delay: 0.1 },
              },
            },
          }}
        />
      </motion.svg>

      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-[824px] w-[780px] flex flex-col items-center gap-8 max-[768px]:relative max-[768px]:left-0 max-[768px]:translate-x-0 max-[768px]:top-0 max-[768px]:w-full max-[768px]:px-5 max-[768px]:mt-10 max-[768px]:pb-16 max-[768px]:gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="flex flex-col items-center gap-4">
          <motion.p
            className="text-white text-3xl font-medium text-center leading-8 max-[768px]:text-xl max-[768px]:leading-normal"
            variants={paraFade}
            custom={0}
          >
            Verified in under 24 hours, dedicated banking specialist and real time across every account
          </motion.p>
          <motion.p
            className="text-white/70 text-lg font-normal text-center max-[768px]:text-base"
            variants={paraFade}
            custom={1}
          >
            Quick onboarding, expert support, full financial control.
          </motion.p>
        </div>
        <PixelButton
          variants={buttonScale}
          className="h-14 px-7 rounded-full text-lg font-medium font-geist"
          bg="#FFFFFF"
          text="#000000"
          hoverBg="#EAF7C0"
          hoverText="#000000"
        >
          Start Banking
        </PixelButton>
      </motion.div>

    </section>
  )
}
