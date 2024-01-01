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
import VendorsHomePageSection from "~/components/sections/Vendors/vendors-homepage-section";

export const runtime = "edge";

export default function HomePage() {
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
  return (
    <>
      <NavBar />
      <OpenMainMapButton setIsMapOpen={setIsMapOpen} isMapOpen={isMapOpen} />
      {!isMapOpen && (
        <main className="pb-10 flex w-full flex-col gap-2 bg-neutral">
          <EventElements />

          <HomePageHeader />
          <MarketsNearYouSection />
          <CategoriesSection />
          <VendorsHomePageSection
            name="Grab a Quick Bite!"
            tag="Quick%20Bites"
          />
          <VendorsHomePageSection
            name="Souvenirs to Take Home"
            tag="Souvenirs"
          />
        </main>
      )}
    </>
  );
}
