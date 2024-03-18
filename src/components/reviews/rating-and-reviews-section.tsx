import { Review } from "@/types/types";
import RatingStarIcon from "../icons/rating-star-icon";
import { ReviewsSkeleton } from "../skeletons/reviews-skeleton";
import AspectBar from "./aspect-bar";
import ReviewItem from "./review-card";
import WriteReviewButton from "@/components/reviews/write-review-button";
import { ReviewsProps, getReviews } from "@/server-actions/reviews";

interface RatingAndReviewSectionProps {
  id: string;
  name: string;
  type: "Market" | "Vendor";
  reviews: ReviewsProps;
}

export default async function RatingAndReviewSection({
  id,
  name,
  type = "Market",
  reviews,
}: RatingAndReviewSectionProps) {
  return (
    <div className="mb-5 bg-white" id="RatingsAndReviews">
      <div className="flex justify-between px-5">
        <div className="text-xl font-bold">Ratings and reviews</div>
      </div>

      <div className=" flex flex-col px-5 py-2">
        <div className="mt-4 flex px-2">
          {reviews && reviews.status === 200 && (
            <div className="flex flex-col items-center justify-center">
              <div className="text-center">
                <div className="mr-2 flex items-center leading-tight">
                  <div className="mr-1">
                    <RatingStarIcon size={24} />
                  </div>
                  <div className="text-[32px] font-bold">
                    {reviews?.data.average?.toFixed(2) ?? 0}
                  </div>
                </div>
                <div className="whitespace-nowrap text-sm">{`(${reviews?.data?.total} reviews)`}</div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1">
            {reviews?.data?.reviewAspects.map((aspect, key) => (
              <AspectBar aspect={aspect} key={key} />
            ))}
          </div>
        </div>

        <WriteReviewButton name={name} id={id} type={type} className="mt-10" />

        {reviews && reviews.status === 200 && (
          <div className="mt-10 flex flex-col gap-8">
            {reviews.data?.reviews.map((review, key) => {
              return <ReviewItem review={review} key={key} />;
            })}
          </div>
        )}
        {!reviews && <ReviewsSkeleton />}
      </div>
    </div>
  );
}
