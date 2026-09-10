import { createFileRoute } from "@tanstack/react-router";
import { useSmoothScroll } from "@/lib/useSmoothScroll";
import Hero from "@/components/Hero";
import Promo from "@/components/Promo";
import Capital from "@/components/Capital";
import Fee from "@/components/Fee";
import Faq from "@/components/Faq";
import Testimonial from "@/components/Testimonial";
import Articles from "@/components/Articles";
import Closing from "@/components/Closing";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useSmoothScroll();
  return (
    <>
      <Hero />
      <Promo />
      <Capital />
      <Fee />
      <Faq />
      <Testimonial />
      <Articles />
      <Closing />
    </>
  );
}
