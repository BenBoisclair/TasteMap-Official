import { banners } from "~/types/types";
import { Banner } from "./banner";

export function BannerSection() {
  return (
    <div className="no-scrollbar flex gap-2  overflow-x-scroll px-5">
      {banners.map((banner) => (
        <Banner banner={banner} key={banner.id} />
      ))}
    </div>
  );
}
