export const HERO_ROW_Y = 522;

export type Slot = { x: number; y: number; rotate: number; scale: number; z: number };

export const FAN_SLOTS: Slot[] = [
  { x: -480, y: 18, rotate: -18, scale: 0.88, z: 1 },
  { x: -310, y: 6, rotate: -10, scale: 0.92, z: 2 },
  { x: -155, y: -2, rotate: -4, scale: 0.96, z: 3 },
  { x: 0, y: -8, rotate: 0, scale: 1, z: 4 },
  { x: 160, y: -2, rotate: 5, scale: 0.96, z: 3 },
  { x: 320, y: 6, rotate: 12, scale: 0.92, z: 2 },
  { x: 480, y: 18, rotate: 20, scale: 0.88, z: 1 },
];

export type CascadeSlot = { top: number; left: number; rotate: number; z: number };

export const CASCADE: CascadeSlot[] = Array.from({ length: 7 }, (_, i) => ({
  top: 300 + i * 70,
  left: 20 + i * 150,
  rotate: -3 + i * 3,
  z: 7 - i,
}));

export const CARD_SIZE = 220;
