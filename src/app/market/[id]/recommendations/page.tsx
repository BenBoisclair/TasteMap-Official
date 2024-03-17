import VendorCardRecommendations from "@/components/recommendations/vendor-card-recommendations";
import { getVendors } from "@/server-actions/vendors";
import BackButton from "@/components/back-button";
import NavbarBack from "@/components/navbar/nav-bar-back";

export default async function RecommendationsPage({
  params,
}: {
  params: { id: string };
}) {
  const marketId = params.id;
  const vendors = await getVendors({ marketId: marketId });

  if (!vendors) return;

  return (
    <div className="h-full bg-neutral">
      <NavbarBack title="Recommended for you" />
      <div className="z-10 flex flex-col gap-2 bg-transparent">
        {vendors?.map((vendor, index) => (
          <VendorCardRecommendations
            classNames={index === 0 ? "rounded-t-none" : ""}
            vendor={vendor}
            key={vendor.id}
          />
        ))}
      </div>
    </div>
  );
}
