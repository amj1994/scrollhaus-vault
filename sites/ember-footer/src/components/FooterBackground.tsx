import { useEffect, useRef } from "react";
import gazeFrames from "@/gaze-frames.json";

// Eye midpoint and per-eye rest positions in source video pixel space
// (1920x1080), measured from the actual generated clip.
const SOURCE_W = 1920;
const SOURCE_H = 1080;
const EYE_X = 1040;
const EYE_Y = 460;
const LEFT_EYE_SRC = { x: 893, y: 471 };
const RIGHT_EYE_SRC = { x: 1210, y: 440 };
const SCLERA_COLOR = "rgb(190,186,185)";
const PUPIL_COLOR = "rgb(38,34,32)";
const PUPIL_RADIUS_SRC = 19; // approx pupil radius in source px

const TAU = Math.PI * 2;
const wrappedAngle = (angle: number) => ((angle % TAU) + TAU) % TAU;

// The captured clip's eyes only trace a real, continuous arc from
// GAP_END (wrapping through 0) to GAP_START — roughly right -> down -> left.
// The remaining arc (left -> up -> right) has no real footage: two separate
// Higgsfield generations both stopped short of a full loop. Rather than
// snapping cursor positions in that arc to whichever real boundary frame is
// angularly closest (which reads as the gaze "getting stuck"), that arc is
// covered by a small drawn pupil overlay, radius-matched to the real
// boundary frames so the handoff is not visible.
const GAP_START = 3.7182; // last real angle (213 deg), at ~57px offset
const GAP_END = 6.24195; // first real angle (357.6 deg), at ~11px offset
const GAP_START_RADIUS = 57.3;
const GAP_END_RADIUS = 10.9;
const FADE = 0.12; // radians of crossfade at each boundary
// The exact frame the patch/pupil colors were sampled from — its real pupil
// sits at GAP_END_RADIUS, which is what the patch is sized to cover. The
// video must be pinned here whenever the overlay is showing; freezing on
// whatever frame the cursor last scrubbed to would leave a real pupil at a
// different, uncovered offset underneath the synthetic one.
const NEUTRAL_TIME = 0.1667;

function timeForAngle(angle: number) {
  const target = wrappedAngle(angle);
  let nearestTime = gazeFrames[0][1];
  let nearestDistance = Infinity;
  for (const [sampleAngle, time] of gazeFrames as [number, number][]) {
    const difference = Math.abs(target - sampleAngle);
    const distance = Math.min(difference, TAU - difference);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestTime = time;
    }
  }
  return nearestTime + 1 / 240;
}

// How far into the synthetic gap this angle is, 0 at GAP_START, 1 at GAP_END,
// and the corresponding interpolated orbit radius at that point.
function gapProgress(angle: number) {
  const span = GAP_END - GAP_START;
  const t = Math.max(0, Math.min(1, (angle - GAP_START) / span));
  const radius = GAP_START_RADIUS + (GAP_END_RADIUS - GAP_START_RADIUS) * t;
  return { t, radius };
}

export default function FooterBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const leftPupilRef = useRef<HTMLDivElement>(null);
  const rightPupilRef = useRef<HTMLDivElement>(null);
  const leftPatchRef = useRef<HTMLDivElement>(null);
  const rightPatchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current!;
    let frame = 0;
    let desiredTime = 0;
    let pointer: { x: number; y: number } | null = null;
    let disposed = false;
    const mobile = window.matchMedia("(max-width: 700px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const applyOverlay = (angle: number) => {
      const rawOpacity =
        angle <= GAP_START - FADE || angle >= GAP_END + FADE
          ? 0
          : angle < GAP_START + FADE
            ? (angle - (GAP_START - FADE)) / FADE
            : angle > GAP_END - FADE
              ? ((GAP_END + FADE) - angle) / FADE
              : 1;
      const overlayOpacity = Math.max(0, Math.min(1, rawOpacity));
      const { radius } = gapProgress(Math.max(GAP_START, Math.min(GAP_END, angle)));
      const dx = radius * Math.cos(angle);
      const dy = radius * Math.sin(angle);
      const rect = video.getBoundingClientRect();
      const scale = Math.max(rect.width / SOURCE_W, rect.height / SOURCE_H);
      for (const [eye, pupilRef, patchRef] of [
        [LEFT_EYE_SRC, leftPupilRef, leftPatchRef],
        [RIGHT_EYE_SRC, rightPupilRef, rightPatchRef],
      ] as const) {
        const baseX = rect.left + rect.width / 2 + (eye.x - SOURCE_W / 2) * scale;
        const baseY = rect.top + rect.height / 2 + (eye.y - SOURCE_H / 2) * scale;
        const px = baseX + dx * scale;
        const py = baseY + dy * scale;
        const size = PUPIL_RADIUS_SRC * 2 * scale;
        const patchSize = size * 1.7;
        if (pupilRef.current) {
          pupilRef.current.style.opacity = String(overlayOpacity);
          pupilRef.current.style.width = `${size}px`;
          pupilRef.current.style.height = `${size}px`;
          pupilRef.current.style.transform = `translate(${px - size / 2}px, ${py - size / 2}px)`;
        }
        if (patchRef.current) {
          patchRef.current.style.opacity = String(overlayOpacity);
          patchRef.current.style.width = `${patchSize}px`;
          patchRef.current.style.height = `${patchSize}px`;
          patchRef.current.style.transform = `translate(${baseX - patchSize / 2}px, ${baseY - patchSize / 2}px)`;
        }
      }
    };

    const seek = () => {
      frame = 0;
      if (disposed || mobile.matches) return;
      const inGap = desiredAngle > GAP_START && desiredAngle < GAP_END;
      applyOverlay(desiredAngle);
      if (video.readyState < 2 || video.seeking) return;
      const target = inGap ? NEUTRAL_TIME : desiredTime;
      if (Math.abs(video.currentTime - target) > 1 / 48) {
        video.currentTime = Math.min(target, video.duration - 1 / 24);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(seek);
    };
    let desiredAngle = GAP_END; // resting angle, near the neutral frame
    const updateTarget = () => {
      if (mobile.matches || !pointer) return;
      const rect = video.getBoundingClientRect();
      const scale = Math.max(rect.width / SOURCE_W, rect.height / SOURCE_H);
      const eyeX = rect.left + rect.width / 2 + (EYE_X - SOURCE_W / 2) * scale;
      const eyeY = rect.top + rect.height / 2 + (EYE_Y - SOURCE_H / 2) * scale;
      const dx = pointer.x - eyeX;
      const dy = pointer.y - eyeY;
      if (Math.hypot(dx, dy) > 8) {
        desiredAngle = Math.atan2(dy, dx);
        if (desiredAngle < 0) desiredAngle += TAU;
        desiredTime = timeForAngle(desiredAngle);
        schedule();
      }
    };
    const move = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
      updateTarget();
    };
    const ready = () => {
      video.loop = mobile.matches;
      if (mobile.matches && !reducedMotion.matches) {
        void video.play().catch(() => {});
      } else {
        video.pause();
        if (!mobile.matches) {
          updateTarget();
          schedule();
        }
      }
    };
    video.addEventListener("seeked", schedule);
    video.addEventListener("loadeddata", ready);
    mobile.addEventListener("change", ready);
    reducedMotion.addEventListener("change", ready);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("resize", updateTarget);
    window.addEventListener("scroll", updateTarget, { passive: true });
    if (video.readyState >= 2) ready();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      video.removeEventListener("seeked", schedule);
      video.removeEventListener("loadeddata", ready);
      mobile.removeEventListener("change", ready);
      reducedMotion.removeEventListener("change", ready);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("resize", updateTarget);
      window.removeEventListener("scroll", updateTarget);
    };
  }, []);

  return (
    <div className="footer-background" aria-hidden="true">
      <video ref={videoRef} muted playsInline preload="auto" src="/footer-scrub.mp4" />
      {(["left", "right"] as const).map((side) => {
        const patchRef = side === "left" ? leftPatchRef : rightPatchRef;
        const pupilRef = side === "left" ? leftPupilRef : rightPupilRef;
        return (
          <div key={side}>
            <div
              ref={patchRef}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 0,
                borderRadius: "50%",
                background: SCLERA_COLOR,
                filter: "blur(6px)",
                opacity: 0,
                pointerEvents: "none",
                willChange: "transform, opacity",
              }}
            />
            <div
              ref={pupilRef}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 0,
                borderRadius: "50%",
                background: PUPIL_COLOR,
                opacity: 0,
                pointerEvents: "none",
                willChange: "transform, opacity",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
