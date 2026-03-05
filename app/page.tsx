import { HeroSection } from "@/components/hero-section"
import { TrendingHomes } from "@/components/trending-homes"
import { ExploreTypes } from "@/components/explore-types"
import { FeaturedListings } from "@/components/featured-listings"
import { ValueProposition } from "@/components/value-proposition"
import { Testimonials } from "@/components/testimonials"
import { PopularSearches } from "@/components/popular-searches"

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <TrendingHomes />
        <ExploreTypes />
        <FeaturedListings />
        <ValueProposition />
        <Testimonials />
        <PopularSearches />
      </main>
    </>
  )
}
