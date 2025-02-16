"use client";
import { useInView } from "react-intersection-observer";
import RatingAndReviewSection from "@/components/reviews/rating-and-reviews-section";
import Tabs from "@/components/tabs";
import VendorHeader from "@/components/vendor/vendor-header";
import VendorInfoPage from "@/components/vendor/vendor-info-page";
import type { Vendor } from "@/types/types";
import { useSearchParams } from "next/navigation";
import { Product, Promotion, product } from "@/db/schema/schema";
import VendorOffersPage from "@/components/vendor/vendor-offers-page";
import { initializeVendor } from "@/hooks/cart-store";
import { ReviewsProps } from "@/server-actions/reviews";
import { useEffect } from "react";

export type OffersType = {
  products: Product[] | undefined;
  promotions: Promotion[] | undefined;
};

export default function VendorView({
  vendor,
  offers,
  reviews,
}: {
  vendor: Vendor;
  offers: OffersType;
  reviews: ReviewsProps;
}) {
  const searchParams = useSearchParams();

  const { ref: headerRef, inView } = useInView({
    threshold: 0,
    rootMargin: "-50px",
  });

  const activeTab = searchParams.get("tab");

  const tabs = ["Info", "Reviews"];
  if (offers.products?.length) {
    tabs.unshift("Menu");
  }

  useEffect(() => {
    initializeVendor(vendor.id);
  }, [vendor.id]);

  return (
    <div className="relative bg-neutral-200">
      <VendorHeader vendor={vendor} inView={inView} headerRef={headerRef} />
      <Tabs tabs={tabs} />
      {activeTab === "Info" && <VendorInfoPage vendor={vendor} />}
      {activeTab === "Menu" && <VendorOffersPage offers={offers} />}
      {activeTab === "Reviews" && (
        <RatingAndReviewSection
          id={vendor.id}
          type="Vendor"
          name={vendor.name}
          reviews={reviews}
        />
      )}
    </div>
  );
}
