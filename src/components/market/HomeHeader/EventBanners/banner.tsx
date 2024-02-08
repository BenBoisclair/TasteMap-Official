import Image from "next/image";

import type { EventBanner } from "@/types/types";

export function Banner({ banner }: { banner: EventBanner }) {
  return (
    <div className="relative h-[195px] w-[325px] shrink-0 overflow-hidden rounded-3xl">
      <Image
        src={banner.imageUrl ?? ""}
        alt={banner?.name ?? "Event Banner"}
        fill={true}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={true}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
