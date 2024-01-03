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
import VendorUI from "./vendor-ui";

export async function getVendor(vendorId: string) {
  "use server";
  const vendorData = await db.query.vendor.findFirst({
    where: eq(vendor.id, vendorId),
  });
  return vendorData;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const vendorId = params.id;
  const vendor = await getVendor(vendorId);

  if (!vendor) {
    return {
      title: `Not Found`,
      description: `The page you're looking for doesn't exist`,
    };
  }

  return {
    title: `${vendor.name}`,
    description: `${vendor.about}`,
  };
}

export default async function VendorPage({
  params,
}: {
  params: { id: string };
}) {
  const vendorId = params.id;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["vendor", vendorId],
    queryFn: () => fetchAt<Vendor>(`/api/vendors/${vendorId}`),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VendorUI params={{ id: vendorId }} />
    </HydrationBoundary>
  );
}
