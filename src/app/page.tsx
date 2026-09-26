import ExperienceShell from "@/components/layout/ExperienceShell";
import HeroSection from "@/sections/HeroSection";
import TextileTransition from "@/sections/TextileTransition";
import SixMoodsSection from "@/sections/SixMoodsSection";
import CircularOrbitSection from "@/sections/CircularOrbitSection";
import CollectionMarquee from "@/sections/CollectionMarquee";
import FeaturedCollectionSection from "@/sections/FeaturedCollectionSection";
import HorizontalJourneySection from "@/sections/HorizontalJourneySection";
import ProductCollectionSection from "@/sections/ProductCollectionSection";
import EditorialLookbookSection from "@/sections/EditorialLookbookSection";
import ImageStackSection from "@/sections/ImageStackSection";
import CraftStorySection from "@/sections/CraftStorySection";
import CinematicVideoSection from "@/sections/CinematicVideoSection";
import LatestTrendsSection from "@/sections/LatestTrendsSection";
import SocialEditorialSection from "@/sections/SocialEditorialSection";
import FinalCtaSection from "@/sections/FinalCtaSection";
import FooterSection from "@/sections/FooterSection";

export default function Home() {
  return (
    <ExperienceShell>
      <main className="relative w-full bg-[#0a0808] text-[#fbf9f5] overflow-hidden">
        {/* Scene 02: Cinematic Hero with Actual Fashion Video */}
        <HeroSection />

        {/* Scene 03: Organic Textile Transition */}
        <TextileTransition />

        {/* Scene 04: Six Moods (Pinned Cinematic Sequence) */}
        <SixMoodsSection />

        {/* Scene 05: Circular Editorial Orbit (14-item 3D Elliptical Orbit) */}
        <CircularOrbitSection />

        {/* Scene 06: Collection Marquee (Multi-layer Differential Parallax) */}
        <CollectionMarquee />

        {/* Scene 07: Featured Collection (The New Edit Asymmetry) */}
        <FeaturedCollectionSection />

        {/* Scene 08: Horizontal Collection Journey (Pinned 6 Panels) */}
        <HorizontalJourneySection />

        {/* Scene 09: Product Collection (12 Products & Animated Filters) */}
        <ProductCollectionSection />

        {/* Scene 10: Editorial Lookbook (10 Compositions with Pinned Monolith) */}
        <EditorialLookbookSection />

        {/* Scene 11: Cinematic Image Stack (8 Peeling Archival Cards) */}
        <ImageStackSection />

        {/* Scene 12: Craft Story (6 Pinned Provenance Stages) */}
        <CraftStorySection />

        {/* Scene 13: Cinematic Video Section (Bishnupur Swarnachari Weaving) */}
        <CinematicVideoSection />

        {/* Scene 14: Latest Trends (2026 Contemporary Indian Forecast) */}
        <LatestTrendsSection />

        {/* Scene 15: Social Editorial (8 Campaign Journal Frames) */}
        <SocialEditorialSection />

        {/* Scene 16: Final Cinematic CTA ("Wear the Story") */}
        <FinalCtaSection />

        {/* Luxury Minimal Footer */}
        <FooterSection />
      </main>
    </ExperienceShell>
  );
}
