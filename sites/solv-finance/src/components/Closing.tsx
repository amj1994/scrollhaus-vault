import { useRef } from "react";
import Footer from "./Footer";
import { ArrowRight } from "./ui/icons";
import { useClosingReveal } from "@/hooks/useClosingReveal";

export default function Closing() {
  const rootRef = useRef<HTMLElement>(null);
  useClosingReveal(rootRef);

  return (
    <section className="closing" ref={rootRef}>
      <div className="closing__inner">
        <div className="cta-block">
          <h2>Speak to our financing experts</h2>
          <p>
            Our team is here to answer your questions, review your business
            needs, and guide you toward the right funding option—so you can
            move forward with confidence
          </p>
          <div className="cta__row">
            <div className="cta__experts">
              <span className="cta__experts-label">Experts</span>
              <div className="cta__avatars">
                <img src="https://qclay.design/lovable/solv/expert-1.webp" alt="" />
                <img src="https://qclay.design/lovable/solv/expert-2.webp" alt="" />
                <img src="https://qclay.design/lovable/solv/expert-3.webp" alt="" />
                <span className="cta__badge">3+</span>
              </div>
            </div>
            <span className="cta__sep" />
            <a href="#" className="cta__btn">
              Talk to finance
              <ArrowRight />
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}
