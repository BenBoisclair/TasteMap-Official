import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Tag, Vendor } from "~/types/types";
import fetchAt from "~/utils/fetchAt";
import { queryClient } from "~/utils/queryClient";
import VendorView from "./vendor-view";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const vendorId = params.id;

  const vendor = await fetch(
    process.env.NEXT_PUBLIC_URL + `/api/vendors/${vendorId}`
  ).then(res => res.json());

  return {
    title: vendor.name,
    description: vendor.about,
    // keywords: vendor.tags.map((tag: Tag) => tag.name),
  };
}

export async function generateStaticParams() {
  const vendor = await fetch(process.env.NEXT_PUBLIC_URL + `/api/vendors`).then(
    res => res.json()
  );

  return vendor.map((vendor: Vendor) => ({ vendorId: vendor.id }));
}

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
