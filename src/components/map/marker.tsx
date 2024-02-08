import { MapPin } from "lucide-react";
import type { ClassNameValue } from "tailwind-merge";

import type { Market } from "@/types/types";
import { cn } from "@/utils/cn";
import isMarketOpen from "@/utils/isMarketOpen";

interface MarkerProps {
  onClick: (market: Market) => void;
  market: Market;
  className?: ClassNameValue;
}

const Marker = ({ onClick, market, className }: MarkerProps) => {
  const isOpen = isMarketOpen(market.openingHours);

  return (
    <button
      onClick={() => onClick(market)}
      className={cn(`marker rounded-full bg-yellow p-1 text-white`, className)}>
      <MapPin size={30} />
      <div
        className={cn(
          "absolute right-0 top-0 h-2.5 w-2.5 rounded-full border border-black",
          {
            "bg-green": isOpen,
            "bg-orange": !isOpen,
          }
        )}></div>
    </button>
  );
};

export default Marker;
