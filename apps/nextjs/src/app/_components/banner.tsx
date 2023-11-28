import Image from "next/image";

import type { Banner } from "~/data/testData";

export function Banner({ banner }: { banner: Banner }) {
  return (
    <div className="relative h-[200px] w-[350px] shrink-0 overflow-hidden rounded-3xl">
      <Image
        src={banner.image}
        alt={banner.name}
        fill={true}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
