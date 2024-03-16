"use client";

import Image from "next/image";
import Link from "next/link";

import type { Vendor } from "@/types/types";
import { cn } from "@/utils/cn";
import VerifiedBadge from "../icons/verified-badge";
import NavBar from "../navbar/nav-bar";
import { Ratings } from "../reviews/ratings";
import { Tag } from "../tag";
import ImageFill from "../image-fill";
import ImageOverlay from "../image-overlay";

interface VendorHeaderProps {
  vendor: Vendor;
  headerRef: (node?: Element | null | undefined) => void;
  inView: boolean;
}

const VendorHeader = ({ vendor, inView, headerRef }: VendorHeaderProps) => {
  const productTags = vendor?.tags?.filter((tag) => tag.type === "Product");
  const shopTypeTags = vendor?.tags?.filter((tag) => tag.type === "Shop Type");
  console.log(shopTypeTags);
  return (
    <div id="vendHeader">
      <NavBar
        page="Vendor"
        className={cn(`z-40`, {
          "bg-transparent bg-gradient-to-b from-black/60 to-transparent text-white":
            inView,
          "bg-white text-black": !inView,
        })}
      />

      <ImageFill
        src={vendor?.bannerUrl ?? `https://placehold.co/600x400/png`}
        alt={`${vendor?.name} Banner`}
        className="rounded-3xl md:rounded-none h-[240px] mx-4 mt-[60px]">
        {/* <div className="absolute top-0 flex h-full w-full items-end p-5">           */}
        <ImageOverlay className="justify-between items-end">
          <ImageFill
            className="h-[75px] w-[75px] rounded-full bg-white"
            src={vendor?.logoUrl ?? `/logos/tastemap_logo.png`}
            alt={`${vendor?.name}`}
          />
          {vendor.isVerified && <VerifiedBadge size="lg" />}
        </ImageOverlay>
      </ImageFill>

      <div
        ref={headerRef}
        id="vendorInfo"
        className="w-full bg-white pb-5 text-black rounded-b-3xl mb-1">
        <div className="flex px-5 pt-5">
          <div className="flex grow flex-col gap-1">
            <h1 className="text-2xl font-bold">{vendor?.name}</h1>
            <Link href={`/market/${vendor?.market?.id}?tab=Highlights`}>
              <span className=" font-medium">{vendor?.market?.name}</span>
            </Link>
            <div
              id="marRatingInfo"
              className="mt-2 flex w-full items-center text-sm font-medium">
              <Ratings
                average={vendor?.ratings?.average}
                total={vendor?.ratings?.total}
              />
              <span className="m-1 h-[3px] w-[3px] rounded-full bg-black"></span>
              <Link
                href="#RatingsAndReviews"
                id="writeReview"
                className="underline">
                write a review
              </Link>
            </div>
          </div>
          <div>
            <span>{vendor?.code}</span>
          </div>
        </div>
        <div className="mt-2 flex flex-col gap-2 pl-5 text-sm font-medium">
          {productTags.length > 0 && (
            <div id="productTags" className="flex items-center">
              <p className="mr-2">Products</p>
              <div
                id="PTags"
                className="hide-scrollbar no-scrollbar flex items-center gap-3 overflow-scroll">
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
          {shopTypeTags.length > 0 && (
            <div id="shopTypeTags" className="flex items-center">
              <p className="mr-2">Shop Types</p>
              <div
                id="STTags"
                className="hide-scrollbar no-scrollbar flex items-center gap-3 overflow-scroll">
                {shopTypeTags?.map((tag, key: number) => {
                  return (
                    <Tag key={key} type={"Facility"} size="lg">
                      {tag.name}
                    </Tag>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorHeader;
