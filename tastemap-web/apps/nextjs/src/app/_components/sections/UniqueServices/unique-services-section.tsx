"use client";

import { useQuery } from "@tanstack/react-query";

import type { UniqueService } from "~/types/types";
import fetchAt from "~/utils/fetchAt";
import { UniqueServiceSectionSkeleton } from "../../skeletons/unique-service-section-skeleton";
import UniqueServiceCard from "./unique-service-card";

interface UniqueServicesSectionProps {
  marketId: string;
}

export default function UniqueServicesSection({
  marketId,
}: UniqueServicesSectionProps) {
  const { data: services, status: servicesStatus } = useQuery({
    queryKey: ["UniqueServices", marketId],
    queryFn: () =>
      fetchAt<UniqueService[]>(`/api/markets/${marketId}/unique-services`),
  });

  if (servicesStatus === "success" && (!services || services.length === 0)) {
    return null; // Don't render the section if there are no services
  }

  return (
    <div id="UniqueServices">
      <h1 className="px-5 text-lg font-bold">Unique Services</h1>
      <div className="no-scrollbar flex gap-1.5 overflow-x-auto px-5 pt-2">
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
