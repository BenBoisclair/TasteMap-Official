"use client";

import Image from "next/image";
import Link from "next/link";

import type { Market } from "~/types/types";
import removeSubstrings from "~/utils/removeSubstrings";
import VerifiedBadge from "../icons/verified-badge";
import NavBar from "../navbar/nav-bar";
import { Ratings } from "../sections/RatingsAndReviews/ratings";

// import { Tag } from "../tag";

interface MarketHeaderProps {
  market: Market;
  headerRef: (node?: Element | null | undefined) => void;
  inView: boolean;
}

const MarketHeader = ({ market, headerRef }: MarketHeaderProps) => {
  // const productTags = market?.tags?.filter((tag) => tag.type === "Product");
  // const facilityTags = market?.tags?.filter((tag) => tag.type === "Facility");
  return (
    <>
      <div id="marHeader">
        <NavBar />
        <div className="mt-[60px] h-[200px] bg-white">
          <div id="bannerWrapper" className="relative mx-4 flex h-full md:mx-0">
            <Image
              src={market?.bannerUrl || `https://placehold.co/600x400/png`}
              fill={true}
              style={{
                objectFit: "cover",
              }}
              className="rounded-3xl md:rounded-none"
              alt={`Market Banner`}
              priority={true}
            />
          </div>
        </div>
        <div
          ref={headerRef}
          id="marInfo"
          className="mb-1 w-full rounded-b-3xl bg-white pb-5 "
        >
          <div className="px-5 pt-2">
            <div className="flex items-center justify-between">
              <h1 className="text-[26px] font-bold">
                {removeSubstrings(market?.name, ["Floating Market"])}
              </h1>
              {market.isVerified && (
                <div>
                  <VerifiedBadge size="lg" variant="icon" />
                </div>
              )}
            </div>
            <p className="font-medium">{market?.type}</p>
            <div
              id="marRatingInfo"
              className="mt-2 flex w-full items-center text-sm font-medium"
            >
              <Ratings
                average={market?.ratings?.average}
                total={market?.ratings?.total}
              />
              <span className="m-1 h-[3px] w-[3px] rounded-full bg-black"></span>
              <Link href="#RatingsAndReviews" className="underline">
                write a review
              </Link>
            </div>
          </div>
          {/* <div
            id="marTags"
            className="mt-2 flex flex-col gap-2 pl-5 text-sm font-medium"
          >
            {productTags.length > 0 && (
              <div id="productTags" className="flex items-center">
                <p className="mr-2">Products</p>
                <div
                  id="PTags"
                  className="hide-scrollbar no-scrollbar flex items-center gap-3 overflow-scroll"
                >
                  {productTags?.map((tag, key: number) => {
                    return (
                      <Tag key={key} type={tag.type} size="lg">
                        {tag.name}
                      </Tag>
                    );
                  })}
                </div>
              </div>
            )}
            {facilityTags.length > 0 && (
              <div id="facilityTags" className="flex items-center">
                <p className="mr-2">Facilities</p>
                <div
                  id="FTags"
                  className="hide-scrollbar no-scrollbar flex items-center gap-3 overflow-scroll"
                >
                  {facilityTags?.map((tag, key: number) => {
                    return (
                      <Tag key={key} type={tag.type} size="lg">
                        {tag.name}
                      </Tag>
                    );
                  })}
                </div>
              </div>
            )}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default MarketHeader;
