"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import EventElements from "~/components/event-elements";
import LoadingPage from "~/components/pages/loading-page";
import RatingAndReviewSection from "~/components/sections/RatingsAndReviews/rating-and-reviews-section";
import Tabs from "~/components/tabs";
import VendorHeader from "~/components/vendor/vendor-header";
import VendorInfoPage from "~/components/vendor/vendor-info-page";
import type { Vendor } from "~/types/types";
import fetchAt from "~/utils/fetchAt";
import { useSearchParams } from "next/navigation";

export default function VendorView({ params }: { params: { id: string } }) {
  const vendorId = params.id;
  const searchParams = useSearchParams();

  const { data: vendor, status } = useQuery({
    queryKey: ["vendor", vendorId],
    queryFn: () => fetchAt<Vendor>(`/api/vendors/${vendorId}`),
  });

  const { ref: headerRef, inView } = useInView({
    threshold: 0,
    rootMargin: "-50px",
  });

  if (status === "pending") {
    return <LoadingPage />;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  const activeTab = searchParams.get("tab");

  return (
    <div className="relative">
      <EventElements />
      <VendorHeader vendor={vendor} inView={inView} headerRef={headerRef} />
      <Tabs inView={inView} tabs={["Info", "Reviews"]} />
      {activeTab === "Info" && <VendorInfoPage vendor={vendor} />}
      {activeTab === "Reviews" && (
        <RatingAndReviewSection
          id={vendorId}
          type="vendor"
          name={vendor.name}
          imageUrl={vendor.bannerUrl ?? ""}
        />
      )}
    </div>
  );
}
