import { useEffect, useRef } from "react";
import Svg from "./ui/Svg";
import { partnerLogos } from "@/assets/svg";

const SPEED = 42; // px per second, constant across breakpoints

function LogoSetItems() {
  return (
    <>
      {partnerLogos.map((logo, i) => (
        <span
          key={i}
          className={`logo-mark${logo.icon ? " logo-mark--icon" : ""}${
            logo.faded ? " logo-mark--faded" : ""
          }`}
        >
          <Svg markup={logo.markup} aria-hidden />
        </span>
      ))}
    </>
  );
}

export default function LogoMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const setBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const setB = setBRef.current;
    if (!track || !setB) return;

    const measure = () => {
      track.style.animation = "none";
      // Measure setB's position relative to the track itself (not
      // offsetLeft, which is relative to the nearest positioned
      // ancestor and can drift out of sync with the track's actual
      // rendered width during viewport resizes — that mismatch is what
      // was causing the logos to bunch up / overlap instead of lining
      // up cleanly at the loop point).
      const shift =
        setB.getBoundingClientRect().left - track.getBoundingClientRect().left;
      if (shift > 0) {
        track.style.setProperty("--marquee-shift", `${shift}px`);
        track.style.setProperty("--marquee-dur", `${shift / SPEED}s`);
      }
      // force reflow, then restore animation so it restarts cleanly from 0
      void track.offsetWidth;
      track.style.animation = "";
    };

    measure();

    // ResizeObserver instead of a window "resize" listener: on small
    // screens the width-affecting change isn't always a viewport resize
    // (flex-wrap reflow, a late web-font swap, a logo SVG that only gets
    // its real intrinsic size once it's actually laid out) — a plain
    // resize listener misses those, so the shift/duration variables kept
    // stale values from a wider layout and the copies no longer lined up
    // (visually: logos piling up / overlapping instead of scrolling past
    // cleanly). ResizeObserver fires on the track's *actual* rendered
    // size changing, whatever the cause.
    let debounceT: number;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(debounceT);
      debounceT = window.setTimeout(measure, 120);
    });
    ro.observe(track);

    return () => {
      window.clearTimeout(debounceT);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="logos-marquee">
      <div className="logos-track" ref={trackRef}>
        <div className="logos-set">
          <LogoSetItems />
        </div>
        <div className="logos-set" aria-hidden="true" ref={setBRef}>
          <LogoSetItems />
        </div>
        <div className="logos-set" aria-hidden="true">
          <LogoSetItems />
        </div>
        <div className="logos-set" aria-hidden="true">
          <LogoSetItems />
        </div>
      </div>
      <div className="logos-fade logos-fade--left" />
      <div className="logos-fade logos-fade--right" />
    </div>
  );
}
