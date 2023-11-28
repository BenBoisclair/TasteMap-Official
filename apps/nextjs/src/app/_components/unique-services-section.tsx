import { uniqueServices } from "~/data/testData";
import UniqueServiceCard from "./unique-service-card";

interface UniqueServicesSectionProps {
  marketId: string;
}

export default function UniqueServicesSection({
  marketId,
}: UniqueServicesSectionProps) {
  return (
    <div id="UniqueServices">
      <h1 className="px-5 text-lg font-bold">Unique Services</h1>
      <div className="no-scrollbar flex gap-4 overflow-x-auto px-5 pt-2">
        {uniqueServices.map((service, index: number) => {
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
        {/* <UniqueServiceItemSkeleton /> */}
      </div>
    </div>
  );
}
