import Link from "next/link";

import { ChevronRight } from "lucide-react";
import { VendorCard } from "./vendor-card";
import { getVendors } from "~/app/_actions/actions";

export const dynamic = "force-dynamic";

interface RecommendedForYouSectionProps {
  marketId: string;
}

export default async function RecommendedForYouSection({
  marketId,
}: RecommendedForYouSectionProps) {
  const vendors = await getVendors({
    marketId: marketId,
  });

  return (
    <div>
      <div className="flex items-center justify-between px-5 ">
        <h1 className="text-xl font-bold">Recommended for you</h1>
        <Link href={`/market/${marketId}/recommendations`}>
          <ChevronRight />
        </Link>
      </div>
      <div className="no-scrollbar mt-4 flex gap-4 overflow-x-auto px-5">
        {!!vendors &&
          vendors.slice(0, 10).map((vendor, index) => {
            return <VendorCard vendor={vendor} key={index} />;
          })}
      </div>
    </div>
  );
}
