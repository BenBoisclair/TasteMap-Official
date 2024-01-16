import { useState } from "react";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import {
  BookOpenText,
  Coins,
  Info,
  PlayCircle,
  Refrigerator,
  Wallet,
} from "lucide-react";

import type { InformationItems, Media, Vendor } from "~/types/types";
import TasteMapLogo from "../assets/taste-map-logo";
import { Tag } from "../tag";

interface VendorInfoPageProps {
  vendor: Vendor;
}

export default function VendorInfoPage({ vendor }: VendorInfoPageProps) {
  return (
    <div id="InfoPage" className="whitespace-pre-line pt-6 text-sm bg-white">
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
            {vendor?.paymentOptions.map(option => (
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
        {InformationItems?.map(InformationItem => {
          return (
            <InformationCard item={InformationItem} key={InformationItem.id} />
          );
        })}
      </div>
    </div>
  );
};

export const InformationCard = ({ item }: { item: InformationItems }) => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsCardOpen(!isCardOpen)}
        className="flex flex-col rounded-3xl bg-white pb-3 text-start"
      >
        <div className="relative flex h-[120px] w-[190px] overflow-hidden rounded-t-3xl">
          <Image
            // Once you change the imageUrl to be not null, remove the ??
            src={item?.imageUrl ?? ""}
            alt={`${item?.name} Information Item`}
            fill={true}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className=" max-w-[172px] p-3">
          <h3 className="line-clamp-1 text-lg font-bold text-black">
            {item.name}
          </h3>
          <p className=" line-clamp-2 text-sm font-medium text-black">
            {item.description}
          </p>
        </div>
      </button>

      <InformationCardModal
        item={item}
        isCardOpen={isCardOpen}
        setIsCardOpen={setIsCardOpen}
      />
    </>
  );
};

interface InformationCardModalProps {
  item: InformationItems;
  isCardOpen: boolean;
  setIsCardOpen: (value: boolean) => void;
}

const InformationCardModal = ({
  item,
  isCardOpen,
  setIsCardOpen,
}: InformationCardModalProps) => {
  return (
    <Dialog
      open={isCardOpen}
      onClose={() => setIsCardOpen(false)}
      className={"fixed inset-0 z-[200] flex items-center justify-center"}
    >
      <div className="fixed inset-0 bg-black/20" aria-hidden="true" />
      <Dialog.Panel
        className={"z-[200] flex h-fit w-fit flex-col rounded-3xl bg-white p-5"}
      >
        <div className="mb-4 flex">
          <TasteMapLogo size={24} />
        </div>
        <div className="relative flex h-[155px] w-[275px] overflow-hidden rounded-2xl">
          <Image
            // Once you change the imageUrl to be not null, remove the ??
            src={item?.imageUrl ?? ""}
            alt={`${item?.name} Information Item`}
            fill={true}
            style={{ objectFit: "cover" }}
          />
        </div>
        <Dialog.Title className={"mt-3 max-w-[275px] text-xl font-bold"}>
          {item.name}
        </Dialog.Title>
        <Dialog.Description
          className={"mt-1 max-w-[275px] text-sm font-medium"}
        >
          {item.description}
        </Dialog.Description>
        <button
          onClick={() => setIsCardOpen(false)}
          className="mt-5 rounded-3xl bg-yellow py-2 hover:bg-yellow-600"
        >
          <span className="text-xl font-bold">Got it!</span>
        </button>
      </Dialog.Panel>
    </Dialog>
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
        {media?.map(oneMedia => {
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
