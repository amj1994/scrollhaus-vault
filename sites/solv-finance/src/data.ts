// ---- Cashflow chart -------------------------------------------------------
export type ChartRange = "weekly" | "monthly" | "yearly";
export interface Segment {
  t: number; // top position (%)
  h: number; // height (%)
}

// 4 columns, each a floating 3-segment pill (medium-olive / dark-olive / bright-lime).
export const CHART_DATA: Record<ChartRange, Segment[][]> = {
  weekly: [
    [{ t: 33.7, h: 12.2 }, { t: 49.0, h: 24.5 }, { t: 75.5, h: 8.2 }],
    [{ t: 22.4, h: 15.3 }, { t: 40.8, h: 29.6 }, { t: 74.5, h: 9.2 }],
    [{ t: 12.2, h: 9.2 }, { t: 23.5, h: 17.3 }, { t: 42.9, h: 19.4 }],
    [{ t: 0, h: 19.4 }, { t: 24.5, h: 41.8 }, { t: 70.4, h: 29.6 }],
  ],
  monthly: [
    [{ t: 40, h: 10 }, { t: 52, h: 20 }, { t: 74, h: 10 }],
    [{ t: 15, h: 12 }, { t: 29, h: 35 }, { t: 66, h: 14 }],
    [{ t: 28, h: 8 }, { t: 38, h: 15 }, { t: 55, h: 24 }],
    [{ t: 5, h: 16 }, { t: 23, h: 38 }, { t: 63, h: 32 }],
  ],
  yearly: [
    [{ t: 20, h: 14 }, { t: 36, h: 22 }, { t: 60, h: 12 }],
    [{ t: 35, h: 11 }, { t: 48, h: 19 }, { t: 69, h: 11 }],
    [{ t: 8, h: 10 }, { t: 20, h: 20 }, { t: 42, h: 22 }],
    [{ t: 0, h: 22 }, { t: 24, h: 44 }, { t: 70, h: 30 }],
  ],
};

export const SEG_COLORS = ["#8c9c2b", "#2e3502", "#b8cc38"];
export const BADGES: Record<ChartRange, string> = {
  weekly: "+23%",
  monthly: "+18%",
  yearly: "+41%",
};

// ---- Testimonials ---------------------------------------------------------
export interface Testimonial {
  quote: string;
  by: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      '"The funding process was seamless and transparent. Within 24 hours, we had the capital we needed to restock inventory and scale our ad campaigns. It felt like a true growth partnership."',
    by: "Sarah Mitchell, Co at BrightThreads",
  },
  {
    quote:
      '"We connected our sales platforms in minutes and had funds the next morning. No equity, no collateral, no endless paperwork — exactly what a growing brand needs."',
    by: "David Okafor, Founder at NorthPeak Goods",
  },
  {
    quote:
      '"The fixed fee was clear from day one and repayment flexed with our seasonal cycles. It let us invest ahead of demand without the stress of traditional loans."',
    by: "Elena Rossi, CEO at Maison Vela",
  },
];

// ---- FAQ ------------------------------------------------------------------
export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Who is eligible to apply for funding?",
    a: "Any business with consistent revenue and a track record of sales is eligible to apply. We typically work with e-commerce, wholesale, subscription, and retail brands. Specific eligibility depends on revenue levels and connected sales platforms.",
  },
  {
    q: "How quickly can I access the funds?",
    a: "Once approved, funds are typically deposited within 24 hours. The initial application and connection of your sales platforms takes only a few minutes.",
  },
  {
    q: "Do I need to provide collateral or give up equity?",
    a: "No. Our funding is non-dilutive and unsecured — you never give up equity or pledge personal assets. You simply remit the advance plus a fixed fee over an agreed timeframe.",
  },
  {
    q: "Will applying affect my credit score?",
    a: "Applying has no impact on your personal credit score. We assess eligibility based on your business revenue and sales history, not a hard credit inquiry.",
  },
];

// ---- Nav ------------------------------------------------------------------
export const NAV_LINKS = ["Service", "Members benefits", "Products"];

// ---- Articles -------------------------------------------------------------
export interface Article {
  img: string;
  title: string;
}

export const ARTICLES: Article[] = [
  { img: "https://qclay.design/lovable/solv/article-1.webp", title: "How to Prepare Your Business for Funding" },
  { img: "https://qclay.design/lovable/solv/article-2.webp", title: "Scaling During Seasonal Peaks, a Funding Playbook" },
  { img: "https://qclay.design/lovable/solv/article-3.webp", title: "Smart Ways to Use Growth Capital" },
];
