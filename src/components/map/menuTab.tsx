"use client";

import Image from "next/image";
import Link from "next/link";
import { useSwipeable } from "react-swipeable";

import type { Market } from "@/types/types";
import { cn } from "@/utils/cn";
import isMarketOpen from "@/utils/isMarketOpen";
import RatingStarIcon from "../icons/rating-star-icon";
import { Tag } from "../tag";
import removeSubstrings from "@/utils/removeSubstrings";
import VerifiedBadge from "../icons/verified-badge";
import ImageFill from "../image-fill";

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
      <div className="h-[340px] w-11/12 rounded-3xl bg-white shadow-2xl flex flex-col">
        <Link href={`/market/${currentMarket.id}`}>
          <ImageFill
            className="h-[150px] w-full rounded-t-3xl"
            alt={`${currentMarket.name} Banner`}
            src={`${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL}/storage/v1/object/public/public-assets/markets/${currentMarket.id}/banner`}
          />
        </Link>

        <div className="flex flex-col gap-0.5 px-5 py-3 overflow-y-auto">
          <div className="flex justify-between">
            <span
              className={cn(`text-sm font-medium text-green`, {
                "text-orange": !isOpen,
                "text-green": isOpen,
              })}>
              {isOpen ? "Open" : "Closed"}
            </span>
            {currentMarket.isVerified && <VerifiedBadge variant="icon" />}
          </div>
          <Link href={`/market/${currentMarket.id}`}>
            <h2 className="text-2xl font-bold">
              {removeSubstrings(currentMarket?.name)}
            </h2>
            <p className="font-medium">{currentMarket.type}</p>
          </Link>
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
      </div>
    </div>
  );
};

export default MenuTab;
