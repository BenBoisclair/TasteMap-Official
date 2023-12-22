"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { Coins } from "lucide-react";

import type { UniqueService } from "~/types/types";
import TasteMapLogo from "../../assets/taste-map-logo";

interface UniqueServiceCardProps {
  service: UniqueService;
}

const UniqueServiceCard = ({ service }: UniqueServiceCardProps) => {
  const [isServiceOpen, setIsServiceOpen] = useState<boolean>(false);
  return (
    <>
      <button
        onClick={() => setIsServiceOpen(true)}
        className="relative h-[140px] w-[204px] flex-shrink-0 rounded-3xl text-start text-white"
      >
        <Image
          src={service.imageUrl || `https://placehold.co/600x400/png`}
          fill={true}
          style={{
            objectFit: "cover",
          }}
          alt={"ServiceName"}
          className="rounded-3xl"
        />
        <div className="overlay absolute inset-0  overflow-hidden rounded-3xl"></div>
        <div id="ServiceInfo" className="absolute bottom-0 w-full px-4 py-3">
          <div className="truncate">
            <span className="font-bold">{service.name}</span>
          </div>
          {/* {service.openingHours.length > 0 && (
          <p className="text-2xs font-medium">{`${service.openingHours[0].openHour} - ${service.openingHours[0].closeHour} • ${service.openingHours[0].closeHour}`}</p>
        )} */}
          <span className="text-sm font-medium">
            {service.price <= 0 ? "Free" : service.price + " baht"}
          </span>
        </div>
      </button>

      <Dialog
        open={isServiceOpen}
        onClose={() => setIsServiceOpen(false)}
        className={"fixed inset-0 z-[200] flex items-center justify-center"}
      >
        <div className="fixed inset-0 bg-black/20" aria-hidden="true" />
        <Dialog.Panel
          className={
            "z-[200] flex h-fit w-fit flex-col rounded-3xl bg-white p-5"
          }
        >
          <div className="mb-4 flex">
            <TasteMapLogo size={24} />
          </div>
          <div className="relative flex h-[155px] w-[275px] overflow-hidden rounded-2xl">
            <Image
              // Once you change the imageUrl to be not null, remove the ??
              src={service?.imageUrl ?? ""}
              alt={`${service?.name} Information Item`}
              fill={true}
              style={{ objectFit: "cover" }}
            />
          </div>
          <Dialog.Title className={"mt-3 max-w-[275px] text-xl font-bold"}>
            {service.name}
          </Dialog.Title>
          <Dialog.Description
            className={"mt-2 flex items-center gap-1 text-lg"}
          >
            <Coins size={20} />
            <span className=" font-medium">Price:</span>
            <span>
              {" "}
              {service.price <= 0 ? "Free" : service.price + " baht"}
            </span>
          </Dialog.Description>
          <button
            onClick={() => setIsServiceOpen(false)}
            className="mt-5 rounded-3xl bg-yellow py-2 hover:bg-yellow-600"
          >
            <span className="text-xl font-bold">Got it!</span>
          </button>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default UniqueServiceCard;
