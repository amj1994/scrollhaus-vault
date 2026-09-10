import { ScrambleText } from "./ScrambleText";
import type { StepHud } from "./steps";

interface LensHudProps {
  hud: StepHud;
  leftPercent: number;
  isRightLens?: boolean;
}

const TEXT_CLASS = "font-condensed text-[#3BFA45]";

export function LensHud({ hud, leftPercent, isRightLens }: LensHudProps) {
  const centerFontSize = hud.center.line2 ? 34 : 31;
  const translatingMarginTopPx = hud.center.line2 ? 0 : 85;
  const stepShiftPx = hud.center.line2 ? 0 : 30;
  const rowMarginBottomPx = hud.center.line2 ? 15 : 25;
  const rowHorizontalShiftPx = hud.center.line2 ? -28 : isRightLens ? -20 : -35;
  const stepRowExtraInsetPx = hud.center.line2 ? 0 : 14;
  const dateShiftPx = isRightLens ? 15 : 0;
  const percentShiftPx = hud.center.line2 ? (isRightLens ? -40 : -65) : isRightLens ? 0 : -11;
  const translatingShiftPx = isRightLens ? -40 : -55;
  const phraseBlockShiftPx = hud.center.line2 ? (isRightLens ? -63 : -73) : 0;
  const phraseBlockMarginTopPx = hud.center.line2 ? (isRightLens ? 68 : 73) : 0;
  const phraseBlockRightLensExtraPx = hud.center.line2 && isRightLens ? 6 : 0;

  return (
    <div
      className="pointer-events-none absolute top-[10%] flex h-[65%] w-[26%] rotate-180 flex-col justify-between"
      style={{ left: `calc(${leftPercent}% + ${stepShiftPx}px)` }}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        {hud.center.line2 ? (
          <div
            className="flex flex-col items-center gap-2"
            style={{
              transform: `translateX(${phraseBlockShiftPx + phraseBlockRightLensExtraPx}px) scale(0.9)`,
              marginTop: `${phraseBlockMarginTopPx}px`,
            }}
          >
            <div className="flex items-baseline justify-center gap-8 whitespace-nowrap">
              <span
                className={`${TEXT_CLASS} font-bold leading-none`}
                style={{ fontSize: `${centerFontSize}px` }}
              >
                <ScrambleText text={hud.center.label1 ?? ""} />
              </span>
              <span
                className={`${TEXT_CLASS} font-bold leading-none`}
                style={{ fontSize: `${centerFontSize}px` }}
              >
                <ScrambleText text={hud.center.line1} />
              </span>
            </div>
            <span className="h-px w-36 bg-[#3BFA45]" />
            <div className="flex items-baseline justify-center gap-8 whitespace-nowrap">
              <span
                className={`${TEXT_CLASS} font-bold leading-none`}
                style={{ fontSize: `${centerFontSize}px` }}
              >
                <ScrambleText text={hud.center.label2 ?? ""} />
              </span>
              <span
                className={`${TEXT_CLASS} font-bold leading-none`}
                style={{ fontSize: `${centerFontSize}px` }}
              >
                <ScrambleText text={hud.center.line2} />
              </span>
            </div>
          </div>
        ) : (
          <span
            className={`${TEXT_CLASS} font-bold leading-none`}
            style={{
              fontSize: `${centerFontSize}px`,
              transform: `translateX(${translatingShiftPx}px)`,
              marginTop: `${translatingMarginTopPx}px`,
            }}
          >
            <ScrambleText text={hud.center.line1} />
          </span>
        )}
      </div>
      <div
        className="flex items-start justify-between px-1"
        style={{
          marginBottom: `${rowMarginBottomPx}px`,
          paddingLeft: `${4 + stepRowExtraInsetPx}px`,
          paddingRight: `${4 + stepRowExtraInsetPx}px`,
          transform: `translateX(${rowHorizontalShiftPx}px)`,
        }}
      >
        <span
          className={`${TEXT_CLASS} text-[22px] font-bold leading-none`}
          style={{ transform: `translateX(${dateShiftPx}px)` }}
        >
          <ScrambleText text={hud.timestamp} />
        </span>
        <span
          className={`${TEXT_CLASS} text-[22px] font-bold leading-none`}
          style={{ transform: `translateX(${percentShiftPx}px)` }}
        >
          <ScrambleText text={hud.percent} />
        </span>
      </div>
    </div>
  );
}
