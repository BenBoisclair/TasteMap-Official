import { MapPin } from "lucide-react";
import type { ClassNameValue } from "tailwind-merge";

import type { Market } from "~/types/types";
import { cn } from "~/utils/cn";

interface MarkerProps {
  onClick: (market: Market) => void;
  market: Market;
  className?: ClassNameValue;
}

const Marker = ({ onClick, market, className }: MarkerProps) => {
  const _onClick = () => {
    onClick(market);
  };

  return (
    <button
      onClick={_onClick}
      className={cn(`marker rounded-full bg-yellow p-1 text-white`, className)}
    >
      <MapPin size={30} />
    </button>
  );
};

export default Marker;
