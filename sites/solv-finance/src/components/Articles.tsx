import { useRef } from "react";
import { ARTICLES } from "@/data";
import { useArticlesReveal } from "@/hooks/useArticlesReveal";

export default function Articles() {
  const rootRef = useRef<HTMLElement>(null);
  useArticlesReveal(rootRef);

  return (
    <section className="articles" ref={rootRef}>
      <div className="articles__inner">
        <div className="articles__head">
          <h2>Our latest Articles</h2>
          <a href="#" className="articles__more">
            Show All
          </a>
        </div>
        <div className="articles__grid">
          {ARTICLES.map((a) => (
            <a href="#" className="art-card" key={a.title}>
              <img src={a.img} alt="" />
              <div className="art-card__glare" aria-hidden="true" />
              <h3>{a.title}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
