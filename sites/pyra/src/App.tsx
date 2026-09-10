import { useLenis } from "@/lib/useLenis";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Philosophy from "@/components/Philosophy";
import Product from "@/components/Product";
import Footer from "@/components/Footer";

export default function App() {
  useLenis();

  return (
    <div className="bg-[#0a0503]">
      <Navbar />
      <Hero />
      <Story />
      <Philosophy />
      <Product />
      <Footer />
    </div>
  );
}
