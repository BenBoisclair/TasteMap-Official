import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  useQuery,
} from "@tanstack/react-query";
import { Market } from "~/types/types";
import fetchAt from "~/utils/fetchAt";
import MarketUI from "./market-ui";
import { Metadata } from "next";
import getQueryClient from "~/utils/getQueryClient";
import { db, eq } from "@acme/db";
import { market } from "@acme/db/schema/schema";

export async function getMarket(marketId: string) {
  "use server";
  const marketData = await db.query.market.findFirst({
    where: eq(market.id, marketId),
  });
  return marketData;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const marketId = params.id;
  const market = await getMarket(marketId);

  if (!market) {
    return {
      title: `Not Found`,
      description: `The page you're looking for doesn't exist`,
    };
  }

  return {
    title: `${market.name}`,
    description: `${market.about}`,
  };
}

export default async function MarketPage({
  params,
}: {
  params: { id: string };
}) {
  const marketId = params.id;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["market", marketId],
    queryFn: () => fetchAt<Market>(`/api/markets/${marketId}`),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MarketUI params={{ id: marketId }} />
    </HydrationBoundary>
  );
}
