"use client";
import { useState } from "react";
import { Frown } from "lucide-react";

import VendorCardRecommendations from "@/components/sections/RecommendedForYou/vendor-card-recommendations";
import type { Vendor } from "@/types/types";
import SearchBar from "@/components/search-bar";
import BackButton from "@/components/back-button";

export default function SearchVendorsUI({
  vendors,
  title = "Search Vendors",
  subTitle,
}: {
  vendors: Vendor[];
  title?: string;
  subTitle?: string;
}) {
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);

  return (
    <div className="h-full bg-neutral">
      <div className="bg-white">
        <div className="flex items-center px-5 py-4">
          <BackButton />
          <div className="flex flex-col gap-1">
            <div className="grow text-xl font-bold">{title}</div>
            {!!subTitle && (
              <div className="font-medium text-neutral-400">{subTitle}</div>
            )}
          </div>
        </div>
        <SearchBar data={vendors} setFilteredData={setFilteredVendors} />
      </div>
      <div className="z-10 flex flex-col gap-2 bg-transparent">
        {filteredVendors.length > 0 ? (
          filteredVendors.map((vendor, index) => (
            <VendorCardRecommendations
              classNames={index === 0 ? "rounded-t-none" : ""}
              vendor={vendor}
              key={vendor.id}
            />
          ))
        ) : (
          <div className="flex h-[200px] flex-col items-center justify-center gap-1 bg-white p-5">
            <Frown size={40} />
            <span className="font-bold">{`No results`}</span>
          </div>
        )}
      </div>
    </div>
  );
}
