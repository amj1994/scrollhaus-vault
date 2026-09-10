import io

PRODUCTS = [
    ("Carnelian Seal",  "$480", "ring-1"),
    ("Moonstone Dome",  "$560", "ring-2"),
    ("Hammered Disc",   "$620", "ring-3"),
    ("Quadrant Band",   "$740", "ring-4"),
    ("Pale Signet",     "$820", "ring-1"),
    ("Twin Dome",       "$950", "ring-2"),
]
STATS = [
    ("100%",     "Handmade",  "Every ring cut, forged and finished by one pair of hands"),
    ("14-92g",   "Per piece", "Weight is chosen, not left over — you feel each ring on the hand"),
    ("Sterling", "& Stone",   "Solid silver and set stone only — no plating, no filler"),
    ("Lifetime", "Guarantee", "Bring it back in twenty years and we will make it right"),
]
PARAS = [
    "Each ring is made by one person from start to finish — no line, no batch, no shortcut. The stone is chosen first and the silver is shaped to hold it.",
    "We work in solid sterling and set stone. Nothing is plated, nothing is hollowed. The weight you feel is the metal itself.",
    "ANULA is for people who want one good thing rather than several forgettable ones. Made slowly, worn for decades.",
]

cards = "\n".join(
    f'''      <article class="award-card">
        <div class="award-image"><img src="/assets/{img}.webp" alt="{name}" loading="lazy"></div>
        <h3 class="award-name">{name}</h3>
        <p class="award-price">{price}</p>
      </article>''' for name, price, img in PRODUCTS)

stats = "\n".join(
    f'''      <div class="stat-card">
        <div class="stomp-wrapper">
          <div class="stomp-stack stack-a"><h1 class="heading-style-h1">{a}</h1><h1 class="heading-style-h1">{a}</h1></div>
          <div class="stomp-stack stack-b"><h1 class="heading-style-h1">{b}</h1><h1 class="heading-style-h1">{b}</h1></div>
        </div>
        <p class="detail-paragraph">{d}</p>{extra}
      </div>''' for i, (a, b, d) in enumerate(STATS)
    for extra in ['\n        <p class="card-subtext">Est. ANULA Studio, 2021.</p>' if i == 3 else ''])

paras = "\n".join(f'        <p class="left-para" data-fade-slide-in>{p}</p>' for p in PARAS)

def button(label, cls=""):
    return (f'<button class="capsule-btn {cls}" type="button"><span>{label}</span>'
            f'<span class="capsule-circle"></span></button>')

open("parts.py", "w").write(repr({
    "CARDS": cards, "STATS": stats, "PARAS": paras,
    "DISCOVER": button("Discover", "js-to-footer"),
    "VIEWCOL": button("View collection"),
}))
print("parts:", len(PRODUCTS), "products,", len(STATS), "stats,", len(PARAS), "paragraphs")
