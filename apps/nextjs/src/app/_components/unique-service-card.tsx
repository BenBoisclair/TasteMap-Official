import Image from "next/image";

import type { UniqueService } from "~/types/types";

interface UniqueServiceCardProps {
  service: UniqueService;
}

const UniqueServiceCard = ({ service }: UniqueServiceCardProps) => {
  return (
    <div className="relative h-[140px] w-[204px] flex-shrink-0 rounded-3xl text-white">
      <Image
        src={service.imageUrl || `https://placehold.co/600x400/png`}
        fill={true}
        style={{
          objectFit: "cover",
        }}
        alt={"ServiceName"}
        className="rounded-3xl"
      />
      <div className="overlay absolute inset-0  overflow-hidden rounded-3xl"></div>
      <div id="ServiceInfo" className="absolute bottom-0 w-full px-4 py-3">
        <div>
          <p className="truncate font-bold">{service.name}</p>
        </div>
        {/* {service.openingHours.length > 0 && (
          <p className="text-2xs font-medium">{`${service.openingHours[0].openHour} - ${service.openingHours[0].closeHour} • ${service.openingHours[0].closeHour}`}</p>
        )} */}
        <p className="text-2xs font-medium">
          {service.price <= 0 ? "Free" : service.price + " baht"}
        </p>
      </div>
    </div>
  );
};

export default UniqueServiceCard;
