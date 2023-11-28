import RatingStarIcon from "./icons/rating-star-icon";

export function Ratings({
  average,
  total,
}: {
  average: number;
  total: number;
}) {
  return (
    <div className="flex items-center gap-1">
      <RatingStarIcon />
      <span className="text-sm font-medium">{`${average.toFixed(
        1,
      )} (${total})`}</span>
    </div>
  );
}
