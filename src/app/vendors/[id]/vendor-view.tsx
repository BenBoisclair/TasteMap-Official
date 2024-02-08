"use client";
import { useInView } from "react-intersection-observer";
import RatingAndReviewSection from "~/components/sections/RatingsAndReviews/rating-and-reviews-section";
import Tabs from "~/components/tabs";
import VendorHeader from "~/components/vendor/vendor-header";
import VendorInfoPage from "~/components/vendor/vendor-info-page";
import type { Vendor } from "~/types/types";
import { useSearchParams } from "next/navigation";

export default function VendorView({ vendor }: { vendor: Vendor }) {
  const searchParams = useSearchParams();

  const { ref: headerRef, inView } = useInView({
    threshold: 0,
    rootMargin: "-50px",
  });

  const activeTab = searchParams.get("tab");

  return (
    <div className="relative bg-neutral-200">
      <VendorHeader vendor={vendor} inView={inView} headerRef={headerRef} />
      <Tabs inView={inView} tabs={["Info", "Reviews"]} />
      {activeTab === "Info" && <VendorInfoPage vendor={vendor} />}
      {activeTab === "Reviews" && (
        <RatingAndReviewSection
          id={vendor.id}
          type="vendor"
          name={vendor.name}
          imageUrl={vendor.bannerUrl ?? ""}
        />
      )}
    </div>
  );
}
