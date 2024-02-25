import VendorView from "./vendor-view";
import { Metadata } from "next";
import { getVendor } from "@/actions/vendors";
import { getProducts } from "@/actions/products";
import ResetCart from "@/components/ResetCart";
import { getPromotions } from "@/actions/promotions";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const vendorId = params.id;

  const vendor = await getVendor(vendorId);

  if (!vendor)
    return {
      title: "Vendor not found",
      description: "Vendor not found",
    };

  return {
    title: vendor.name,
    description: vendor.about,
  };
}

export default async function VendorPage({
  params: { id: vendorId },
}: {
  params: { id: string };
}) {
  const vendor = await getVendor(vendorId);
  const products = await getProducts(vendorId);
  const promotions = await getPromotions(vendorId);

  if (!vendor) return;
  return (
    <>
      <ResetCart vendorId={vendorId} />
      <VendorView
        vendor={vendor}
        offers={{ products: products?.data, promotions: promotions?.data }}
      />
    </>
  );
}
