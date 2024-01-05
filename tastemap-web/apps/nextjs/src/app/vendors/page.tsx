"use client";

import type { KeyboardEvent } from "react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, Frown, Search } from "lucide-react";

import LoadingPage from "~/components/pages/loading-page";
import VendorCardRecommendations from "~/components/sections/RecommendedForYou/vendor-card-recommendations";
import { Tag } from "~/components/tag";
import type { Vendor } from "~/types/types";
import fetchAt from "~/utils/fetchAt";
import { useDebounce } from "~/utils/useDebounce";

export default function SearchAllVendors({
  searchParams,
}: {
  searchParams?: { category: string };
}) {
  const router = useRouter();
  const category = searchParams?.category;

  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search);
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const [tags, setTags] = useState<string[]>([category ? category : ""]);

  const handleBack = () => {
    router.back();
  };

  const { data: vendors, status: vendorsStatus } = useQuery({
    queryKey: ["allVendors"],
    queryFn: () => fetchAt<Vendor[]>(`/api/vendors`),
  });

  useEffect(() => {
    if (vendors && vendors.length > 0) {
      // Filter vendors based on the search input
      const filtered = vendors.filter(vendor => {
        const searchLower = debouncedSearch.toLowerCase();
        const tagsLower = tags.map(tag => tag.toLowerCase());

        // Check if the vendor matches the search text
        const matchesSearch =
          vendor.name.toLowerCase().includes(searchLower) ||
          (vendor.tags &&
            vendor.tags.some(tag =>
              tag.name.toLowerCase().includes(searchLower)
            ));

        // Check if the vendor has any of the tags selected
        const matchesTags =
          tagsLower.length === 0 ||
          (vendor.tags &&
            vendor.tags.some(tag =>
              tagsLower.includes(tag.name.toLowerCase())
            ));

        // A vendor matches the filter if it matches the search AND any of the tags
        return matchesSearch && matchesTags;
      });
      setFilteredVendors(filtered);
    }
  }, [debouncedSearch, vendors, tags]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // Check if backspace is pressed and search is empty
    if (event.key === "Backspace" && search.length === 0 && tags.length > 0) {
      // Prevent the default backspace action
      event.preventDefault();

      // Remove the last tag from the tags array
      const newTags = tags.slice(0, -1);
      setTags(newTags);
    }
  };

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
          <div className="grow text-xl font-bold">Search Vendors</div>
        </div>
        <div id="SearchBar" className=" px-5">
          <div className="flex w-full items-center gap-2 rounded-3xl bg-neutral px-3 py-2">
            <Search size={25} color="gray" />
            {tags.map((tag, index) => (
              <Tag type="Product" key={index}>
                {tag}
              </Tag>
            ))}
            <input
              onKeyDown={e => handleKeyDown(e)}
              onChange={e => setSearch(e.target.value)}
              value={search}
              className="w-full bg-transparent outline-none ring-0"
              placeholder="Shop name, tags, etc"
            />
          </div>
        </div>
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
            {search.length > 0 && (
              <span className="font-bold">{`No results matching: ${search}`}</span>
            )}
            {tags.length > 0 && (
              <>
                <span className="font-bold">{`No results with Tags`}</span>
                {tags.map((tag, index) => {
                  return (
                    <Tag type="Product" key={index}>
                      {tag}
                    </Tag>
                  );
                })}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
