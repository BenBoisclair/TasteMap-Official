import { VendorCardSkeleton } from "./vendor-card-skeleton";

export const RecommendedForYouSectionSkeleton = () => {
  return (
    <div className="flex gap-4">
      <VendorCardSkeleton />
      <VendorCardSkeleton />
      <VendorCardSkeleton />
      <VendorCardSkeleton />
      <VendorCardSkeleton />
    </div>
  );
};
