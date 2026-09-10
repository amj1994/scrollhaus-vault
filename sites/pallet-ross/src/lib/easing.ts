export const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const hoverEase: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

function bezierComponent(u: number, p1: number, p2: number) {
  const mu = 1 - u;
  // P0 = 0, P3 = 1
  return 3 * mu * mu * u * p1 + 3 * mu * u * u * p2 + u * u * u;
}

// Given a target output progress (Y) of a CSS cubic-bezier(x1,y1,x2,y2) timing
// function, find the input time fraction (X) at which the curve reaches it.
// This is the inverse of how a browser evaluates `ease: smoothEase` at a time t.
export function getTimeForProgress(progress: number, easing: [number, number, number, number]): number {
  const [x1, y1, x2, y2] = easing;
  const target = Math.max(0, Math.min(1, progress));

  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 32; i++) {
    const mid = (lo + hi) / 2;
    const y = bezierComponent(mid, y1, y2);
    if (y < target) lo = mid;
    else hi = mid;
  }
  const u = (lo + hi) / 2;
  return bezierComponent(u, x1, x2);
}
