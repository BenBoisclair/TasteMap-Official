import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  useQuery,
} from "@tanstack/react-query";
import { Market, Vendor } from "~/types/types";
import fetchAt from "~/utils/fetchAt";
import { Metadata } from "next";
import getQueryClient from "~/utils/getQueryClient";
import { db, eq } from "@acme/db";
import { vendor } from "@acme/db/schema/schema";
import RecommendationsUI from "./recommended-ui";
import { getMarket } from "../page";

export const metadata = {
  title: "Recommended Vendors",
  description: "These are the recommended vendors!",
};

export default async function RecommendationsPage({
  params,
}: {
  params: { id: string };
}) {
  const marketId = params.id;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["marketRecommendedVendors", marketId],
    queryFn: () => fetchAt<Vendor[]>(`/api/markets/${marketId}/vendors`),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RecommendationsUI params={{ id: marketId }} />
    </HydrationBoundary>
  );
}
