import Section from "@/components/section";
import { Banner } from "./banner";
import { getEventBanners } from "@/server-actions/eventbanners";

export async function BannerSection() {
  const response = await getEventBanners();
  const banners = response?.data;

  if (!banners) return;

  const bannersList = banners?.map((banner) => (
    <Banner banner={banner} key={banner.id} />
  ));

  return (
    <Section className=" bg-[#FFF3D1] rounded-3xl my-6">
      <Section.Title>About TasteMap</Section.Title>
      <Section.Description>
        Taste the local experience with us.
      </Section.Description>
      <Section.Carousel>{bannersList}</Section.Carousel>
    </Section>
  );
}
