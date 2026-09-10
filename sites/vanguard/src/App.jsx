import Navbar from './components/Navbar'
import Hero from './components/sections/Hero'
import Stats from './components/sections/Stats'
import Award from './components/sections/Award'
import EverythingBusiness from './components/sections/EverythingBusiness'
import FeatureGrid from './components/sections/FeatureGrid'
import DashboardShowcase from './components/sections/DashboardShowcase'
import MobileBuilt from './components/sections/MobileBuilt'
import MobileApp from './components/sections/MobileApp'
import FAQ from './components/sections/FAQ'
import FooterCTA from './components/sections/FooterCTA'
import Footer from './components/sections/Footer'
import { useSmoothScroll } from './lib/useSmoothScroll'

export default function App() {
  useSmoothScroll()
  return (
    <main className="w-full bg-brand-dark text-white">
      <Navbar />
      <Hero />
      <Stats />
      <EverythingBusiness />
      <FeatureGrid />
      <DashboardShowcase />
      <MobileBuilt />
      <Award />
      <MobileApp />
      <FAQ />
      <FooterCTA />
      <Footer />
    </main>
  )
}
