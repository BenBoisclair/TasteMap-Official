import Section from "@/components/section";
import UniqueServiceCard from "./unique-service-card";
import { getUniqueServices } from "@/actions/uniqueServices";

export const dynamic = "force-dynamic";

interface UniqueServicesSectionProps {
  marketId: string;
}

export default async function UniqueServicesSection({
  marketId,
}: UniqueServicesSectionProps) {
  const services = await getUniqueServices(marketId);

  return (
    <Section>
      <Section.Title>Unique Services</Section.Title>
      <Section.Carousel gap={2}>
        {services?.map((service, index: number) => {
          return <UniqueServiceCard service={service} key={index} />;
        })}
      </Section.Carousel>
    </Section>
  );
}
