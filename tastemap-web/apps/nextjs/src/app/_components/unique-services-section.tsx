import { useQuery } from "@tanstack/react-query";

import fetchUniqueServices from "../api/_actions/fetchUniqueServices";
import UniqueServiceCard from "./unique-service-card";
import { UniqueServiceSectionSkeleton } from "./unique-service-section-skeleton";

interface UniqueServicesSectionProps {
  marketId: string;
}

export default function UniqueServicesSection({
  marketId,
}: UniqueServicesSectionProps) {
  const { data: services, status: servicesStatus } = useQuery({
    queryKey: ["UniqueServices", marketId],
    queryFn: () => fetchUniqueServices({ marketId }),
  });

  if (servicesStatus === "success" && (!services || services.length === 0)) {
    return null; // Don't render the section if there are no services
  }

  return (
    <div id="UniqueServices">
      <h1 className="px-5 text-lg font-bold">Unique Services</h1>
      <div className="no-scrollbar flex gap-4 overflow-x-auto px-5 pt-2">
        {services?.map((service, index: number) => {
          return (
            <div key={index}>
              {/* <Link
                href={`/market/${market.id}/services?page=${index}`}
                scroll={false}> */}
              <UniqueServiceCard service={service} key={service.id} />
              {/* </Link> */}
            </div>
          );
        })}
        {servicesStatus === "pending" && <UniqueServiceSectionSkeleton />}
      </div>
    </div>
  );
}
