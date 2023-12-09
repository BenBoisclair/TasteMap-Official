import Image from "next/image";

import type { Media, Vendor } from "~/types/types";
import { Tag } from "./tag";

interface VendorInfoPageProps {
  vendor: Vendor;
}

export default function VendorInfoPage({ vendor }: VendorInfoPageProps) {
  console.log(vendor.about);
  return (
    <div id="InfoPage" className="whitespace-pre-line py-8">
      <div className="px-5">
        <h1 className="text-lg font-bold">About</h1>
        <div className=" mt-2 h-full w-full font-medium text-neutral-400">
          {vendor.about}
        </div>
      </div>
      <div className="mt-5 px-5">
        <h1 className="text-lg font-bold">Price Range</h1>
        <div className="mt-2 h-full w-full font-medium text-neutral-400">
          {vendor.priceRange}
        </div>
      </div>
      {vendor?.ingredients && (
        <div className="mt-5 px-5">
          <h1 className="text-lg font-bold">Ingredients</h1>
          <div className="mt-2 h-full w-full font-medium text-neutral-400">
            {vendor.ingredients}
          </div>
        </div>
      )}
      {vendor?.media.length > 0 && <MediaSection media={vendor?.media} />}
      {vendor?.paymentOptions.length > 0 && (
        <div className="mt-5 px-5">
          <h1 className="text-lg font-bold">Payment Options</h1>
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

const MediaSection = ({ media }: { media?: Media[] }) => {
  return (
    <div className="mt-5 px-5">
      <h1 className="text-lg font-bold">Media</h1>
      <div className="mt-2 h-full w-full font-medium text-neutral-400">
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
      <div className="relative flex h-[180px] w-[260px] overflow-hidden rounded-2xl border">
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
