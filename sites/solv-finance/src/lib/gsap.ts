import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins once, centrally.
// Import { gsap, ScrollTrigger } from "@/lib/gsap" anywhere you need them.
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
