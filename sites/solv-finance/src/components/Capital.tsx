import { useRef } from "react";
import { ArrowRight } from "./ui/icons";
import { useCapitalReveal } from "@/hooks/useCapitalReveal";
import { useMarquee } from "@/hooks/useMarquee";

function TopTags() {
  return (
    <>
      <span className="tag tag--dark">Product investment</span>
      <span className="tag tag--cream">Ads payment</span>
    </>
  );
}

function BottomTags() {
  return (
    <>
      <span className="tag tag--blue">Blockchain Payment</span>
      <span className="tag tag--lime">Online payment</span>
      <span className="tag tag--gray">Debt</span>
    </>
  );
}

export default function Capital() {
  const rootRef = useRef<HTMLElement>(null);
  useCapitalReveal(rootRef);

  // Infinite seamless marquees: top row drifts left forever, bottom row
  // drifts right forever (same technique/track structure as LogoMarquee,
  // just with "Blockchain Payment / Online payment / Debt" run in reverse
  // via CSS animation-direction instead of a separate keyframe).
  const topTrackRef = useRef<HTMLDivElement>(null);
  const topDuplicateRef = useRef<HTMLDivElement>(null);
  useMarquee(topTrackRef, topDuplicateRef, { speed: 24 });

  const bottomTrackRef = useRef<HTMLDivElement>(null);
  const bottomDuplicateRef = useRef<HTMLDivElement>(null);
  useMarquee(bottomTrackRef, bottomDuplicateRef, { speed: 24 });

  return (
    <section className="capital" ref={rootRef}>
      <div className="capital__inner">
        <div className="capital__head">
          <h2>Access the growth capital you need, fast</h2>
          <a href="#" className="btn btn--ghost">
            Learn more
            <ArrowRight />
          </a>
        </div>

        <div className="capital__cards">
          <article className="cap-card cap-card--green">
            <div className="cap-panel">
              <h4>No spend restrictions</h4>
              <div className="tags">
                <div className="tags-row" ref={topTrackRef}>
                  <div className="tags-set">
                    <TopTags />
                  </div>
                  <div className="tags-set" aria-hidden="true" ref={topDuplicateRef}>
                    <TopTags />
                  </div>
                  <div className="tags-set" aria-hidden="true">
                    <TopTags />
                  </div>
                  <div className="tags-set" aria-hidden="true">
                    <TopTags />
                  </div>
                </div>
                <div className="tags-row tags-row--shift" ref={bottomTrackRef}>
                  <div className="tags-set">
                    <BottomTags />
                  </div>
                  <div className="tags-set" aria-hidden="true" ref={bottomDuplicateRef}>
                    <BottomTags />
                  </div>
                  <div className="tags-set" aria-hidden="true">
                    <BottomTags />
                  </div>
                  <div className="tags-set" aria-hidden="true">
                    <BottomTags />
                  </div>
                </div>
              </div>
              <p>
                We send cash directly to your bank account - use it however
                you see fit.
              </p>
            </div>
          </article>

          <article className="cap-card cap-card--lav">
            <h3>Intuitive Performance.</h3>
            <div className="bal-panel">
              <span className="bal-label">Balance summary</span>
              <div className="bal-row">
                <span className="bal-amt">$153.23</span>
                <span className="bal-sub">Available of $1,000</span>
              </div>
              <ul className="legend">
                <li>
                  <i className="d1" />
                  <span className="legend__text">
                    <span className="legend__label">Spent</span>
                    <span className="legend__pct">22%</span>
                  </span>
                </li>
                <li>
                  <i className="d2" />
                  <span className="legend__text">
                    <span className="legend__label">Available</span>
                    <span className="legend__pct">63%</span>
                  </span>
                </li>
                <li>
                  <i className="d3" />
                  <span className="legend__text">
                    <span className="legend__label">Unallocated</span>
                    <span className="legend__pct">17%</span>
                  </span>
                </li>
              </ul>
              <div className="segbar">
                <span className="s1" />
                <span className="s2" />
                <span className="s3" />
              </div>
            </div>
          </article>

          <article className="cap-card cap-card--photo">
            <img src="https://qclay.design/lovable/solv/capital-woman.webp" alt="Customer using Servio on her phone" />
            <h3 className="cap-photo__title">Hassle- free cap</h3>
            <p className="cap-photo__text">
              Get capital in as little as 24 hours. so you can capitalize on
              growth opportunities
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
