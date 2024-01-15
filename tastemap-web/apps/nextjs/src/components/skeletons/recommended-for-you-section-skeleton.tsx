import { VendorCardSkeleton } from "./vendor-card-skeleton";

export const VendorSectionSkeleton = () => {
  return (
    <div className="bg-white rounded-3xl py-5">
      <div className="flex items-center justify-between px-5 ">
        <h1 className="text-xl font-bold">Loading...</h1>
      </div>
      <div className="no-scrollbar mt-4 flex gap-4 overflow-x-auto px-5">
        <VendorCardSkeleton />
        <VendorCardSkeleton />
        <VendorCardSkeleton />
        <VendorCardSkeleton />
        <VendorCardSkeleton />
      </div>
    </div>
  );
};
