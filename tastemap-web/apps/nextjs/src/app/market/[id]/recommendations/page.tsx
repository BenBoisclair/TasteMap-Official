"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";

import LoadingPage from "~/app/_components/loading-page";
import VendorCardRecommendations from "~/app/_components/vendor-card-recommendations";
import fetchMarketVendors from "~/app/api/_actions/fetchMarketVendors";

export default function RecommendationsPage({
  params,
}: {
  params: { id: string };
}) {
  const marketId = params.id;
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const { data: vendors, status: vendorsStatus } = useQuery({
    queryKey: ["marketRecommendedVendors", marketId],
    queryFn: () => fetchMarketVendors({ marketId }),
  });

  console.log(vendors);

  if (vendorsStatus === "pending") {
    return <LoadingPage />;
  }

  return (
    <div className="h-full bg-neutral">
      <div className="bg-white">
        <div className="flex items-center px-5 py-4">
          <button className="pr-3" onClick={handleBack}>
            <ChevronLeft />
          </button>
          <div className="grow text-xl font-bold">Recommended for You</div>
        </div>
      </div>
      <div className="z-10 flex flex-col gap-2 bg-transparent">
        {vendors?.map((vendor, index) => (
          <VendorCardRecommendations
            classNames={index === 0 ? "rounded-t-none" : ""}
            vendor={vendor}
            key={vendor.id}
          />
        ))}
      </div>
    </div>
  );
}
