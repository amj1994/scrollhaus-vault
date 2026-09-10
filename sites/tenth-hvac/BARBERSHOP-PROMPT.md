# Barbershop — Higgsfield Prompt + Page Spec

Second template in the scroll-story series. Same pipeline as `tenth-hvac`.

---

## Settings (do not deviate)

| | |
|---|---|
| Resolution | **4K (3840×2160)** |
| Frame rate | **Native. 24fps is correct.** Do not request 60fps. |
| Duration | 8 seconds |
| Cuts | **None.** One unbroken take. |

Frame rate does not affect scroll smoothness — the page ships extracted frames,
not video. Requesting 60fps only duplicates frames and inflates the file.

---

## What the HVAC take got right — repeat these

The first video worked because of four properties. Bake them in again:

1. **Three readable acts** landing near 0%, 46%, 92% of the runtime. Those are
   the moments a visitor parks on while reading. Middle mush kills it.
2. **A colour-temperature journey.** Cold desaturated open → neutral middle →
   warm close. The page blends its own background along the *same* scroll value,
   so if the footage doesn't warm, the site doesn't either.
3. **Subject held to one side.** The woman sat right of centre the whole take,
   which left the left half quiet for text. Non-negotiable — text has to live
   somewhere.
4. **Hands doing real work as the middle act.** Tactile, specific, proves craft
   better than any headline.

---

## The prompt

```
One unbroken 8-second cinematic take. No cuts. Handheld-stabilised, slow
continuous movement throughout.

OPEN: Tight on a young man seated in a vintage barber chair, framed in the
RIGHT THIRD of the shot. He is looking down at his own hands, not at the
mirror. Cool desaturated light from a window off-frame left. The left half
of the frame is quiet — empty shop floor, tiled wall, soft shadow. He looks
like someone who has stopped expecting much.

SLOW PUSH IN, then DRIFT LEFT: The camera eases toward him and begins to
travel around the chair, revealing the barber stepping in behind him. The
barber sets a hand on his shoulder and says something short. The young man
finally lifts his head.

MIDDLE — THE WORK: Move in close on the barber's hands. Clippers moving in
steady passes, the guard changing, comb lifting hair, fingers checking the
line against the skull. Warm tungsten light from the shop lamps now filling
in and replacing the cold window light. Stay with the hands and the falling
hair — no faces for these seconds. Unhurried, skilled, repetitive, exact.

TURN: The camera pulls back as the chair is slowly rotated toward the mirror.
Keep the man in the right third. The mirror enters frame.

CLOSE: His reflection resolves. He looks at himself properly for the first
time in the take. No grin, no performance — a small, surprised recognition,
the face of someone meeting a version of himself he had forgotten. Warm amber
light, shop glowing, the barber visible behind him wiping down the clippers.
Hold on the reflection.

TONE: withdrawn → attended to → skilled work → quiet recognition.
COLOUR: cool desaturated blue-grey → neutral → warm amber tungsten. The shift
must be clearly visible from first frame to last.
COMPOSITION: subject in the right third for the entire take. Keep the left
half of the frame visually quiet and uncluttered.
MOVEMENT: one continuous slow move — push, orbit, close on hands, pull back,
settle on the mirror. Never static, never fast.
DEPTH OF FIELD: shallow on the open and close, medium through the hands.
```

---

## Page spec

**Structural device — clipper guard numbers, not `01/02/03`.** HVAC used a
thermostat climbing 41→68°F. Barbering's native scale is the guard, and it runs
the right direction for this story: shorter guard = closer to the actual shape
of the person underneath.

Rail reads `#4 · #2 · #1 · #0`.

**Palette.** Reject the barbershop cliché — red-white-blue pole, black-and-gold
"gentlemen's grooming," reclaimed-wood barrel. Pull from the real materials
instead: cold porcelain and tile at the open, warming to worn leather and brass
clipper housing.

```css
--cold:   oklch(0.21 0.022 232);   /* porcelain shadow, blue-grey */
--warm:   oklch(0.25 0.042 62);    /* oiled leather + brass */
--accent: oklch(0.70 0.105 68);    /* brass */
```

**One template change.** HVAC alternates beats left/right via `data-align="end"`.
This footage keeps the subject right the whole way, so remove `data-align` from
every beat — all four sit left.

**Beat copy.**

| Rail | Time | Heading | Body |
|---|---|---|---|
| `#4` | 00:00 | He had stopped looking up. | Three years of letting it grow out because deciding felt like more than he had. He booked the appointment twice and cancelled it twice. |
| `#2` | 00:11 | "What are we doing today?" | He said whatever you think. Most people say that. It usually means nobody has asked them a question like that in a while. |
| `#1` | 00:26 | The shape was already there. | A cut is not an invention. It is finding the line the head was always going to have and taking away everything that was hiding it. |
| `#0` | 00:38 | Then the chair turns around. | He did not smile straight away. He just looked, the way you look at a face you have not seen in a long time. |

**Hero:** *"He cancelled the appointment twice."*
Sub: *"The third time he sat down, and forty minutes later he met someone he'd stopped expecting to see."*

**Signature element.** HVAC had the furnace service tag. Barbering's equivalent
is **the appointment book** — a real one, ruled paper, same names recurring
every three weeks for years, some for decades. Render it as the artifact: a
column of first names and dates, one entry ringed. A barber's book is the most
honest proof of loyalty in any trade.

---

## Pipeline

```bash
./scripts/extract-frames.sh path/to/barbershop.mp4
# set TOTAL in index.html to the frame count it reports
```

Then upload the master to Gumlet titled `<project>-barbershop`, matching the
`tenth-hvac` convention.
