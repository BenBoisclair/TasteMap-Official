import { VendorCard } from "../RecommendedForYou/vendor-card";
import { getVendors } from "~/app/_actions/actions";

export const dynamic = "force-dynamic";

export default async function VendorsHomePageSection({
  name,
  tag,
}: {
  name: string;
  tag: string;
}) {
  const vendors = await getVendors({ tag: tag });

  return (
    <div className="bg-white rounded-3xl py-5">
      <div className="flex items-center justify-between px-5 ">
        <h1 className="text-xl font-bold">{name}</h1>
      </div>
      <div className="no-scrollbar mt-4 flex gap-4 overflow-x-auto px-5">
        {!!vendors &&
          vendors?.slice(0, 20).map((vendor, index) => {
            return (
              <VendorCard toggleMarketName={true} vendor={vendor} key={index} />
            );
          })}
      </div>
    </div>
  );
}
