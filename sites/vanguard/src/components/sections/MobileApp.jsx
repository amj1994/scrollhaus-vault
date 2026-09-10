import { motion } from 'framer-motion'
import PixelButton from '../PixelButton'

const goldGradient = {
  background: 'linear-gradient(to bottom, #FFCE62 0%, #895C1E 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  paddingBottom: '0.15em',
}

const titleLine1 = ['Bank', 'smarter,', 'wherever']
const titleLine2 = ['business', 'takes', 'you.']
const descWords = 'Manage accounts, payments, cards, and cash flow from a secure mobile banking experience designed for modern businesses.'.split(' ')
const availableWords = ['Available', 'on', 'iOS', 'and', 'Android.']

const wordFade = {
  hidden: { opacity: 0, y: 10 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: 'easeOut', delay },
  }),
}

const buttonScale = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20, delay: 1.3 },
  },
}

const descBase = 0
const availBase = 0.9

export default function MobileApp() {
  return (
    <section className="relative w-full h-[1550px] max-[1360px]:h-auto bg-black overflow-hidden">

      <img
        src="https://qclay.design/lovable/fintech/Section7BG.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-[140px] text-center max-[1360px]:relative max-[1360px]:left-0 max-[1360px]:translate-x-0 max-[1360px]:top-0 max-[1360px]:w-full max-[1360px]:px-5 max-[1360px]:pt-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2
          className="text-6xl font-normal font-halant leading-[57.60px] max-[1360px]:text-3xl max-[1360px]:leading-tight"
        >
          <span style={{ display: 'block' }}>
            {titleLine1.map((w, i) => (
              <motion.span
                key={i}
                variants={wordFade}
                custom={i * 0.1}
                style={{ ...goldGradient, display: 'inline-block', marginRight: i < titleLine1.length - 1 ? '0.27em' : 0 }}
              >
                {w}
              </motion.span>
            ))}
          </span>
          <span style={{ display: 'block' }}>
            {titleLine2.map((w, i) => (
              <motion.span
                key={i}
                variants={wordFade}
                custom={0.4 + i * 0.1}
                style={{ ...goldGradient, display: 'inline-block', marginRight: i < titleLine2.length - 1 ? '0.27em' : 0 }}
              >
                {w}
              </motion.span>
            ))}
          </span>
        </h2>
      </motion.div>

      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-[310px] w-[760px] flex flex-col items-center gap-8 max-[1360px]:relative max-[1360px]:left-0 max-[1360px]:translate-x-0 max-[1360px]:top-0 max-[1360px]:w-full max-[1360px]:max-w-full max-[1360px]:px-5 max-[1360px]:mt-8 max-[1360px]:gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="flex flex-col items-center gap-4">
          <p className="text-white text-2xl font-normal text-center leading-7 max-[1360px]:text-lg max-[1360px]:leading-normal">
            {descWords.map((w, i) => (
              <motion.span
                key={i}
                variants={wordFade}
                custom={descBase + i * 0.055}
                style={{ display: 'inline-block', marginRight: i < descWords.length - 1 ? '0.25em' : 0 }}
              >
                {w}
              </motion.span>
            ))}
          </p>
          <p className="text-white/70 text-lg font-normal text-center max-[1360px]:text-base">
            {availableWords.map((w, i) => (
              <motion.span
                key={i}
                variants={wordFade}
                custom={availBase + i * 0.1}
                style={{ display: 'inline-block', marginRight: i < availableWords.length - 1 ? '0.27em' : 0 }}
              >
                {w}
              </motion.span>
            ))}
          </p>
        </div>
        <PixelButton
          variants={buttonScale}
          className="h-14 px-7 rounded-full text-lg font-medium font-geist"
          bg="#FFFFFF"
          text="#000000"
          hoverBg="#EAF7C0"
          hoverText="#000000"
        >
          Download the App
        </PixelButton>
      </motion.div>

      <div className="hidden max-[1360px]:block max-[1360px]:h-[430px]" />

      <motion.img
        src="https://qclay.design/lovable/fintech/PhoneHand.png"
        alt=""
        className="absolute bottom-0 right-0 pointer-events-none w-[1200px] h-auto max-[1360px]:w-[440px] max-[1360px]:right-[-20px]"
        style={{ transformOrigin: 'bottom right' }}
        initial={{ opacity: 0, rotate: -70 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true }}
      />

    </section>
  )
}
