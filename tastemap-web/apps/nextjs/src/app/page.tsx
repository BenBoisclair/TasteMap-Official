"use client";

// import { Suspense } from "react";
// import { HomePageHeader } from "./_components/homepage-header";
import { useState } from "react";

import EventElements from "../components/event-elements";
import OpenMainMapButton from "../components/map/open-main-map-button";
import NavBar from "../components/navbar/nav-bar";
import CategoriesSection from "../components/sections/categories-section";
import { HomePageHeader } from "../components/sections/HomeHeader/homepage-header";
import { MarketsNearYouSection } from "../components/sections/MarketsNearYou/markets-near-you-section";

export const runtime = "edge";

export default function HomePage() {
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
  return (
    <>
      <NavBar />
      <OpenMainMapButton setIsMapOpen={setIsMapOpen} isMapOpen={isMapOpen} />
      {!isMapOpen && (
        <main className="mb-10 flex h-screen w-full flex-col gap-2 bg-neutral">
          <EventElements />

          <HomePageHeader />
          <MarketsNearYouSection />
          <CategoriesSection />
        </main>
      )}
    </>
  );
}
