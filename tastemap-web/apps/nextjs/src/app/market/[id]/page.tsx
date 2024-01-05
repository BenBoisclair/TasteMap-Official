import { HydrationBoundary, dehydrate, useQuery } from "@tanstack/react-query";
import MarketView from "./market-view";
import fetchAt from "~/utils/fetchAt";
import { Market, Tag } from "~/types/types";
import queryClient from "~/utils/queryClient";
import { Metadata } from "next";
import { db } from "@acme/db";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const marketId = params.id;

  const market: Market = await fetch(
    process.env.NEXT_PUBLIC_URL + `/api/markets/${marketId}`
  ).then(res => res.json());

  return {
    title: market.name,
    description: market.about,
    keywords: market.tags.map((tag: Tag) => tag.name),
  };
}

// export async function generateStaticParams() {
//   const markets = await db.query.market.findMany();

//   return (markets as any)
//     .slice(0, 4)
//     .map((market: Market) => ({ id: market.id }));
// }

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
