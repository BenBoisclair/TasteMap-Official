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
        {/* <div className="px-5 pb-5">
          
          <div className="flex items-center rounded-3xl bg-neutral-200 px-4 py-2">
            <div className="mr-2">
              <SearchIcon color="gray" width="20" height="20" />
            </div>
            <input
              className="border-none bg-transparent font-medium"
              placeholder="Shop names, tags, etc."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </div>
        </div> */}
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
