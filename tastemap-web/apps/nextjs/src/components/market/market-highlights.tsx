import type { Market } from "~/types/types";
import CategoriesSection from "../sections/categories-section";
import RatingAndReviewSection from "../sections/RatingsAndReviews/rating-and-reviews-section";
import RecommendedForYouSection from "../sections/RecommendedForYou/recommended-for-you-section";
import UniqueServicesSection from "../sections/UniqueServices/unique-services-section";
import { Suspense } from "react";
import { VendorSectionSkeleton } from "../skeletons/recommended-for-you-section-skeleton";
import { UniqueServiceSectionSkeleton } from "../skeletons/unique-service-section-skeleton";

interface HighlightsPageProps {
  market: Market;
}

export default function HighlightsPage({ market }: HighlightsPageProps) {
  return (
    <div id="HighlightsPage" className="flex flex-col gap-[2rem] bg-white py-8">
      <Suspense fallback={<VendorSectionSkeleton />}>
        <RecommendedForYouSection marketId={market.id} />
      </Suspense>

      <Suspense fallback={<UniqueServiceSectionSkeleton />}>
        <UniqueServicesSection marketId={market.id} />
      </Suspense>

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
      />
    </div>
  );
}
