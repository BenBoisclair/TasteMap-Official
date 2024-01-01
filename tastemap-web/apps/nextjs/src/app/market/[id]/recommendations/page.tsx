"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";

import LoadingPage from "~/components/pages/loading-page";
import VendorCardRecommendations from "~/components/sections/RecommendedForYou/vendor-card-recommendations";
import type { Vendor } from "~/types/types";
import fetchAt from "~/utils/fetchAt";

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
    queryFn: () => fetchAt<Vendor[]>(`/api/markets/${marketId}/vendors`),
  });

  if (vendorsStatus === "pending") {
    return <LoadingPage />;
  }

  return (
    <div className="h-full bg-neutral">
      <div className="bg-white">
        <div className="flex items-center px-5 py-4">
          <button id="Back Button" className="pr-3" onClick={handleBack}>
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
