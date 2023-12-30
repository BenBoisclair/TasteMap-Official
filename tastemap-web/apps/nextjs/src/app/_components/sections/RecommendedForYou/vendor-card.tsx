"use client";

import Image from "next/image";
import Link from "next/link";

import type { Vendor } from "~/types/types";
import TasteMapLogo from "../../assets/taste-map-logo";
import VerifiedBadge from "../../icons/verified-badge";
import { Tag } from "../../tag";
import { Ratings } from "../RatingsAndReviews/ratings";

export const VendorCard = ({ vendor }: { vendor: Vendor }) => {
  const productTags = vendor.tags
    .filter((tag) => tag.type === "Product") // Keep existing filter on type
    .sort((a, b) => a.name.length - b.name.length); // Then sort by length of name

  return (
    <div className="flex w-[210px] flex-col">
      <Link href={`/vendors/${vendor.id}`}>
        {vendor.bannerUrl ? (
          <div className="relative flex h-[160px] w-[210px] place-content-center overflow-hidden rounded-3xl">
            <Image
              src={vendor.bannerUrl ?? ""}
              alt={`${vendor.name}'s Banner`}
              fill={true}
              style={{ objectFit: "cover" }}
            />
            <div className="absolute top-0 flex h-full w-full items-start justify-end p-2">
              <VerifiedBadge size="sm" />
            </div>
          </div>
        ) : (
          <div className="flex h-[160px] w-[210px] shrink-0 items-center justify-center rounded-3xl bg-neutral">
            <TasteMapLogo size={100} />
          </div>
        )}
        <div className="mt-1 flex flex-col gap-2">
          <div className="truncate text-lg font-bold">{vendor.name}</div>
          <Ratings
            average={vendor?.ratings?.average}
            total={vendor?.ratings?.total}
          />
          {productTags.length > 0 && (
            <div className="mt-1 flex gap-1">
              {productTags.slice(0, 2).map((tag) => (
                <Tag type={tag.type} key={tag.id}>
                  {tag.name}
                </Tag>
              ))}
              {productTags?.length > 2 && (
                <Tag type="Product">+{productTags?.length - 2}</Tag>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};
