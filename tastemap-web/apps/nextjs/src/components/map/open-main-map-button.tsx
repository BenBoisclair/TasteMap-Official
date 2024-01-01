"use client";

import { useQuery } from "@tanstack/react-query";
import { Map, X } from "lucide-react";

import type { Market } from "~/types/types";
import fetchAt from "~/utils/fetchAt";
import MainMap from "./main-map";

const OpenMainMapButton = ({
  isMapOpen,
  setIsMapOpen,
}: {
  isMapOpen: boolean;
  setIsMapOpen: (isMapOpen: boolean) => void;
}) => {
  const { data: markets, status: marketsStatus } = useQuery({
    queryKey: ["allMarkets"],
    queryFn: () => fetchAt<Market[]>("/api/markets"),
  });

  const toggleMapOpen = () => {
    setIsMapOpen(!isMapOpen);
  };
  return (
    <>
      <div className="absolute bottom-0 right-0 z-[200] flex w-full justify-end">
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
      {marketsStatus === "success" && isMapOpen && (
        <MainMap markets={markets} />
      )}
    </>
  );
};

export default OpenMainMapButton;
