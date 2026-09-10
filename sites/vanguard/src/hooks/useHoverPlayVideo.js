import { useRef } from 'react'

// Plays a video forward on hover and reverse-rewinds it on mouse leave.
// If hover re-triggers while a rewind is still in progress, the rewind is
// allowed to finish first so the direction change never jumps abruptly.
// With finishIfPastHalf, leaving the mouse after the video is already at
// least halfway through lets it keep playing to the end instead of
// reversing back to start.
export function useHoverPlayVideo({ finishIfPastHalf = false } = {}) {
  const videoRef = useRef(null)
  const rafRef = useRef(null)
  const isHovering = useRef(false)
  const isRewinding = useRef(false)
  const pendingPlay = useRef(false)

  const cancelRaf = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }

  const playFromStart = () => {
    const vid = videoRef.current
    if (!vid) return
    cancelRaf()
    isRewinding.current = false
    pendingPlay.current = false
    vid.currentTime = 0
    vid.play().catch(() => {})
  }

  const rewindToStart = () => {
    const vid = videoRef.current
    if (!vid) return
    vid.pause()
    isRewinding.current = true

    let lastTimestamp = null

    const step = (timestamp) => {
      const v = videoRef.current
      if (!v) return

      if (lastTimestamp === null) {
        lastTimestamp = timestamp
        rafRef.current = requestAnimationFrame(step)
        return
      }

      const elapsed = (timestamp - lastTimestamp) / 1000
      lastTimestamp = timestamp

      if (v.currentTime <= 0) {
        v.currentTime = 0
        cancelRaf()
        isRewinding.current = false
        if (pendingPlay.current) playFromStart()
        return
      }

      v.currentTime = Math.max(0, v.currentTime - elapsed)
      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)
  }

  const onMouseEnter = () => {
    isHovering.current = true
    if (isRewinding.current) {
      pendingPlay.current = true
      return
    }
    playFromStart()
  }

  const onMouseLeave = () => {
    isHovering.current = false
    pendingPlay.current = false

    const vid = videoRef.current
    if (finishIfPastHalf && vid && vid.duration && vid.currentTime / vid.duration >= 0.5) {
      return
    }

    if (!isRewinding.current) rewindToStart()
  }

  const onEnded = () => {
    if (isHovering.current) rewindToStart()
  }

  return { videoRef, onMouseEnter, onMouseLeave, onEnded }
}
