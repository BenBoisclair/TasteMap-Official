"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";

import type { Vendor } from "~/types/types";
import fetchMarketVendors from "../api/_actions/fetchMarketVendors";
import { Ratings } from "./ratings";

interface RecommendedForYouSectionProps {
  marketId: string;
}

export default function RecommenedForYouSection({
  marketId,
}: RecommendedForYouSectionProps) {
  const { data: vendors, status: vendorsStatus } = useQuery({
    queryKey: ["marketRecommendedVendors", marketId],
    queryFn: () => fetchMarketVendors({ marketId }),
  });

  if (vendorsStatus === "pending") {
    return <div>Loading...</div>;
  }
  return (
    <div className="mt-5">
      <div className="flex items-center justify-between">
        <h1 className="px-5 text-lg font-bold">Recommended for you</h1>
        <Link href={`/market/${marketId}/recommendations`}>
          <ChevronRight />
        </Link>
      </div>
      <div className="no-scrollbar flex gap-4 overflow-x-auto px-5 pt-2">
        {vendors?.slice(0, 10).map((vendor, index) => {
          return <VendorCard vendor={vendor} key={index} />;
        })}
      </div>
    </div>
  );
}

const VendorCard = ({ vendor }: { vendor: Vendor }) => {
  return (
    <div className="flex w-[130px] flex-col">
      <div className="relative flex h-[90px] w-[130px] place-content-center overflow-hidden rounded-3xl">
        <Image
          src={vendor.bannerUrl || ""}
          alt={`${vendor.name}'s Banner`}
          fill={true}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="mt-1">
        <div className="truncate font-bold">{vendor.name}</div>
        <Ratings
          average={vendor?.ratings?.average}
          total={vendor?.ratings?.total}
          size="small"
        />
      </div>
    </div>
  );
};
