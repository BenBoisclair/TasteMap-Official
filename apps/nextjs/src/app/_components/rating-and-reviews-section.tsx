"use client";

import { useQuery } from "@tanstack/react-query";

import fetchMarketReviews from "../api/_actions/fetchMarketReviews";
import AspectBar from "./aspect-bar";
import RatingStarIcon from "./icons/rating-star-icon";
import ReviewItem from "./review-card";
import { ReviewsSkeleton } from "./reviews-skeleton";

interface RatingAndReviewSectionProps {
  id: string;
  type: "Market" | "Vendor";
  handleTabSelect?: (tabname: string) => void;
}

export default function RatingAndReviewSection({
  id,
  type = "Market", // handleTabSelect = () => {},
}: RatingAndReviewSectionProps) {
  const { data: reviewsData, status: reviewStatus } = useQuery({
    queryKey: [type.toLowerCase() + "Reviews", id],
    queryFn: () => fetchMarketReviews({ marketId: id }),
  });

  return (
    <div className="mb-5 mt-2">
      {/* <div className="flex justify-between px-5">
        <h1 className="text-lg font-bold">Ratings and reviews</h1>
        {handleTabSelect && (
          <div onClick={() => handleTabSelect("Reviews")}>
            <span className="material-symbols-outlined">chevron_right</span>
          </div>
        )}
      </div> */}

      <div className="px-5 py-2">
        <div className="mt-4 flex flex-wrap px-2">
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
        {reviewsData && reviewStatus === "success" && (
          <div className="mt-7 flex flex-col gap-6">
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
