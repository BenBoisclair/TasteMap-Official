import NavBar from "../components/navbar/nav-bar";
import CategoriesSection from "@/components/categories-section";
import { MarketsNearYouSection } from "@/components/markets-near-you-section";
import { Metadata } from "next";
import { Suspense } from "react";
import { MarketsNearYouSectionSkeleton } from "@/components/skeletons/markets-near-you-section-skeleton";
import { BannerSection } from "@/components/banner/banner-section";
import BannerSectionSkeleton from "@/components/banner/banner-section-skeleton";
import ImageFill from "@/components/image-fill";
import SearchBar from "@/components/search-bar";
import { HourglassIcon, Search } from "lucide-react";
import Link from "next/link";
import { Dialog } from "@radix-ui/react-dialog";
import OnboardingModal from "@/components/onboarding-modal";
import ImageOverlay from "@/components/image-overlay";
import { VendorSectionSkeleton } from "@/components/skeletons/recommended-for-you-section-skeleton";
import VendorsHomePageSection from "@/components/vendor/vendors-homepage-section";
import LandingHeader from "@/components/landing-header";
import OpenMainMapButton from "@/components/map/open-main-map-button";
import { getMarkets } from "@/server-actions/markets";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Explore Local",
  keywords: ["Homepage"],
};

export default async function HomePage() {
  const markets = await getMarkets({});
  return (
    <>
      <NavBar page="Home" />

      <OpenMainMapButton markets={markets} />
      <main className=" flex w-full flex-col bg-white pb-14">
        <LandingHeader />
        <Suspense fallback={<MarketsNearYouSectionSkeleton />}>
          <MarketsNearYouSection />
        </Suspense>

        <CategoriesSection />
        <Suspense fallback={<BannerSectionSkeleton />}>
          <BannerSection />
        </Suspense>

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
      <OnboardingModal />
    </>
  );
}
