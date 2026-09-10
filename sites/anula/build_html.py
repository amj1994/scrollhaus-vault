import ast, io
P = ast.literal_eval(open("parts.py").read())

CSS = """
:root{--color-bg:#ffffff;--color-primary-text:#000000;--color-demoted-text:#000000;
  --color-divider:#000000;--font-stack:'Inter Tight','Inter',Arial,sans-serif;--brand:#A3111E}
*,*::before,*::after{box-sizing:border-box}
html,body{margin:0;padding:0;background:var(--color-bg);color:var(--color-primary-text);
  font-family:var(--font-stack);-webkit-font-smoothing:antialiased}
h1,h2,h3,p{margin:0}
img{display:block;max-width:100%}
button{font-family:inherit;cursor:pointer}
a{color:inherit;text-decoration:none}

/* header */
.site-header{position:fixed;top:32px;left:32px;right:32px;height:30px;z-index:100;
  display:flex;align-items:center;justify-content:space-between}
.logo{font-family:'Instrument Serif',Georgia,serif;font-size:34px;line-height:1;color:var(--brand);
  letter-spacing:1px}
.nav-group{display:flex;align-items:center;gap:194px}
.nav-link{font-size:15px;font-weight:500;text-transform:uppercase;color:var(--brand);letter-spacing:.02em}
.cart-group{display:flex;align-items:center;gap:50px}
.burger{background:none;border:0;padding:0;display:flex;flex-direction:column;gap:5px}
.burger span{display:block;width:30px;height:2.2px;background:var(--brand)}
.site-header a:hover,.site-header button:hover{opacity:.7}

/* hero */
.hero{position:relative;height:500vh;background:#000;z-index:10}
.hero-sticky{position:sticky;top:0;height:100vh;background:#000;overflow:hidden;
  display:flex;flex-direction:column;justify-content:flex-end;padding:48px}
#hero-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:1}
.video-overlay{display:none}
.hero-content{position:relative;z-index:3;max-width:700px}
.hero-title{font-family:'Instrument Serif',Georgia,serif;font-size:clamp(36px,6vw,72px);
  font-weight:400;line-height:1.05;letter-spacing:-1px;color:#000}
.hero-title-line{display:block;overflow:hidden}
.hero-title-line-inner{display:block}
.hero-char{display:inline-block;white-space:pre}

/* capsule button */
.capsule-btn{display:inline-flex;align-items:center;gap:14px;background:#fff;
  border:1px solid rgba(0,0,0,.08);border-radius:100px;padding:4px 4px 4px 18px;
  font-size:13px;font-weight:500;text-transform:uppercase;letter-spacing:.04em;color:#000}
.capsule-circle{position:relative;width:28px;height:28px;border-radius:50%;background:#2e2e2e;flex:0 0 auto}
.capsule-circle::before,.capsule-circle::after{content:'';position:absolute;left:50%;top:50%;background:#fff}
.capsule-circle::before{width:10px;height:1.5px;transform:translate(-50%,-50%)}
.capsule-circle::after{width:1.5px;height:10px;transform:translate(-50%,-50%)}
.capsule-btn:hover{background:#000;color:#fff}
.capsule-btn:hover .capsule-circle{background:#fff}
.capsule-btn:hover .capsule-circle::before,.capsule-btn:hover .capsule-circle::after{background:#000}
.hero-content .capsule-btn{margin-top:10px}

/* awards carousel */
.awards{position:relative;height:100vh;overflow:hidden;border-top:1px solid var(--color-divider);
  border-bottom:1px solid var(--color-divider);z-index:10;background:#fff}
.awards-grid{display:flex;width:max-content;height:100%;will-change:transform}
.award-card{width:33.333vw;border-right:1px solid var(--color-divider);background:#fff;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:clamp(40px,8vh,80px) 48px;gap:clamp(24px,4vh,48px)}
.award-image{height:280px;display:flex;align-items:center;justify-content:center}
.award-image img{max-width:85%;max-height:100%;object-fit:contain}
.award-name{font-size:18px;font-weight:400;letter-spacing:-.2px}
.award-price{font-size:16px;font-weight:500;opacity:.6}
.video-scaling-wrapper{position:absolute;top:0;left:50%;transform:translateX(-50%);
  width:0%;height:100%;overflow:hidden;z-index:20;will-change:width;pointer-events:none}
#reveal-video{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
  width:100vw;height:100vh;object-fit:cover}

/* stats */
.stats{display:grid;grid-template-columns:50% 50%;border-bottom:1px solid var(--color-divider);
  background:#fff;position:relative;z-index:10}
.stats-left{position:sticky;top:0;height:100vh;display:flex;flex-direction:column;
  justify-content:space-between;padding:48px 96px 48px 48px}
.left-heading{font-family:'Instrument Serif',Georgia,serif;font-size:clamp(32px,4vw,42px);
  font-weight:400;line-height:1.15}
.left-body{display:flex;flex-direction:column;gap:32px}
.left-para{font-size:24px;font-weight:400;line-height:1.1;letter-spacing:-.2px}
.stats-right{border-left:1px solid var(--color-divider)}
.stat-card{padding:48px;min-height:45vh;border-bottom:1px solid var(--color-divider)}
.stat-card:last-child{border-bottom:0}
.stomp-stack .heading-style-h1{font-family:'Instrument Serif',Georgia,serif;
  font-size:clamp(46px,5.5vw,70px);font-weight:400;letter-spacing:-1.5px;line-height:.95}
.stomp-stack .heading-style-h1:first-child{display:none}
.detail-paragraph{font-size:24px;padding-top:42px;line-height:1.2}
.card-subtext{font-size:13px;margin-top:12px}
.stat-char,.detail-word{display:inline-block;white-space:pre}

/* footer */
.footer-spacer{pointer-events:none}
.site-footer{position:fixed;bottom:0;left:0;width:100%;z-index:1;background:#fff;
  display:grid;grid-template-columns:1.2fr 1fr 1.5fr;gap:48px;padding:80px 48px}
.footer-col h3,.footer-col .footer-head{font-size:18px;font-weight:400;letter-spacing:-.2px;margin-bottom:24px}
.footer-credits,.footer-desc{font-size:18px;line-height:1.35}
.footer-links{display:flex;flex-direction:column;gap:12px;font-size:18px;font-weight:400}
.footer-links a:hover,.footer-col a:hover{opacity:.6}
.newsletter-form{display:flex;align-items:center;background:#f7f7f5;border-radius:100px;
  padding:6px 6px 6px 24px;max-width:440px;margin-top:24px}
.newsletter-form input{flex:1;border:0;background:transparent;font-size:14px;font-family:inherit;outline:none}
.newsletter-form:focus-within{box-shadow:0 0 0 1px #000}

@media (max-width:1199px) and (min-width:769px){
  .site-header{top:24px;left:24px;right:24px}
  .nav-group{gap:100px} .cart-group{gap:32px}
  .stats-left{padding:40px 32px}
  .hero-title{font-size:48px}
  .stomp-stack .heading-style-h1{font-size:44px!important}
  .left-heading{font-size:30px} .left-para,.detail-paragraph{font-size:18px}
  .award-card{width:50vw}
  .site-footer{grid-template-columns:1fr 1fr}
  .site-footer .footer-col:last-child{grid-column:span 2}
}
@media (max-width:768px){
  .site-header{top:16px;left:16px;right:16px}
  .nav-group{gap:24px} .cart-group{gap:20px}
  .burger,.nav-link,.capsule-btn{min-height:44px}
  .stats{grid-template-columns:1fr}
  .stats-left{position:static;height:auto;padding:32px 16px}
  .stats-right{border-left:0}
  .hero-sticky{padding:24px}
  .hero-title{font-size:38px}
  .stomp-stack .heading-style-h1{font-size:34px!important}
  .left-para,.detail-paragraph{font-size:15px}
  .award-card{width:85vw}
  .site-footer{grid-template-columns:1fr;padding:48px 16px}
  .capsule-btn{width:100%;justify-content:space-between}
}
"""

JS = r"""
gsap.registerPlugin(ScrollTrigger);

/* Split each hero line into characters so they can exit one at a time. */
document.querySelectorAll('.hero-title-line-inner').forEach(function(el){
  el.innerHTML = el.textContent.split('').map(function(c){
    return '<span class="hero-char">' + (c === ' ' ? '&nbsp;' : c) + '</span>';
  }).join('');
});
document.querySelectorAll('.stat-card .heading-style-h1:last-child').forEach(function(el){
  el.innerHTML = el.textContent.split('').map(function(c){
    return '<span class="stat-char">' + (c === ' ' ? '&nbsp;' : c) + '</span>';
  }).join('');
});
document.querySelectorAll('.detail-paragraph').forEach(function(el){
  el.innerHTML = el.textContent.split(' ').map(function(w){
    return '<span class="detail-word">' + w + '</span>';
  }).join(' ');
});

/**
 * Scroll-scrubbed video.
 * The seeking guard is the whole trick: only hand the decoder a new target once it has
 * finished presenting the last one. Without it the decoder is flooded with seeks and the
 * picture freezes, blacks out or stutters. The 0.08 lerp on top is what makes it cinematic
 * rather than a slideshow.
 */
function scrub(video, getProgress){
  var current = 0;
  function tick(){
    var d = video.duration;
    if (d && !isNaN(d)) {
      var target = Math.max(0, Math.min(1, getProgress())) * d;
      current += (target - current) * 0.08;
      if (!video.seeking && Math.abs(video.currentTime - current) > 0.01) {
        try { video.currentTime = current; } catch (e) {}
      }
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

var heroSection = document.querySelector('.hero');
var heroVideo   = document.getElementById('hero-video');
function heroProgress(){
  var r = heroSection.getBoundingClientRect();
  var span = heroSection.offsetHeight - window.innerHeight;
  return span > 0 ? (-r.top) / span : 0;
}
scrub(heroVideo, heroProgress);

/* Hero copy leaves once the scrub is 80% done, character by character. */
var heroChars = Array.prototype.slice.call(document.querySelectorAll('.hero-char'));
var heroBtn   = document.querySelector('.hero-content .capsule-btn');
function heroExit(){
  var p = Math.max(0, Math.min(1, heroProgress()));
  var t = p < 0.8 ? 0 : (p - 0.8) / 0.2;
  heroChars.forEach(function(ch, i){
    var local = Math.max(0, Math.min(1, t * heroChars.length - i));
    var e = local * local * local;
    ch.style.opacity = String(1 - e);
    ch.style.filter = 'blur(' + (e * 6) + 'px)';
    ch.style.transform = 'translateY(' + (-e * 40) + 'px)';
  });
  if (heroBtn) {
    var b = Math.pow(t, 4);
    heroBtn.style.opacity = String(1 - b);
    heroBtn.style.transform = 'translateY(' + (-b * 40) + 'px)';
  }
  requestAnimationFrame(heroExit);
}
requestAnimationFrame(heroExit);

function build(){
  var awards = document.querySelector('.awards');
  var grid   = document.querySelector('.awards-grid');
  var wrap   = document.querySelector('.video-scaling-wrapper');
  var reveal = document.getElementById('reveal-video');
  var overflow = grid.scrollWidth - window.innerWidth;
  var revealProgress = 0;

  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: awards, start: 'top top',
      end: function(){ return '+=' + (overflow + window.innerHeight * 1.6); },
      pin: true, scrub: true, invalidateOnRefresh: true
    }
  });
  tl.to(grid, { x: -overflow, ease: 'none', duration: 1 });
  tl.to(wrap, {
    width: '100%', ease: 'none', duration: 0.8,
    onUpdate: function(){ revealProgress = this.progress(); },
    onStart:  function(){ wrap.style.pointerEvents = 'auto'; }
  });
  scrub(reveal, function(){ return revealProgress; });

  gsap.utils.toArray('[data-fade-slide-in]').forEach(function(el, i){
    gsap.from(el, {
      autoAlpha: 0, y: 20, duration: 0.8, delay: i * 0.15, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });

  var footer = document.querySelector('.site-footer');
  var spacer = document.querySelector('.footer-spacer');
  spacer.style.height = footer.offsetHeight + 'px';
}

document.fonts.ready.then(function(){
  build();
  ScrollTrigger.refresh();
});

var lastW = window.innerWidth, t;
window.addEventListener('resize', function(){
  clearTimeout(t);
  t = setTimeout(function(){
    if (window.innerWidth === lastW) return;
    lastW = window.innerWidth;
    ScrollTrigger.getAll().forEach(function(s){ s.kill(); });
    build();
    ScrollTrigger.refresh();
  }, 200);
});

document.querySelector('.js-to-footer').addEventListener('click', function(){
  document.querySelector('.site-footer').scrollIntoView({ behavior: 'smooth', block: 'end' });
});
document.querySelector('.newsletter-form').addEventListener('submit', function(e){
  e.preventDefault();
  alert("You're on the list. Welcome.");
});

/* The /api/higgsfield-video proxy stays available for resolving a share link to its MP4,
   but the page does NOT call it to swap its own sources: it resolves to whatever video that
   share page points at, which would put a third-party asset back into our hero. Our clips
   are self-hosted from /assets and that is deliberate. */
"""

HTML = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>ANULA &mdash; Handcrafted rings, Antwerp</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:ital,wght@0,300..700;1,300..700&family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&display=swap" rel="stylesheet">
<style>__CSS__</style>
</head>
<body>

<header class="site-header">
  <a class="logo" href="/">ANULA</a>
  <div class="nav-group">
    <a class="nav-link" href="#">Studio</a>
    <div class="cart-group">
      <button class="burger" type="button" aria-label="Menu"><span></span><span></span></button>
      <a class="nav-link" href="#">[ Bag ]</a>
    </div>
  </div>
</header>

<section class="hero">
  <div class="hero-sticky">
    <video id="hero-video" src="/assets/hero.mp4" poster="/assets/hero-poster.webp" playsinline muted preload="auto"></video>
    <div class="video-overlay"></div>
    <div class="hero-content">
      <h1 class="hero-title">
        <span class="hero-title-line"><span class="hero-title-line-inner">WEIGHTED</span></span>
        <span class="hero-title-line"><span class="hero-title-line-inner">IN LIGHT</span></span>
      </h1>
      __DISCOVER__
    </div>
  </div>
</section>

<section class="awards">
  <div class="awards-grid">
__CARDS__
  </div>
  <div class="video-scaling-wrapper">
    <video id="reveal-video" src="/assets/water.mp4" playsinline muted preload="auto"></video>
  </div>
</section>

<section class="stats">
  <div class="stats-left">
    <h2 class="left-heading" data-fade-slide-in>Made In Full Light</h2>
    <div class="left-body">
__PARAS__
    </div>
    <div data-fade-slide-in>__VIEWCOL__</div>
  </div>
  <div class="stats-right">
__STATS__
  </div>
</section>

<div class="footer-spacer"></div>

<footer class="site-footer">
  <div class="footer-col">
    <a class="footer-head" href="#">Sign in</a>
    <p class="footer-credits">
      Handcrafted in small batches<br>ANULA Studio<br><br>
      Based in Antwerp<br>&copy; ANULA 2026<br>All pieces are original designs.
    </p>
  </div>
  <div class="footer-col">
    <a class="footer-head" href="#">Instagram</a>
    <nav class="footer-links">
      <a href="#">Refund Policy</a><a href="#">Privacy Policy</a><a href="#">Terms of Service</a>
    </nav>
  </div>
  <div class="footer-col">
    <h3>Newsletter</h3>
    <p class="footer-desc">Join our list. Be first to know new drops. 10% off your first order.</p>
    <form class="newsletter-form">
      <input type="email" placeholder="Email" aria-label="Email" required>
      <button class="capsule-btn" type="submit"><span>Subscribe</span><span class="capsule-circle"></span></button>
    </form>
  </div>
</footer>

<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
<script>__JS__</script>
</body>
</html>
"""

out = HTML.replace("__CSS__", CSS).replace("__JS__", JS)
for k, v in P.items():
    out = out.replace("__%s__" % k, v)
io.open("index.html", "w", encoding="utf-8").write(out)
import re
print("index.html", len(out), "bytes; unreplaced:", re.findall(r"__[A-Z_]+__", out) or "none")
