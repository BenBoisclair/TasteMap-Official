"use client";

import { useQuery } from "@tanstack/react-query";

import type { ReviewsResponse } from "@/types/types";
import fetchAt from "@/utils/fetchAt";
import RatingStarIcon from "../icons/rating-star-icon";
import { ReviewsSkeleton } from "../skeletons/reviews-skeleton";
import AspectBar from "./aspect-bar";
import ReviewItem from "./review-card";
import WriteReviewButton from "@/components/reviews/write-review-button";

interface RatingAndReviewSectionProps {
  id: string;
  name: string;
  imageUrl: string | null;
  type: "market" | "vendor";
}

export default function RatingAndReviewSection({
  id,
  name,
  imageUrl,
  type = "market",
}: RatingAndReviewSectionProps) {
  const { data: reviewsData, status: reviewStatus } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => fetchAt<ReviewsResponse>(`/api/${type}s/${id}/reviews`),
  });

  return (
    <div className="mb-5 bg-white" id="RatingsAndReviews">
      <div className="flex justify-between px-5">
        <div className="text-xl font-bold">Ratings and reviews</div>
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
                  <div className="text-[32px] font-bold">
                    {reviewsData?.average?.toFixed(2) ?? 0}
                  </div>
                </div>
                <div className="whitespace-nowrap text-sm">{`(${reviewsData?.total} reviews)`}</div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1">
            {reviewsData?.reviewAspects.map((aspect, key) => (
              <AspectBar aspect={aspect} key={key} />
            ))}
          </div>
        </div>

        <WriteReviewButton
          name={name}
          id={id}
          imageUrl={imageUrl}
          type={type}
          className="mt-10"
        />

        {reviewsData && reviewStatus === "success" && (
          <div className="mt-10 flex flex-col gap-8">
            {reviewsData?.reviews.map((review, key) => {
              return <ReviewItem review={review} key={key} />;
            })}
          </div>
        )}
        {reviewStatus === "pending" && <ReviewsSkeleton />}
      </div>
    </div>
  );
}
