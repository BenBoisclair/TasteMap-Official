"use client";

import { useQuery } from "@tanstack/react-query";

import type { Market } from "~/types/types";
import fetchAt from "~/utils/fetchAt";
import { MarketCard } from "../../market/market-card";
import { MarketsNearYouSectionSkeleton } from "../../skeletons/markets-near-you-section-skeleton";

export function MarketsNearYouSection() {
  const { data: markets, status: marketsStatus } = useQuery({
    queryKey: ["allMarkets"],
    queryFn: () => fetchAt<Market[]>("/api/markets"),
  });

  return (
    <div className="w-full rounded-3xl bg-white py-5">
      <div className="px-5">
        <h1 className="text-xl font-bold">Explore Markets Near You</h1>
      </div>
      <div className="no-scrollbar flex gap-5 overflow-x-scroll px-5 py-3">
        {markets &&
          marketsStatus === "success" &&
          markets.map(market => <MarketCard market={market} key={market.id} />)}
        {marketsStatus === "pending" && <MarketsNearYouSectionSkeleton />}
      </div>
    </div>
  );
}
