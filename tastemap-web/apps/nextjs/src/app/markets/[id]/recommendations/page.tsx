import VendorCardRecommendations from "~/components/sections/RecommendedForYou/vendor-card-recommendations";
import { getVendors } from "~/app/_actions/actions";
import BackButton from "~/components/back-button";

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
      <div className="bg-white">
        <div className="flex items-center px-5 py-4">
          <BackButton />
          <div className="grow text-xl font-bold">Recommended for You</div>
        </div>
      </div>
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
