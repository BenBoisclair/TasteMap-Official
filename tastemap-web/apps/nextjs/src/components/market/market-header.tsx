import Image from "next/image";
import Link from "next/link";

import type { Market } from "~/types/types";
import removeSubstrings from "~/utils/removeSubstrings";
import VerifiedBadge from "../icons/verified-badge";
import NavBar from "../navbar/nav-bar";
import { Ratings } from "../sections/RatingsAndReviews/ratings";

interface MarketHeaderProps {
  market: Market;
}

const MarketHeader = ({ market }: MarketHeaderProps) => {
  return (
    <>
      <div id="marHeader">
        <NavBar />
        <div className="mt-[60px] h-[200px] bg-white">
          <div id="bannerWrapper" className="relative mx-4 flex h-full md:mx-0">
            <Image
              src={market?.bannerUrl || `https://placehold.co/600x400/png`}
              fill={true}
              style={{
                objectFit: "cover",
              }}
              className="rounded-3xl md:rounded-none"
              alt={`Market Banner`}
              priority={true}
            />
          </div>
        </div>
        <div id="marInfo" className="mb-1 w-full rounded-b-3xl bg-white pb-5 ">
          <div className="px-5 pt-2">
            <div className="flex items-center justify-between">
              <div className="text-[26px] font-bold">
                {removeSubstrings(market?.name, ["Floating Market"])}
              </div>
              {market.isVerified && (
                <div>
                  <VerifiedBadge size="lg" variant="icon" />
                </div>
              )}
            </div>
            <div className="font-medium">{market?.type}</div>
            <div
              id="marRatingInfo"
              className="mt-2 flex w-full items-center text-sm font-medium"
            >
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
    </>
  );
};

export default MarketHeader;
