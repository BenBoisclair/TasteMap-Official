import Section from "@/components/section";
import { VendorCard } from "../recommendations/vendor-card";
import { getVendors } from "@/server-actions/vendors";

export default async function VendorsHomePageSection({
  name,
  tag,
}: {
  name: string;
  tag: string;
}) {
  const vendors = await getVendors({ tag: tag });
  const vendorsList = vendors?.slice(0, 20).map((vendor, index) => {
    return <VendorCard toggleMarketName={true} vendor={vendor} key={index} />;
  });

  if (!vendors) return null;

  return (
    <Section>
      <Section.Title>{name}</Section.Title>
      <Section.Carousel gap={4}>{vendorsList}</Section.Carousel>
    </Section>
  );
}
