import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Story from '@/components/Story'
import Lens from '@/components/Lens'
import UpcomingTours from '@/components/UpcomingTours'
import TravelIntention from '@/components/TravelIntention'
import WhyTravel from '@/components/WhyTravel'
import FeaturedTour from '@/components/FeaturedTour'
import TravelerStories from '@/components/TravelerStories'
import Faq from '@/components/Faq'
import ClosingCta from '@/components/ClosingCta'
import Footer from '@/components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#f8f3ef] text-[#1a1a1a] font-sans antialiased overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Story />
        <Lens />
        <UpcomingTours />
        <TravelIntention />
        <WhyTravel />
        <FeaturedTour />
        <TravelerStories />
        <Faq />
        <ClosingCta />
      </main>
      <Footer />
    </div>
  )
}
