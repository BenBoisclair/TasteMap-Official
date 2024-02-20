import { Heart } from "lucide-react";
import { favouriteAction } from "@/actions/favourites";
import { cn } from "@/utils/cn";

type FavouriteHeartProps = {
  isFavourite: boolean | undefined;
  marketId?: string;
  vendorId?: string;
  color?: string;
  className?: string;
};

export default function FavouriteHeart({
  isFavourite,
  marketId,
  vendorId,
  color = "white",
  className,
}: FavouriteHeartProps) {
  return (
    <form
      action={favouriteAction.bind(null, {
        marketId: marketId,
        vendorId: vendorId,
      })}
      className={cn("z-50", className)}>
      <button type="submit" className=" pointer-events-auto">
        {isFavourite ? (
          <Heart strokeWidth={3} color={color} fill="#EF4E3D" />
        ) : (
          <Heart strokeWidth={3} color={color} />
        )}
      </button>
    </form>
  );
}
