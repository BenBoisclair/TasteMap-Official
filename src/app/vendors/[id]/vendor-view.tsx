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
import { setVendorId } from "@/hooks/cart-store";

export type OffersType = {
  products: Product[] | undefined;
  promotions: Promotion[] | undefined;
};

export default function VendorView({
  vendor,
  offers,
}: {
  vendor: Vendor;
  offers: OffersType;
}) {
  const searchParams = useSearchParams();

  const { ref: headerRef, inView } = useInView({
    threshold: 0,
    rootMargin: "-50px",
  });

  const activeTab = searchParams.get("tab");

  const tabs = ["Info", "Reviews"];

  if (offers.products?.length) {
    tabs.splice(1, 0, "Offers");
  }

  setVendorId(vendor.id);

  return (
    <div className="relative bg-neutral-200">
      <VendorHeader vendor={vendor} inView={inView} headerRef={headerRef} />
      <Tabs tabs={tabs} />
      {activeTab === "Info" && <VendorInfoPage vendor={vendor} />}
      {activeTab === "Offers" && <VendorOffersPage offers={offers} />}
      {activeTab === "Reviews" && (
        <RatingAndReviewSection
          id={vendor.id}
          type="vendor"
          name={vendor.name}
          imageUrl={`${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL}/storage/v1/object/public/public-assets/vendors/${vendor.id}/banner`}
        />
      )}
    </div>
  );
}
