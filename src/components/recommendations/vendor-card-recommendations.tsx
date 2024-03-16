import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

import type { Vendor } from "@/types/types";
import TasteMapLogo from "../assets/taste-map-logo";
import VerifiedBadge from "../icons/verified-badge";
import { Tag } from "../tag";
import { Ratings } from "../reviews/ratings";
import FavouriteHeart from "@/components/favouriteHeart";

export default function VendorCardRecommendations({
  vendor,
  classNames = "",
}: {
  vendor: Vendor;
  classNames?: string;
}) {
  const productTags = vendor?.tags?.filter((tag) => tag.type === "Product");
  return (
    <div
      className={twMerge(
        "flex cursor-pointer rounded-[40px] bg-white p-3",
        classNames
      )}>
      <div className=" relative mr-4 h-[120px] w-[150px] shrink-0 rounded-xl">
        {vendor.bannerUrl ? (
          <>
            <Image
              src={vendor.bannerUrl ?? ""}
              alt={`${vendor.name} Banner`}
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{
                objectFit: "cover",
              }}
              className=" rounded-3xl "
            />

            <div className="absolute top-0 w-full h-full flex flex-col items-end p-2.5">
              <FavouriteHeart
                color="white"
                isFavourite={vendor.isFavourite}
                vendorId={vendor.id}
              />
              <Link
                href={`/vendors/${vendor.id}?tab=Info`}
                className="w-full h-full z-40"
              />
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center rounded-3xl h-full bg-neutral">
            <TasteMapLogo size={100} />
            <div className="absolute top-0 w-full h-full flex flex-col items-end p-2.5">
              <FavouriteHeart
                color="black"
                isFavourite={vendor.isFavourite}
                vendorId={vendor.id}
              />
            </div>
          </div>
        )}
        <Link
          href={`/vendors/${vendor.id}?tab=Info`}
          className="w-full h-full z-40"
        />
      </div>

      <div className="flex grow flex-col justify-between overflow-hidden">
        <Link href={`/vendors/${vendor.id}?tab=Info`}>
          <h1 className="line-clamp-2 font-bold">{vendor.name}</h1>
        </Link>

        <div className="flex items-center gap-2">
          <Ratings
            average={vendor?.ratings?.average}
            total={vendor?.ratings?.total}
          />
          {vendor.isVerified && <VerifiedBadge toggleBorder={false} />}
        </div>
        <div className="mt-2 flex gap-1">
          {productTags.length > 0 &&
            productTags.slice(0, 2).map((tag) => (
              <Tag type={tag.type} key={tag.id} size="default">
                {tag.name}
              </Tag>
            ))}
          {productTags.length > 0 && productTags?.length > 2 && (
            <Tag type="Product" size="default">
              +{productTags?.length - 2}
            </Tag>
          )}
        </div>
      </div>
    </div>
  );
}
