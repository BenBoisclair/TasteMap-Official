import React from "react";
import { useUser } from "@clerk/nextjs";

import type { Review } from "~/types/types";
import formatDate from "~/utils/formatDate";
import RatingStarIcon from "./icons/rating-star-icon";
import { KebabMenu } from "./kebab-menu";

interface ReviewItemProps {
  review: Review;
}

const ReviewItem = ({ review }: ReviewItemProps) => {
  const { isSignedIn, user } = useUser();
  const renderStars = (count: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <RatingStarIcon
          color={i < count ? "yellow" : "gray"}
          size={15}
          key={i}
        />,
      );
    }
    return stars;
  };

  const formattedDate = formatDate(review.createdAt);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div
            className={`mr-2 flex h-[35px] w-[35px] items-center justify-center rounded-full bg-yellow font-bold`}
          >
            <span className="text-white ">U</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold">{`${review.author.firstName} ${review.author.lastName}`}</span>
            <span className="text-xs">{formattedDate}</span>
          </div>
        </div>
        {isSignedIn && review.authorId === user.id && (
          <KebabMenu
            reviewId={review.id}
            businessId={
              review.marketReviewedID ?? review.vendorReviewedID ?? ""
            }
          />
        )}
      </div>
      <div className="mt-2 flex gap-0.5">{renderStars(review.rating)}</div>
      <div className="mt-3 text-xs">{review.content}</div>
      {/* <div className="flex mt-3 items-center">
        <div className="material-symbols-outlined text-xs mr-2">thumb_up</div>
        <span className="text-xs">Helpful?</span>
      </div> */}
    </div>
  );
};

export default ReviewItem;
