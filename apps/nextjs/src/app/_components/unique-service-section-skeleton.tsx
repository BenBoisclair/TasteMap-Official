import { UniqueServiceCardSkeleton } from "./unique-service-card-skeleton";

export const UniqueServiceSectionSkeleton = () => {
  return (
    <div className="flex animate-pulse gap-4">
      <UniqueServiceCardSkeleton className="bg-neutral" />
      <UniqueServiceCardSkeleton className="bg-neutral/70" />
      <UniqueServiceCardSkeleton className="bg-neutral-400/20" />
      <UniqueServiceCardSkeleton className="bg-neutral-800/10" />
    </div>
  );
};
