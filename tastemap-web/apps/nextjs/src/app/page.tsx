import { useState } from "react";

import EventElements from "../components/event-elements";
import OpenMainMapButton from "../components/map/open-main-map-button";
import NavBar from "../components/navbar/nav-bar";
import CategoriesSection from "../components/sections/categories-section";
import { HomePageHeader } from "../components/sections/HomeHeader/homepage-header";
import { MarketsNearYouSection } from "../components/sections/MarketsNearYou/markets-near-you-section";
import VendorsHomePageSection from "~/components/sections/Vendors/vendors-homepage-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TasteMap | Explore Local",
  description: "Platform for Local Tourism!",
  applicationName: "TasteMap",
  keywords: [
    "Tourism",
    "Map",
    "Food",
    "Markets",
    "Thailand",
    "Bangkok",
    "Fashion",
    "Local Tourism",
    "Taling Chan Floating Market",
    "Floating Market",
    "Night Market",
    "Flea Market",
  ],
  creator: "Benedict Boisclair",
  publisher: "The Hominians Co.,Ltd.",
  authors: [
    {
      name: "The Hominians Co.,Ltd.",
      url: "https://www.instagram.com/thehominians/",
    },
    {
      name: "Benedict Boisclair",
      url: "https://www.linkedin.com/in/benedict-boisclair-971958169/",
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <NavBar />
      <OpenMainMapButton />
      <main className="pb-10 flex w-full flex-col gap-2 bg-neutral">
        <EventElements />
        <HomePageHeader />
        <MarketsNearYouSection />
        <CategoriesSection />
        <VendorsHomePageSection name="Grab a Quick Bite!" tag="Quick%20Bites" />
        <VendorsHomePageSection name="Souvenirs to Take Home" tag="Souvenirs" />
      </main>
    </>
  );
}
