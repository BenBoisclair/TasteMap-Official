import Link from "next/link";

import type { Market } from "@/types/types";
import isMarketOpen from "@/utils/isMarketOpen";
import { MarketStatusIcon } from "../icons/market-status-icon";
import VerifiedBadge from "../icons/verified-badge";
import { Ratings } from "../reviews/ratings";
import FavouriteHeart from "../favouriteHeart";
import DistancePin from "./distance-pin";
import ImageFill from "../image-fill";
import ImageOverlay from "../image-overlay";
import removeSubstrings from "@/utils/removeSubstrings";

export function MarketCard({ market }: { market: Market }) {
  return (
    <div className="shrink-0 overflow-hidden flex flex-col">
      <ImageFill
        className="h-[160px] min-w-[270px] rounded-3xl w-full"
        src={`${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL}/storage/v1/object/public/public-assets/markets/${market.id}/banner`}
        alt={`${market.name}'s Banner`}>
        <ImageOverlay className="flex-col justify-between">
          <div className="flex justify-between">
            <DistancePin
              latitude={parseFloat(market.latitude || "0")}
              longitude={parseFloat(market.longitude || "0")}
              className="grow"
            />
            <FavouriteHeart
              isFavourite={market.isFavourite}
              marketId={market.id}
            />
          </div>
          <div className="flex justify-end">
            {market.isVerified && <VerifiedBadge />}
          </div>
        </ImageOverlay>
        <Link
          href={`/market/${market.id}?tab=Highlights`}
          className="absolute top-0 w-full h-full"
        />
      </ImageFill>

      <div className="mt-[10px] flex">
        <Link href={`/market/${market.id}?tab=Highlights`} className=" w-full">
          <h1 className=" text-xl font-black whitespace-nowrap">
            {removeSubstrings(market.name, [
              "Floating Market",
              "Night Market",
              "Creative Park",
              "Center Market",
            ])}
          </h1>
          <h2 className="font-medium">{market.type}</h2>
        </Link>
        <div className="flex flex-col gap-2 w-full items-end">
          <Ratings
            total={market?.ratings?.total}
            average={market?.ratings?.average}
          />
          <MarketStatusIcon
            status={isMarketOpen(market.openingHours) ? "OPEN" : "CLOSED"}
          />
        </div>
        {/* <div className="mt-[10px] flex flex-col gap-2">
          <div className="flex gap-2">
            {productTagsList}
            {productTags?.length > 3 && (
              <Tag type="Product">+{productTags?.length - 3}</Tag>
            )}
          </div>
          <div className="flex gap-2">
            {facilityTagsList}
            {facilityTags?.length > 3 && (
              <Tag type="Facility">+{facilityTags?.length - 3}</Tag>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
}
