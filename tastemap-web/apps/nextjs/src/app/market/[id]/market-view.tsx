"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

import EventElements from "~/components/event-elements";
import MarketHeader from "~/components/market/market-header";
import HighlightsPage from "~/components/market/market-highlights";
import MarketInfoPage from "~/components/market/market-info-page";
import ErrorPage from "~/components/pages/error-page";
import LoadingPage from "~/components/pages/loading-page";
import RatingAndReviewSection from "~/components/sections/RatingsAndReviews/rating-and-reviews-section";
import Tabs from "~/components/tabs";
import { Market } from "~/types/types";
import fetchAt from "~/utils/fetchAt";
import useMarket from "~/utils/getMarket";

export default function MarketView({ params }: { params: { id: string } }) {
  const marketId = params.id;
  const [activeTab, setActiveTab] = useState<string>("Highlights");

  const { data: market, status } = useQuery({
    queryKey: ["market", marketId],
    queryFn: () => fetchAt<Market>(`/api/markets/${marketId}`),
  });

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

  if (status === "error") {
    return <ErrorPage />;
  }

  return (
    <div className="relative bg-neutral-200">
      <EventElements />
      {!!market && (
        <>
          <MarketHeader headerRef={headerRef} inView={inView} market={market} />
          <Tabs
            activeTab={activeTab}
            handleTabSelect={handleTabSelect}
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
              handleTabSelect={handleTabSelect}
            />
          )}
        </>
      )}
    </div>
  );
}
