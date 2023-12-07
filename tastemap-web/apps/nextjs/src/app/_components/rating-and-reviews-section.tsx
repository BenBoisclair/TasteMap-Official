"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { MessageSquarePlusIcon } from "lucide-react";
import toast from "react-hot-toast";

import fetchMarketReviews from "../api/_actions/fetchMarketReviews";
import fetchVendorReviews from "../api/_actions/fetchVendorReviews";
import AspectBar from "./aspect-bar";
import RatingStarIcon from "./icons/rating-star-icon";
import ReviewItem from "./review-card";
import { ReviewsSkeleton } from "./reviews-skeleton";
import { WriteReviewModal } from "./write-review-modal";

interface RatingAndReviewSectionProps {
  id: string;
  name: string;
  imageUrl: string;
  type: "Market" | "Vendor";
  handleTabSelect?: (tabname: string) => void;
}

export default function RatingAndReviewSection({
  id,
  name,
  imageUrl,
  type = "Market", // handleTabSelect = () => {},
}: RatingAndReviewSectionProps) {
  const { isSignedIn } = useUser();
  const [writeReviewToggle, setWriteReviewToggle] = useState<boolean>(false);

  const fetchData = type === "Market" ? fetchMarketReviews : fetchVendorReviews;
  const { data: reviewsData, status: reviewStatus } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => fetchData({ id }),
  });

  const openWriteReviewModal = () => {
    if (!isSignedIn) {
      toast.error("Please Sign in to Write Reviews");
      return;
    }
    setWriteReviewToggle(!writeReviewToggle);
  };

  return (
    <>
      <div className="mb-5 mt-2">
        {/* <div className="flex justify-between px-5">
        <h1 className="text-lg font-bold">Ratings and reviews</h1>
        {handleTabSelect && (
          <div onClick={() => handleTabSelect("Reviews")}>
            <span className="material-symbols-outlined">chevron_right</span>
          </div>
        )}
      </div> */}

        <div className=" flex flex-col px-5 py-2">
          <div className="mt-4 flex px-2">
            {reviewsData && reviewStatus === "success" && (
              <div className="flex flex-col items-center justify-center">
                <div className="text-center">
                  <div className="mr-2 flex items-center leading-tight">
                    <div className="mr-1">
                      <RatingStarIcon size={24} />
                    </div>
                    <p className="text-[32px] font-bold">
                      {reviewsData?.average?.toFixed(2) ?? 0}
                    </p>
                  </div>
                  <p className="whitespace-nowrap text-sm">{`(${reviewsData?.total} reviews)`}</p>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1">
              {reviewsData?.reviewAspects.map((aspect, key) => (
                <AspectBar aspect={aspect} key={key} />
              ))}
            </div>
          </div>

          <div className="mt-6 flex">
            <button
              onClick={openWriteReviewModal}
              className="bord flex w-[350px] items-center justify-center gap-1 rounded-3xl bg-yellow py-[10px]"
            >
              <MessageSquarePlusIcon size={22} color="white" />
              <span className="font-bold">Write a review</span>
            </button>
          </div>
          {reviewsData && reviewStatus === "success" && (
            <div className="mt-10 flex flex-col gap-6">
              {reviewsData?.reviews.map((review, key) => {
                return <ReviewItem review={review} key={key} />;
              })}
            </div>
          )}
          {reviewStatus === "pending" && <ReviewsSkeleton />}
        </div>
      </div>
      {writeReviewToggle && (
        <WriteReviewModal
          name={name}
          imageUrl={imageUrl}
          type={type}
          id={id}
          writeReviewToggle={writeReviewToggle}
          setWriteReviewToggle={setWriteReviewToggle}
        />
      )}
    </>
  );
}
