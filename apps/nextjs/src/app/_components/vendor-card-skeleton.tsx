import RatingStarIcon from "./icons/rating-star-icon";

export const VendorCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="relative h-[90px] w-[130px] flex-shrink-0 rounded-3xl bg-gray"></div>
      <div className="flex flex-col">
        <div className="mt-1 h-4 w-3/4 rounded-lg bg-gray"></div>
        <div className="mt-2 flex items-center gap-1">
          <RatingStarIcon color="gray" size={10} />
          <div className="h-3 w-1/4 rounded-lg bg-gray"></div>
        </div>
        <div className="mt-2 flex gap-1">
          <div className="h-4 w-1/4 rounded-lg bg-gray"></div>
          <div className="h-4 w-1/4 rounded-lg bg-gray"></div>
        </div>
      </div>
    </div>
  );
};
