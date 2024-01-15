import { Banner } from "./banner";
import { getEventBanners } from "~/app/_actions/eventbanners";

export async function BannerSection() {
  const banners = await getEventBanners();

  return (
    <div className="no-scrollbar flex gap-4  overflow-x-scroll px-5">
      {!!banners &&
        banners?.map(banner => <Banner banner={banner} key={banner.id} />)}
    </div>
  );
}
