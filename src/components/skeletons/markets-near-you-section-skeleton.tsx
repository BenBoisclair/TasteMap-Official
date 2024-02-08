import { MarketCardSkeleton } from "./market-card-skeleton";

export const MarketsNearYouSectionSkeleton = () => {
  return (
    <div className="w-full rounded-3xl bg-white py-5">
      <div className="px-5">
        <h1 className="text-xl font-bold">Explore Markets Near You</h1>
      </div>
      <div className="no-scrollbar flex gap-5 overflow-x-scroll px-5 py-3">
        <MarketCardSkeleton />
        <MarketCardSkeleton />
        <MarketCardSkeleton />
      </div>
    </div>
  );
};
