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
import { Search } from "lucide-react";
import Link from "next/link";
import { Dialog } from "@radix-ui/react-dialog";
import OnboardingModal from "@/components/onboarding-modal";
import ImageOverlay from "@/components/image-overlay";
import { VendorSectionSkeleton } from "@/components/skeletons/recommended-for-you-section-skeleton";
import VendorsHomePageSection from "@/components/vendor/vendors-homepage-section";

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
      <main className=" flex w-full flex-col bg-white py-14">
        <div className="flex flex-col bg-white gap-4 md:hidden mb-6">
          <div className="flex gap-2">
            <div className="flex flex-col">
              <ImageFill
                src={`/images/3.png`}
                className=" rounded-br-3xl w-[215px] h-[130px]"
                alt="Picture">
                <div className="bg-black/30 absolute w-full h-full" />
              </ImageFill>
              <div className="p-3">
                <span className="text-2xl font-bold leading-none">{`Thailand’s greatest local markets---all in one place.`}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <ImageFill
                src={`/images/4.png`}
                alt="Picture"
                className="w-[167px] h-[51px] rounded-bl-3xl"
              />
              <ImageFill
                src={`/images/1.png`}
                alt="Picture"
                className="w-[167px] h-[200px] rounded-l-3xl"
              />
            </div>
          </div>
          <div id="SearchBar" className="px-5">
            <Link
              href={`/vendors`}
              className="flex w-full items-center gap-2 rounded-3xl bg-neutral px-3 py-2">
              <Search size={25} color="gray" />
              <input
                className="w-full bg-transparent outline-none ring-0"
                placeholder="markets, shop types, products, etc"
              />
            </Link>
          </div>
          <div className="flex gap-2">
            <ImageFill
              src={`/images/2.png`}
              className="w-[145px] h-[90px] rounded-bl-3xl rounded-tr-3xl shrink-0"
              alt="Picture"
            />
            <ImageFill
              src={`/images/5.png`}
              className="w-full h-[90px] rounded-tl-3xl rounded-br-3xl"
              alt="Picture"
            />
          </div>
        </div>
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
