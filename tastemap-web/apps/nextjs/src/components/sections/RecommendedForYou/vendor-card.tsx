import Image from "next/image";
import Link from "next/link";

import type { Vendor } from "~/types/types";
import TasteMapLogo from "../../assets/taste-map-logo";
import VerifiedBadge from "../../icons/verified-badge";
import { Tag } from "../../tag";
import { Ratings } from "../RatingsAndReviews/ratings";
import removeSubstrings from "~/utils/removeSubstrings";
import FavouriteHeart from "~/components/favouriteHeart";

export const VendorCard = ({
  vendor,
  toggleMarketName = false,
}: {
  vendor: Vendor;
  toggleMarketName?: boolean;
}) => {
  const productTags = vendor.tags
    .filter(tag => tag.type === "Product") // Keep existing filter on type
    .sort((a, b) => a.name.length - b.name.length); // Then sort by length of name

  return (
    <div className="flex w-[210px] flex-col">
      <div className="relative flex h-[160px] w-[210px] place-content-center overflow-hidden rounded-3xl">
        {vendor.bannerUrl ? (
          <Image
            src={vendor.bannerUrl ?? ""}
            alt={`${vendor.name}'s Banner`}
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="flex h-[160px] w-[210px] shrink-0 items-center justify-center rounded-3xl bg-neutral">
            <TasteMapLogo size={100} />
          </div>
        )}

        <div className="absolute top-0 flex h-full w-full items-start justify-end p-2 gap-2 pointer-events-none">
          <VerifiedBadge size="sm" />
          <FavouriteHeart
            color="white"
            vendorId={vendor.id}
            isFavourite={vendor.isFavourite}
          />
        </div>
        <Link
          href={`/vendors/${vendor.id}?tab=Info`}
          className="absolute top-0 w-full h-full"
        />
      </div>

      <div className="mt-1 flex flex-col">
        <Link href={`/vendors/${vendor.id}?tab=Info`}>
          <h1 className="truncate text-lg font-bold">{vendor.name}</h1>
          {toggleMarketName && (
            <h2 className="font-medium -mt-1">
              {!!vendor?.market?.name &&
                removeSubstrings(vendor?.market?.name, ["Floating Market"])}
            </h2>
          )}
        </Link>
        <div className="my-1">
          <Ratings
            average={vendor?.ratings?.average}
            total={vendor?.ratings?.total}
          />
        </div>
        {productTags.length > 0 && (
          <div className="mt-1 flex gap-1">
            {productTags.slice(0, 2).map(tag => (
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
    </div>
  );
};
