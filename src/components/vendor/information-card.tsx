" use client";

import { Dialog } from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";
import { InformationItems } from "@/types/types";
import TasteMapLogo from "../assets/taste-map-logo";
import ImageFill from "../image-fill";
import ImageOverlay from "../image-overlay";
import { Maximize2 } from "lucide-react";

export const InformationCard = ({ item }: { item: InformationItems }) => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsCardOpen(!isCardOpen)}
        className="flex flex-col rounded-3xl bg-white pb-3 text-start">
        <ImageFill
          src={item.imageUrl}
          alt={item.name || ""}
          className="rounded-3xl h-[160px] w-[210px]">
          <ImageOverlay className=" bg-gradient-to-b from-transparent to-black" />
          <ImageOverlay>
            <div className="text-white flex flex-col justify-between">
              <div className="flex justify-end">
                <Maximize2 size={15} />
              </div>
              <div className="flex flex-col justify-end">
                <h3 className="line-clamp-1 text-lg font-bold">{item.name}</h3>
                <p className=" line-clamp-2 text-sm font-medium">
                  {item.description}
                </p>
              </div>
            </div>
          </ImageOverlay>
        </ImageFill>
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
      className={"fixed inset-0 z-[200] flex items-center justify-center"}>
      <div className="fixed inset-0 bg-black/20" aria-hidden="true" />
      <Dialog.Panel
        className={
          "z-[200] flex h-fit w-fit flex-col rounded-3xl bg-white p-5"
        }>
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
          className={"mt-1 max-w-[275px] text-sm font-medium"}>
          {item.description}
        </Dialog.Description>
        <button
          onClick={() => setIsCardOpen(false)}
          className="mt-5 rounded-3xl bg-yellow py-2 hover:bg-yellow-600">
          <span className="text-xl font-bold">Got it!</span>
        </button>
      </Dialog.Panel>
    </Dialog>
  );
};
