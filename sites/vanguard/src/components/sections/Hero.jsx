import { motion } from 'framer-motion'
import { useHoverPlayVideo } from '../../hooks/useHoverPlayVideo'
import PixelButton from '../PixelButton'

const goldGradient = {
  background: 'linear-gradient(to bottom, #FFCE62 0%, #895C1E 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  paddingBottom: '0.15em',
}

const wordVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut', delay: 0.5 + i * 0.06 },
  }),
}

const lineVariant = {
  hidden: { opacity: 0, y: 8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut', delay: 1.1 + i * 0.12 },
  }),
}

const buttonVariant = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20, delay: 1.4 },
  },
}

export default function Hero() {
  const { videoRef, onMouseEnter, onMouseLeave, onEnded } = useHoverPlayVideo({ finishIfPastHalf: true })

  return (
    <section className="relative min-h-screen max-[768px]:min-h-0 bg-black overflow-hidden">
      <div className="flex items-center min-h-screen pl-28 pr-8 pt-20 max-[768px]:px-5 max-[768px]:pt-28 max-[768px]:min-h-0 max-[768px]:items-start max-[768px]:pb-6 relative z-10 pointer-events-none">
        <motion.div
          className="flex flex-col gap-10 max-w-[700px] max-[768px]:max-w-full max-[768px]:gap-8"
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col gap-6">
            <h1 className="font-halant font-normal leading-none max-[768px]:leading-tight max-[768px]:-mt-5">
              <span style={{ display: 'block' }}>
                <motion.span className="text-white text-7xl max-[768px]:text-4xl" variants={wordVariant} custom={0}>Smart </motion.span>
                <motion.span className="text-white text-7xl max-[768px]:text-4xl" variants={wordVariant} custom={1}>Banking</motion.span>
              </span>
              <span style={{ display: 'block' }}>
                <motion.span className="text-white text-7xl max-[768px]:text-4xl" variants={wordVariant} custom={2}>build </motion.span>
                <motion.span className="text-white text-7xl max-[768px]:text-4xl" variants={wordVariant} custom={3}>for </motion.span>
                <motion.span className="text-7xl max-[768px]:text-4xl" style={goldGradient} variants={wordVariant} custom={4}>Modern</motion.span>
              </span>
              <span style={{ display: 'block' }}>
                <motion.span className="text-7xl max-[768px]:text-4xl" style={goldGradient} variants={wordVariant} custom={5}>business.</motion.span>
              </span>
            </h1>
            <video
              className="hidden max-[768px]:block w-full h-auto pointer-events-none max-[768px]:mt-2"
              src="/hero-video.mp4"
              poster="/hero-poster.webp"
              autoPlay
              muted
              loop
              playsInline
            />
            <p className="text-white/90 text-base font-normal leading-relaxed max-[768px]:mt-[30px]">
              <motion.span style={{ display: 'block' }} variants={lineVariant} custom={0}>
                Simplify payments, treasury, payroll, and global banking
              </motion.span>
              <motion.span style={{ display: 'block' }} variants={lineVariant} custom={1}>
                with one secure financial platform built for growing companies.
              </motion.span>
            </p>
          </div>

          <PixelButton
            variants={buttonVariant}
            className="self-start h-14 px-7 rounded-full text-lg font-medium font-geist pointer-events-auto"
            bg="#C6F135"
            text="#000000"
            hoverBg="#FFFFFF"
            hoverText="#000000"
          >
            Get started
          </PixelButton>
        </motion.div>
      </div>

      <div
        className="absolute pointer-events-none max-[768px]:hidden"
        style={{
          left: '38%',
          top: '120px',
          width: '65vw',
          height: '75vh',
          background: 'radial-gradient(ellipse at 52% 28%, rgba(255,255,255,0.06) 0%, transparent 70%)',
        }}
      />

      <video
        ref={videoRef}
        className="absolute left-[36%] top-[120px] w-[72vw] h-auto max-[768px]:hidden"
        src="/hero-video.mp4"
        poster="/hero-poster.webp"
        muted
        playsInline
        preload="auto"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onEnded={onEnded}
      />

      <div
        className="absolute bottom-0 pointer-events-none max-[768px]:hidden"
        style={{
          left: '40%',
          width: '80vw',
          height: '280px',
          background: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          transform: 'rotate(-14.6deg) translateY(40%)',
          filter: 'blur(40px)',
        }}
      />
    </section>
  )
}
