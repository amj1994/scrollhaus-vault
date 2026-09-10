import { useLayoutEffect, useRef, useState } from "react";
import Svg from "./ui/Svg";
import { svg } from "@/assets/svg";
import {
  CHART_DATA,
  SEG_COLORS,
  BADGES,
  type ChartRange,
} from "@/data";

const TABS: ChartRange[] = ["weekly", "monthly", "yearly"];

interface CashflowCardProps {
  /**
   * When false, the chart stays collapsed (no segments drawn) until this
   * flips to true — lets a parent entrance animation trigger the chart
   * draw-in exactly when the card itself has finished arriving.
   * Defaults to true so the component still works stand-alone.
   */
  active?: boolean;
}

export default function CashflowCard({ active = true }: CashflowCardProps) {
  const [range, setRange] = useState<ChartRange>("weekly");
  const [mounted, setMounted] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [line, setLine] = useState({ width: 0, x: 0 });

  // Trigger the segment grow-in transition once active (card has arrived),
  // and again whenever the tab range changes.
  useLayoutEffect(() => {
    if (!active) return;
    setMounted(false);
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, [range, active]);

  // Position the active-tab underline.
  useLayoutEffect(() => {
    const tabsEl = tabsRef.current;
    if (!tabsEl) return;
    const move = () => {
      const activeTab = tabsEl.querySelector<HTMLButtonElement>(".tab.active");
      if (activeTab) setLine({ width: activeTab.offsetWidth, x: activeTab.offsetLeft });
    };
    move();
    window.addEventListener("resize", move);
    return () => window.removeEventListener("resize", move);
  }, [range]);

  const cols = CHART_DATA[range];

  return (
    <div className="card" id="cashCard">
      <div className="card__head">
        <div className="card__title-row">
          <span className="card__title">Cashflow</span>
          <span className="badge">{BADGES[range]}</span>
        </div>
        <span className="card__dots">
          <Svg markup={svg.dots} aria-hidden />
        </span>
      </div>

      <div className="tabs" ref={tabsRef}>
        {TABS.map((r) => (
          <button
            key={r}
            className={`tab${r === range ? " active" : ""}`}
            onClick={() => setRange(r)}
          >
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </button>
        ))}
        <span
          className="tabs__line"
          style={{ width: line.width, transform: `translateX(${line.x}px)` }}
        />
      </div>
      <div className="card__divider" />

      <div className="chart">
        {cols.map((segs, ci) => (
          <div className="cf-col" key={ci}>
            {segs.map((s, si) => (
              <div
                key={si}
                className="cf-seg"
                style={{
                  background: SEG_COLORS[si],
                  top: mounted ? `${s.t}%` : "100%",
                  height: mounted ? `${s.h}%` : "0%",
                  transitionDelay: `${ci * 70 + si * 45}ms`,
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <p className="card__foot">It updates on each reopen</p>
    </div>
  );
}
