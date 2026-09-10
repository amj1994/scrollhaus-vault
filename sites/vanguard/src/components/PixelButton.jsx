import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// Deterministic pseudo-random per-cell threshold so the sweep pattern is stable across frames.
function hash(i) {
  let t = (i * 374761393 + 668265263) | 0
  t = ((t ^ (t >> 13)) * 1274126177) | 0
  return ((t ^ (t >> 16)) >>> 0) / 4294967295
}

export default function PixelButton({
  children,
  className = '',
  bg,
  text,
  hoverBg,
  hoverText,
  pixelSize = 6,
  speed = 0.45,
  onClick,
  ...motionProps
}) {
  const rootRef = useRef(null)
  const canvasRef = useRef(null)
  const [labelHover, setLabelHover] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    if (!root || !canvas) return

    const ctx = canvas.getContext('2d')
    const speedUnits = 1 / Math.max(speed, 0.1)
    const state = {
      W: 0, H: 0, cols: 1, rows: 1,
      thresholds: new Float32Array(1),
      progress: 0, target: 0, raf: 0, lastT: 0,
    }

    function rebuildGrid() {
      state.cols = Math.max(1, Math.ceil(state.W / pixelSize))
      state.rows = Math.max(1, Math.ceil(state.H / pixelSize))
      state.thresholds = new Float32Array(state.cols * state.rows)
      for (let y = 0; y < state.rows; y++) {
        for (let x = 0; x < state.cols; x++) {
          const i = y * state.cols + x
          state.thresholds[i] = (x / Math.max(state.cols - 1, 1) * 0.65 + hash(i) * 0.35) * 0.92
        }
      }
    }

    function draw(p) {
      ctx.clearRect(0, 0, state.W, state.H)
      if (p <= 0) return
      ctx.fillStyle = hoverBg
      for (let y = 0; y < state.rows; y++) {
        for (let x = 0; x < state.cols; x++) {
          const thr = state.thresholds[y * state.cols + x]
          if (p <= thr) continue
          ctx.globalAlpha = p - thr < 0.12 ? 0.45 : 1
          ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize)
        }
      }
      ctx.globalAlpha = 1
    }

    function frame(now) {
      const dt = (now - state.lastT) / 1000
      state.lastT = now
      state.progress = state.target > state.progress
        ? Math.min(state.progress + dt * speedUnits, 1)
        : Math.max(state.progress - dt * speedUnits, 0)
      draw(state.progress)
      setLabelHover(state.progress > 0.6)
      state.raf = state.progress !== state.target ? requestAnimationFrame(frame) : 0
    }

    function kick() {
      if (state.raf) return
      state.lastT = performance.now()
      state.raf = requestAnimationFrame(frame)
    }

    // Uses the observer's own contentRect rather than getBoundingClientRect(),
    // because contentRect reflects the untransformed layout box — it stays
    // correct even while the button is mid scale(0 -> 1) entrance animation,
    // whereas getBoundingClientRect() would report 0x0 during scale(0) and
    // ResizeObserver never re-fires for transform-only changes to recover.
    function resize(contentRect) {
      state.W = contentRect.width
      state.H = contentRect.height
      if (state.W === 0 || state.H === 0) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = state.W * dpr
      canvas.height = state.H * dpr
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
      rebuildGrid()
      draw(state.progress)
    }

    const onEnter = () => { state.target = 1; kick() }
    const onLeave = () => { state.target = 0; kick() }
    root.addEventListener('pointerenter', onEnter)
    root.addEventListener('pointerleave', onLeave)

    const ro = new ResizeObserver((entries) => resize(entries[0].contentRect))
    ro.observe(root)

    return () => {
      root.removeEventListener('pointerenter', onEnter)
      root.removeEventListener('pointerleave', onLeave)
      ro.disconnect()
      if (state.raf) cancelAnimationFrame(state.raf)
    }
  }, [hoverBg, pixelSize, speed])

  return (
    <motion.button
      ref={rootRef}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center overflow-hidden ${className}`}
      style={{ backgroundColor: bg, WebkitTapHighlightColor: 'transparent' }}
      {...motionProps}
    >
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" />
      <span
        className="relative z-10 transition-colors duration-150"
        style={{ color: labelHover ? hoverText : text }}
      >
        {children}
      </span>
    </motion.button>
  )
}
