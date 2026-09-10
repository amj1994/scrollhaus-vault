import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const PORT = Number(process.env.PORT || 3000)
const isProd = process.env.NODE_ENV === 'production'
const app = express()

/**
 * Resolves a Higgsfield share page to the direct MP4 behind it.
 * The page ships the file in an og:video tag, with a bare .mp4 in the markup as a fallback.
 */
app.get('/api/higgsfield-video', async (req, res) => {
  const share = String(req.query.url || 'https://higgsfield.ai/s/keldUFnImRA')
  try {
    const html = await fetch(share, { headers: { 'user-agent': 'Mozilla/5.0' } }).then(r => r.text())
    const og = html.match(/<meta[^>]+property=["']og:video["'][^>]+content=["']([^"']+\.mp4[^"']*)["']/i)
    const bare = html.match(/https?:\/\/[^"'\\\s]+\.mp4/i)
    const url = og?.[1] || bare?.[0]
    if (!url) return res.status(404).json({ success: false, error: 'no mp4 found' })
    res.json({ success: true, url })
  } catch (err) {
    res.status(502).json({ success: false, error: (err as Error).message })
  }
})

const dirname = path.dirname(fileURLToPath(import.meta.url))

if (isProd) {
  const dist = path.resolve(dirname)
  app.use(express.static(dist))
  app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')))
  app.listen(PORT, () => console.log(`ANULA (prod) http://localhost:${PORT}`))
} else {
  const { createServer: createViteServer } = await import('vite')
  const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' })
  app.use(vite.middlewares)
  app.listen(PORT, () => console.log(`ANULA (dev) http://localhost:${PORT}`))
}
