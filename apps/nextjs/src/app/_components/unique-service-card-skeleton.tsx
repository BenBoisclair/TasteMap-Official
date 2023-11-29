import { cn } from "~/utils/cn";

export const UniqueServiceCardSkeleton = ({
  className,
}: {
  className: string;
}) => {
  return (
    <div
      className={cn(`h-[140px] w-[204px] rounded-3xl bg-neutral`, className)}
    />
  );
};
