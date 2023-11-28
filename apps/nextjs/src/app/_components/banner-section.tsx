import { banners } from "~/data/testData";
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
