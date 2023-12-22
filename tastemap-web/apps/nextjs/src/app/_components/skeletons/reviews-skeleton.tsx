import { ReviewCardSkeleton } from "./review-card-skeleton";

export const ReviewsSkeleton = () => {
  return (
    <div className="mt-4 flex flex-col gap-6">
      <ReviewCardSkeleton />
      <ReviewCardSkeleton />
      <ReviewCardSkeleton />
    </div>
  );
};
