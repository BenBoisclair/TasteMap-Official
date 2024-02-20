import { Tag, Vendor } from "@/types/types";
import VendorView from "./vendor-view";
import { Metadata } from "next";
import { getVendor, getVendors } from "@/actions/vendors";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const vendorId = params.id;

  const vendor = await fetch(
    process.env.NEXT_PUBLIC_URL + `/api/vendors/${vendorId}`
  ).then((res) => res.json());

  return {
    title: vendor.name,
    description: vendor.about,
    keywords: vendor?.tags ?? vendor?.tags?.map((tag: Tag) => tag.name),
  };
}

// export async function generateStaticParams() {
//   const vendors = await getVendors({});

//   return (vendors as any)
//     .slice(0, 4)
//     .map((vendor: Vendor) => ({ id: vendor.id }));
// }

export default async function VendorPage({
  params: { id: vendorId },
}: {
  params: { id: string };
}) {
  const vendor = await getVendor(vendorId);

  if (!vendor) return;
  return <VendorView vendor={vendor} />;
}
