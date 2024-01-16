import { Banner } from "./banner";
import { getEventBanners } from "~/app/_actions/eventbanners";

export async function BannerSection() {
  const banners = await getEventBanners();

  if (!banners) return;

  return (
    <section className="no-scrollbar flex gap-4  overflow-x-scroll px-5">
      {banners?.map(banner => <Banner banner={banner} key={banner.id} />)}
    </section>
  );
}
