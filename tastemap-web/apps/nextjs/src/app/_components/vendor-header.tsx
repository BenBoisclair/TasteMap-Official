import Image from "next/image";
import Link from "next/link";

import type { Vendor } from "~/types/types";
import { cn } from "~/utils/cn";
import NavBar from "./nav-bar";
import { Ratings } from "./ratings";
import { Tag } from "./tag";

interface VendorHeaderProps {
  vendor: Vendor;
  headerRef: (node?: Element | null | undefined) => void;
  inView: boolean;
}

const VendorHeader = ({ vendor, inView, headerRef }: VendorHeaderProps) => {
  const productTags = vendor?.tags?.filter((tag) => tag.type === "Product");
  return (
    <div id="vendHeader">
      <div className="absolute left-0 top-0 w-full">
        <NavBar
          className={cn(`z-40`, {
            "bg-transparent bg-gradient-to-b from-black/60 to-transparent text-white":
              inView,
            "bg-white text-black": !inView,
          })}
        />
      </div>
      <div
        id="bannerWrapper"
        className="w-full overflow-hidden"
        style={{ position: "relative", height: "240px" }}
      >
        <Image
          src={vendor?.bannerUrl || `https://placehold.co/600x400/png`}
          sizes="100vw"
          fill={true}
          style={{
            objectFit: "cover",
          }}
          alt={`${vendor?.name} Banner`}
          priority={true}
        />
        <div className="absolute top-0 flex h-full w-full items-end p-5">
          <div className="relative h-[75px] w-[75px] overflow-hidden rounded-full bg-white">
            <Image
              src={vendor?.logoUrl || `/logos/tastemap_logo.png`}
              sizes="100vw"
              fill={true}
              style={{
                objectFit: "cover",
              }}
              alt={`${vendor?.name} Logo`}
              priority={true}
            />
          </div>
        </div>
      </div>
      <div
        ref={headerRef}
        id="vendorInfo"
        className="w-full bg-white pb-5 text-black"
      >
        <div className="flex px-5 pt-5">
          <div className="flex grow flex-col">
            <h1 className="text-2xl font-bold">{vendor?.name}</h1>
            <div
              id="marRatingInfo"
              className="mt-2 flex w-full items-center text-sm font-medium"
            >
              <Ratings
                average={vendor?.ratings?.average}
                total={vendor?.ratings?.total}
              />
              <span className="m-1 h-[3px] w-[3px] rounded-full bg-black"></span>
              <Link
                href="#RatingsAndReviews"
                id="writeReview"
                className="underline"
              >
                write a review
              </Link>
            </div>
          </div>
          <div>
            <span>{vendor?.code}</span>
          </div>
        </div>
        <div
          id="marTags"
          className="mt-2 flex flex-col gap-2 pl-5 text-sm font-medium"
        >
          {productTags.length > 0 && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorHeader;
