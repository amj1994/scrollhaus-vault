import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Section1 } from "@/components/sections/Section1";
import { Section2 } from "@/components/sections/Section2";
import { Section3 } from "@/components/sections/Section3";
import { Section4 } from "@/components/sections/Section4";
import { Section5 } from "@/components/sections/Section5";
import { Section6 } from "@/components/sections/Section6";
import { Section7 } from "@/components/sections/Section7";
import { Section8 } from "@/components/sections/Section8";
import { Section9 } from "@/components/sections/Section9";
import { Section10 } from "@/components/sections/Section10";
import { Section11 } from "@/components/sections/Section11";
import { Dock } from "@/components/ui/Dock";

function Section2Reveal() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={wrapperRef} className="relative h-[310vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Section2 scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}

function Section4Reveal() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const section5Y = useTransform(scrollYProgress, [0.35, 0.65], ["100%", "0%"]);
  const section4Opacity = useTransform(scrollYProgress, [0.65, 0.75], [1, 0]);
  const section4Y = useTransform(scrollYProgress, [0.65, 0.75], [0, 60]);
  const section4Visibility = useTransform(scrollYProgress, (v) =>
    v >= 0.75 ? "hidden" : "visible",
  );

  return (
    <div ref={wrapperRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen min-h-[720px] w-full overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ opacity: section4Opacity, y: section4Y, visibility: section4Visibility }}
        >
          <Section4 scrollYProgress={scrollYProgress} />
        </motion.div>
        <motion.div className="absolute inset-0 z-10" style={{ y: section5Y }}>
          <Section5 />
        </motion.div>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <Section1 />
      <div className="relative">
        <Section2Reveal />
        <Section3 />
        <Section4Reveal />
        <Section6 />
        <Section7 />
        <Section8 />
        <Section9 />
        <Section10 />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[290vh] z-40 flex items-end justify-center px-10 pb-6">
          <div className="sticky bottom-6 pointer-events-auto">
            <Dock />
          </div>
        </div>
      </div>
      <Section11 />
    </>
  );
}

export default App;
