import Image from "next/image";
import {
  BookOpenText,
  Coins,
  Info,
  PlayCircle,
  Refrigerator,
  Wallet,
} from "lucide-react";

import type { InformationItems, Media, Vendor } from "@/types/types";
import { Tag } from "../tag";
import { InformationCard } from "./information-card";

interface VendorInfoPageProps {
  vendor: Vendor;
}

export default function VendorInfoPage({ vendor }: VendorInfoPageProps) {
  return (
    <div
      id="InfoPage"
      className="whitespace-pre-line pt-6 text-sm bg-white pb-10">
      <div className="px-5">
        <div className="flex items-center gap-1">
          <Info size={25} />
          <h1 className="text-lg font-bold">About</h1>
        </div>
        <div className=" mt-2 h-full w-full font-medium text-black">
          {vendor.about}
        </div>
      </div>
      {!!vendor.informationItems && (
        <InformationSection InformationItems={vendor?.informationItems} />
      )}
      {vendor?.ingredients && (
        <div className="mt-5 px-5">
          <div className="flex items-center gap-1">
            <Refrigerator size={25} />
            <h1 className="text-lg font-bold">Ingredients</h1>
          </div>
          <div className="mt-2 h-full w-full font-medium text-black">
            {vendor.ingredients}
          </div>
        </div>
      )}
      <div className="mt-5 px-5">
        <div className="flex items-center gap-1">
          <Coins size={25} />
          <h1 className="text-lg font-bold">Price Range</h1>
        </div>
        <div className="mt-2 h-full w-full font-medium text-black">
          {vendor.priceRange}
        </div>
      </div>
      {!!vendor?.media?.length && <MediaSection media={vendor?.media} />}
      {!!vendor?.paymentOptions && (
        <div className="mt-5 px-5">
          <div className="flex items-center gap-1">
            <Wallet size={25} />
            <h1 className="text-lg font-bold">Payment Options</h1>
          </div>
          <div className="mt-2 flex gap-3">
            {vendor?.paymentOptions.map((option) => (
              <Tag type="Facility" key={option.id} size="lg">
                {option.name}
              </Tag>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export const InformationSection = ({
  InformationItems,
}: {
  InformationItems?: InformationItems[];
}) => {
  return (
    <div className="mt-5 bg-neutral-200 py-5">
      <div className="flex items-center gap-1 px-5 text-orange">
        <BookOpenText size={25} />
        <h1 className="text-lg font-bold">Flash Cards</h1>
      </div>
      <div className="no-scrollbar mt-2 flex h-full w-full gap-3 overflow-x-auto px-5 font-medium text-black">
        {InformationItems?.map((InformationItem) => {
          return (
            <InformationCard item={InformationItem} key={InformationItem.id} />
          );
        })}
      </div>
    </div>
  );
};

const MediaSection = ({ media }: { media?: Media[] }) => {
  return (
    <div className="mt-5">
      <div className="flex items-center gap-1 px-5">
        <PlayCircle size={25} />
        <h1 className="text-lg font-bold">Media</h1>
      </div>
      <div className="no-scrollbar mt-2 flex h-full w-full gap-3 overflow-x-auto px-5 font-medium text-black">
        {media?.map((oneMedia) => {
          return <MediaCard media={oneMedia} key={oneMedia.id} />;
        })}
      </div>
    </div>
  );
};

export const MediaCard = ({ media }: { media: Media }) => {
  return (
    <>
      <div className="relative flex h-[180px] w-[260px] overflow-hidden rounded-2xl">
        <Image
          src={media.mediaUrl}
          alt={`Media`}
          fill={true}
          style={{ objectFit: "cover" }}
        />
      </div>
    </>
  );
};
