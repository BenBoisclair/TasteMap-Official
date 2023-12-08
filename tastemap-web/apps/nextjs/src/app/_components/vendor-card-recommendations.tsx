import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { twMerge } from "tailwind-merge";

import type { Vendor } from "~/types/types";
import { Ratings } from "./ratings";
import { Tag } from "./tag";

export default function VendorCardRecommendations({
  vendor,
  classNames = "",
}: {
  vendor: Vendor;
  classNames?: string;
}) {
  const productTags = vendor.tags.filter((tag) => tag.type === "Product");
  return (
    <div
      className={twMerge(
        "flex cursor-pointer rounded-[40px] bg-white p-5",
        classNames,
      )}
    >
      <div className=" relative mr-5 h-[120px] w-[120px] shrink-0 rounded-3xl ">
        <Image
          src={vendor.bannerUrl}
          alt={`${vendor.name} Banner`}
          fill={true}
          style={{
            objectFit: "cover",
          }}
          className=" rounded-3xl "
        />
      </div>
      <div className="flex grow flex-col justify-between overflow-hidden">
        <Link href={`/vendor/${vendor.id}`}>
          <h1 className="font-bold">{vendor.name}</h1>
        </Link>
        <Ratings
          average={vendor?.ratings?.average}
          total={vendor?.ratings?.total}
        />
        <div className="mt-2 flex gap-1">
          {productTags.slice(0, 2).map((tag) => (
            <Tag type={tag.type} key={tag.id} size="default">
              {tag.name}
            </Tag>
          ))}
          {productTags?.length > 2 && (
            <Tag type="Product" size="default">
              +{productTags?.length - 2}
            </Tag>
          )}
        </div>
      </div>
      <div>
        <Heart />
      </div>
    </div>
  );
}
