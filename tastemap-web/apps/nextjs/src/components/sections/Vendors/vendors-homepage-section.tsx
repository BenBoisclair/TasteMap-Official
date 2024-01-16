import Section from "~/components/section";
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

  if (!vendors) return;

  return (
    <Section>
      <Section.Title>{name}</Section.Title>
      <Section.Carousel gap={4}>
        {vendors?.slice(0, 20).map((vendor, index) => {
          return (
            <VendorCard toggleMarketName={true} vendor={vendor} key={index} />
          );
        })}
      </Section.Carousel>
    </Section>
  );
}
