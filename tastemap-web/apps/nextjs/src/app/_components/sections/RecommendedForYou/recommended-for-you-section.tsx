"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";

import type { Vendor } from "~/types/types";
import fetchAt from "~/utils/fetchAt";
import { RecommendedForYouSectionSkeleton } from "../../skeletons/recommended-for-you-section-skeleton";
import { VendorCard } from "./vendor-card";

interface RecommendedForYouSectionProps {
  marketId: string;
}

export default function RecommenedForYouSection({
  marketId,
}: RecommendedForYouSectionProps) {
  const { data: vendors, status: vendorsStatus } = useQuery({
    queryKey: ["marketRecommendedVendors", marketId],
    queryFn: () => fetchAt<Vendor[]>(`/api/markets/${marketId}/vendors`),
  });

  if (vendorsStatus === "success" && (!vendors || vendors.length === 0)) {
    return null; // Don't render the section if there are no services
  }

  return (
    <div>
      <div className="flex items-center justify-between px-5 ">
        <h1 className="text-lg font-bold">Recommended for you</h1>
        <Link href={`/market/${marketId}/recommendations`}>
          <ChevronRight />
        </Link>
      </div>
      <div className="no-scrollbar flex gap-4 overflow-x-auto px-5 pt-2">
        {vendors &&
          vendorsStatus === "success" &&
          vendors.slice(0, 10).map((vendor, index) => {
            return <VendorCard vendor={vendor} key={index} />;
          })}
        {vendorsStatus === "pending" && <RecommendedForYouSectionSkeleton />}
      </div>
    </div>
  );
}
