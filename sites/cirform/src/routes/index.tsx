import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar, Hero, About, NumbersSpeak } from "@/components/landing/Sections1";
import { SmarterBanking, Performance, ExpenseGrid } from "@/components/landing/Sections2";
import { Testimonials, FAQ, FooterCTA } from "@/components/landing/Sections3";
import { MagneticCursor } from "@/components/MagneticCursor";
import { useLenis } from "@/hooks/useLenis";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cirform — A bright future for Banking" },
      { name: "description", content: "Cirform empowers financial institutions with secure, intuitive digital banking, real-time analytics and seamless customer experiences." },
      { property: "og:title", content: "Cirform — A bright future for Banking" },
      { property: "og:description", content: "Cirform empowers financial institutions with secure, intuitive digital banking, real-time analytics and seamless customer experiences." },
    ],
  }),
  component: Index,
});

function Index() {
  useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main id="top" className="bg-white">
      {mounted && <MagneticCursor />}
      <Navbar scrolled={scrolled} />
      <Hero scrolled={scrolled} />
      <About />
      <NumbersSpeak />
      <SmarterBanking />
      <Performance />
      <ExpenseGrid />
      <Testimonials />
      <FAQ />
      <FooterCTA />
    </main>
  );
}
