// import IntToStringWeekday from "../(utils)/IntToStringWeekday";
import { BookText, CalendarDays, Info } from "lucide-react";

import type { Market } from "~/types/types";
import convertTimeFormat from "~/utils/convertTimeFormat";
import isMarketOpen from "~/utils/isMarketOpen";
import OpeningHourItem from "./opening-hour-item";

interface MarketInfoPageProps {
  market: Market;
}

export default function MarketInfoPage({ market }: MarketInfoPageProps) {
  return (
    <div id="InfoPage" className="py-8 text-sm">
      <div className="px-5">
        <div className="flex items-center gap-1">
          <Info size={25} />
          <h1 className="text-lg font-bold">About</h1>
        </div>
        <div className="mt-2 h-full w-full font-medium text-black">
          {market.about}
        </div>
      </div>
      <div className="mt-5 px-5">
        <div className="flex items-center gap-1">
          <CalendarDays size={25} />
          <h1 className="text-lg font-bold">Opening hours</h1>
        </div>
        <div className="py-1">
          {market?.openingHours.map((hour, index) => {
            const isOpen = isMarketOpen(hour);
            return (
              <OpeningHourItem
                isOpen={isOpen}
                day={hour.dayOfWeek}
                hours={`${convertTimeFormat(
                  hour.open,
                )} am - ${convertTimeFormat(hour.close)} pm`}
                key={index}
              />
            );
          })}
        </div>
      </div>
      {/* <div className="px-5">
        <h2 className="mt-5 text-lg font-bold">Market map</h2>
        <div className="mt-2">
          <div className="relative w-[350px] h-[200px] rounded-2xl">
            <Image
              src={market.lstMarketMap[0].marImgImg}
              fill={true}
              style={{
                objectFit: "cover",
              }}
              alt={`${marketInfo.marName} Micro Map`}
              className="rounded-2xl"
            />
            <div className="absolute top-0 h-full p-5 w-full flex items-end">
              <div className="bg-gray-800/80 rounded-3xl px-5 py-2 text-white h-fit w-fit">
                <div className="flex items-center">
                  <span className="material-symbols-outlined mr-2 size-24">
                    pan_zoom
                  </span>
                  <span className="text-sm font-bold">Expand the Map</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="px-5 mt-5">
        <div className="flex items-center">
          <h2 className="text-lg font-bold mr-2">How to get there</h2>
          <div className="bg-neutral-200 text-black rounded-2xl text-sm px-2 font-medium">
            Open in Google Map
          </div>
        </div>
        <div className="mt-3">
          <div className="relative w-[350px] h-[200px] rounded-2xl">
            <Image
              src={`https://placehold.co/600x400/png`}
              fill={true}
              style={{
                objectFit: "cover",
              }}
              alt={`${marketInfo.marName} Google Map`}
              className="rounded-2xl"
            />
            <div className="absolute top-0 h-full p-5 w-full flex items-end">
              <div className="bg-gray-800/80 rounded-3xl px-5 py-2 text-white h-fit w-fit">
                <div className="flex items-center">
                  <span className="material-symbols-outlined mr-2 size-24">
                    pan_zoom
                  </span>
                  <span className="text-sm font-bold">Open in Google Maps</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 flex flex-col gap-1">
          <span className="font-medium text-gray-800">{`Suan Chatuchak  Kamphaeng Phet 2nd Road, Chatuchak, Bangkok 10900`}</span>
          <span className="text-black/60 text-xs">{`2.9km. • 20 min from here `}</span>
        </div>
      </div> */}
      {/* <div className="px-5">
        <h2 className="mt-5 text-lg font-bold">Nearby locations</h2>
        <div className="mt-2">
          {market.lstMarketNearby.map((nearby, index) => {
            return (
              <NearbyLocationItem
                name={nearby.marNearbyName}
                distance={nearby.marNearbyDistance}
                key={index}
              />
            );
          })}
        </div>
      </div> */}
      <div className="mt-5 px-5">
        <div className="flex items-center gap-1">
          <BookText size={25} />
          <h2 className="text-lg font-bold">History</h2>
        </div>
        <div className="mt-2">
          <div className="flex h-fit w-full font-medium text-black">
            {market.history}
          </div>
        </div>
      </div>
    </div>
  );
}
