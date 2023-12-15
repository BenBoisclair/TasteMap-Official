import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

import type { Vendor } from "~/types/types";
import { Ratings } from "./ratings";
import { Tag } from "./tag";
import TasteMapLogo from "./taste-map-logo";
import VerifiedBadge from "./verified-badge";

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
        classNames,
      )}
    >
      {vendor.bannerUrl ? (
        <div className=" relative mr-4 h-[120px] w-[150px] shrink-0 rounded-3xl ">
          <Image
            src={vendor.bannerUrl ?? ""}
            alt={`${vendor.name} Banner`}
            fill={true}
            style={{
              objectFit: "cover",
            }}
            className=" rounded-3xl "
          />
        </div>
      ) : (
        <div className=" mr-4 flex h-[120px] w-[120px] shrink-0 items-center justify-center rounded-3xl bg-neutral">
          <TasteMapLogo size={100} />
        </div>
      )}
      <div className="flex grow flex-col justify-between overflow-hidden">
        <Link href={`/vendor/${vendor.id}`}>
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
