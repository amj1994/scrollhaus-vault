# The Third Time — Barbershop

Scroll-story landing page. Second template in the series (after `tenth-hvac`).

Static HTML, no build step. One dependency: **GSAP + ScrollTrigger** (CDN).

> **Licensing — check before selling.** GSAP is loaded from a CDN rather than
> vendored into this repo on purpose. Confirm the current GSAP licence covers
> redistribution inside a template you charge for before shipping it to a
> buyer. If it does, vendor it locally so the download has no external
> dependency.

```bash
python3 -m http.server 8600
```

`?at=0.62` deep-links any moment in the film. Must be served over HTTP —
`file://` will not load the frames.

---

## What changed from the HVAC build

The first template scrolled its text past the film without timing it to
anything. Here every element's reveal is driven by its own scroll position:

- **Beats are choreographed, not scrolled.** Each block computes its signed
  distance from the viewport centre, then fades and drifts in on approach and
  out on exit. Measured: all five blocks peak at full opacity, evenly spaced
  across the film (p = 0.04 / 0.20 / 0.42 / 0.64 / 0.86).
- **Words are the reveal unit.** Every `[data-split]` is broken into per-word
  spans that rise on a stagger driven by the block's scroll progress — so a
  heading arrives as a phrase rather than a slab.
- **The whole page moves, not just the top.** The record and close sections
  reveal on approach, the appointment book writes itself in one name at a
  time, and the facts list staggers.
- **Slow cinematic push.** The canvas scales 1.00 → 1.05 across the film.
- **Film grain** at 5% overlay.

## Scrim weight — the rule that matters

Do **not** put a full-bleed gradient behind the copy. It reads as a dark
horizontal band smeared across the footage and wrecks the shot. The video is
the product.

Text sits in a **tight bounded panel** instead — a light translucent tint, a
hairline border, a touch of backdrop blur — so the footage stays visible
straight through it. The global vignette carries only enough weight to keep
the fixed header and the rail legible.

Always verify against the *brightest* frame in the take, not an average one.

Two bugs worth knowing about, both caught only by testing branches:

1. Skipping off-screen elements without writing opacity **freezes** whatever
   value they held on the way out. Always write on the skip path.
2. `prefers-reduced-motion` must skip `choreograph()` entirely *and* carry a
   CSS `!important` backstop. Miss either and reduced-motion users get a page
   of invisible text.

---

## Structure

- **Rail:** clipper guard numbers `#4 → #0`. Shorter guard = closer to the
  shape that was always under there. Not `01/02/03`.
- **Palette:** porcelain and tile (`--cold`) warming to oiled leather and
  brass (`--warm`), blended on the same scroll value that drives the frames.
- **Type:** Newsreader (display, italic for emphasis) / Instrument Sans (body)
  / DM Mono (data).
- **Signature:** the appointment book. Same first names every three weeks,
  one for eleven years — the only honest rating a barbershop ever gets.

---

## Accessibility

- Contrast measured, all ≥4.87:1; most 7–15:1.
- `prefers-reduced-motion` unpins the canvas, drops the scrub, forces every
  animated element visible.
- Guard rail is real buttons, keyboard focusable.
- No horizontal scroll at 390px.

---

© All rights reserved. Not licensed for redistribution.
