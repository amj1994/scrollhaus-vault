import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const goldGradient = {
  background: 'linear-gradient(to bottom, #FFCE62 0%, #895C1E 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  paddingBottom: '0.15em',
}

const faqs = [
  {
    question: 'How long does onboarding take?',
    answer: 'Most businesses are fully verified and onboarded within 24 hours. Our team handles document review and account setup so you can start banking immediately.',
  },
  {
    question: 'Is there a minimum deposit?',
    answer: 'No, there is no minimum deposit required to open a Vanguard business account. You can start with any amount that suits your business.',
  },
  {
    question: 'Which countries do you support?',
    answer: 'Vanguard supports businesses across the UK, EU, and select international markets, with local and cross-border payment rails built in.',
  },
  {
    question: 'Can I add multiple users to my account?',
    answer: 'Yes, you can invite team members and assign role-based permissions, giving each person the right level of access to accounts and controls.',
  },
  {
    question: 'Is support available 24/77?',
    answer: 'Yes, our dedicated support team is available around the clock to assist with any questions about your account, payments, or platform features.',
  },
]

const titleWord = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: 'easeOut', delay: i * 0.09 },
  }),
}

const rowFade = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.12 },
  }),
}

const lineDraw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.8, ease: 'easeOut', delay: 0.2 + i * 0.12 },
      opacity: { duration: 0.1, delay: 0.2 + i * 0.12 },
    },
  }),
}

const titleWords = ['Frequently', 'asked', 'questions.']

export default function FAQ() {
  const [openIndexes, setOpenIndexes] = useState(() => new Set([0]))

  const toggleIndex = (i) => {
    setOpenIndexes((prev) => {
      const next = new Set(prev)
      if (next.has(i)) {
        next.delete(i)
      } else {
        next.add(i)
      }
      return next
    })
  }

  return (
    <section className="w-full bg-black px-[112px] py-[140px] max-[768px]:px-5 max-[768px]:py-20">

      <motion.h2
        className="text-6xl font-normal font-halant leading-[57.60px] mb-20 max-[768px]:text-3xl max-[768px]:leading-tight max-[768px]:mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {titleWords.map((w, i) => (
          <motion.span
            key={i}
            variants={titleWord}
            custom={i}
            style={{
              ...(i === titleWords.length - 1 ? goldGradient : { color: '#FFFFFF' }),
              display: 'inline-block',
              marginRight: i < titleWords.length - 1 ? '0.27em' : 0,
            }}
          >
            {w}
          </motion.span>
        ))}
      </motion.h2>

      <div className="max-w-[900px]">
        {faqs.map((faq, i) => {
          const isOpen = openIndexes.has(i)
          return (
            <motion.div
              key={faq.question}
              className="w-full"
              variants={rowFade}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <button
                type="button"
                onClick={() => toggleIndex(i)}
                className="w-full flex items-center justify-between gap-6 py-8 text-left"
              >
                <span className="text-white text-2xl font-normal font-halant max-[768px]:text-lg">
                  {faq.question}
                </span>
                <span
                  className="text-3xl font-normal leading-none shrink-0"
                  style={{ color: isOpen ? '#C6F135' : '#5A5A5A' }}
                >
                  {isOpen ? '-' : '+'}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-white/70 text-lg font-normal pb-8 max-w-[720px] max-[768px]:text-base">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <svg width="100%" height="1" overflow="visible">
                <motion.line
                  x1="0" y1="0" x2="100%" y2="0"
                  stroke="#FFFFFF"
                  strokeOpacity="0.15"
                  strokeWidth="1"
                  variants={lineDraw}
                  custom={i}
                />
              </svg>
            </motion.div>
          )
        })}
      </div>

    </section>
  )
}
