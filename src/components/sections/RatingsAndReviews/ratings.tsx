import { cn } from "@/utils/cn";
import RatingStarIcon from "../../icons/rating-star-icon";

export function Ratings({
  average = 0,
  total = 0,
  size = "default",
}: {
  average?: number;
  total?: number;
  size?: "default" | "small";
}) {
  let starSize = 0;

  switch (size) {
    case "small":
      starSize = 10;
      break;
    default:
      starSize = 14;
  }
  return (
    <div className="flex items-center gap-1">
      <RatingStarIcon size={starSize} />
      <div
        className={cn("text-sm font-medium", {
          "text-sm": size === "default",
          "text-2xs": size === "small",
        })}>{`${average?.toFixed(1)} (${total})`}</div>
    </div>
  );
}
