import { useRef, useState, useCallback, useEffect } from "react";
import Svg from "./ui/Svg";
import { svg } from "@/assets/svg";
import { ArrowRight } from "./ui/icons";
import { useFeeReveal } from "@/hooks/useFeeReveal";

const MIN_REV = 500;
const MAX_REV = 10000;
const DEFAULT_REV = 1544.52;

function formatMoney(n: number) {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export default function Fee() {
  const rootRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [revenue, setRevenue] = useState<number>(0);
  const draggingRef = useRef(false);

  useFeeReveal(rootRef, {
    targetRevenue: DEFAULT_REV,
    onRevenue: (v) => {
      // Ignore intro-driven updates once the user starts interacting.
      if (draggingRef.current) return;
      setRevenue(v);
    },
  });

  const pct = Math.max(
    0,
    Math.min(100, ((revenue - MIN_REV) / (MAX_REV - MIN_REV)) * 100)
  );

  const updateFromClientX = useCallback((clientX: number) => {
    const el = sliderRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const value = MIN_REV + ratio * (MAX_REV - MIN_REV);
    setRevenue(value);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      updateFromClientX(e.clientX);
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [updateFromClientX]);

  const revenueDisplay = revenue.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Funding estimate: scale revenue to a low/high range.
  // At default $1544.52 → ~$150k-$300k. Multiplier ≈ 97 and 194.
  const low = Math.round((revenue * 97) / 1000) * 1000;
  const high = Math.round((revenue * 194) / 1000) * 1000;

  return (
    <section className="fee" ref={rootRef}>
      <div className="fee__inner">
        <div className="fee__left">
          <h2>One transparent fee.<br />No hidden costs.</h2>
          <p>
            Remit your funding amount, plus our fixed fee (typically 4-8% of
            the advance), over a timeframe that aligns with your business
            cycles.
          </p>
          <a href="#" className="btn btn--dark">
            Apply now
            <ArrowRight />
          </a>
        </div>

        <div className="fee__calc">
          <span className="calc__deco">
            <Svg markup={svg.vector} aria-hidden />
          </span>
          <div className="calc__header">
            <span className="calc__title">Calculations</span>
            <span className="calc__divider" />
          </div>
          <div className="calc__block">
            <span className="calc__label">Your Monthly revenue</span>
            <span className="calc__value value__value" data-value={revenueDisplay}>${revenueDisplay}</span>
            <div
              className="calc__slider"
              ref={sliderRef}
              onPointerDown={onPointerDown}
              role="slider"
              aria-valuemin={MIN_REV}
              aria-valuemax={MAX_REV}
              aria-valuenow={Math.round(revenue)}
              tabIndex={0}
              onKeyDown={(e) => {
                const step = (MAX_REV - MIN_REV) / 100;
                if (e.key === "ArrowRight" || e.key === "ArrowUp") {
                  setRevenue((v) => Math.min(MAX_REV, v + step));
                } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
                  setRevenue((v) => Math.max(MIN_REV, v - step));
                }
              }}
              style={{ cursor: "pointer", touchAction: "none" }}
            >
              <span className="calc__slider-fill" style={{ width: `${pct}%` }} />
              <span className="calc__slider-knob" style={{ left: `${pct}%` }} />
            </div>
            <span className="calc__divider calc__divider--below-slider" />
          </div>
          <div className="calc__block">
            <span className="calc__label">Your funding etimate</span>
            <span className="calc__value">${formatMoney(low)} - ${formatMoney(high)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
