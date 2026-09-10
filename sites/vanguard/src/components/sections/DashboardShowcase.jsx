import { motion } from 'framer-motion'
import PixelButton from '../PixelButton'

const logos = [
  { src: 'https://qclay.design/lovable/fintech/Bedrock Logo.svg',  alt: 'Bedrock' },
  { src: 'https://qclay.design/lovable/fintech/Frame 12.svg',      alt: 'Investro' },
  { src: 'https://qclay.design/lovable/fintech/Accure Logo.svg',   alt: 'Accure' },
  { src: 'https://qclay.design/lovable/fintech/Waabi Logo.svg',    alt: 'Waabi' },
  { src: 'https://qclay.design/lovable/fintech/Stoke Logo.svg',    alt: 'Stoke' },
  { src: 'https://qclay.design/lovable/fintech/Frame 11.svg',      alt: 'Ideol Banks' },
  { src: 'https://qclay.design/lovable/fintech/Cephia Logo.svg',   alt: 'Cephia' },
]

const ourPlatformWords = ['Our', 'platform']
const headlineLine1 = ['See', 'your', 'business']
const headlineLine2 = ['finances', 'in', 'one', 'place.']
const descWords = 'Get a complete view of your finances with realtime insights across accounts, payments, and treasury operations.'.split(' ')
const trustedWords = ['Trusted', 'BY', 'INDUSTRY', 'LEADERS.']

const wordFade = {
  hidden: { opacity: 0, y: 10 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: 'easeOut', delay },
  }),
}

const buttonVariant = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20, delay: 2.05 },
  },
}

const simpleFade = {
  hidden: { opacity: 0 },
  visible: (delay) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut', delay },
  }),
}

function Word({ children, delay, style, className }) {
  return (
    <motion.span
      variants={wordFade}
      custom={delay}
      style={{ display: 'inline-block', marginRight: '0.27em', ...style }}
      className={className}
    >
      {children}
    </motion.span>
  )
}

export default function DashboardShowcase() {
  return (
    <section className="relative w-full h-[866px] max-[768px]:h-auto overflow-hidden">

      <motion.img
        src="https://qclay.design/lovable/fintech/Section5bg.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      />

      <motion.div
        className="absolute left-28 top-[217px] flex flex-col gap-10 max-w-[503px] max-[768px]:relative max-[768px]:left-0 max-[768px]:top-0 max-[768px]:max-w-full max-[768px]:w-full max-[768px]:px-5 max-[768px]:pt-24 max-[768px]:gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="flex flex-col gap-4">

          <p className="text-[#C6F135] text-base font-normal opacity-90">
            {ourPlatformWords.map((w, i) => (
              <Word key={i} delay={i * 0.09}>{w}</Word>
            ))}
          </p>

          <div className="flex flex-col gap-4">

            <h2 className="text-white text-6xl font-normal font-halant leading-[57.60px] whitespace-nowrap max-[768px]:text-3xl max-[768px]:leading-tight max-[768px]:whitespace-normal">
              <span style={{ display: 'block' }}>
                {headlineLine1.map((w, i) => (
                  <Word key={i} delay={0.3 + i * 0.09}>{w}</Word>
                ))}
              </span>
              <span style={{ display: 'block' }}>
                {headlineLine2.map((w, i) => (
                  <Word key={i} delay={0.3 + (headlineLine1.length + i) * 0.09}>{w}</Word>
                ))}
              </span>
            </h2>

            <p className="text-white/90 text-xl font-normal w-96 max-[768px]:text-base max-[768px]:w-full">
              {descWords.map((w, i) => (
                <Word key={i} delay={1.0 + i * 0.055}>{w}</Word>
              ))}
            </p>

          </div>
        </div>

        <PixelButton
          variants={buttonVariant}
          className="self-start h-14 px-7 rounded-full text-lg font-medium font-geist"
          bg="#C6F135"
          text="#000000"
          hoverBg="#FFFFFF"
          hoverText="#000000"
        >
          View product
        </PixelButton>
      </motion.div>

      <motion.p
        className="absolute left-28 top-[695px] text-white/90 text-base font-normal uppercase tracking-wide max-[768px]:relative max-[768px]:left-0 max-[768px]:top-0 max-[768px]:px-5 max-[768px]:mt-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {trustedWords.map((w, i) => (
          <Word key={i} delay={i * 0.1}>{w}</Word>
        ))}
      </motion.p>

      <motion.div
        className="absolute left-0 right-0 top-[740px] h-20 overflow-hidden max-[768px]:relative max-[768px]:top-0 max-[768px]:mt-8 max-[768px]:mb-10"
        variants={simpleFade}
        custom={0.45}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
      >
        <div
          className="flex flex-nowrap logo-marquee"
          style={{ animation: 'marquee 28s linear infinite', willChange: 'transform' }}
        >
          {[...logos, ...logos].map((logo, i) => (
            <div key={i} className="flex items-center shrink-0">
              <div className="w-px h-20 bg-white/10 shrink-0" />
              <div className="flex items-center justify-center px-14 max-[768px]:px-6 h-20 shrink-0">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-8 w-auto opacity-70 object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

    </section>
  )
}
