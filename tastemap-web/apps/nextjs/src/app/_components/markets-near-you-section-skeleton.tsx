import { MarketCardSkeleton } from "./market-card-skeleton";

export const MarketsNearYouSectionSkeleton = () => {
  return (
    <div className="flex gap-5">
      <MarketCardSkeleton />
      <MarketCardSkeleton />
      <MarketCardSkeleton />
    </div>
  );
};
