"use client";

import { useQuery } from "@tanstack/react-query";
import { Map, X } from "lucide-react";

import type { Market } from "~/types/types";
import fetchAt from "~/utils/fetchAt";
import MainMap from "./main-map";
import { useState } from "react";
import { Dialog } from "@headlessui/react";

const OpenMainMapButton = () => {
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
  const { data: markets, status: marketsStatus } = useQuery({
    queryKey: ["allMarkets"],
    queryFn: () => fetchAt<Market[]>("/api/markets"),
  });

  const toggleMapOpen = () => {
    setIsMapOpen(!isMapOpen);
  };

  return (
    <>
      <div className="fixed bottom-0 right-0 z-[200] flex w-full justify-end">
        <div className="p-5">
          <button
            disabled={marketsStatus === "pending"}
            onClick={toggleMapOpen}
            className="rounded-full bg-yellow p-4"
          >
            {!isMapOpen && <Map className="text-white" size={35} />}
            {isMapOpen && <X className="text-white" size={35} />}
          </button>
        </div>
      </div>
      {marketsStatus === "success" && (
        <Dialog open={isMapOpen} onClose={() => setIsMapOpen(false)}>
          <Dialog.Panel>
            <MainMap markets={markets} />
          </Dialog.Panel>
        </Dialog>
      )}
    </>
  );
};

export default OpenMainMapButton;
