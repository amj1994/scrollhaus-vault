import { useRef } from "react";
import Svg from "./ui/Svg";
import LogoMarquee from "./LogoMarquee";
import { svg } from "@/assets/svg";
import { ArrowRight, CheckArrow } from "./ui/icons";
import { usePromoReveal } from "@/hooks/usePromoReveal";

export default function Promo() {
  const rootRef = useRef<HTMLElement>(null);
  usePromoReveal(rootRef);

  return (
    <section className="promo" ref={rootRef}>
      <div className="promo__inner">
        <span className="promo__badge">
          Join over 500 businesses already growing with Servio
        </span>

        <LogoMarquee />

        <div className="promo__grid">
          <div className="promo__left">
            <h2 className="promo__title">Build for your next gen of payment</h2>
            <div className="promo__cta">
              <a href="#" className="btn btn--dark">
                Start banking
                <ArrowRight />
              </a>
              <a href="#" className="btn btn--ghost">
                Learn more
              </a>
            </div>
            <p className="promo__lead">
              <strong>Experience seamless integration</strong> of technology
              and finance, built for your success and convenience.
            </p>
            <p className="promo__body">
              <strong>The power of an ERP,</strong> with none of the legacy
              baggage. Servio. gives mid-market finance &amp; accounting
              teams an intuitive platform for audit-readiness, multi-entity.
            </p>
          </div>

          <div className="promo__right">
            <article className="card-spend">
              <h3>Control spend effortlessly at any size</h3>
              <ul>
                <li>
                  <CheckArrow />
                  Issue corporate cards and reimburse expenses
                </li>
                <li>
                  <CheckArrow />
                  Set company-wide spend policies in minutes
                </li>
              </ul>
              <a href="#" className="btn btn--dark btn--sm">
                Manage expenses
                <ArrowRight />
              </a>
            </article>

            <article className="card-dark">
              <span className="card-dark__deco">
                <Svg markup={svg.vector} aria-hidden />
              </span>
              <div className="card-dark__minis">
                <div className="mini-send">
                  <span className="mini__label mini__label--sage">
                    Send money
                  </span>
                  <img className="avatars" src="https://qclay.design/lovable/solv/avatars.webp" alt="Team members" />
                </div>
                <div className="mini-exch">
                  <span className="mini__label mini__label--dark">
                    Exchange money
                  </span>
                  <img className="flags" src="https://qclay.design/lovable/solv/flags.webp" alt="Supported currencies" />
                </div>
              </div>
              <p className="card-dark__title">
                Fuel your growth with friendly Venture Debt
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
