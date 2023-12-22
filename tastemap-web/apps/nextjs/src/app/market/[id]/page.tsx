"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";

import EventElements from "~/app/_components/event-elements";
import MarketHeader from "~/app/_components/market/market-header";
import HighlightsPage from "~/app/_components/market/market-highlights";
import MarketInfoPage from "~/app/_components/market/market-info-page";
import ErrorPage from "~/app/_components/pages/error-page";
import LoadingPage from "~/app/_components/pages/loading-page";
import RatingAndReviewSection from "~/app/_components/sections/RatingsAndReviews/rating-and-reviews-section";
import Tabs from "~/app/_components/tabs";
import useGetMarket from "~/utils/getMarket";

export default function MarketPage({ params }: { params: { id: string } }) {
  const marketId = params.id;
  const [activeTab, setActiveTab] = useState<string>("Highlights");

  const [market, status, error] = useGetMarket(marketId);

  const { ref: headerRef, inView } = useInView({
    threshold: 0,
    rootMargin: "-50px",
  });

  const handleTabSelect = (tabName: string) => {
    setActiveTab(tabName);
    if (!inView) {
      window?.scrollTo(0, 380);
    }
  };

  if (status === "pending") {
    return <LoadingPage />;
  }

  if (error && !market) {
    return <ErrorPage />;
  }

  return (
    <div className="relative">
      <EventElements />
      {market && (
        <>
          <MarketHeader headerRef={headerRef} inView={inView} market={market} />
          <Tabs
            activeTab={activeTab}
            handleTabSelect={handleTabSelect}
            tabs={["Highlights", "Map & Info", "Reviews"]}
          />

          {activeTab === "Highlights" && <HighlightsPage market={market} />}
          {activeTab === "Map & Info" && <MarketInfoPage market={market} />}
          {activeTab === "Reviews" && (
            <RatingAndReviewSection
              id={marketId}
              name={market?.name}
              imageUrl={market?.bannerUrl}
              type={"Market"}
              handleTabSelect={handleTabSelect}
            />
          )}
        </>
      )}
    </div>
  );
}
