import { motion } from 'framer-motion'

const socials = [
  { src: 'https://qclay.design/lovable/fintech/X.svg', alt: 'X' },
  { src: 'https://qclay.design/lovable/fintech/Instagram.svg', alt: 'Instagram' },
  { src: 'https://qclay.design/lovable/fintech/Facebook.svg', alt: 'Facebook' },
  { src: 'https://qclay.design/lovable/fintech/LinkedIn.svg', alt: 'LinkedIn' },
  { src: 'https://qclay.design/lovable/fintech/YouTube.svg', alt: 'YouTube' },
]

const titleLine1 = ['Vanguard', 'works']
const titleLine2 = ['Nearly', 'everywhere.']
const titleWords = [...titleLine1, ...titleLine2]

const columnGroups = [
  [
    { title: 'Global Finance', items: ['International Transfers', 'Lounges', 'Investments shares', 'Insurance'] },
    { title: 'Investment', items: ['Stocks', 'Stocks & Shares ISA', 'Commodities'] },
  ],
  [
    { title: 'Help', items: ['Contact Us', 'Help Centre', 'System Status', 'Developers API', 'Site Map'] },
    { title: 'Company', items: ['Sustainability', 'Code of Conduct'] },
  ],
  [
    { title: 'Security & Protection', items: ['How We Protect Your Money', 'Report Lost Device', 'Learn About Fraud & Scams', 'Security Bugs', 'Consumer Security Insight Report'] },
    { title: 'Mobile & Connectivity', items: ['Mobile app', 'Data Plans'] },
  ],
  [
    { title: 'Mart Spendings', items: ['Cards', 'Send & Receive', 'Money Management', 'RevPoints', 'Linked Accounts', 'Shops'] },
    { title: 'Vanguard AI', items: ['AIV', 'banking AI'] },
  ],
  [
    { title: 'Plans', items: ['Standard', 'Plus', 'Premium', 'Metal', 'Ultra', 'Compare Plans'] },
  ],
]

const legalParagraphs = [
  'To learn more about the services provided by Vanguard and the entities through which they are offered, please refer to our Terms & Conditions and Frequently Asked Questions. If you require additional assistance, our support team is available through secure messaging and customer service channels.',
  'Vanguard Bank Ltd is registered in England and Wales (Registered No. 12345678). Registered office: 100 Canary Wharf, London, E14 5AB, United Kingdom. Authorised and regulated by the Financial Conduct Authority and Prudential Regulation Authority.',
  'Payment and banking services are provided by Vanguard Bank Ltd in accordance with applicable laws and regulations. Certain products and services may be subject to eligibility requirements and local availability.',
  'Investment products are offered through Vanguard Investments Ltd, an authorised financial services provider regulated under applicable financial services legislation. Investments can go down as well as up in value, and capital is at risk.',
  'The registered address of Vanguard Bank Ltd and its affiliated companies is 100 Canary Wharf, London, E14 5AB, United Kingdom. Please review our Privacy Policy, Terms of Service, and Regulatory Disclosures for additional information.',
]

const copyrightWords = '© Vanguard Bank Ltd 2026'.split(' ')
const legalParagraphWords = legalParagraphs.map((p) => p.split(' '))
const totalLegalWords = copyrightWords.length + legalParagraphWords.reduce((sum, w) => sum + w.length, 0)

const totalNavEntries = columnGroups.reduce(
  (sum, col) => sum + col.reduce((s, g) => s + 1 + g.items.length, 0),
  0
)

const ICON_STAGGER = 0.04
const PHASE1_END = (socials.length - 1) * ICON_STAGGER + 0.4

const TITLE_STAGGER = 0.04
const TITLE_DURATION = 0.35
const PHASE2_START = PHASE1_END
const PHASE2_END = PHASE2_START + (titleWords.length - 1) * TITLE_STAGGER + TITLE_DURATION

const ITEM_STAGGER = 0.008
const ITEM_DURATION = 0.3
const PHASE3_START = PHASE2_END
const PHASE3_END = PHASE3_START + (totalNavEntries - 1) * ITEM_STAGGER + ITEM_DURATION

const LEGAL_WORD_STAGGER = 0.002
const LEGAL_WORD_DURATION = 0.2
const PHASE4_START = PHASE3_END
const PHASE4_END = PHASE4_START + (totalLegalWords - 1) * LEGAL_WORD_STAGGER + LEGAL_WORD_DURATION

const iconVariant = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20, delay: i * ICON_STAGGER },
  }),
}

const titleWordVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: TITLE_DURATION, ease: 'easeOut', delay: PHASE2_START + i * TITLE_STAGGER },
  }),
}

const itemVariant = {
  hidden: { opacity: 0, y: 6 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: ITEM_DURATION, ease: 'easeOut', delay: PHASE3_START + i * ITEM_STAGGER },
  }),
}

const legalWordVariant = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: { duration: LEGAL_WORD_DURATION, ease: 'easeOut', delay: PHASE4_START + i * LEGAL_WORD_STAGGER },
  }),
}

const dividerVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut', delay: PHASE4_END } },
}

function renderWords(words, startIndex) {
  return words.map((word, i) => (
    <motion.span key={startIndex + i} variants={legalWordVariant} custom={startIndex + i}>
      {word}{i < words.length - 1 ? ' ' : ''}
    </motion.span>
  ))
}

function NavGroup({ title, items, globalIndex }) {
  return (
    <div className="flex flex-col gap-5">
      <motion.span
        className="text-black text-sm font-semibold font-sans capitalize leading-4"
        variants={itemVariant}
        custom={globalIndex}
      >
        {title}
      </motion.span>
      <div className="flex flex-col gap-4">
        {items.map((item, i) => (
          <motion.button
            key={item}
            className="text-black text-base font-normal font-sans capitalize leading-4 text-left cursor-pointer"
            variants={itemVariant}
            custom={globalIndex + 1 + i}
          >
            {item}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default function Footer() {
  let navCursor = 0
  const indexedColumns = columnGroups.map((col) =>
    col.map((group) => {
      const start = navCursor
      navCursor += 1 + group.items.length
      return { ...group, globalIndex: start }
    })
  )

  let wordCursor = copyrightWords.length
  const paragraphSpans = legalParagraphWords.map((words) => {
    const spans = renderWords(words, wordCursor)
    wordCursor += words.length
    return spans
  })

  return (
    <footer className="w-full overflow-hidden relative" style={{ backgroundColor: '#CCFF00' }}>
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/10 to-transparent pointer-events-none" />

      <motion.div
        className="px-[88px] pt-[88px] flex flex-col gap-12 relative z-10 max-[768px]:px-5 max-[768px]:pt-16 max-[768px]:gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="flex justify-between items-center max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-6">
          <h2 className="text-black font-halant font-normal text-6xl leading-[57.60px] whitespace-nowrap max-[768px]:text-3xl max-[768px]:leading-tight max-[768px]:whitespace-normal">
            <span style={{ display: 'block' }}>
              {titleLine1.map((word, i) => (
                <motion.span key={i} variants={titleWordVariant} custom={i}>
                  {word}{i < titleLine1.length - 1 ? ' ' : ''}
                </motion.span>
              ))}
            </span>
            <span style={{ display: 'block' }}>
              {titleLine2.map((word, i) => (
                <motion.span key={i} variants={titleWordVariant} custom={titleLine1.length + i}>
                  {word}{i < titleLine2.length - 1 ? ' ' : ''}
                </motion.span>
              ))}
            </span>
          </h2>
          <div className="flex items-center gap-5">
            {socials.map((s, i) => (
              <motion.img key={s.alt} src={s.src} alt={s.alt} className="h-6 w-auto" variants={iconVariant} custom={i} />
            ))}
          </div>
        </div>

        <div className="h-px bg-black/30" />

        <div className="flex justify-between items-start max-[768px]:grid max-[768px]:grid-cols-2 max-[768px]:justify-start max-[768px]:gap-x-6 max-[768px]:gap-y-10">
          {indexedColumns.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-10">
              {col.map((group) => (
                <NavGroup
                  key={group.title}
                  title={group.title}
                  items={group.items}
                  globalIndex={group.globalIndex}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 text-sm font-sans leading-4">
          <p className="font-semibold text-black capitalize">{renderWords(copyrightWords, 0)}</p>
          {paragraphSpans.map((spans, i) => (
            <p key={i} className="text-black/70 font-normal capitalize">{spans}</p>
          ))}
        </div>

        <motion.div className="h-px bg-black/30" variants={dividerVariant} />

        <div className="h-64 max-[768px]:h-24" />
      </motion.div>

      <img
        src="https://qclay.design/lovable/fintech/Vanguard.png"
        alt=""
        className="absolute bottom-0 left-4 w-full opacity-30 pointer-events-none"
      />
    </footer>
  )
}
