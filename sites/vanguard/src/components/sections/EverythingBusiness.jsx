import { motion } from 'framer-motion'
import PixelButton from '../PixelButton'

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
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: i * 0.15 },
  }),
}

const whiteWords = ['Everything', 'your', 'business']
const goldWords = ['needs', 'to', 'move', 'money.']

export default function EverythingBusiness() {
  return (
    <section className="w-full bg-black py-20 px-[112px] max-[768px]:py-12 max-[768px]:px-5">

      <motion.h2
        className="text-center font-halant font-normal text-6xl leading-[57.60px] mb-12 whitespace-nowrap mx-auto max-[768px]:text-3xl max-[768px]:leading-tight max-[768px]:mb-8 max-[768px]:whitespace-normal"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <span style={{ display: 'block' }}>
          {whiteWords.map((word, i) => (
            <motion.span
              key={i}
              className="text-white"
              variants={wordVariant}
              custom={i}
              style={{ display: 'inline-block', marginRight: i < whiteWords.length - 1 ? '0.27em' : 0 }}
            >
              {word}
            </motion.span>
          ))}
        </span>
        <span style={{ display: 'block' }}>
          {goldWords.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariant}
              custom={whiteWords.length + i}
              style={{ ...goldGradient, display: 'inline-block', marginRight: i < goldWords.length - 1 ? '0.27em' : 0 }}
            >
              {word}
            </motion.span>
          ))}
        </span>
      </motion.h2>

      <div className="flex gap-6 max-[768px]:flex-col">

        <motion.div
          className="flex-[754] relative rounded-3xl overflow-hidden bg-black shadow-[0px_0px_0px_1.5px_rgba(255,255,255,0.20)] h-[600px] max-[768px]:flex-none max-[768px]:h-auto"
          variants={cardVariant}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="relative z-10 flex flex-col gap-8 max-[768px]:gap-6 px-10 pt-[45px] max-[768px]:px-6 max-[768px]:pt-8 max-[768px]:pb-8">
            <div className="flex flex-col gap-4">
              <h3 className="text-5xl font-halant font-normal leading-10 text-white max-[768px]:text-3xl max-[768px]:leading-tight">
                Transaction Banking
              </h3>
              <p className="text-xl font-normal text-white/80 max-w-[578px] max-[768px]:text-base max-[768px]:max-w-full">
                Supporting you in accessing cross-border trade and investment opportunities through Payments, Liquidity and Trade & Working Capital management.
              </p>
            </div>
            <PixelButton
              className="self-start h-14 px-7 rounded-full text-lg font-medium font-geist"
              bg="#C6F135"
              text="#000000"
              hoverBg="#FFFFFF"
              hoverText="#000000"
            >
              Get started
            </PixelButton>
          </div>

          <img
            src="https://qclay.design/lovable/fintech/LeftCard3Section.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover scale-[1.02] pointer-events-none"
          />
        </motion.div>

        <motion.div
          className="flex-[510] relative rounded-3xl overflow-hidden bg-black shadow-[0px_0px_0px_1.5px_rgba(255,255,255,0.20)] h-[600px] max-[768px]:flex-none max-[768px]:h-auto"
          variants={cardVariant}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="relative z-10 flex flex-col items-center gap-8 max-[768px]:gap-6 px-10 pt-[40px] max-[768px]:px-6 max-[768px]:pt-8 max-[768px]:pb-8">
            <div className="flex flex-col gap-4">
              <h3 className="text-5xl font-halant font-normal leading-10 text-white text-center max-[768px]:text-3xl max-[768px]:leading-tight">
                Strategic capabilities
              </h3>
              <p className="text-xl font-normal text-white/80 text-center max-[768px]:text-base">
                Grow and scale globally with our market-leading capabilities in Vanguard Banking, and Transition.
              </p>
            </div>
            <PixelButton
              className="h-14 px-7 rounded-full text-lg font-medium font-geist"
              bg="#C6F135"
              text="#000000"
              hoverBg="#FFFFFF"
              hoverText="#000000"
            >
              Get started
            </PixelButton>
          </div>

          <img
            src="https://qclay.design/lovable/fintech/RightCard3Section.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover scale-[1.02] pointer-events-none"
          />
        </motion.div>

      </div>

    </section>
  )
}
