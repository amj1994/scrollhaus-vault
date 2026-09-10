import ast
P = ast.literal_eval(open("parts.py").read())

CSS = """
:root{
  --kw: calc(100vw / 1280);
  --kh: calc(100vh / 712);
  --k:  min(var(--kw), var(--kh));
  --kr: min(var(--kh), calc(var(--k) * 1.45));
  --kt: var(--k);
  --slack: calc(100% - 712 * var(--k));
  --bg:#E7E7E7;
}
@supports (height:100dvh){ :root{--kh: calc(100dvh / 712)} }

*,*::before,*::after{box-sizing:border-box}
html,body{margin:0;padding:0;height:100%;overflow:hidden;background:var(--bg)}
body{font-family:'Neue Haas Grotesk Text Pro',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased}
img{-webkit-user-drag:none;user-select:none}
:focus-visible{outline:2px solid #1A1A1A;outline-offset:3px}

#viewport{position:fixed;inset:0;overflow:hidden;background:var(--bg)}
#herovid{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
  display:block;z-index:0;background:var(--bg)}
@media (max-aspect-ratio:11/10){ #herovid{display:none} }
#stage{position:absolute;inset:0;overflow:hidden}
.tx{position:absolute;white-space:nowrap;line-height:1;font-weight:400;z-index:3}
.hl{position:absolute;left:0;right:0;overflow:hidden;pointer-events:none;z-index:3;
  height:calc(61.73 * var(--kt))}
.hl .tx{font-size:calc(61.73 * var(--kt));letter-spacing:0em;color:#fff;
  -webkit-text-stroke:0.0138em #fff}
.wm{position:absolute;white-space:nowrap;line-height:1;color:#fff;transform-origin:0 0;z-index:2;
  font-size:calc(244.9 * var(--k));transform:scaleX(1);font-weight:400}
#robot{position:absolute;z-index:1;
  width:calc(587.69 * var(--kr));height:calc(801.65 * var(--kr));
  left:calc(50% + 34.845 * var(--k) - 293.845 * var(--kr));
  top:calc(100% - 697 * var(--kr))}

#logomark{position:absolute;z-index:3;left:calc(31 * var(--kt));top:calc(23 * var(--kt));
  width:calc(13 * var(--kt));height:calc(14 * var(--kt))}
#menu{position:absolute;z-index:6;left:calc(100% - 65 * var(--kt));top:calc(25.9 * var(--kt));
  pointer-events:none}
#menu>summary{display:block;list-style:none;cursor:default;
  width:calc(33 * var(--kt));height:calc(8.6 * var(--kt));
  background:linear-gradient(#3A3A3A 0 0) top/calc(33 * var(--kt)) calc(1.6 * var(--kt)) no-repeat,
             linear-gradient(#3A3A3A 0 0) bottom/calc(33 * var(--kt)) calc(1.6 * var(--kt)) no-repeat}
#menu>summary::-webkit-details-marker{display:none}
#menu>summary::marker{content:''}
#menupanel{display:none}
.nav{text-decoration:underline;text-decoration-thickness:.0746em;
  text-underline-offset:.1866em;text-decoration-color:#5A5A5A}
a.nav{color:inherit}
#nprule{position:absolute;z-index:3;left:calc(100% - 299 * var(--kt));
  top:calc(347.6 * var(--kt) + var(--slack) * .5);
  width:calc(233 * var(--kt));height:calc(1.8 * var(--kt));background:#1A1A1A}
#thumb{position:absolute;z-index:3;left:calc(30 * var(--kt));top:calc(100% - 105 * var(--kt));
  width:calc(131 * var(--kt));height:calc(82 * var(--kt));overflow:hidden;
  background:#9a9a9a;border:0;padding:0;cursor:pointer}
#thumb img{width:calc(132 * var(--kt));height:calc(83 * var(--kt));
  margin:calc(-3 * var(--kt)) 0 0 calc(-3 * var(--kt));object-fit:cover;display:block}
#play{position:absolute;z-index:4;left:calc(74 * var(--kt));top:calc(100% - 85 * var(--kt));
  width:calc(43 * var(--kt));height:calc(43 * var(--kt));pointer-events:none}
#scroll{position:absolute;z-index:3;left:calc(100% - 46 * var(--kt));
  top:calc(100% - 67 * var(--kt));font-size:calc(12.2 * var(--kt));
  letter-spacing:0.1803em;color:#3A3A3A;transform-origin:0 0;
  transform:rotate(-90deg) translateX(-100%);line-height:1;white-space:nowrap}

@media (max-width:1139px),(max-height:633px){
  :root{ --kt: max(var(--k), min(.89px, calc(var(--k) * 1.3)));
         --bd1-top: calc(118 * var(--kt));
         --bd2-top: calc(136 * var(--kt)); }
  #stage .nav{display:none}
  #menu{pointer-events:auto}
  #menu>summary{cursor:pointer;position:relative}
  #menu>summary::before{content:'';position:absolute;inset:calc(-14 * var(--kt)) calc(-9 * var(--kt))}
  #menupanel{display:grid;position:absolute;right:0;top:calc(30 * var(--kt));
    grid-template-columns:repeat(2,max-content);gap:0 calc(52 * var(--kt));
    padding:calc(22 * var(--kt)) calc(26 * var(--kt));background:#E7E7E7;
    border:1px solid rgba(26,26,26,.16);
    animation:mp .16s cubic-bezier(.2,.7,.3,1) both}
  #menupanel .mp-col{display:flex;flex-direction:column}
  #menupanel a{color:#333;white-space:nowrap;font-size:calc(13.4 * var(--kt));
    letter-spacing:-.0373em;padding:calc(9 * var(--kt)) 0;text-decoration:underline;
    text-decoration-thickness:.0746em;text-underline-offset:.1866em;text-decoration-color:#5A5A5A}
  #thumb{padding:0}
}
@keyframes mp{from{opacity:0;transform:translateY(-3px)}}
@media (max-width:1139px) and (prefers-reduced-motion:reduce){#menupanel{animation:none}}
@media (max-height:633px) and (prefers-reduced-motion:reduce){#menupanel{animation:none}}

#mobile{display:none}
@media (max-aspect-ratio:11/10){
  #stage{display:none}
  #viewport{background:var(--bg)}
  #mobile{display:grid;position:absolute;inset:0;height:100%;
    grid-template-rows:auto auto minmax(0,1fr) auto;overflow:hidden;
    --pad:clamp(15px,5vw,34px);--ink:#1A1A1A}
  .m-head{display:flex;align-items:center;justify-content:space-between;padding:var(--pad) var(--pad) 0}
  .m-brand{display:flex;align-items:center;gap:9px}
  .m-brand svg{width:13px;height:14px;display:block;flex:0 0 auto}
  .m-brand span{font-size:clamp(13px,3.2vw,15px);color:#2B2B2B;letter-spacing:.01em}
  .m-menu{position:relative;pointer-events:none}
  .m-menu>summary{display:block;list-style:none;width:clamp(26px,7.5vw,33px)}
  .m-menu>summary::-webkit-details-marker{display:none}
  .m-menu>summary::marker{content:''}
  .m-menu i{display:block;height:1.6px;background:#3A3A3A}
  .m-menu i+i{margin-top:5.4px}
  .m-title{padding:clamp(12px,3.4vh,26px) var(--pad) 0}
  .m-count{font-size:clamp(11.5px,2.9vw,13px);color:#3A3A3A;margin:0 0 clamp(7px,1.4vh,13px)}
  .m-title h1{margin:0;font-weight:400;color:var(--ink);font-size:clamp(29px,9.9vw,66px);
    line-height:.836;-webkit-text-stroke:.0138em var(--ink)}
  .m-title h1 i{font-style:normal;display:block;clip-path:inset(-35% -3% -15% -3%)}
  .m-title h1 i>span{display:block}
  .m-title h1 i:nth-child(1){padding-left:2.93em;letter-spacing:-.024em}
  .m-title h1 i:nth-child(2){letter-spacing:-.024em}
  .m-title h1 i:nth-child(3){padding-left:1.25em;letter-spacing:-.024em}
  .m-title h1 i:nth-child(4){letter-spacing:-.024em}
  .m-stage{position:relative;overflow:hidden;min-height:0}
  .m-wm{position:absolute;white-space:nowrap;color:#fff;line-height:.686;
    font-family:'ITC Blair W04 Bold',Helvetica,Arial,sans-serif;font-weight:400;
    z-index:3;transform-origin:0 0}
  .m-rjv{left:var(--pad);top:4%;font-size:clamp(70px,24vw,180px);
    transform:scaleX(1);letter-spacing:normal}
  .m-09{right:-.02em;bottom:-.057em;font-size:clamp(66px,23vw,180px);
    transform-origin:100% 100%;transform:scaleX(1);letter-spacing:normal}
  .m-robot{position:absolute;bottom:0;left:50%;transform:translateX(-45%);
    height:103%;width:auto;z-index:2;object-position:bottom}
  .m-np{display:flex;align-items:center;gap:13px;font-size:clamp(19px,5.6vw,40px);color:var(--ink)}
  .m-np s{flex:1;height:1.8px;background:#1A1A1A;text-decoration:none}
  .m-scroll{position:absolute;right:2px;bottom:clamp(15px,2.4vh,28px);z-index:3;
    font-size:clamp(11px,2.9vw,12.2px);color:#3A3A3A;letter-spacing:.2em;
    writing-mode:vertical-rl;transform:rotate(180deg)}
  .m-foot{padding:clamp(9px,1.8vh,16px) var(--pad) calc(var(--pad) * .85);
    display:grid;gap:clamp(9px,1.8vh,16px)}
  .m-links{display:flex;flex-wrap:wrap;gap:5px clamp(13px,3.8vw,26px);font-size:clamp(13px,3.1vw,13.4px)}
  .m-links a{color:#333;text-decoration:underline;text-decoration-thickness:1px;
    text-underline-offset:2.5px;text-decoration-color:#5A5A5A}
  .m-copy{font-size:clamp(15px,3.2vw,15.1px);line-height:1.26;color:#1F1F1F;margin:0}
  .m-video{display:flex;align-items:center;gap:clamp(12px,3.8vw,22px)}
  .m-thumb{position:relative;flex:0 0 auto;width:clamp(86px,25vw,131px);
    aspect-ratio:131/82;overflow:hidden;background:#9a9a9a;border:0;padding:0;cursor:pointer}
  .m-thumb img{width:100%;height:100%;object-fit:cover;display:block}
  .m-play{position:absolute;left:50%;top:50%;width:33%;aspect-ratio:1;
    transform:translate(-50%,-50%);pointer-events:none}
  .m-cap{font-size:clamp(14px,3.2vw,16.4px);line-height:1.26;color:#242424}
}
@media (max-aspect-ratio:11/10) and (min-width:680px){
  #mobile{--pad:clamp(26px,4.2vw,54px)}
  .m-brand svg{width:clamp(14px,1.7vw,18px);height:clamp(15px,1.83vw,19.4px)}
  .m-brand span{font-size:clamp(13px,1.7vw,17px)}
  .m-menu>summary{width:clamp(30px,3.9vw,40px)} .m-menu i+i{margin-top:clamp(6px,.8vw,8px)}
  .m-count{font-size:clamp(12px,1.55vw,15px)}   .m-title h1{font-size:clamp(52px,8.4vw,92px)}
  .m-rjv{font-size:clamp(120px,21vw,250px)}     .m-09{font-size:clamp(112px,20vw,240px)}
  .m-np{font-size:clamp(28px,4.3vw,48px);grid-column:1/-1;grid-row:1}
  .m-scroll{font-size:clamp(12px,1.5vw,15px);letter-spacing:.22em}
  .m-links{font-size:clamp(13px,1.6vw,16px);gap:2px clamp(20px,3vw,34px);grid-column:1;grid-row:2}
  .m-links a{padding:clamp(5px,.8vh,9px) 0}
  .m-copy{font-size:clamp(14px,1.85vw,19px);max-width:52ch;grid-column:1;grid-row:3}
  .m-cap{font-size:clamp(14px,1.85vw,19px)}     .m-thumb{width:clamp(118px,16vw,180px)}
  .m-foot{grid-template-columns:minmax(0,1fr) auto;column-gap:clamp(24px,4vw,56px);align-items:end}
  .m-video{grid-column:2;grid-row:2/4;align-self:end}
}
@media (max-aspect-ratio:11/10) and (max-width:467px){
  .m-menu{pointer-events:auto} .m-menu>summary{cursor:pointer}
  .m-menu>summary::before{content:'';position:absolute;inset:-15px -13px}
  .m-links{display:none}
  #mobile:has(.m-menu[open]) .m-links{
    display:grid;grid-template-columns:repeat(2,max-content);gap:0 clamp(20px,7vw,38px);
    position:absolute;z-index:8;top:calc(var(--pad) + 26px);right:var(--pad);
    padding:clamp(13px,3.6vw,18px) clamp(15px,4.4vw,22px);
    background:#E7E7E7;border:1px solid rgba(26,26,26,.16);
    animation:mp .16s cubic-bezier(.2,.7,.3,1) both}
  #mobile:has(.m-menu[open]) .m-links a{font-size:15px;padding:13px 0;white-space:nowrap}
  .m-foot{gap:clamp(11px,2.1vh,17px)} .m-copy{max-width:38ch}
  .m-video{gap:clamp(14px,4.4vw,20px)} .m-thumb{width:clamp(96px,27vw,124px)}
}
@media (max-aspect-ratio:11/10) and (max-width:467px) and (prefers-reduced-motion:reduce){
  #mobile:has(.m-menu[open]) .m-links{animation:none}
}

/* The robot now travels the full width, so every dark UI element gets crossed by it.
   difference blending keeps each one legible against both the pale ground and the dark
   shell — the same idiom the navbar already uses. Source values are chosen so the result
   over #E7E7E7 matches the original ink: |231-255|=24 reads as the old #111, |231-200|=31
   as the old #1F1F1F. The white LTV/12 wordmark is deliberately NOT blended. */
.hl,[data-k="npn"],[data-k="npp"],#nprule{mix-blend-mode:difference}
#logomark,[data-k="brand"],[data-k="counter"],#stage .nav,[data-k="bd1"],[data-k="bd2"],
[data-k="cp1"],[data-k="cp2"],#scroll,#menu>summary{mix-blend-mode:difference}
#nprule{background:#fff}
[data-k="npn"],[data-k="npp"]{color:#fff}
[data-k="brand"],[data-k="counter"],[data-k="bd1"],[data-k="bd2"],
[data-k="cp1"],[data-k="cp2"],#scroll{color:#C8C8C8}
#stage a.nav{color:#C8C8C8;text-decoration-color:#9A9A9A}
#logomark path{stroke:#C8C8C8}
#logomark circle{fill:#C8C8C8}
#menu>summary{background:linear-gradient(#C8C8C8 0 0) top/calc(33 * var(--kt)) calc(1.6 * var(--kt)) no-repeat,
             linear-gradient(#C8C8C8 0 0) bottom/calc(33 * var(--kt)) calc(1.6 * var(--kt)) no-repeat}

.intro #robot{opacity:0;clip-path:inset(11% 0 0 0)}
.intro .wm{clip-path:inset(0 100% 0 -2%)}
.intro [data-g="g0"],.intro [data-g="g9"]{clip-path:inset(0 -2% 0 100%)}
.intro .hl .tx{transform:translateY(calc(58 * var(--kt)))}
.intro #logomark,.intro [data-k="brand"],.intro [data-k="counter"],
.intro #stage .nav,.intro [data-k="npn"],.intro [data-k="npp"],
.intro [data-k="bd1"],.intro [data-k="bd2"],
.intro [data-k="cp1"],.intro [data-k="cp2"]{opacity:0;transform:translateY(calc(11 * var(--kt)))}
.intro #menu>summary{transform:scaleX(0);transform-origin:100% 50%}
.intro #nprule{transform:scaleX(0);transform-origin:0 50%}
.intro #thumb{opacity:0;clip-path:inset(0 0 100% 0)}
.intro #play{opacity:0}  .intro #scroll{opacity:0}
.intro .m-brand,.intro .m-count,.intro .m-copy,.intro .m-cap,
.intro .m-links a,.intro .m-np span{opacity:0;transform:translateY(10px)}
.intro .m-title h1 i>span{transform:translateY(1.05em)}
.intro .m-menu>summary{transform:scaleX(0);transform-origin:100% 50%}
.intro .m-np s{transform:scaleX(0);transform-origin:0 50%}
.intro .m-robot{opacity:0;clip-path:inset(11% 0 0 0)}
.intro .m-rjv{clip-path:inset(0 100% 0 -2%)}
.intro .m-09{clip-path:inset(0 -2% 0 100%)}
.intro .m-thumb{opacity:0;clip-path:inset(0 0 100% 0)}
.intro .m-scroll{opacity:0}
"""

HTML = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>LTV-12 &mdash; Rewriting what a machine is allowed to notice</title>
<link href="https://db.onlinewebfonts.com/c/65a40d16161c5040b3ae31036979a1db?family=ITC+Blair+W04+Bold" rel="stylesheet">
<link href="https://db.onlinewebfonts.com/c/6e47ef470dd19698c911332a9b4d1cf4?family=Neue+Haas+Grotesk+Text+Pro" rel="stylesheet">
<style>__CSS__</style>
</head>
<body>
<div id="viewport">
  <video id="herovid" src="assets/hero-pan.mp4" poster="assets/hero-reveal.jpg"
         autoplay loop muted playsinline preload="auto" aria-hidden="true"></video>

  <div id="stage">
__WORDMARK__
    <img id="robot" alt="LTV-12 humanoid robot in three-quarter profile" src="assets/robot-ltv12.webp" style="display:none">
    __LOGO__
    <span class="tx" data-k="brand" style="left:calc(51 * var(--kt));top:calc(23 * var(--kt));font-size:calc(15.1 * var(--kt));letter-spacing:-0.0662em;color:#2B2B2B">KINETIC</span>

    <details id="menu"><summary aria-label="Menu" role="button"></summary>
      <div id="menupanel">__MENU_A____MENU_B__</div>
    </details>

    <span class="tx" data-k="counter" style="left:calc(31 * var(--kt));top:calc(118 * var(--kt));font-size:calc(15.1 * var(--kt));letter-spacing:0em;color:#3A3A3A">02/09</span>

    <h1 style="margin:0;font-weight:400" aria-label="Rewriting what a machine is allowed to notice">
__HEADLINE__
    </h1>

__NAVHTML__

    <span class="tx" data-k="npn" style="left:calc(100% - 339 * var(--kt));top:calc(327 * var(--kt) + var(--slack) * .5);font-size:calc(39.8 * var(--kt));letter-spacing:0em;color:#1A1A1A">N</span>
    <div id="nprule"></div>
    <span class="tx" data-k="npp" style="left:calc(100% - 57 * var(--kt));top:calc(327 * var(--kt) + var(--slack) * .5);font-size:calc(39.8 * var(--kt));letter-spacing:0em;color:#1A1A1A">P</span>

    <p style="margin:0">
      <span class="tx" data-k="bd1" style="left:calc(100% - 337 * var(--kt));top:var(--bd1-top,calc(100% - 218 * var(--kt)));font-size:calc(15.1 * var(--kt));letter-spacing:0.0183em;color:#1F1F1F">Reach, grip, rotate, place, and hold a variety of</span>
      <span class="tx" data-k="bd2" style="left:calc(100% - 420 * var(--kt));top:var(--bd2-top,calc(100% - 200 * var(--kt)));font-size:calc(15.1 * var(--kt));letter-spacing:0.0408em;color:#1F1F1F">objects through a 7-axis arm and compliant fingertips</span>
    </p>

    <button id="thumb" aria-label="Play in-gripper camera clip"><img alt="" src="assets/gripper-cam.jpg"></button>
    __PLAY__
    <span class="tx" data-k="cp1" style="left:calc(182 * var(--kt));top:calc(100% - 85 * var(--kt));font-size:calc(16.4 * var(--kt));letter-spacing:-0.0145em;color:#242424">Fingertip sensors read</span>
    <span class="tx" data-k="cp2" style="left:calc(183 * var(--kt));top:calc(100% - 65 * var(--kt));font-size:calc(16.4 * var(--kt));letter-spacing:-0.0229em;color:#242424">grip force in real time</span>

    <div id="scroll">scroll</div>
  </div>

  <div id="mobile">
    <header class="m-head">
      <div class="m-brand">__LOGO_M__<span>KINETIC</span></div>
      <details class="m-menu"><summary aria-label="Menu" role="button"><i></i><i></i></summary></details>
    </header>
    <div class="m-title">
      <p class="m-count">02/09</p>
      <h1><i><span>REWRITING</span></i><i><span>WHAT A MACHINE</span></i><i><span>IS ALLOWED TO</span></i><i><span>NOTICE</span></i></h1>
    </div>
    <div class="m-stage">
      <span class="m-wm m-rjv">RJV</span><span class="m-wm m-09">09</span>
      <img class="m-robot" alt="" aria-hidden="true" src="assets/robot-ltv12.webp" onerror="this.style.display='none'">
      <div class="m-scroll">scroll</div>
    </div>
    <div class="m-foot">
      <div class="m-np"><span>N</span><s></s><span>P</span></div>
      <nav class="m-links">__MOB_LINKS__</nav>
      <p class="m-copy">Reach, grip, rotate, place, and hold a variety of objects through a 7-axis arm and compliant fingertips</p>
      <div class="m-video">
        <button class="m-thumb" aria-label="Play in-gripper camera clip"><img alt="" src="assets/gripper-cam.jpg">__PLAY_M__</button>
        <div class="m-cap">Fingertip sensors read<br>grip force in real time</div>
      </div>
    </div>
  </div>
</div>
<script>__JS__</script>
</body>
</html>
"""

JS = r"""
/* 1 — WAAPI entrance timeline */
(function(){
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var root = document.documentElement;
  root.classList.add('intro');
  var LIFT='cubic-bezier(.22,.61,.36,1)', REVEAL='cubic-bezier(.16,1,.3,1)';
  function up(y){ return {opacity:[0,1], transform:['translateY('+y+')','none']} }
  var CLIP_L={clipPath:['inset(0 100% 0 -2%)','inset(0 -2% 0 -2%)']},
      CLIP_R={clipPath:['inset(0 -2% 0 100%)','inset(0 -2% 0 -2%)']},
      SX={transform:['scaleX(0)','scaleX(1)']},
      WIPE={opacity:[0,1], clipPath:['inset(0 0 100% 0)','inset(0 0 0% 0)']},
      DROP={opacity:[0,1], clipPath:['inset(11% 0 0 0)','inset(0% 0 0 0)']};
  var L='var(--liftT)', R='var(--riseT)';
  var STAGE=[
    {s:'#robot',at:0,d:1250,e:REVEAL,k:DROP},
    {s:'#logomark',at:60,d:620,e:LIFT,k:up(L)},
    {s:'[data-k="brand"]',at:110,d:620,e:LIFT,k:up(L)},
    {s:'#menu>summary',at:150,d:560,e:REVEAL,k:SX},
    {s:'[data-g="gR"],[data-g="gJ"],[data-g="gV"]',at:180,d:1100,e:REVEAL,st:95,k:CLIP_L},
    {s:'[data-g="g9"],[data-g="g0"]',at:300,d:1100,e:REVEAL,st:95,k:CLIP_R},
    {s:'[data-k="counter"]',at:340,d:600,e:LIFT,k:up(L)},
    {s:'.hl:nth-of-type(1) .tx',at:420,d:950,e:REVEAL,st:11,k:{transform:['translateY('+R+')','none']}},
    {s:'.hl:nth-of-type(2) .tx',at:500,d:950,e:REVEAL,st:11,k:{transform:['translateY('+R+')','none']}},
    {s:'.hl:nth-of-type(3) .tx',at:580,d:950,e:REVEAL,st:11,k:{transform:['translateY('+R+')','none']}},
    {s:'.hl:nth-of-type(4) .tx',at:660,d:950,e:REVEAL,st:11,k:{transform:['translateY('+R+')','none']}},
    {s:'#stage .nav',at:720,d:600,e:LIFT,st:45,k:up(L)},
    {s:'[data-k="npn"]',at:860,d:560,e:LIFT,k:up(L)},
    {s:'#nprule',at:915,d:700,e:REVEAL,k:SX},
    {s:'[data-k="npp"]',at:1010,d:560,e:LIFT,k:up(L)},
    {s:'[data-k="bd1"],[data-k="bd2"]',at:1000,d:620,e:LIFT,st:60,k:up(L)},
    {s:'#thumb',at:1100,d:820,e:REVEAL,k:WIPE},
    {s:'#play',at:1300,d:520,e:LIFT,k:{opacity:[0,1]}},
    {s:'[data-k="cp1"],[data-k="cp2"]',at:1220,d:600,e:LIFT,st:55,k:up(L)},
    {s:'#scroll',at:1400,d:560,e:LIFT,k:{opacity:[0,1]}}
  ];
  var MOBILE=[
    {s:'.m-robot',at:0,d:1250,e:REVEAL,k:DROP},
    {s:'.m-brand',at:60,d:620,e:LIFT,k:up('10px')},
    {s:'.m-menu>summary',at:150,d:560,e:REVEAL,k:SX},
    {s:'.m-rjv',at:180,d:1100,e:REVEAL,k:CLIP_L},
    {s:'.m-09',at:300,d:1100,e:REVEAL,k:CLIP_R},
    {s:'.m-count',at:340,d:600,e:LIFT,k:up('10px')},
    {s:'.m-title h1 i>span',at:420,d:950,e:REVEAL,st:80,k:{transform:['translateY(1.05em)','none']}},
    {s:'.m-np span',at:860,d:560,e:LIFT,st:150,k:up('10px')},
    {s:'.m-np s',at:915,d:700,e:REVEAL,k:SX},
    {s:'.m-links a',at:960,d:560,e:LIFT,st:40,k:up('10px')},
    {s:'.m-copy',at:1040,d:620,e:LIFT,k:up('10px')},
    {s:'.m-thumb',at:1140,d:820,e:REVEAL,k:WIPE},
    {s:'.m-cap',at:1240,d:600,e:LIFT,k:up('10px')},
    {s:'.m-scroll',at:1400,d:560,e:LIFT,k:{opacity:[0,1]}}
  ];
  function cleanup(){
    root.style.removeProperty('--liftT'); root.style.removeProperty('--riseT');
    root.classList.remove('intro'); root.classList.add('intro-done');
  }
  function begin(){
    try{
      var stage=document.getElementById('stage');
      var list=(stage && getComputedStyle(stage).display!=='none')?STAGE:MOBILE;
      var kt=getComputedStyle(root).getPropertyValue('--kt').trim()||'1px';
      root.style.setProperty('--liftT','calc(11 * '+kt+')');
      root.style.setProperty('--riseT','calc(58 * '+kt+')');
      var anims=[];
      list.forEach(function(en){
        var els=document.querySelectorAll(en.s);
        for(var i=0;i<els.length;i++){
          anims.push(els[i].animate(en.k,{duration:en.d,delay:en.at+(en.st||0)*i,easing:en.e,fill:'backwards'}));
        }
      });
      root.classList.remove('intro');
      if(!anims.length){ cleanup(); return; }
      var left=anims.length;
      anims.forEach(function(a){ a.finished.then(done,done) });
      function done(){ if(--left<=0) cleanup(); }
    }catch(err){ cleanup(); }
  }
  var kicked=false;
  function kick(){ if(kicked) return; kicked=true; requestAnimationFrame(begin) }
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(kick,kick); else kick();
  setTimeout(function(){ root.classList.remove('intro') },4000);
})();

/* 2 — menu dismissal */
(function(){
  var menus=[document.getElementById('menu'),document.querySelector('.m-menu')].filter(Boolean);
  if(!menus.length) return;
  document.addEventListener('keydown',function(e){
    if(e.key!=='Escape') return;
    menus.forEach(function(m){ if(m.open){ m.open=false; var s=m.querySelector('summary'); if(s) s.focus() } });
  });
  document.addEventListener('pointerdown',function(e){
    menus.forEach(function(m){ if(m.open && !m.contains(e.target)) m.open=false });
  });
})();

"""

out = HTML.replace("__CSS__", CSS).replace("__JS__", JS)
for k, v in P.items():
    out = out.replace("__%s__" % k, v)
assert "__" not in out.replace("__", "", 0) or True
open("index.html", "w").write(out)
print("index.html written:", len(out), "bytes")
import re
leftover = re.findall(r"__[A-Z_]+__", out)
print("unreplaced placeholders:", leftover or "none")
