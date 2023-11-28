import type { Market } from "~/data/testData";
import UniqueServicesSection from "./unique-services-section";

interface HighlightsPageProps {
  market: Market;
  //   handleTabSelect: (tabName: string) => void;
}

export default function HighlightsPage({
  market, //   handleTabSelect,
}: HighlightsPageProps) {
  return (
    <div id="HighlightsPage" className="py-8">
      {/* <UniqueServicesSection marketId={market.id} /> */}
      {/* <RecommenedForYouSection marketId={market.id} /> */}
      {/* <ExploreByCategoriesSection /> */}
      {/* <RatingAndReviewSection
        id={marketInfo.marGuid}
        handleTabSelect={handleTabSelect}
      /> */}
    </div>
  );
}
