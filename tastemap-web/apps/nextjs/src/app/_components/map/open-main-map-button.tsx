import { useQuery } from "@tanstack/react-query";
import { Map } from "lucide-react";

import fetchMarkets from "~/app/api/_actions/fetchMarkets";
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
    queryFn: fetchMarkets,
  });

  const toggleMapOpen = () => {
    setIsMapOpen(!isMapOpen);
  };
  return (
    <>
      <div className="absolute bottom-0 right-0 flex w-full justify-end">
        <div className="p-5">
          <button
            disabled={marketsStatus === "pending"}
            onClick={toggleMapOpen}
            className="rounded-full bg-yellow p-4"
          >
            <Map className="text-white" size={35} />
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
