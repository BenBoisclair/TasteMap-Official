"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import ErrorPage from "~/app/_components/error-page";
import LoadingPage from "~/app/_components/loading-page";
import MarketHeader from "~/app/_components/market-header";
import HighlightsPage from "~/app/_components/market-highlights";
import MarketInfoPage from "~/app/_components/market-info-page";
import RatingAndReviewSection from "~/app/_components/rating-and-reviews-section";
import Tabs from "~/app/_components/tabs";
import fetchMarket from "~/app/api/_actions/fetchMarket";

export default function MarketPage({ params }: { params: { id: string } }) {
  const marketId = params.id;
  const [activeTab, setActiveTab] = useState<string>("Highlights");

  const { data: market, status: marketStatus } = useQuery({
    queryKey: ["market", marketId],
    queryFn: () => fetchMarket({ marketId }),
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

  if (marketStatus === "pending") {
    return <LoadingPage />;
  }

  if (marketStatus === "error") {
    return <ErrorPage />;
  }

  return (
    <>
      <MarketHeader headerRef={headerRef} inView={inView} market={market} />
      <Tabs
        activeTab={activeTab}
        handleTabSelect={handleTabSelect}
        tabs={["Highlights", "Map & Info", "Reviews"]}
      />

      {activeTab === "Highlights" && (
        <HighlightsPage
          market={market}
          // handleTabSelect={handleTabSelect}
        />
      )}
      {activeTab === "Map & Info" && <MarketInfoPage market={market} />}
      {activeTab === "Reviews" && (
        <RatingAndReviewSection
          id={marketId}
          name={market.name}
          imageUrl={market.bannerUrl}
          type={"Market"}
          handleTabSelect={handleTabSelect}
        />
      )}
    </>
  );
}
