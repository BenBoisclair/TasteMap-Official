import Image from "next/image";

import type { EventBanner } from "~/types/types";

export function Banner({ banner }: { banner: EventBanner }) {
  return (
    <div className="relative h-[190px] w-[320px] shrink-0 overflow-hidden rounded-3xl">
      <Image
        src={banner.imageUrl ?? ""}
        alt={banner?.name ?? "Event Banner"}
        fill={true}
        priority={true}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
