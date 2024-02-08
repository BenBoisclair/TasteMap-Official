import Image from "next/image";
import Link from "next/link";

import type { Market } from "@/types/types";
import isMarketOpen from "@/utils/isMarketOpen";
import { MarketStatusIcon } from "../icons/market-status-icon";
import VerifiedBadge from "../icons/verified-badge";
import { Ratings } from "../sections/RatingsAndReviews/ratings";
import { Tag } from "../tag";
import FavouriteHeart from "../favouriteHeart";
import DistancePin from "./distance-pin";

export function MarketCard({ market }: { market: Market }) {
  const productTags = market?.tags?.filter((tag) => tag.type === "Product");
  const facilityTags = market?.tags?.filter((tag) => tag.type === "Facility");

  return (
    <div className="shrink-0 overflow-hidden">
      <div className="relative flex h-[120px] w-[316px] place-content-center overflow-hidden rounded-3xl">
        <Image
          src={market.bannerUrl || ""}
          alt={`${market.name}'s Banner`}
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
        />

        <div className="absolute flex h-full w-full flex-col justify-between p-3 bg-transparent pointer-events-none">
          <div className="flex justify-end">
            {!!market.latitude && !!market.longitude && (
              <DistancePin
                latitude={parseFloat(market.latitude)}
                longitude={parseFloat(market.longitude)}
                className="grow"
              />
            )}
            <FavouriteHeart
              isFavourite={market.isFavourite}
              marketId={market.id}
            />
          </div>

          <div className="flex justify-end">
            {market.isVerified && <VerifiedBadge />}
          </div>
        </div>
        <Link
          href={`/market/${market.id}?tab=Highlights`}
          className="absolute top-0 w-full h-full"
        />
      </div>

      <div className="mt-[10px] flex flex-col">
        <Link href={`/market/${market.id}?tab=Highlights`}>
          <h1 className=" text-xl font-black">{market.name}</h1>
          <h2 className="font-medium">{market.type}</h2>
        </Link>
        <div className="mt-[10px] flex items-center gap-2">
          <MarketStatusIcon
            status={isMarketOpen(market.openingHours) ? "OPEN" : "CLOSED"}
          />
          <Ratings
            total={market?.ratings?.total}
            average={market?.ratings?.average}
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
