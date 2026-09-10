import { motion } from 'framer-motion'
import PixelButton from '../PixelButton'

const line1Words = ['Over', '$10B', 'in', 'annual', 'transaction', 'volume']
const line2Words = ['managed', 'through', 'our', 'platform.']

const goldStyle = {
  background: 'linear-gradient(to bottom, #FFCE62 0%, #895C1E 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  display: 'inline-block',
  paddingBottom: '0.15em',
}

const wordVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut', delay: i * 0.07 },
  }),
}

const logoGridVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 },
  },
}

const bgVariants = {
  rest: { scale: 0 },
  hover: { scale: 1, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
}

const imgVariants = {
  rest: { filter: 'brightness(0.7)' },
  hover: { filter: 'brightness(0)', transition: { duration: 0.2 } },
}

const row1 = [
  { src: 'https://qclay.design/lovable/fintech/Bedrock Logo.svg', alt: 'Bedrock' },
  { src: 'https://qclay.design/lovable/fintech/Frame 12.svg',     alt: 'Investro' },
  { src: 'https://qclay.design/lovable/fintech/Frame 11.svg',     alt: 'Ideol Banks' },
  { src: 'https://qclay.design/lovable/fintech/Cephia Logo.svg',  alt: 'Cephia', imgClass: 'max-h-14' },
]

const row2 = [
  { src: 'https://qclay.design/lovable/fintech/Accure Logo.svg', alt: 'Accure' },
  { src: 'https://qclay.design/lovable/fintech/Waabi Logo.svg',  alt: 'Waabi' },
  { src: 'https://qclay.design/lovable/fintech/Stoke Logo.svg',  alt: 'Stoke' },
]

function LogoCell({ src, alt, imgClass, borderRight, flexClass, mobileBorderRight, mobileBorderBottom }) {
  const borderClasses = [
    borderRight ? 'border-r border-white/25' : '',
    'max-[768px]:border-r-0',
    mobileBorderRight ? 'max-[768px]:border-r max-[768px]:border-white/25' : '',
    mobileBorderBottom ? 'max-[768px]:border-b max-[768px]:border-white/25' : '',
  ].filter(Boolean).join(' ')

  return (
    <motion.div
      className={`relative overflow-hidden flex items-center justify-center py-4 px-4 ${borderClasses}${flexClass ? ` ${flexClass}` : ''}`}
      initial="rest"
      whileHover="hover"
      whileTap="hover"
      animate="rest"
    >
      <motion.div
        className="absolute inset-0 bg-[#CCFF00]"
        variants={bgVariants}
      />
      <motion.img
        src={src}
        alt={alt}
        className={`${imgClass ?? 'max-h-8'} w-auto object-contain relative z-10`}
        variants={imgVariants}
      />
    </motion.div>
  )
}

export default function Stats() {
  return (
    <section className="w-full bg-black py-20 px-10 max-[768px]:py-12 max-[768px]:px-5">

      <motion.h2
        className="text-center font-halant font-normal leading-tight w-full mb-16 pb-1 max-[768px]:mb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <span>
          {line1Words.map((word, i) => (
            <motion.span
              key={word}
              className="text-white text-6xl max-[768px]:text-3xl"
              variants={wordVariant}
              custom={i}
            >
              {word}{i < line1Words.length - 1 ? ' ' : ''}
            </motion.span>
          ))}
        </span>
        <br />
        <span>
          {line2Words.map((word, i) => (
            <motion.span
              key={word}
              style={{ ...goldStyle, marginRight: i < line2Words.length - 1 ? '0.27em' : 0 }}
              className="text-6xl max-[768px]:text-3xl"
              variants={wordVariant}
              custom={line1Words.length + i}
            >
              {word}
            </motion.span>
          ))}
        </span>
      </motion.h2>

      <motion.div
        className="max-w-[1122px] mx-auto border-t border-b border-white/25"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={logoGridVariant}
      >

        <div className="grid grid-cols-4 max-[768px]:grid-cols-2">
          {row1.map(({ src, alt, imgClass }, i) => (
            <LogoCell
              key={alt}
              src={src}
              alt={alt}
              imgClass={imgClass}
              borderRight={i < row1.length - 1}
              mobileBorderRight={i % 2 === 0}
              mobileBorderBottom={i < 2}
            />
          ))}
        </div>

        <div className="flex max-[768px]:flex-col border-t border-white/25">
          <LogoCell src={row2[0].src} alt={row2[0].alt} borderRight flexClass="flex-[2]" mobileBorderBottom />
          <LogoCell src={row2[1].src} alt={row2[1].alt} borderRight flexClass="flex-[1]" mobileBorderBottom />
          <LogoCell src={row2[2].src} alt={row2[2].alt} flexClass="flex-[2]" />
        </div>

      </motion.div>

      <motion.div
        className="relative max-w-[1122px] mx-auto mt-[72px] rounded-3xl overflow-hidden min-h-96 max-[768px]:min-h-0"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
      >

        <img
          src="https://qclay.design/lovable/fintech/Bg Blr.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-10 flex flex-col items-center justify-center gap-10 max-[768px]:gap-6 py-28 px-10 max-[768px]:py-16 max-[768px]:px-6">
          <motion.p
            className="text-white text-5xl font-normal font-halant leading-tight text-center max-w-[820px] max-[768px]:text-2xl max-[768px]:max-w-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.35 }}
          >
            The trusted banking<br />infrastructure for managing<br />and moving money globally.
          </motion.p>
          <PixelButton
            className="h-14 px-7 rounded-full text-lg font-medium font-geist"
            bg="#FFFFFF"
            text="#000000"
            hoverBg="#EAF7C0"
            hoverText="#000000"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.55 }}
          >
            Become investor
          </PixelButton>
        </div>

      </motion.div>

    </section>
  )
}
