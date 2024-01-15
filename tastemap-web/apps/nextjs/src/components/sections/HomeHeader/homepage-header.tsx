import { Suspense } from "react";
import { BannerSection } from "./EventBanners/banner-section";
import BannerSectionSkeleton from "./EventBanners/banner-section-skeleton";

export function HomePageHeader() {
  return (
    <div className="mt-12 w-full rounded-b-3xl bg-white py-5">
      <Suspense fallback={<BannerSectionSkeleton />}>
        <BannerSection />
      </Suspense>
    </div>
  );
}
