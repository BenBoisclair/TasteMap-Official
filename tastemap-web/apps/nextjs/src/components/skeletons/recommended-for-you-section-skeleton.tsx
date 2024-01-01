import { VendorCardSkeleton } from "./vendor-card-skeleton";

export const VendorSectionSkeleton = () => {
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
