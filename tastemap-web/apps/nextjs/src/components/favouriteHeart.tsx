"use client";
import { useMutation } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import fetchAt from "~/utils/fetchAt";
import queryClient from "~/utils/queryClient";

type FavouriteHeartProps = {
  isFavourite: boolean;
  marketId?: string;
  vendorId?: string;
};

export default function FavouriteHeart({
  isFavourite,
  marketId,
  vendorId,
}: FavouriteHeartProps) {
  const like = useMutation({
    mutationFn: async () =>
      await fetchAt("/api/favourites", "POST", {
        body: {
          marketId: marketId ? marketId : undefined,
          vendorId: vendorId ? vendorId : undefined,
        },
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["allMarkets"] });
    },
  });

  return (
    <>
      <button
        disabled={like.isPending}
        onClick={() => {
          like.mutate();
        }}
      >
        {isFavourite ? (
          <Heart strokeWidth={3} fill="red" />
        ) : (
          <Heart strokeWidth={3} />
        )}
      </button>
    </>
  );
}
