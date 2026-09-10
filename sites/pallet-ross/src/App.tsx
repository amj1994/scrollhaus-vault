import { useRef } from "react";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import Navbar from "@/components/Navbar";
import ScrollIndicator from "@/components/ScrollIndicator";
import ScrollCardsOverlay from "@/components/ScrollCardsOverlay";
import HeroSection from "@/components/HeroSection";
import ShowcaseSection from "@/components/ShowcaseSection";
import GatewaySection from "@/components/GatewaySection";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} style={{ position: "relative", background: "#F2F2F0" }}>
      <BackgroundBlobs />
      <Navbar />
      <ScrollIndicator />
      <ScrollCardsOverlay containerRef={containerRef} />
      <HeroSection />
      <ShowcaseSection />
      <GatewaySection />
    </div>
  );
}
