"use client";

import { useQuery } from "@tanstack/react-query";
import { HourglassIcon, Map, X } from "lucide-react";

import type { Market } from "@/types/types";
import fetchAt from "@/utils/fetchAt";
import MainMap from "./main-map";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { cn } from "@/utils/cn";

const OpenMainMapButton = ({
  markets,
  className,
}: {
  markets: Market[] | undefined;
  className?: string;
}) => {
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);

  const toggleMapOpen = () => {
    setIsMapOpen(!isMapOpen);
  };

  if (markets === undefined || markets?.length === 0) {
    return (
      <div className="fixed bottom-0 right-0 z-[200] flex w-full justify-end">
        <div className="p-5">
          <div className="h-[30px] bg-yellow w-[60px] -mr-3 rounded-l-3xl flex justify-center items-center font-bold text-white">
            Map
          </div>
          <button disabled={true} className="rounded-full bg-yellow p-4">
            <HourglassIcon className="text-white" size={35} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={cn(
          `fixed bottom-0 right-0 z-[200] flex w-full justify-end`,
          className
        )}>
        <div className="p-5 flex items-center">
          {isMapOpen ? (
            <></>
          ) : (
            <div className="h-[30px] bg-yellow w-[60px] -mr-3 rounded-l-3xl flex justify-center items-center font-bold text-orange">
              Map
            </div>
          )}
          <button
            disabled={!markets}
            onClick={toggleMapOpen}
            className="rounded-full bg-yellow p-4">
            {!markets && <HourglassIcon className="text-white" size={35} />}
            {!isMapOpen && <Map className="text-white" size={35} />}
            {isMapOpen && <X className="text-white" size={35} />}
          </button>
        </div>
      </div>

      <Dialog open={isMapOpen} onClose={() => setIsMapOpen(false)}>
        <Dialog.Panel>
          <MainMap markets={markets} />
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default OpenMainMapButton;
