import React from "react";

import { UniqueServiceCardSkeleton } from "./unique-service-card-skeleton";

export const UniqueServiceSectionSkeleton = () => {
  return (
    <div id="UniqueServices">
      <h1 className="px-5 text-xl font-bold">Unique Services</h1>
      <div className="no-scrollbar mt-4 flex gap-1.5 overflow-x-auto px-5">
        <UniqueServiceCardSkeleton className="bg-neutral shrink-0" />
        <UniqueServiceCardSkeleton className="bg-neutral/70 shrink-0" />
        <UniqueServiceCardSkeleton className="bg-neutral-400/20 shrink-0" />
        <UniqueServiceCardSkeleton className="bg-neutral-800/10 shrink-0" />
      </div>
    </div>
  );
};
