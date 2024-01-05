import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Vendor } from "~/types/types";
import fetchAt from "~/utils/fetchAt";
import { queryClient } from "~/utils/queryClient";
import VendorView from "./vendor-view";

export default async function VendorPage({
  params: { id: vendorId },
}: {
  params: { id: string };
}) {
  await queryClient.prefetchQuery({
    queryKey: ["vendor", vendorId],
    queryFn: () => fetchAt<Vendor>(`/api/vendors/${vendorId}`),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VendorView params={{ id: vendorId }} />
    </HydrationBoundary>
  );
}
