"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, MessageSquarePlusIcon } from "lucide-react";

import type { ReviewsResponse } from "~/types/types";
import fetchAt from "~/utils/fetchAt";
import RatingStarIcon from "../../icons/rating-star-icon";
import { ReviewsSkeleton } from "../../skeletons/reviews-skeleton";
import AspectBar from "./aspect-bar";
import ReviewItem from "./review-card";
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
  type = "Market",
  handleTabSelect,
}: RatingAndReviewSectionProps) {
  const { isSignedIn } = useUser();
  const [writeReviewToggle, setWriteReviewToggle] = useState<boolean>(false);
  const router = useRouter();

  const { data: reviewsData, status: reviewStatus } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => fetchAt<ReviewsResponse>(`/api/${type}s/${id}/reviews`),
  });

  const openWriteReviewModal = () => {
    if (!isSignedIn) {
      router.push("/auth/sign-in");
      return;
    }
    setWriteReviewToggle(!writeReviewToggle);
  };

  return (
    <>
      <div className="mb-5 mt-10" id="RatingsAndReviews">
        <div className="flex justify-between px-5">
          <h1 className="text-lg font-bold">Ratings and reviews</h1>
          {handleTabSelect && (
            <button id="Back Button" onClick={() => handleTabSelect("Reviews")}>
              <ChevronRight />
            </button>
          )}
        </div>

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
              id="Write a Review"
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
