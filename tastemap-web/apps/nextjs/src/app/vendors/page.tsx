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
import { checkIfEqualToTags } from "~/utils/checkIfEqualToTags";
import { capitalizeWords } from "~/utils/capitalizeWords";
import SearchBar from "~/components/search-bar";

export default function SearchAllVendors() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

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
    if (vendors && vendors.length > 0 && tags.length > 0) {
      // Filter vendors based on the search input and tags
      const filtered = vendors.filter(vendor => {
        const searchLower = debouncedSearch.toLowerCase();
        const vendorTagsLower = vendor.tags
          ? vendor.tags.map(tag => tag.name.toLowerCase())
          : [];
        const tagsLower = tags.map(tag => tag.toLowerCase());

        // Check if the vendor matches the search text
        const matchesSearch =
          vendor.name.toLowerCase().includes(searchLower) ||
          vendorTagsLower.some(tag => tag.includes(searchLower));

        // Check if the vendor has all of the tags selected
        const matchesTags = tagsLower.every(tag =>
          vendorTagsLower.includes(tag)
        );

        // A vendor matches the filter if it matches the search AND all of the tags
        return matchesSearch && matchesTags;
      });
      setFilteredVendors(filtered);
    } else {
      // If there are no tags selected, show all vendors
      if (!!vendors) {
        setFilteredVendors(vendors);
      }
    }
  }, [debouncedSearch, vendors, tags]);

  const handleTagRemove = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  const handleEnter = async () => {
    const tagExists = await checkIfEqualToTags(search);
    if (tagExists) {
      setTags(prev => [...prev, capitalizeWords(search)]);
      setSearch("");
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
        <SearchBar
          search={search}
          tags={tags}
          onSearchChange={setSearch}
          onTagChange={setTags}
          onTagRemove={handleTagRemove}
          onEnter={handleEnter}
        />
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
