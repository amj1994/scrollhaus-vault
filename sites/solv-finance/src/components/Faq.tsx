import { useRef, useState } from "react";
import { FAQ_ITEMS } from "@/data";
import { useFaqReveal } from "@/hooks/useFaqReveal";

export default function Faq() {
  const rootRef = useRef<HTMLElement>(null);
  // Starts fully closed — useFaqReveal opens the first item once the
  // heading/subtitle/list have finished their own entrance.
  const [openIndex, setOpenIndex] = useState(-1);
  useFaqReveal(rootRef, { onRevealed: () => setOpenIndex(0) });

  return (
    <section className="faq" ref={rootRef}>
      <div className="faq__inner">
        <div className="faq__intro">
          <h2>Frequently<br />Asked Questions</h2>
          <p>
            Clear answers to the most common questions
            <br />
            about our funding process, eligibility, and costs.
          </p>
        </div>

        <div className="faq__list">
          {FAQ_ITEMS.map((item, i) => {
            const open = i === openIndex;
            const panelId = `faq-panel-${i}`;
            return (
              <div className={`faq-item${open ? " open" : ""}`} key={item.q}>
                <button
                  className="faq-q"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? -1 : i)}
                >
                  {item.q}
                  <span className="faq-icon" aria-hidden="true" />
                </button>
                {/*
                  Modern CSS-only accordion: .faq-a animates
                  grid-template-rows 0fr -> 1fr, so it always grows to the
                  content's *natural* height with zero JS measurement (no
                  scrollHeight, no resize listener — it just adapts, even if
                  the text reflows). .faq-a__inner supplies the
                  overflow:hidden the technique needs to actually collapse
                  to zero; the <p> itself fades/slides in with a short delay
                  so it never looks like it's being clipped by the box.
                */}
                <div className="faq-a" id={panelId} role="region" aria-hidden={!open}>
                  <div className="faq-a__inner">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
