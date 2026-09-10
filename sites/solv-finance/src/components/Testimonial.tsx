import { useRef, useState } from "react";
import { TESTIMONIALS } from "@/data";
import { ChevronLeft, ChevronRight } from "./ui/icons";
import { useTestimonialReveal } from "@/hooks/useTestimonialReveal";

export default function Testimonial() {
  const rootRef = useRef<HTMLElement>(null);
  useTestimonialReveal(rootRef);

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const go = (dir: 1 | -1) => {
    setVisible(false);
    window.setTimeout(() => {
      setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
      setVisible(true);
    }, 200);
  };

  const current = TESTIMONIALS[index];

  return (
    <section className="quote" ref={rootRef}>
      <div className="quote__bg">
        <img
          src="https://qclay.design/lovable/solv/testimonial-woman.webp"
          alt="Sarah Mitchell, Co-founder at BrightThreads"
        />
      </div>
      <div className="quote__scrim" aria-hidden="true">
        <img src="https://qclay.design/lovable/solv/quote-blur.webp" alt="" />
      </div>
      <div className="quote__inner">
        <div className="quote__body">
          <p className="quote__label">{current.by}</p>
          <div className="quote__slides">
            <p
              className="quote__text"
              style={{ opacity: visible ? 1 : 0 }}
            >
              {current.quote}
            </p>
          </div>
        </div>
      </div>
      <div className="quote__arrows">
        <button
          className="quote__arrow"
          aria-label="Previous testimonial"
          onClick={() => go(-1)}
        >
          <ChevronLeft />
        </button>
        <button
          className="quote__arrow"
          aria-label="Next testimonial"
          onClick={() => go(1)}
        >
          <ChevronRight />
          <svg className="quote__arrow-ring" viewBox="0 0 44 44" aria-hidden="true">
            <circle cx="22" cy="22" r="21.25" transform="rotate(-90 22 22)" />
          </svg>
        </button>
      </div>
    </section>
  );
}
