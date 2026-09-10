# Scroll-Story Landing Page — Template

A cinematic scroll-scrub landing page. One continuous 8-second take is decoded
into a frame sequence and scrubbed by scroll position, so the story advances as
the visitor reads. Live reference build: **Tenth** (HVAC).

Static HTML, no build step. One dependency: **GSAP + ScrollTrigger** (CDN).

> **Licensing — check before selling.** GSAP is loaded from a CDN rather than
> vendored in on purpose. Confirm the current GSAP licence covers
> redistribution inside a template you charge for before shipping to a buyer.

---

## Run it

```bash
python3 -m http.server 8420
```

Open <http://localhost:8420>. Append `?at=0.46` to jump to any point in the
film (0 = first frame, 1 = last) — useful for QA and for linking a client
straight to a specific moment.

Opening `index.html` as a `file://` URL will **not** work: the frame loader
needs HTTP. Always serve it.

---

## How the scrub works

The naive approach — a `<video>` seeked with `currentTime` on scroll — stutters
badly. H.264 decodes from the nearest keyframe, and a normal encode has only a
handful of keyframes across the whole clip, so each scroll event can force the
decoder through 150+ frames of 4K. Frame rate is irrelevant to this; **GOP
structure** is the actual variable.

So this ships **frames, not video**:

1. 145 JPEGs at 1600px wide (~8 MB total), preloaded with a progress bar.
2. Scroll position → target frame index.
3. A `requestAnimationFrame` loop eases toward that index
   (`eased += (target - eased) * 0.14`) and redraws the canvas only when the
   rounded index changes.

The easing is what makes it feel smooth rather than twitchy. Once loaded it
cannot stall, because there is no decoding left to do.

Motion is **GSAP ScrollTrigger**: the frame index, the copy reveals, and the
lower-section staggers are all scrubbed against scroll position rather than
timed. `gsap.matchMedia()` carries the reduced-motion branch.

## Scrim weight — the rule that matters

Do **not** put a full-bleed gradient behind the copy. It reads as a dark
horizontal band smeared across the footage and wrecks the shot. The video is
the product.

Copy sits in a **tight bounded panel** instead — light translucent tint,
hairline border, slight backdrop blur — so the footage stays visible straight
through it. The global vignette carries only enough weight to keep the fixed
header and rail legible. All copy sits left; never alternate sides.

`rAF` is the primary driver and a `scroll` listener is a fallback for
environments that suspend `rAF` (background tabs, some embedded webviews).

---

## Producing a new niche

**1 — Generate the footage.** One unbroken 8-second take, **4K, native frame
rate (24fps is fine)**. Do *not* ask for 60fps and do *not* convert frame rate
afterwards — `-vf fps=60` on a 24fps source duplicates frames, adding file size
and zero smoothness. The camera move must carry the whole story arc: cold
problem → the work → warm resolution.

**2 — Extract the frames.**

```bash
./scripts/extract-frames.sh path/to/source.mp4
```

That writes `frames/f_001.jpg …`. Then set `TOTAL` in `index.html` to the
number of files produced.

**3 — Rewrite the story beats.** Four `.beat` sections inside `.film`, plus the
hero. Keep them concrete and specific — names, times, real detail. The
structural device is the readout climbing through the story (here, a
thermostat 41°F → 68°F). Use whatever the trade actually measures; do not fall
back on `01 / 02 / 03` section numbers.

**4 — Re-theme.** All colour lives in `:root` as OKLCH. `--cold` is the opening
ground, `--warm` is what it becomes — the page physically heats up as you
scroll, driven by the same value as the frames.

---

## Assets

Frames are committed to this repo, so a fresh clone works offline with no
broken links.

To serve them from Gumlet's image CDN instead (optimized WebP/AVIF), set a
base before the page script runs:

```html
<script>window.ASSET_BASE = 'https://<namespace>.gumlet.io/';</script>
```

Gumlet's image product is a CDN in front of an origin, not a bucket — it needs
a public URL to pull from. Deploy this repo (Vercel works with private repos),
then point a Gumlet image source at that deployment.

Master videos are archived as Gumlet video assets, titled by project name.
They are gitignored here — the repo carries frames, not masters.

---

## Deploy

```bash
vercel --prod
```

`vercel.json` sets immutable cache headers on `/frames/*`, which matters when a
page requests 145 images.

---

## Accessibility

- All text measured at ≥4.64:1 contrast; most 7–15:1.
- `prefers-reduced-motion` disables the scrub, unpins the canvas, and lays the
  beats out as ordinary readable sections.
- Temperature rail is real buttons — keyboard focusable, visible focus rings.

---

© All rights reserved. Not licensed for redistribution.
