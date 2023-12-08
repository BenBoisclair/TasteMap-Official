import Image from "next/image";
import Link from "next/link";

import type { Market } from "~/types/types";
import { cn } from "~/utils/cn";
import NavBar from "./nav-bar";
import { Ratings } from "./ratings";
import { Tag } from "./tag";

interface MarketHeaderProps {
  market: Market;
  headerRef: (node?: Element | null | undefined) => void;
  inView: boolean;
}

const MarketHeader = ({ market, headerRef, inView }: MarketHeaderProps) => {
  const productTags = market?.tags?.filter((tag) => tag.type === "Product");
  const facilityTags = market?.tags?.filter((tag) => tag.type === "Facility");
  return (
    <>
      <div id="marHeader">
        <NavBar
          className={cn(`z-40`, {
            "bg-transparent text-white": inView,
            "bg-white text-black": !inView,
          })}
        />

        <div
          id="bannerWrapper"
          className="w-full overflow-hidden"
          style={{ position: "relative", height: "240px" }}
        >
          <Image
            src={market?.bannerUrl || `https://placehold.co/600x400/png`}
            sizes="100vw"
            fill={true}
            style={{
              objectFit: "cover",
            }}
            alt={`Market Banner`}
            priority={true}
          />
        </div>
        <div
          ref={headerRef}
          id="marInfo"
          className="w-full bg-white pb-5 text-black"
        >
          <div className="px-5 pt-5">
            <h1 className="text-2xl font-bold">{market?.name}</h1>
            <p className="font-medium">{market?.type}</p>
            <div
              id="marRatingInfo"
              className="mt-2 flex w-full items-center text-sm font-medium"
            >
              <Ratings
                average={market?.ratings?.average}
                total={market?.ratings?.total}
              />
              <span className="m-1 h-[3px] w-[3px] rounded-full bg-black"></span>
              <Link href="#RatingsAndReviews" className="underline">
                write a review
              </Link>
            </div>
          </div>
          <div
            id="marTags"
            className="mt-2 flex flex-col gap-2 pl-5 text-sm font-medium"
          >
            <div id="productTags" className="flex items-center">
              <p className="mr-2">Products</p>
              <div
                id="PTags"
                className="hide-scrollbar no-scrollbar flex items-center gap-3 overflow-scroll"
              >
                {productTags?.map((tag, key: number) => {
                  return (
                    <Tag key={key} type={tag.type} size="lg">
                      {tag.name}
                    </Tag>
                  );
                })}
              </div>
            </div>
            <div id="facilityTags" className="flex items-center">
              <p className="mr-2">Facilities</p>
              <div
                id="FTags"
                className="hide-scrollbar no-scrollbar flex items-center gap-3 overflow-scroll"
              >
                {facilityTags?.map((tag, key: number) => {
                  return (
                    <Tag key={key} type={tag.type} size="lg">
                      {tag.name}
                    </Tag>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketHeader;
