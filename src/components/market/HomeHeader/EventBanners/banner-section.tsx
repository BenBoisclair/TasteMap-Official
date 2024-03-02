import { Banner } from "./banner";
import { getEventBanners } from "@/actions/eventbanners";

export async function BannerSection() {
  const response = await getEventBanners();
  const banners = response?.data;

  if (!banners) return;

  return (
    <section className="no-scrollbar flex gap-4  overflow-x-scroll px-5">
      {banners?.map((banner) => <Banner banner={banner} key={banner.id} />)}
    </section>
  );
}
