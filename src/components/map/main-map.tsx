"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { createRoot } from "react-dom/client";

import type { Market } from "@/types/types";
import Marker from "./marker";
import MenuTab from "./menuTab";
import { cn } from "@/utils/cn";
import { MarketCard } from "../market/market-card";
import { ChevronsLeftIcon, ChevronsRightIcon, Search } from "lucide-react";

const MainMap = ({ markets }: { markets: Market[] }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [currentMarket, setCurrentMarket] = useState<Market | null>(null);
  const [shouldRenderMenuTab, setShouldRenderMenuTab] = useState(false);
  const [openTab, setOpenTab] = useState<boolean>(false);
  const [openSideTab, setOpenSideTab] = useState<boolean>(false);

  const markerClicked = useCallback((market: Market) => {
    setCurrentMarket(market);
    setOpenTab((prevOpenTab) => !prevOpenTab);
  }, []);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: [100.45661, 13.776288],
      zoom: 13,
    });

    markets.forEach((market) => {
      const markerEl = document.createElement("div");
      createRoot(markerEl).render(
        <Marker onClick={() => markerClicked(market)} market={market} />
      );

      // Ensure the type is correctly set for the marker element
      return new mapboxgl.Marker(markerEl as HTMLElement)
        .setLngLat([
          parseFloat(market.longitude || "0"),
          parseFloat(market.latitude || "0"),
        ])
        .addTo(map);
    });

    return () => {
      map.remove();
    };
  }, [markets, markerClicked]);

  useEffect(() => {
    if (openTab) {
      setShouldRenderMenuTab(true);
    } else if (!openTab && shouldRenderMenuTab) {
      const timeoutId = setTimeout(() => setShouldRenderMenuTab(false), 500); // 500ms for the exit animation
      return () => clearTimeout(timeoutId);
    }
  }, [openTab, shouldRenderMenuTab]);

  return (
    <div className="relative">
      <div ref={mapContainer} className="z-50 h-screen w-full" />

      {/* <div
        className={cn(
          `absolute top-14 left-0 z-[250] h-full flex bg-white w-[400px] overflow-hidden flex-col duration-500 ease-in-out`,
          {
            "left-[0%]": openSideTab,
            "left-[-100%]": !openSideTab,
          }
        )}>
        <div className="h-[100px] flex bg-neutral-50 px-5 items-center justify-between">
          <div className="flex items-center gap-2">
            <Search size={20} />
            <span className="font-medium text-lg">Find Markets</span>
          </div>
          <div
            className="flex items-center w-[100px] justify-center cursor-pointer relative"
            onClick={() => setOpenSideTab(!openSideTab)}>
            <div className="absolute">
              <ChevronsLeftIcon size={30} />
            </div>
          </div>
        </div>
        <div className="flex flex-col grow px-5 gap-5 overflow-y-scroll py-4 ">
          {markets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>
      </div> */}

      {currentMarket && shouldRenderMenuTab === true && (
        <>
          <button
            onClick={() => setOpenTab((prev) => !prev)}
            className="absolute left-0 top-0 z-[240] h-screen w-full bg-black/10"
          />
          <MenuTab
            currentMarket={currentMarket}
            openTab={openTab}
            setOpenTab={setOpenTab}
          />
        </>
      )}
    </div>
  );
};

export default MainMap;
