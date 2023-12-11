"use client";

// import { Suspense } from "react";
// import { HomePageHeader } from "./_components/homepage-header";
import { useState } from "react";

import EventElements from "./_components/event-elements";
import { HomePageHeader } from "./_components/homepage-header";
import OpenMainMapButton from "./_components/map/open-main-map-button";
import { MarketsNearYouSection } from "./_components/markets-near-you-section";
import NavBar from "./_components/nav-bar";

export const runtime = "edge";

export default function HomePage() {
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
  return (
    <>
      <NavBar />
      <OpenMainMapButton setIsMapOpen={setIsMapOpen} isMapOpen={isMapOpen} />
      {!isMapOpen && (
        <main className="flex h-screen w-full flex-col bg-neutral">
          <EventElements />

          <HomePageHeader />
          <MarketsNearYouSection />
        </main>
      )}
    </>
  );
}
