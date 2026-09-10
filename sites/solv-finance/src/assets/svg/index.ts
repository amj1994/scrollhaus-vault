// All inline SVG design assets, imported as raw strings via Vite's `?raw`.
import logoMark from "./logo-mark.svg?raw";
import dots from "./dots.svg?raw";
import vector from "./vector.svg?raw";
import trustvil from "./logo-trustvil.svg?raw";
import solv from "./logo-solv.svg?raw";
import greenflag from "./logo-greenflag.svg?raw";
import fingerprint from "./logo-fingerprint.svg?raw";
import meetem from "./logo-meetem.svg?raw";
import continiom from "./logo-continiom.svg?raw";
import mrlog from "./logo-mrlog.svg?raw";
import social from "./social.html?raw";

export const svg = {
  logoMark,
  dots,
  vector,
  social,
};

/** Partner logos for the marquee, in display order. */
export const partnerLogos: { markup: string; faded?: boolean; icon?: boolean }[] =
  [
    { markup: trustvil },
    { markup: solv },
    { markup: greenflag },
    { markup: fingerprint, icon: true },
    { markup: meetem },
    { markup: continiom },
    { markup: mrlog, faded: true },
  ];
