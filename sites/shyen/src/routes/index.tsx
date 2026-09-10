import { createFileRoute } from "@tanstack/react-router";
import { useSmoothScroll } from "@/lib/useSmoothScroll";
import Hero from "@/components/Hero";
import CareSection from "@/components/CareSection";
import ToolkitSection from "@/components/ToolkitSection";
import CollabLogos from "@/components/CollabLogos";
import ConnectedSection from "@/components/ConnectedSection";
import ProductsSection from "@/components/ProductsSection";
import RecommendedSection from "@/components/RecommendedSection";
import HoverSliderSection from "@/components/HoverSliderSection";
import StoriesSection from "@/components/StoriesSection";
import MobileSection from "@/components/MobileSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shyen — 24/7 support for your mind" },
      {
        name: "description",
        content:
          "Shyen is 24/7 AI support for your mind. Created by renowned clinicians, it gives you the support you need, right when you need it.",
      },
      { property: "og:title", content: "Shyen — 24/7 support for your mind" },
      {
        property: "og:description",
        content: "AI mental wellness companion built with renowned clinicians.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useSmoothScroll();
  return (
    <main>
      <Hero />
      <CareSection />
      <ToolkitSection />
      <CollabLogos />
      <ConnectedSection />
      <ProductsSection />
      <RecommendedSection />
      <HoverSliderSection />
      <StoriesSection />
      <MobileSection />
      <FinalCtaSection />
      <Footer />
    </main>
  );
}
