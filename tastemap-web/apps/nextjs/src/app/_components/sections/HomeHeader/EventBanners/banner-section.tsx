"use client";

import { useQuery } from "@tanstack/react-query";

import type { EventBanner } from "~/types/types";
import fetchAt from "~/utils/fetchAt";
import { Banner } from "./banner";

export function BannerSection() {
  const { data: banners, status: bannersStatus } = useQuery({
    queryKey: ["EventBanners"],
    queryFn: () => fetchAt<EventBanner[]>("/api/eventbanners"),
  });

  return (
    <div className="no-scrollbar flex gap-4  overflow-x-scroll px-5">
      {bannersStatus === "success" &&
        banners?.map((banner) => <Banner banner={banner} key={banner.id} />)}
      {bannersStatus === "pending" && (
        <div className="h-[200px] w-[350px] animate-pulse rounded-3xl bg-neutral" />
      )}
    </div>
  );
}
