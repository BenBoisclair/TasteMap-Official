import UniqueServiceCard from "./unique-service-card";
import { getUniqueServices } from "~/app/_actions/actions";

export const dynamic = "force-dynamic";

interface UniqueServicesSectionProps {
  marketId: string;
}

export default async function UniqueServicesSection({
  marketId,
}: UniqueServicesSectionProps) {
  const services = await getUniqueServices(marketId);

  return (
    <div id="UniqueServices">
      <h1 className="px-5 text-xl font-bold">Unique Services</h1>
      <div className="no-scrollbar mt-4 flex gap-1.5 overflow-x-auto px-5">
        {services?.map((service, index: number) => {
          return <UniqueServiceCard service={service} key={index} />;
        })}
      </div>
    </div>
  );
}
