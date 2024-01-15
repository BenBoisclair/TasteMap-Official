"use client";
import { Heart } from "lucide-react";
import { favouriteAction } from "~/app/actions";

type FavouriteHeartProps = {
  isFavourite: boolean;
  marketId?: string;
  vendorId?: string;
  color?: string;
};

export default function FavouriteHeart({
  isFavourite,
  marketId,
  vendorId,
  color = "white",
}: FavouriteHeartProps) {
  return (
    <form
      action={favouriteAction.bind(null, {
        marketId: marketId,
        vendorId: vendorId,
      })}
    >
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
