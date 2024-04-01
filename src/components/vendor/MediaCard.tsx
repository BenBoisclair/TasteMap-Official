"use client";
import { Media, Vendor } from "@/types/types";
import ImageFill from "../image-fill";

export const MediaCard = ({
  media,
  vendor,
}: {
  media: Media;
  vendor: Vendor;
}) => {
  return (
    <ImageFill
      src={`https://adlvkgocidkmifehftjz.supabase.co/storage/v1/object/public/public-assets/markets/${vendor.marketId}/vendors/${vendor.id}/media/${media.id}`}
      alt="Media"
      className="w-[260px] h-[180px] rounded-3xl"
    />
  );
};
