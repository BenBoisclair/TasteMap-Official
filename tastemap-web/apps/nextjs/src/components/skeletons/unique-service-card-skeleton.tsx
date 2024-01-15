import { cn } from "~/utils/cn";

export const UniqueServiceCardSkeleton = ({
  className,
}: {
  className: string;
}) => {
  return (
    <div
      className={cn(`h-[160px] w-[210px] rounded-3xl bg-neutral`, className)}
    />
  );
};
