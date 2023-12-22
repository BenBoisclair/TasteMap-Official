import RatingStarIcon from "../icons/rating-star-icon";

export const ReviewCardSkeleton = () => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <div
          className={`mr-2 flex h-[35px] w-[35px] items-center justify-center rounded-full bg-neutral font-bold`}
        />
        <div className="flex flex-col gap-1">
          <div className="h-4 w-40 rounded-3xl bg-neutral"></div>
          <div className="h-2 w-40 rounded-3xl  bg-neutral"></div>
        </div>
      </div>
      <div className="mt-2 flex gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <RatingStarIcon color="gray" key={index} />
        ))}
      </div>
      <div className="mt-3 h-14 w-5/6 rounded-lg bg-neutral" />
    </div>
  );
};
