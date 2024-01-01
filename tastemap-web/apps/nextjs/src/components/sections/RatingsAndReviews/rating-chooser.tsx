import React, { useState } from "react";

import { cn } from "~/utils/cn";
import RatingStarIcon from "../../icons/rating-star-icon";

const RatingChooser = ({
  setRating,
  rating,
  size = 32,
  className = "",
}: {
  setRating: (rating: number) => void;
  rating: number;
  size?: number;
  className?: string;
}) => {
  const [hover, setHover] = useState(0);

  const STAR_COUNT = ["1", "2", "3", "4", "5"];

  return (
    <div className={cn(`flex gap-3`, className)}>
      {STAR_COUNT.map((_, index) => {
        const ratingValue = index + 1;

        return (
          <RatingStarIcon
            key={ratingValue}
            size={size}
            color={(hover || rating) >= ratingValue ? "yellow" : "gray"}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(rating)}
            onClick={() => setRating(ratingValue)}
            className=" cursor-pointer"
          />
        );
      })}
    </div>
  );
};

export default RatingChooser;
