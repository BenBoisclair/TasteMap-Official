import { getVendors } from "@/actions/vendors";
import { VendorCard } from "./vendor-card";
import Section from "@/components/section";

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

  if (!vendors) return;

  return (
    <Section>
      <Section.Title link={`/market/${marketId}/recommendations`}>
        Recommended for you
      </Section.Title>

      <div className="no-scrollbar mt-4 flex gap-4 overflow-x-auto px-5">
        {vendors.slice(0, 10).map((vendor, index) => {
          return <VendorCard vendor={vendor} key={index} />;
        })}
      </div>
    </Section>
  );
}
