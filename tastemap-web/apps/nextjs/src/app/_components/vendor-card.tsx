import Image from "next/image";
import Link from "next/link";

import type { Vendor } from "~/types/types";
import { Ratings } from "./ratings";
import { Tag } from "./tag";

export const VendorCard = ({ vendor }: { vendor: Vendor }) => {
  const productTags = vendor.tags
    .filter((tag) => tag.type === "Product") // Keep existing filter on type
    .sort((a, b) => a.name.length - b.name.length); // Then sort by length of name

  return (
    <div className="flex w-[200px] flex-col">
      <div className="relative flex h-[120px] w-[200px] place-content-center overflow-hidden rounded-3xl">
        <Image
          src={vendor.bannerUrl || ""}
          alt={`${vendor.name}'s Banner`}
          fill={true}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="mt-1 flex flex-col gap-2">
        <Link href={`/vendor/${vendor.id}`}>
          <div className="truncate text-lg font-bold">{vendor.name}</div>
        </Link>
        <Ratings
          average={vendor?.ratings?.average}
          total={vendor?.ratings?.total}
        />
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
      </div>
    </div>
  );
};
