import type { Market } from "~/types/types";
import RatingAndReviewSection from "../sections/RatingsAndReviews/rating-and-reviews-section";
import RecommenedForYouSection from "../sections/RecommendedForYou/recommended-for-you-section";
import UniqueServicesSection from "../sections/UniqueServices/unique-services-section";

interface HighlightsPageProps {
  market: Market;
  handleTabSelect?: (tabName: string) => void;
}

export default function HighlightsPage({
  market,
  handleTabSelect,
}: HighlightsPageProps) {
  return (
    <div id="HighlightsPage" className="py-8">
      <UniqueServicesSection marketId={market.id} />
      <RecommenedForYouSection marketId={market.id} />

      {/* <ExploreByCategoriesSection /> */}
      <div>
        <RatingAndReviewSection
          id={market.id}
          name={market.name}
          imageUrl={market.bannerUrl}
          type="Market"
          handleTabSelect={handleTabSelect}
        />
      </div>
    </div>
  );
}
