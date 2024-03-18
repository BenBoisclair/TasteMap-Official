import VendorView from "./vendor-view";
import { Metadata } from "next";
import { getVendor } from "@/server-actions/vendors";
import { getProducts } from "@/server-actions/products";
import ResetCart from "@/hooks/reset-cart";
import { getPromotions } from "@/server-actions/promotions";
import { getReviews } from "@/server-actions/reviews";

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
  const vendorData = getVendor(vendorId);
  const productsData = getProducts(vendorId);
  const promotionsData = getPromotions(vendorId);
  const reviewsData = getReviews(vendorId, "Vendor");

  const [vendor, products, promotions, reviews] = await Promise.all([
    vendorData,
    productsData,
    promotionsData,
    reviewsData,
  ]);

  if (!vendor) return;
  return (
    <>
      <ResetCart vendorId={vendorId} />
      <VendorView
        vendor={vendor}
        offers={{ products: products?.data, promotions: promotions?.data }}
        reviews={reviews}
      />
    </>
  );
}
