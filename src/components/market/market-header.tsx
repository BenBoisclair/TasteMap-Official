import Link from "next/link";

import type { Market } from "@/types/types";
import removeSubstrings from "@/utils/removeSubstrings";
import VerifiedBadge from "../icons/verified-badge";
import { Ratings } from "../reviews/ratings";
import ImageFill from "../image-fill";

interface MarketHeaderProps {
  market: Market;
}

const MarketHeader = ({ market }: MarketHeaderProps) => {
  return (
    <div className="bg-white">
      <ImageFill
        src={`${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL}/storage/v1/object/public/public-assets/markets/${market.id}/banner`}
        alt="Market Banner"
        className="rounded-3xl h-[200px] mx-4 mt-2 "
      />
      <div className="mb-1 w-full rounded-b-3xl bg-white pb-5 ">
        <div className="px-5 pt-2">
          <div className="flex items-center justify-between">
            <div className="text-[26px] font-bold">
              {removeSubstrings(market?.name, ["Floating Market"])}
            </div>
            {market.isVerified && <VerifiedBadge size="lg" variant="icon" />}
          </div>
          <div className="font-medium">{market?.type}</div>
          <div className="mt-2 flex w-full items-center text-sm font-medium">
            <Ratings
              average={market?.ratings?.average}
              total={market?.ratings?.total}
            />
            <div className="m-1 h-[3px] w-[3px] rounded-full bg-black" />
            <Link href="#RatingsAndReviews" className="underline">
              write a review
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketHeader;
