"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import LoadingPage from "~/app/_components/loading-page";
import RatingAndReviewSection from "~/app/_components/rating-and-reviews-section";
import Tabs from "~/app/_components/tabs";
import VendorHeader from "~/app/_components/vendor-header";
import VendorInfoPage from "~/app/_components/vendor-info-page";
import fetchVendor from "~/app/api/_actions/fetchVendor";

export default function Vendor({ params }: { params: { id: string } }) {
  const vendorId = params.id;
  //   const router = useRouter();

  const { data: vendor, status: vendorStatus } = useQuery({
    queryKey: ["vendor", vendorId],
    queryFn: () => fetchVendor({ vendorId }),
  });

  const [activeTab, setActiveTab] = useState<string>("Info");

  const { ref: headerRef, inView } = useInView({
    threshold: 0,
    rootMargin: "-50px",
  });

  const handleTabSelect = (tabName: string) => {
    setActiveTab(tabName);
    if (!inView) {
      window?.scrollTo(0, 380);
    }
  };

  //   const handleBackButton = () => {
  //     router.back();
  //   };

  if (vendorStatus === "pending") {
    return <LoadingPage />;
  }

  if (vendorStatus === "error") {
    return <div>Error</div>;
  }
  return (
    <div>
      <VendorHeader vendor={vendor} inView={inView} headerRef={headerRef} />
      <Tabs
        activeTab={activeTab}
        handleTabSelect={handleTabSelect}
        tabs={["Info", "Reviews"]}
      />
      {activeTab === "Info" && <VendorInfoPage vendor={vendor} />}
      {activeTab === "Reviews" && (
        <RatingAndReviewSection
          id={vendorId}
          type="Vendor"
          name={vendor.name}
          imageUrl={vendor.bannerUrl}
        />
      )}
    </div>
  );
}
