"use client";
import { useQuery } from "@tanstack/react-query";
import { Vendor } from "~/types/types";
import fetchAt from "~/utils/fetchAt";
import { VendorCard } from "../RecommendedForYou/vendor-card";
import { VendorSectionSkeleton } from "~/components/skeletons/recommended-for-you-section-skeleton";

const VendorsHomePageSection = ({
  name,
  tag,
}: {
  name: string;
  tag: string;
}) => {
  const { data: vendors, status: vendorsStatus } = useQuery({
    queryKey: [`VendorsWithTag`, tag],
    queryFn: () => fetchAt<Vendor[]>(`/api/vendors?tag=${tag}`),
  });

  if (vendorsStatus === "success" && (!vendors || vendors.length === 0)) {
    return null; // Don't render the section if there are no services
  }

  return (
    <div className="bg-white rounded-3xl py-5">
      <div className="flex items-center justify-between px-5 ">
        <h1 className="text-xl font-bold">{name}</h1>
      </div>
      <div className="no-scrollbar mt-4 flex gap-4 overflow-x-auto px-5">
        {vendors &&
          vendorsStatus === "success" &&
          vendors.slice(0, 20).map((vendor, index) => {
            return (
              <VendorCard toggleMarketName={true} vendor={vendor} key={index} />
            );
          })}
        {vendorsStatus === "pending" && <VendorSectionSkeleton />}
      </div>
    </div>
  );
};

export default VendorsHomePageSection;
