"use client";

import type { Market } from "~/types/types";
import CategoriesSection from "../sections/categories-section";
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
    <div id="HighlightsPage" className="flex flex-col gap-8 bg-white py-8">
      <RecommenedForYouSection marketId={market.id} />
      <UniqueServicesSection marketId={market.id} />
      <CategoriesSection
        marketId={market.id}
        isMarketVerified={market.isVerified}
        variant="Icon"
      />

      <RatingAndReviewSection
        id={market.id}
        name={market.name}
        imageUrl={market.bannerUrl}
        type="market"
        handleTabSelect={handleTabSelect}
      />
    </div>
  );
}
