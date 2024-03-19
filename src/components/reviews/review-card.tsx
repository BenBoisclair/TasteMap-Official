"use client";
import { useUser } from "@clerk/nextjs";

import type { Review } from "@/types/types";
import RatingStarIcon from "../icons/rating-star-icon";
import { KebabMenu } from "./kebab-menu";
import ImageFill from "../image-fill";
import formatDate from "@/utils/formatDate";

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
        />
      );
    }
    return stars;
  };

  const colors = ["yellow", "orange", "green", "blue"];

  const formattedDate = formatDate(review.createdAt as Date);
  const firstLetter = review?.author?.username?.charAt(1).toUpperCase();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* {review?.author?.imageUrl ? (
            <ImageFill
              src={review.author.imageUrl}
              alt="User Image"
              className="rounded-full h-[42px] w-[42px] mr-2"
            />
          ) : ( */}
          <div
            className={`mr-2 flex h-[42px] w-[42px] items-center justify-center rounded-full bg-gradient-to-b from-yellow from-40% to-orange font-bold`}>
            <span className="text-lg text-white">{firstLetter}</span>
          </div>
          {/* )} */}
          <div className="flex flex-col">
            <span className="text-lg font-bold">{`${review.author.username}`}</span>
            <span className="text-sm">{formattedDate}</span>
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
      <div className="mt-3 font-medium text-[#333]">{review.content}</div>
    </div>
  );
};

export default ReviewItem;
