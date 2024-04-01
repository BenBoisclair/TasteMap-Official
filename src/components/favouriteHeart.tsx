"use client";
import { Heart } from "lucide-react";
import { favouriteAction } from "@/server-actions/favourites";
import { cn } from "@/utils/cn";
import { useOptimistic } from "react";

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
  const [optimisticFav, setOptimisticFav] = useOptimistic(
    isFavourite,
    (isFavourite, action: "FAVOURITE" | "UNFAVOURITE") => {
      if (action === "FAVOURITE") {
        return true;
      } else {
        return false;
      }
    }
  );
  return (
    <form
      action={async () => {
        if (optimisticFav) {
          setOptimisticFav("UNFAVOURITE");
          await favouriteAction({
            marketId: marketId,
            vendorId: vendorId,
          });
        } else {
          setOptimisticFav("FAVOURITE");
          await favouriteAction({
            marketId: marketId,
            vendorId: vendorId,
          });
        }
      }}
      className={cn("z-50", className)}>
      <button
        type="submit"
        className=" pointer-events-auto"
        aria-label={optimisticFav ? "Favourite" : "Unfavourite"}>
        {optimisticFav ? (
          <Heart strokeWidth={3} color={color} fill="#EF4E3D" />
        ) : (
          <Heart strokeWidth={3} color={color} />
        )}
      </button>
    </form>
  );
}
