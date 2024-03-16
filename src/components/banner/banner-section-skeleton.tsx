export default function BannerSectionSkeleton() {
  return (
    <div className="flex px-5 gap-3 overflow-auto no-scrollbar">
      <div className="h-[200px] w-[350px] animate-pulse rounded-3xl bg-neutral" />
      <div className="h-[200px] w-[350px] animate-pulse rounded-3xl bg-neutral" />
      <div className="h-[200px] w-[350px] animate-pulse rounded-3xl bg-neutral" />
    </div>
  );
}
