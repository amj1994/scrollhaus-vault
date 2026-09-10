import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { motion, useInView } from 'motion/react'

interface AnimatedLinesProps {
  text: string
  className?: string
  style?: CSSProperties
  duration?: number
  stagger?: number
  baseDelay?: number
  amount?: number
  targetOpacity?: number
  firstLineIndent?: number
  forceSingleLine?: boolean
}

function AnimatedLines({
  text,
  className,
  style,
  duration = 0.42,
  stagger = 0.06,
  baseDelay = 0,
  amount = 0.4,
  targetOpacity = 1,
  firstLineIndent,
  forceSingleLine = false,
}: AnimatedLinesProps) {
  const measureRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [lines, setLines] = useState<string[] | null>(forceSingleLine ? [text] : null)
  const words = text.split(' ')
  const inView = useInView(containerRef, { once: true, amount })

  useLayoutEffect(() => {
    setLines(forceSingleLine ? [text] : null)
  }, [text, forceSingleLine])

  useLayoutEffect(() => {
    if (forceSingleLine) return
    if (!('fonts' in document)) return
    document.fonts.ready.then(() => setLines(null))
  }, [forceSingleLine])

  useLayoutEffect(() => {
    if (forceSingleLine) return
    if (lines !== null) return
    const container = measureRef.current
    if (!container) return
    const spans = Array.from(container.querySelectorAll<HTMLSpanElement>('span[data-word]'))
    const groups: string[] = []
    let currentTop: number | null = null
    let currentWords: string[] = []
    spans.forEach((span, i) => {
      const top = span.offsetTop
      if (currentTop === null || top === currentTop) {
        currentWords.push(words[i])
      } else {
        groups.push(currentWords.join(' '))
        currentWords = [words[i]]
      }
      currentTop = top
    })
    if (currentWords.length) groups.push(currentWords.join(' '))
    setLines(groups)
  }, [lines, words, forceSingleLine])

  return (
    <div ref={containerRef} className={className} style={style}>
      {lines === null ? (
        <div ref={measureRef} style={{ visibility: 'hidden', textIndent: firstLineIndent }}>
          {words.map((word, i) => (
            <span key={i} data-word="">
              {word}{' '}
            </span>
          ))}
        </div>
      ) : (
        lines.map((line, i) => (
          <div
            key={i}
            style={{
              overflowY: 'hidden',
              overflowX: forceSingleLine ? 'visible' : 'hidden',
              whiteSpace: forceSingleLine ? 'nowrap' : undefined,
              paddingLeft: i === 0 ? firstLineIndent : undefined,
              paddingBottom: '0.3em',
              marginBottom: '-0.3em',
            }}
          >
            <motion.span
              style={{ display: 'inline-block' }}
              initial={{ y: '100%', opacity: 0 }}
              animate={inView ? { y: '0%', opacity: targetOpacity } : undefined}
              transition={{ duration, delay: baseDelay + i * stagger, ease: 'easeOut' }}
            >
              {line}
            </motion.span>
          </div>
        ))
      )}
    </div>
  )
}

export default AnimatedLines
