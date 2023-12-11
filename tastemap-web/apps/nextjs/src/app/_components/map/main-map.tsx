"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { createRoot } from "react-dom/client";

import type { Market } from "~/types/types";
import Marker from "../market";
import MenuTab from "./menuTab";

const MainMap = ({ markets }: { markets: Market[] }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [currentMarket, setCurrentMarket] = useState<Market | null>(null);
  const [shouldRenderMenuTab, setShouldRenderMenuTab] = useState(false);
  const [openTab, setOpenTab] = useState<boolean>(false);

  const markerClicked = useCallback((market: Market) => {
    setCurrentMarket(market);
    setOpenTab((prevOpenTab) => !prevOpenTab);
  }, []); // Include all dependencies of markerClicked here

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: [100.45661, 13.776288],
      zoom: 13,
    });

    markets.forEach((market) => {
      const markerEl = document.createElement("div");
      // const currentOrNot = market.id === currentMarket?.id;
      createRoot(markerEl).render(
        <Marker onClick={() => markerClicked(market)} market={market} />,
      );

      // Ensure the type is correctly set for the marker element
      return new mapboxgl.Marker(markerEl as HTMLElement)
        .setLngLat([parseFloat(market.longitude), parseFloat(market.latitude)])
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
    <>
      <div
        ref={mapContainer}
        className="absolute left-0 top-0 z-50 h-screen w-full border"
      />
      {currentMarket && shouldRenderMenuTab === true && (
        <MenuTab
          currentMarket={currentMarket}
          openTab={openTab}
          setOpenTab={setOpenTab}
        />
      )}
    </>
  );
};

export default MainMap;
