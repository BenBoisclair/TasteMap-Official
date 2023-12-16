"use client";

import { useQuery } from "@tanstack/react-query";

import fetchMarkets from "../api/_actions/fetchMarkets";
import { MarketCard } from "./market-card";
import { MarketsNearYouSectionSkeleton } from "./markets-near-you-section-skeleton";

export function MarketsNearYouSection() {
  const { data: markets, status: marketsStatus } = useQuery({
    queryKey: ["allMarkets"],
    queryFn: fetchMarkets,
  });

  console.log(markets);

  return (
    <div className="mt-2 w-full rounded-3xl bg-white py-5">
      <div className="px-5">
        <h1 className="font-bold">Markets near you</h1>
      </div>
      <div className="no-scrollbar flex gap-5 overflow-x-scroll px-5 py-3">
        {markets &&
          marketsStatus === "success" &&
          markets.map((market) => (
            <MarketCard market={market} key={market.id} />
          ))}
        {marketsStatus === "pending" && <MarketsNearYouSectionSkeleton />}
      </div>
    </div>
  );
}
