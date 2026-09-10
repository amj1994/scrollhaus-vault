import { useEffect, useRef } from 'react'

const HN = { fontFamily: "'Helvetica Neue ME', 'Helvetica Neue', sans-serif" }

const VIDEO_URL = 'https://video.gumlet.io/6a7e9e0f2621db881577453e/6a9e3cb2d9ae2eeb4b7a8756/main.mp4'
const OVERLAY_URL = '/assets/hero-overlay.png'

const LERP_TAU = 10
const SNAP = 0.002
const LRU_MAX = 28
const LEAD = 20
const WATCHDOG_MS = 45000
const MP4BOX_CDN = 'https://cdn.jsdelivr.net/npm/mp4box@0.5.2/dist/mp4box.all.min.js'

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v)

function loadMP4Box(): Promise<any> {
  const w = window as any
  if (w.MP4Box) return Promise.resolve(w.MP4Box)
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${MP4BOX_CDN}"]`) as HTMLScriptElement | null
    const done = () => (w.MP4Box ? resolve(w.MP4Box) : reject(new Error('mp4box missing')))
    if (existing) { existing.addEventListener('load', done); existing.addEventListener('error', reject); return }
    const s = document.createElement('script')
    s.src = MP4BOX_CDN
    s.async = true
    s.onload = done
    s.onerror = reject
    document.head.appendChild(s)
  })
}

type Bank = {
  frames: { ts: number; blob: Blob }[]
  lru: Map<number, ImageBitmap | null>
  drawnIndex: number
  ready: boolean
  reverted: boolean
  painted: boolean
}

export default function ScrollVideoHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  const startRef = useRef(0)
  const endRef = useRef(1)
  const targetRef = useRef(0)
  const currentRef = useRef(0)
  const rafRef = useRef(0)
  const lastRef = useRef(0)
  const bankRef = useRef<Bank>({ frames: [], lru: new Map(), drawnIndex: -1, ready: false, reverted: false, painted: false })

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!section || !video || !canvas) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = canvas.getContext('2d', { alpha: false })
    let aborted = false

    const measure = () => {
      const start = window.scrollY + section.getBoundingClientRect().top
      startRef.current = start
      endRef.current = start + section.offsetHeight - window.innerHeight
    }

    const applyPositions = (progress: number, scrollPx: number) => {
      const heroScroll = Math.max(0, 1 - progress * 8)
      if (heroRef.current) {
        heroRef.current.style.opacity = String(heroScroll)
        heroRef.current.style.transform = `translateY(${(1 - heroScroll) * -30}%)`
      }
      if (overlayRef.current) {
        overlayRef.current.style.opacity = String(Math.max(0, 1 - Math.max(0, scrollPx - 150) / 30))
      }
      for (let i = 0; i < 4; i++) {
        const el = sectionRefs.current[i]
        if (!el) continue
        const local = (progress - (i + 1) / 5) / (1 / 5)
        const t = local < 0 ? 1 : local > 1 ? -1 : 1 - 2 * local
        el.style.transform = `translateY(${t * 100}%)`
        el.style.opacity = Math.abs(t) < 1 ? '1' : '0'
        el.style.pointerEvents = Math.abs(t) < 1 ? 'auto' : 'none'
      }
    }

    const onScroll = () => {
      const span = endRef.current - startRef.current
      const progress = clamp((window.scrollY - startRef.current) / (span || 1), 0, 1)
      if (video.duration) targetRef.current = progress * video.duration
      applyPositions(progress, Math.max(0, window.scrollY - startRef.current))
    }

    const nearestIndex = (t: number) => {
      const f = bankRef.current.frames
      const us = t * 1e6
      let lo = 0, hi = f.length - 1
      while (lo < hi) {
        const mid = (lo + hi) >> 1
        if (f[mid].ts < us) lo = mid + 1
        else hi = mid
      }
      if (lo > 0 && Math.abs(f[lo - 1].ts - us) < Math.abs(f[lo].ts - us)) return lo - 1
      return lo
    }

    const warm = (i: number) => {
      const bank = bankRef.current
      for (let k = i - 1; k <= i + 2; k++) {
        if (k < 0 || k >= bank.frames.length || bank.lru.has(k)) continue
        bank.lru.set(k, null)
        createImageBitmap(bank.frames[k].blob).then(bm => {
          if (aborted) { bm.close(); return }
          bank.lru.set(k, bm)
        }).catch(() => bank.lru.delete(k))
      }
      // never evict the frame we are showing or the ones we just warmed
      const keep = new Set([i - 1, i, i + 1, i + 2, bank.drawnIndex])
      while (bank.lru.size > LRU_MAX) {
        let evicted = false
        for (const k of bank.lru.keys()) {
          if (keep.has(k)) continue
          const bm = bank.lru.get(k)
          if (bm) bm.close()
          bank.lru.delete(k)
          evicted = true
          break
        }
        if (!evicted) break
      }
    }

    const drawFromBank = (t: number) => {
      const bank = bankRef.current
      if (!bank.ready || !bank.frames.length || !ctx) return false
      const i = nearestIndex(t)
      const bm = bank.lru.get(i)
      if (bm && i !== bank.drawnIndex) {
        try {
          ctx.drawImage(bm, 0, 0, canvas.width, canvas.height)
          bank.drawnIndex = i
          if (!bank.painted) { bank.painted = true; canvas.style.opacity = '1' }
        } catch {
          bank.lru.delete(i)
        }
      }
      warm(i)
      return bm ? true : bank.drawnIndex === i
    }

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - (lastRef.current || now)) / 1000)
      lastRef.current = now
      if (reduced) currentRef.current = 0
      else {
        const smoothing = 1 - Math.exp(-dt * LERP_TAU)
        currentRef.current += (targetRef.current - currentRef.current) * smoothing
        if (Math.abs(targetRef.current - currentRef.current) < SNAP) currentRef.current = targetRef.current
      }
      const t = currentRef.current
      try {
        if (!drawFromBank(t)) {
          if (!video.seeking && Math.abs(video.currentTime - t) > 0.01) {
            try { video.currentTime = t } catch { /* ignore */ }
          }
        }
      } catch { /* never let one bad frame stop the loop */ }
      rafRef.current = requestAnimationFrame(tick)
    }

    const showVideo = () => { video.style.opacity = '1' }
    const startLoop = () => {
      cancelAnimationFrame(rafRef.current)
      lastRef.current = 0
      rafRef.current = requestAnimationFrame(tick)
    }
    const onMeta = () => { measure(); onScroll(); startLoop(); maybeBuild() }

    // ---- frame bank ----
    const revert = () => {
      const bank = bankRef.current
      bank.reverted = true
      bank.ready = false
      canvas.style.opacity = '0'
    }

    const build = async () => {
      if (reduced || typeof (window as any).VideoDecoder === 'undefined') return
      const bank = bankRef.current
      if (bank.reverted || bank.ready) return
      const watchdog = window.setTimeout(revert, WATCHDOG_MS)
      try {
        const MP4Box = await loadMP4Box()
        const res = await fetch(VIDEO_URL)
        if (!res.ok) throw new Error('fetch failed')
        const buf = (await res.arrayBuffer()) as any
        if (aborted) return
        buf.fileStart = 0

        let softPass = false
        const run = (hw: 'no-preference' | 'prefer-software') => new Promise<void>((resolve, reject) => {
          const file = MP4Box.createFile()
          let decoder: any = null
          let chain: Promise<void> = Promise.resolve()
          let outputs = 0
          const frames: { ts: number; blob: Blob }[] = []
          let off: HTMLCanvasElement | null = null
          let octx: CanvasRenderingContext2D | null = null

          const until = (n: number) => new Promise<void>(r => {
            const check = () => (outputs >= n ? r() : setTimeout(check, 8))
            check()
          })

          file.onError = (e: any) => reject(new Error('mp4box: ' + e))
          const DS = (MP4Box as any).DataStream || (window as any).DataStream
          file.onReady = (info: any) => {
            try {
            const track = info.videoTracks && info.videoTracks[0]
            if (!track) return reject(new Error('no video track'))
            const trak = file.getTrackById(track.id)
            let description: Uint8Array | undefined
            for (const entry of trak.mdia.minf.stbl.stsd.entries) {
              const box = entry.avcC || entry.hvcC || entry.vpcC || entry.av1C
              if (box) {
                const stream = new DS(undefined, 0, DS.BIG_ENDIAN)
                box.write(stream)
                description = new Uint8Array(stream.buffer, 8)
                break
              }
            }

            decoder = new (window as any).VideoDecoder({
              output: (frame: any) => {
                chain = chain.then(async () => {
                  if (!off) {
                    off = document.createElement('canvas')
                    off.width = frame.codedWidth || 1280
                    off.height = frame.codedHeight || 720
                    octx = off.getContext('2d', { alpha: false })
                  }
                  const ts = frame.timestamp
                  octx!.drawImage(frame, 0, 0, off!.width, off!.height)
                  frame.close()
                  const blob = await new Promise<Blob | null>(r => off!.toBlob(r, 'image/webp', 0.82))
                  if (blob) frames.push({ ts, blob })
                  outputs++
                })
              },
              error: (e: any) => reject(e),
            })
            decoder.configure({
              codec: track.codec,
              codedWidth: track.video.width,
              codedHeight: track.video.height,
              description,
              hardwareAcceleration: hw,
            })
            file.setExtractionOptions(track.id, null, { nbSamples: Infinity })
            file.start()
            } catch (e) { reject(e as Error) }
          }

          file.onSamples = async (_id: any, _user: any, samples: any[]) => {
            if (!samples.length) return reject(new Error('no samples'))
            try {
              for (let i = 0; i < samples.length; i++) {
                const s = samples[i]
                decoder.decode(new (window as any).EncodedVideoChunk({
                  type: s.is_sync ? 'key' : 'delta',
                  timestamp: (s.cts * 1e6) / s.timescale,
                  duration: (s.duration * 1e6) / s.timescale,
                  data: s.data,
                }))
                if (i - LEAD > 0) await until(i - LEAD)
                if (aborted) return
              }
              await decoder.flush()
              await chain
              if (aborted) return
              if (!frames.length) return reject(new Error('no frames'))
              frames.sort((a, b) => a.ts - b.ts)
              bank.frames = frames
              const i0 = Math.max(0, Math.min(frames.length - 1, 0))
              const bm = await createImageBitmap(frames[i0].blob)
              bank.lru.set(i0, bm)
              bank.ready = true
              drawFromBank(currentRef.current)
              resolve()
            } catch (e) { reject(e as Error) }
          }

          file.appendBuffer(buf)
          file.flush()
        })

        try {
          await run('no-preference')
        } catch (e) {
          if (softPass) throw e
          softPass = true
          bank.frames = []
          bank.lru.forEach(bm => bm && bm.close())
          bank.lru.clear()
          bank.drawnIndex = -1
          await run('prefer-software')
        }
      } catch {
        revert()
      } finally {
        window.clearTimeout(watchdog)
      }
    }

    const maybeBuild = () => {
      if (!video.duration) return
      if (document.readyState === 'complete') build()
      else window.addEventListener('load', () => build(), { once: true })
    }

    if (video.readyState >= 2) showVideo()
    if (video.readyState >= 1) onMeta()
    video.addEventListener('loadeddata', showVideo)
    video.addEventListener('seeked', showVideo)
    video.addEventListener('loadedmetadata', onMeta)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    measure()
    onScroll()

    return () => {
      aborted = true
      cancelAnimationFrame(rafRef.current)
      video.removeEventListener('loadeddata', showVideo)
      video.removeEventListener('seeked', showVideo)
      video.removeEventListener('loadedmetadata', onMeta)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
      bankRef.current.lru.forEach(bm => bm && bm.close())
      bankRef.current.lru.clear()
      bankRef.current.frames = []
    }
  }, [])

  const overlayStyle = { opacity: 0, pointerEvents: 'none' as const, transform: 'translateY(100%)' }

  return (
    <section ref={sectionRef} className="relative" style={{ height: '500vh' }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#DADADA] will-change-transform">
        <video
          ref={videoRef}
          src={VIDEO_URL}
          muted
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0, background: '#DADADA', willChange: 'auto' }}
        />

        <canvas
          ref={canvasRef}
          width={1280}
          height={720}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200"
          style={{ opacity: 0 }}
        />

        <div ref={overlayRef} className="absolute inset-0 z-30 pointer-events-none">
          <img alt="" src={OVERLAY_URL} className="w-full h-full object-cover" />
        </div>

        <div ref={heroRef} className="absolute inset-0 z-10 flex flex-col">
          <div className="flex justify-center mt-12 md:mt-14">
            <h1
              className="text-[20vw] md:text-[22vw] font-black tracking-[-0.04em] leading-[0.75] text-black uppercase select-none"
              style={HN}
            >
              ARGENT
            </h1>
          </div>
          <div className="absolute bottom-6 left-6 md:left-10 md:bottom-8">
            <p className="text-[9px] md:text-[10px] tracking-[0.15em] uppercase leading-[1.8] text-black/80">
              RITUALS REFINED:
              <br />
              TRACING LINE, LIGHT &amp; SKIN
              <br />
              ACROSS A LIVING FORM.
            </p>
          </div>
        </div>

        <div ref={el => (sectionRefs.current[0] = el)} className="absolute inset-0 z-20 will-change-transform flex flex-col justify-start p-6 md:p-12 lg:p-16" style={overlayStyle}>
          <div className="max-w-md mt-12 md:mt-20">
            <div className="text-[11px] tracking-[0.25em] uppercase text-black/50 mb-5">ORIGIN</div>
            <p className="text-base md:text-lg leading-[1.7] text-black/85 font-light" style={HN}>
              Argent was opened by two hands that had grown tired of noise. Iver Lund and Sanne Holm, known across
              Northern Europe for single-needle botanical work and minimal composition, keep one room in Copenhagen
              and take one client at a time.
            </p>
          </div>
        </div>

        <div ref={el => (sectionRefs.current[1] = el)} className="absolute inset-0 z-20 will-change-transform flex items-start justify-end p-6 md:p-12 lg:p-16 pt-20 md:pt-28" style={overlayStyle}>
          <div className="bg-black/85 backdrop-blur-sm px-6 py-5 max-w-[340px] border border-white/5">
            <div className="text-[11px] tracking-[0.25em] uppercase text-white/40 mb-3">Premise</div>
            <p className="text-sm md:text-[15px] leading-[1.7] text-white/75 font-light" style={HN}>
              The room is deliberately empty. There is nothing here to look at but the light, the linen, and the line
              being made. Restraint is not a style for us, it is the entire method.
            </p>
          </div>
        </div>

        <div ref={el => (sectionRefs.current[2] = el)} className="absolute inset-0 z-20 will-change-transform" style={overlayStyle}>
          <div className="absolute top-12 md:top-16 right-6 md:right-12 lg:right-16 max-w-[320px] text-right">
            <p className="text-sm md:text-[15px] leading-[1.7] text-black/75 font-light" style={HN}>
              a single unhurried session, held in daylight, by the same two people who drew it. Never handed off,
              never rushed, never repeated for anyone else.
            </p>
          </div>
          <div className="absolute bottom-12 md:bottom-16 left-6 md:left-12 lg:left-16 bg-black/85 backdrop-blur-sm px-6 py-5 max-w-[340px] border border-white/5">
            <div className="text-[11px] tracking-[0.25em] uppercase text-white/40 mb-3">Process</div>
            <p className="text-sm md:text-[15px] leading-[1.7] text-white/75 font-light" style={HN}>
              We draw with you before we draw on you. Reference, placement, the weight of every line, decided out loud
              in the room until there is nothing left to argue with.
            </p>
          </div>
        </div>

        <div ref={el => (sectionRefs.current[3] = el)} className="absolute inset-0 z-20 will-change-transform flex items-center" style={overlayStyle}>
          <div className="pl-6 md:pl-12 lg:pl-16">
            <h2
              className="text-[20vw] md:text-[15vw] font-black leading-[0.82] tracking-[-0.03em] text-neutral-900 uppercase select-none"
              style={HN}
            >
              FIND
              <br />
              YOUR
              <br />
              LINE
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}
