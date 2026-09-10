import { useRef, useState } from "react";
import Nav from "./Nav";
import CashflowCard from "./CashflowCard";
import { ArrowRight } from "./ui/icons";
import { useHeroIntro } from "@/hooks/useHeroIntro";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const [cardActive, setCardActive] = useState(false);

  useHeroIntro(rootRef, { onCardVisible: () => setCardActive(true) });

  return (
    <section className="hero" ref={rootRef}>
      <div className="hero__media">
        <video
          src="/hero-video.mp4"
          poster="/hero-poster.webp"
          autoPlay
          loop
          muted
          playsInline
          aria-label="Solv customer in an orange shirt"
        />
      </div>
      <div className="hero__scrim" aria-hidden="true">
        <img src="https://qclay.design/lovable/solv/hero-blur-corner.webp" alt="" />
      </div>

      <svg className="noise" width="100%" height="100%" aria-hidden="true">
        <filter id="n">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves={2}
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#n)" />
      </svg>

      <Nav />

      <div className="hero__inner">
        <div className="hero__text">
          <h1 className="hero__title">Build for fast<br />moving business</h1>
          <p className="hero__desc">
            AI-first ERP powering next-gen finance &amp; accounting. General
            ledger, revenue automation, close management.
          </p>
          <div className="cta-row">
            <a href="#" className="cta">
              Get started
              <ArrowRight />
            </a>
          </div>
        </div>
      </div>

      <div className="card-scroll">
        <span className="card-scroll__thumb" />
      </div>

      <CashflowCard active={cardActive} />
    </section>
  );
}
