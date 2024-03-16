import type { Market } from "@/types/types";
import CategoriesSection from "../categories-section";
import RatingAndReviewSection from "../reviews/rating-and-reviews-section";
import RecommendedForYouSection from "../recommendations/recommended-for-you-section";
import UniqueServicesSection from "../unique-services/unique-services-section";
import { Suspense } from "react";
import { VendorSectionSkeleton } from "../skeletons/recommended-for-you-section-skeleton";
import { UniqueServiceSectionSkeleton } from "../skeletons/unique-service-section-skeleton";

interface HighlightsPageProps {
  market: Market;
}

export default function HighlightsPage({ market }: HighlightsPageProps) {
  return (
    <div id="HighlightsPage" className="flex flex-col bg-white py-8">
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
