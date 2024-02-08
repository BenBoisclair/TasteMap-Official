"use client";

import Image from "next/image";
import Link from "next/link";
import { useSwipeable } from "react-swipeable";

import type { Market } from "@/types/types";
import { cn } from "@/utils/cn";
import isMarketOpen from "@/utils/isMarketOpen";
import RatingStarIcon from "../icons/rating-star-icon";
import { Tag } from "../tag";

const MenuTab = ({
  currentMarket,
  openTab,
  setOpenTab,
}: {
  currentMarket: Market;
  openTab: boolean;
  setOpenTab: (open: boolean) => void;
}) => {
  const productTags = currentMarket?.tags.filter(
    (tag) => tag.type === "Product"
  );
  const facilityTags = currentMarket?.tags.filter(
    (tag) => tag.type === "Facility"
  );

  const isOpen = isMarketOpen(currentMarket.openingHours);

  const handlers = useSwipeable({
    onSwipedDown: () => setOpenTab(false),
    delta: 10,
    trackMouse: true,
  });

  return (
    <div
      {...handlers}
      className={cn(
        `absolute bottom-0 left-0 z-[250] flex w-full max-w-[500px] justify-center overflow-hidden pb-10`,
        {
          "menuTab-enter": openTab,
          "menuTab-exit": !openTab,
        }
      )}>
      <div className="h-[340px] w-11/12 overflow-hidden rounded-3xl bg-white shadow-2xl">
        <Link href={`/market/${currentMarket.id}`}>
          <div className="relative h-[150px]  w-full shrink-0 overflow-hidden">
            <Image
              src={currentMarket.bannerUrl || ""}
              alt={`${currentMarket.name} Banner`}
              fill={true}
              priority={true}
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="flex flex-col gap-0.5 px-5 py-3">
            <div className="flex">
              <span
                className={cn(`text-sm font-medium text-green`, {
                  "text-orange": !isOpen,
                  "text-green": isOpen,
                })}>
                {isOpen ? "Open" : "Closed"}
              </span>
            </div>
            <h2 className="text-2xl font-bold">{currentMarket?.name}</h2>
            <p className="font-medium">{currentMarket.type}</p>
            <div className="flex items-center gap-2 text-sm font-medium">
              <RatingStarIcon />
              <span>{currentMarket?.ratings?.average?.toFixed(1) || 0}</span>
              <div className="h-0.5 w-0.5 rounded-full bg-black" />
              <span className=" underline underline-offset-2">{`${
                currentMarket?.ratings?.total || 0
              } reviews`}</span>
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
        </Link>
      </div>
    </div>
  );
};

export default MenuTab;
