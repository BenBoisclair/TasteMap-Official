"use client";

import { useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";

import EventElements from "~/components/event-elements";
import MarketHeader from "~/components/market/market-header";
import HighlightsPage from "~/components/market/market-highlights";
import MarketInfoPage from "~/components/market/market-info-page";
import LoadingPage from "~/components/pages/loading-page";
import RatingAndReviewSection from "~/components/sections/RatingsAndReviews/rating-and-reviews-section";
import Tabs from "~/components/tabs";
import { Market } from "~/types/types";

export default function MarketView({
  params,
  market,
}: {
  params: { id: string };
  market: Market | undefined;
}) {
  const marketId = params.id;
  const searchParams = useSearchParams();

  const { ref: headerRef, inView } = useInView({
    threshold: 0,
    rootMargin: "-50px",
  });

  const activeTab = searchParams.get("tab");

  return (
    <div className="relative bg-neutral-200">
      <EventElements />
      {!!market && (
        <>
          <MarketHeader headerRef={headerRef} inView={inView} market={market} />
          <Tabs
            inView={inView}
            tabs={["Highlights", "Map & Info", "Reviews"]}
          />

          {activeTab === "Highlights" && <HighlightsPage market={market} />}
          {activeTab === "Map & Info" && <MarketInfoPage market={market} />}
          {activeTab === "Reviews" && (
            <RatingAndReviewSection
              id={marketId}
              name={market?.name}
              imageUrl={market?.bannerUrl}
              type={"market"}
            />
          )}
        </>
      )}
    </div>
  );
}
