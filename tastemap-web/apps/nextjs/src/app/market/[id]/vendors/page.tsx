import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import queryClient from "~/utils/queryClient";
import MarketVendorsView from "./market-vendors-view";
import fetchAt from "~/utils/fetchAt";
import { Vendor } from "~/types/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search in Market",
};

export default async function MarketVendorsPage({
  params,
}: {
  params: { id: string };
}) {
  const marketId = params.id;
  await queryClient.prefetchQuery({
    queryKey: ["allVendors", { marketId: marketId }],
    queryFn: () => fetchAt<Vendor[]>(`/api/markets/${marketId}/vendors`),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MarketVendorsView params={{ id: marketId }} />
    </HydrationBoundary>
  );
}
