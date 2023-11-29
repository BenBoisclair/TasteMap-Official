import Image from "next/image";

import type { Vendor } from "~/types/types";
import { Ratings } from "./ratings";
import { Tag } from "./tag";

const VendorHeader = ({ vendor }: { vendor: Vendor }) => {
  const productTags = vendor?.tags?.filter((tag) => tag.type === "Product");
  return (
    <div id="vendHeader">
      {/* <nav
          className={cn(
            `fixed top-0 z-30 w-full from-black/60 px-4 pb-2 pt-4`,
            {
              "bg-gradient-to-b": inView,
              "bg-white": !inView,
            },
          )}
        >
          <div
            className="flex items-center justify-between"
            onClick={handleBackButton}
          >
            <span
              className={cn(
                `material-symbols-outlined size-28`,
                `text-${inView ? "white" : "black"}`,
              )}
            >
              arrow_back
            </span>
            <div className="ml-4 flex grow flex-col text-white">
              <span className="font-medium">{`At ${vendorInfo.marName}`}</span>
              <span className="text-sm">{`${vendorInfo.vendBBranchZone}`}</span>
            </div>
            <span
              className={twMerge(
                `material-symbols-outlined size-28`,
                `text-${inView ? "white" : "black"}`,
              )}
            >
              favorite
            </span>
          </div>
        </nav> */}
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
              src={vendor?.logoUrl || `https://placehold.co/600x400/png`}
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
        // ref={headerRef}
        id="marInfo"
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
              <div id="writeReview" className="underline">
                write a review
              </div>
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
        </div>
      </div>
    </div>
  );
};

export default VendorHeader;
