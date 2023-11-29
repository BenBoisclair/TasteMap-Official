import Image from "next/image";
import Link from "next/link";

import type { Vendor } from "~/types/types";
import { Ratings } from "./ratings";
import { Tag } from "./tag";

export const VendorCard = ({ vendor }: { vendor: Vendor }) => {
  const productTags = vendor.tags.filter((tag) => tag.type === "Product");
  return (
    <div className="flex w-[130px] flex-col">
      <div className="relative flex h-[90px] w-[130px] place-content-center overflow-hidden rounded-3xl">
        <Image
          src={vendor.bannerUrl || ""}
          alt={`${vendor.name}'s Banner`}
          fill={true}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="mt-1">
        <Link href={`/vendor/${vendor.id}`}>
          <div className="truncate font-bold">{vendor.name}</div>
        </Link>
        <Ratings
          average={vendor?.ratings?.average}
          total={vendor?.ratings?.total}
          size="small"
        />
        <div className="mt-2 flex gap-1">
          {productTags.slice(0, 2).map((tag) => (
            <Tag type={tag.type} key={tag.id} size="sm">
              {tag.name}
            </Tag>
          ))}
          {productTags?.length > 2 && (
            <Tag type="Product" size="sm">
              +{productTags?.length - 2}
            </Tag>
          )}
        </div>
      </div>
    </div>
  );
};
