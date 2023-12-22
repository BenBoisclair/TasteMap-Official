import RatingStarIcon from "../icons/rating-star-icon";

export const MarketCardSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col gap-3">
      <div className="h-[120px] w-[316px] rounded-3xl bg-neutral"></div>
      <div className="flex flex-col gap-2">
        <div className="h-[20px] w-3/4 rounded-3xl bg-neutral"></div>
        <div className="h-[15px] w-2/4 rounded-3xl bg-neutral"></div>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-[22px] w-14 rounded-3xl bg-neutral"></div>
        <RatingStarIcon color="gray" />
        <div className="h-[22px] w-10 rounded-3xl bg-neutral"></div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="h-[20px] w-12 rounded-3xl bg-neutral"></div>
          <div className="h-[20px] w-12 rounded-3xl bg-neutral"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-[20px] w-12 rounded-3xl bg-neutral"></div>
        </div>
      </div>
    </div>
  );
};
