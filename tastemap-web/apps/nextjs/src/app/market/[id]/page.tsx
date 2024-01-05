import { HydrationBoundary, dehydrate, useQuery } from "@tanstack/react-query";
import MarketView from "./market-view";
import fetchAt from "~/utils/fetchAt";
import { Market } from "~/types/types";
import { queryClient } from "~/utils/queryClient";

export default async function MarketPage({
  params: { id: marketId },
}: {
  params: { id: string };
}) {
  await queryClient.prefetchQuery({
    queryKey: ["market", marketId],
    queryFn: () => fetchAt<Market>(`/api/markets/${marketId}`),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MarketView params={{ id: marketId }} />
    </HydrationBoundary>
  );
}
