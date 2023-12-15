import { useState } from "react";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { BookOpenText } from "lucide-react";

import type { InformationItems, Media, Vendor } from "~/types/types";
import { Tag } from "./tag";
import TasteMapLogo from "./taste-map-logo";

interface VendorInfoPageProps {
  vendor: Vendor;
}

export default function VendorInfoPage({ vendor }: VendorInfoPageProps) {
  return (
    <div id="InfoPage" className="whitespace-pre-line py-8 text-sm">
      <div className="px-5">
        <h1 className="text-lg font-bold">About</h1>
        <div className=" mt-2 h-full w-full font-medium text-black">
          {vendor.about}
        </div>
      </div>
      {vendor?.informationItems.length > 0 && (
        <InformationSection InformationItems={vendor?.informationItems} />
      )}
      {vendor?.ingredients && (
        <div className="mt-5 px-5">
          <h1 className="text-lg font-bold">Ingredients</h1>
          <div className="mt-2 h-full w-full font-medium text-black">
            {vendor.ingredients}
          </div>
        </div>
      )}
      <div className="mt-5 px-5">
        <h1 className="text-lg font-bold">Price Range</h1>
        <div className="mt-2 h-full w-full font-medium text-black">
          {vendor.priceRange}
        </div>
      </div>
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

export const InformationCard = ({ item }: { item: InformationItems }) => {
  const [openCard, setOpenCard] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpenCard(!openCard)}
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
          <h3 className="text-lg font-bold text-black">{item.name}</h3>
          <p className=" line-clamp-2 text-sm font-medium text-black">
            {item.description}
          </p>
        </div>
      </button>
      {openCard && (
        <InformationCardModal
          item={item}
          openCard={openCard}
          setOpenCard={setOpenCard}
        />
      )}
    </>
  );
};

interface InformationCardModalProps {
  item: InformationItems;
  openCard: boolean;
  setOpenCard: (value: boolean) => void;
}

const InformationCardModal = ({
  item,
  openCard,
  setOpenCard,
}: InformationCardModalProps) => {
  return (
    <Dialog
      open={openCard}
      onClose={() => setOpenCard(false)}
      className={
        "fixed inset-0 z-[200] flex items-center justify-center bg-black/30"
      }
    >
      <div className="bg-black-30 fixed inset-0" aria-hidden="true" />
      <Dialog.Panel
        className={"flex h-fit w-fit flex-col rounded-3xl bg-white p-5"}
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
          onClick={() => setOpenCard(false)}
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
      <h1 className="px-5 text-lg font-bold">Media</h1>
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
