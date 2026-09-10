export interface ProtocolIcon {
  src: string;
  alt: string;
  /** px at the 1440 reference; the two "featured" icons (Bitcoin, MetaMask) are larger. */
  size: number;
  /** vertical offset in px, creates the gentle arc/dome curve within each row. */
  offsetY?: number;
}

const base = "https://qclay.design/lovable/crypto/icon";

// 22 unique protocol icons, each used exactly once across the 4 rows.
export const topRows: ProtocolIcon[][] = [
  [
    { src: `${base}/protocol-b.svg`, alt: "Protocol", size: 50, offsetY: 15 },
    { src: `${base}/protocol-h.svg`, alt: "Protocol", size: 60, offsetY: 3 },
    { src: `${base}/bitcoin.svg`, alt: "Bitcoin", size: 100, offsetY: -15 },
    { src: `${base}/protocol-d.svg`, alt: "Protocol", size: 60, offsetY: 3 },
    { src: `${base}/ripple-x.svg`, alt: "Ripple", size: 50, offsetY: 15 },
  ],
  [
    { src: `${base}/protocol-c.svg`, alt: "Protocol", size: 60, offsetY: 12 },
    { src: `${base}/optimism.svg`, alt: "Optimism", size: 68, offsetY: 0 },
    { src: `${base}/tether.svg`, alt: "Tether", size: 68, offsetY: -6 },
    { src: `${base}/ethereum.svg`, alt: "Ethereum", size: 68, offsetY: -6 },
    { src: `${base}/protocol-a.svg`, alt: "Protocol", size: 68, offsetY: 0 },
    { src: `${base}/protocol-l.svg`, alt: "Protocol", size: 50, offsetY: 15 },
  ],
];

export const bottomRows: ProtocolIcon[][] = [
  [
    { src: `${base}/protocol-k.svg`, alt: "Protocol", size: 50, offsetY: -9 },
    { src: `${base}/uniswap.svg`, alt: "Uniswap", size: 68, offsetY: 0 },
    { src: `${base}/bnb.svg`, alt: "BNB", size: 68, offsetY: 6 },
    { src: `${base}/qtum.svg`, alt: "Protocol", size: 68, offsetY: 6 },
    { src: `${base}/protocol-j.svg`, alt: "Protocol", size: 68, offsetY: 0 },
    { src: `${base}/protocol-f.svg`, alt: "Protocol", size: 50, offsetY: -9 },
  ],
  [
    { src: `${base}/protocol-i.svg`, alt: "Protocol", size: 50, offsetY: -15 },
    { src: `${base}/protocol-e.svg`, alt: "Protocol", size: 60, offsetY: -3 },
    { src: `${base}/metamask.svg`, alt: "MetaMask", size: 100, offsetY: 15 },
    { src: `${base}/solana.svg`, alt: "Solana", size: 60, offsetY: -3 },
    { src: `${base}/protocol-g.svg`, alt: "Protocol", size: 50, offsetY: -15 },
  ],
];
