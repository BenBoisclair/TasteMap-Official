import OpenMainMapButton from "../components/map/open-main-map-button";
import NavBar from "../components/navbar/nav-bar";
import CategoriesSection from "../components/sections/categories-section";
import { HomePageHeader } from "../components/sections/HomeHeader/homepage-header";
import { MarketsNearYouSection } from "../components/sections/MarketsNearYou/markets-near-you-section";
import VendorsHomePageSection from "~/components/sections/Vendors/vendors-homepage-section";
import { Metadata } from "next";
import { Suspense } from "react";
import { MarketsNearYouSectionSkeleton } from "~/components/skeletons/markets-near-you-section-skeleton";
import { VendorSectionSkeleton } from "~/components/skeletons/recommended-for-you-section-skeleton";
import { BannerSection } from "~/components/sections/HomeHeader/EventBanners/banner-section";
import BannerSectionSkeleton from "~/components/sections/HomeHeader/EventBanners/banner-section-skeleton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Explore Local",
  keywords: ["Homepage"],
};

export default function HomePage() {
  return (
    <>
      <NavBar page="Home" />
      {/* <OpenMainMapButton /> */}
      <main className="pb-10 flex w-full flex-col gap-2 bg-neutral">
        <HomePageHeader>
          <Suspense fallback={<BannerSectionSkeleton />}>
            <BannerSection />
          </Suspense>
        </HomePageHeader>
        <Suspense fallback={<MarketsNearYouSectionSkeleton />}>
          <MarketsNearYouSection />
        </Suspense>
        <CategoriesSection />
        <Suspense fallback={<VendorSectionSkeleton />}>
          <VendorsHomePageSection name="Grab a Quick Bite!" tag="Quick Bites" />
        </Suspense>
        <Suspense fallback={<VendorSectionSkeleton />}>
          <VendorsHomePageSection
            name="Souvenirs to Take Home"
            tag="Souvenirs"
          />
        </Suspense>
      </main>
    </>
  );
}
