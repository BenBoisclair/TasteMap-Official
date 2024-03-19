"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

import type { Review } from "@/types/types";
import RatingStarIcon from "../icons/rating-star-icon";
import { KebabMenu } from "./kebab-menu";
import { getUsername } from "@/server-actions/user";
import ImageFill from "../image-fill";

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

  // const formattedDate = formatDate(review.createdAt);
  const firstLetter = review?.author?.username?.charAt(0);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {review?.author?.imageUrl ? (
            <ImageFill
              src={review.author.imageUrl}
              alt="User Image"
              className="rounded-full h-[42px] w-[42px] mr-2"
            />
          ) : (
            <div
              className={`mr-2 flex h-[42px] w-[42px] items-center justify-center rounded-full bg-gradient-to-b from-yellow from-40% to-orange font-bold`}>
              <span className="text-lg text-white">{firstLetter}</span>
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-lg font-bold">{`${review.author.username}`}</span>
            <span className="text-sm">{review.createdAt?.toDateString()}</span>
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
      {/* <div className="flex mt-3 items-center">
        <div className="material-symbols-outlined text-xs mr-2">thumb_up</div>
        <span className="text-xs">Helpful?</span>
      </div> */}
    </div>
  );
};

export default ReviewItem;
