import Image from "next/image";
import Link from "next/link";

import type { Vendor } from "@/types/types";
import TasteMapLogo from "../assets/taste-map-logo";
import VerifiedBadge from "../icons/verified-badge";
import { Tag } from "../tag";
import { Ratings } from "../reviews/ratings";
import removeSubstrings from "@/utils/removeSubstrings";
import FavouriteHeart from "@/components/favouriteHeart";
import ImageFill from "../image-fill";
import ImageOverlay from "../image-overlay";

export const VendorCard = ({
  vendor,
  toggleMarketName = false,
}: {
  vendor: Vendor;
  toggleMarketName?: boolean;
}) => {
  const productTags = vendor.tags
    .filter((tag) => tag.type === "Product")
    .sort((a, b) => a.name.length - b.name.length); // Then sort by length of name

  const shopTypeTags = vendor.tags
    .filter((tag) => tag.type === "Shop Type")
    .sort((a, b) => a.name.length - b.name.length); // Then sort by length of name
  return (
    <div className="flex w-[210px] flex-col">
      <ImageFill
        src={`${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL}/storage/v1/object/public/public-assets/markets/${vendor.marketId}/vendors/${vendor.id}/banner`}
        alt={`${vendor.name}'s Banner`}
        className="h-[160px] w-[210px] rounded-3xl">
        <ImageOverlay className="flex-col justify-between items-end">
          <FavouriteHeart
            color="white"
            vendorId={vendor.id}
            isFavourite={vendor.isFavourite}
          />
          <VerifiedBadge size="sm" />
        </ImageOverlay>
        <Link
          href={`/vendors/${vendor.id}?tab=Info`}
          className="absolute top-0 w-full h-full"
        />
      </ImageFill>

      <div className="mt-1 flex flex-col">
        <Link href={`/vendors/${vendor.id}?tab=Info`}>
          <h1 className="truncate text-lg font-bold">{vendor.name}</h1>
          {toggleMarketName && (
            <h2 className="font-medium -mt-1">
              {!!vendor?.market?.name && removeSubstrings(vendor?.market?.name)}
            </h2>
          )}
        </Link>
        <div className="my-1">
          <Ratings
            average={vendor?.ratings?.average}
            total={vendor?.ratings?.total}
          />
        </div>
        <div className="flex flex-col gap-1">
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
          {/* {shopTypeTags.length > 0 && (
            <div className="mt-1 flex gap-1">
              {shopTypeTags.slice(0, 2).map((tag) => (
                <Tag type={"Facility"} key={tag.id}>
                  {tag.name}
                </Tag>
              ))}
              {shopTypeTags?.length > 2 && (
                <Tag type="Facility">+{shopTypeTags?.length - 2}</Tag>
              )}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};
