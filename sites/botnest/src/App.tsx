import { SiteHeader } from '@/components/SiteHeader';
import { ParallaxHero } from '@/components/ParallaxHero';
import { AgentCards } from '@/components/AgentCards';
import { MobileAgentCardsSection } from '@/components/MobileAgentCardsSection';
import { LogoTimelineSection } from '@/components/LogoTimelineSection';
import { FeatureSection } from '@/components/FeatureSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { DesignSection } from '@/components/DesignSection';
import { FeatureShowcaseSection } from '@/components/FeatureShowcaseSection';
import { AgentsIntegrationSection } from '@/components/AgentsIntegrationSection';
import { TestingPlaybookSection } from '@/components/TestingPlaybookSection';
import { KnowledgeAgentsSection } from '@/components/KnowledgeAgentsSection';
import { StressTestScenariosSection } from '@/components/StressTestScenariosSection';
import { OptimizeSection } from '@/components/OptimizeSection';
import { PostLaunchSection } from '@/components/PostLaunchSection';
import { TrackWhatMattersSection } from '@/components/TrackWhatMattersSection';
import { ClientStories } from '@/components/ClientStories';
import { TestimonialMetricsSection } from '@/components/TestimonialMetricsSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { ScheduleDemoSection } from '@/components/ScheduleDemoSection';
import { FooterSection } from '@/components/FooterSection';

function App() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden">
      <SiteHeader />
      <main>
        <ParallaxHero />
        <LogoTimelineSection />
        <div className="hidden md:block">
          <AgentCards />
        </div>
        <div className="md:hidden">
          <MobileAgentCardsSection />
        </div>
        <FeatureSection />
        <ExperienceSection />
        <DesignSection />
        <FeatureShowcaseSection />
        <AgentsIntegrationSection />
        <TestingPlaybookSection />
        <KnowledgeAgentsSection />
        <StressTestScenariosSection />
        <OptimizeSection />
        <PostLaunchSection />
        <TrackWhatMattersSection />
        <ClientStories />
        <TestimonialMetricsSection />
        <HowItWorksSection />
        <ScheduleDemoSection />
      </main>
      <FooterSection />
    </div>
  );
}

export default App;
