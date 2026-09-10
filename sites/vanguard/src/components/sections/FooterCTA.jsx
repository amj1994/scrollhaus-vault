import { motion } from 'framer-motion'
import PixelButton from '../PixelButton'

const goldGradient = {
  background: 'linear-gradient(to bottom, #FFCE62 0%, #895C1E 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  paddingBottom: '0.15em',
}

const titleWhiteWords = ['Business', 'banking', 'that', 'moves']
const titleGoldWords = ['as', 'fast', 'as', 'your', 'company.']
const descWords = 'Open an account in minutes and manage payments, cards, and cash flow from a single secure platform.'.split(' ')

const WORD_STAGGER = 0.06
const WORD_DURATION = 0.45

const wordVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: WORD_DURATION, ease: 'easeOut', delay: i * WORD_STAGGER },
  }),
}

const totalTitleWords = titleWhiteWords.length + titleGoldWords.length
const descDelayBase = totalTitleWords * WORD_STAGGER + 0.15

const buttonVariant = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
      delay: descDelayBase + descWords.length * 0.045 + i * 0.1,
    },
  }),
}

const imageVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 0.3,
    transition: { duration: 1.2, ease: 'easeOut', delay: 0.2 },
  },
}

export default function FooterCTA() {
  return (
    <section className="relative w-full h-[655px] max-[768px]:h-auto bg-black overflow-hidden flex items-center justify-center max-[768px]:py-24 max-[768px]:px-5">

      <motion.img
        src="https://qclay.design/lovable/fintech/LeftLine.png"
        alt=""
        className="absolute top-[78px] left-[-91px] w-[500px] h-[500px] pointer-events-none max-[768px]:hidden"
        variants={imageVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
      <motion.img
        src="https://qclay.design/lovable/fintech/RightLine.png"
        alt=""
        className="absolute top-[78px] right-[-91px] w-[500px] h-[500px] pointer-events-none max-[768px]:hidden"
        variants={imageVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />

      <div className="relative z-10 max-w-[694px] flex flex-col items-center text-center gap-8 max-[768px]:gap-6">

        <h2 className="text-6xl font-normal font-halant leading-[57.60px] max-[768px]:text-3xl max-[768px]:leading-tight">
          {titleWhiteWords.map((w, i) => (
            <motion.span
              key={`w-${i}`}
              variants={wordVariant}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ color: '#FFFFFF', display: 'inline-block', marginRight: '0.27em' }}
            >
              {w}
            </motion.span>
          ))}
          {titleGoldWords.map((w, i) => (
            <motion.span
              key={`g-${i}`}
              variants={wordVariant}
              custom={titleWhiteWords.length + i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{
                ...goldGradient,
                display: 'inline-block',
                marginRight: i < titleGoldWords.length - 1 ? '0.27em' : 0,
              }}
            >
              {w}
            </motion.span>
          ))}
        </h2>

        <p className="text-white/70 text-xl font-normal max-[768px]:text-base">
          {descWords.map((w, i) => (
            <motion.span
              key={i}
              variants={wordVariant}
              custom={totalTitleWords + i * 0.75}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ display: 'inline-block', marginRight: i < descWords.length - 1 ? '0.25em' : 0 }}
            >
              {w}
            </motion.span>
          ))}
        </p>

        <div className="flex items-center gap-4 mt-2 max-[768px]:flex-col max-[768px]:w-full">
          <PixelButton
            variants={buttonVariant}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="h-14 px-7 rounded-full text-lg font-medium font-geist max-[768px]:w-full"
            bg="#C6F135"
            text="#000000"
            hoverBg="#FFFFFF"
            hoverText="#000000"
          >
            Open free account
          </PixelButton>
          <PixelButton
            variants={buttonVariant}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="h-14 px-7 rounded-full text-lg font-medium font-geist max-[768px]:w-full"
            bg="#FFFFFF"
            text="#000000"
            hoverBg="#EAF7C0"
            hoverText="#000000"
          >
            Talk to assistant
          </PixelButton>
        </div>

      </div>

    </section>
  )
}
