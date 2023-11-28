import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

import type { Market } from "~/data/testData";
import { MarketStatusIcon } from "./market-status-icon";
import { Ratings } from "./ratings";
import { Tag } from "./tag";

export function MarketCard({ market }: { market: Market }) {
  const productTags = market.tags.filter((tag) => tag.type === "Product");
  const facilityTags = market.tags.filter((tag) => tag.type === "Facility");

  return (
    <div className="shrink-0 overflow-hidden">
      <div className="relative flex h-[120px] w-[316px] place-content-center overflow-hidden rounded-3xl">
        <Image
          src={market.bannerUrl || ""}
          alt={`${market.name}'s Banner`}
          fill={true}
          style={{ objectFit: "cover" }}
        />
        <div className="absolute h-full w-full p-3">
          <div className="flex items-center justify-end text-white">
            {/* <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-white rounded-full"/>
            <span className="font-black">0km</span>
            </div> */}
            <Heart strokeWidth={3} />
          </div>
        </div>
      </div>
      <div className="mt-[10px] flex flex-col">
        <Link href={`/market/${market.id}`}>
          <h1 className=" text-xl font-black">{market.name}</h1>
          <p className="font-medium">{market.type}</p>
        </Link>
        <div className="mt-[10px] flex items-center gap-2">
          <MarketStatusIcon status={"OPEN"} />
          <Ratings
            total={market.ratings.total}
            average={market.ratings.average}
          />
        </div>
        <div className="mt-[10px] flex flex-col gap-2">
          <div className="flex gap-2">
            {productTags.slice(0, 3).map((tag) => (
              <Tag type={tag.type} key={tag.id}>
                {tag.name}
              </Tag>
            ))}
            {productTags?.length > 3 && (
              <Tag type="Product">+{productTags?.length - 3}</Tag>
            )}
          </div>
          <div className="flex gap-2">
            {facilityTags.slice(0, 3).map((tag) => (
              <Tag type={tag.type} key={tag.id}>
                {tag.name}
              </Tag>
            ))}
            {facilityTags?.length > 3 && (
              <Tag type="Facility">+{facilityTags?.length - 3}</Tag>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
