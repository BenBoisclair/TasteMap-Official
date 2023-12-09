import type { EventBanner } from "~/types/types";

const fetchEventBanners = async (): Promise<EventBanner[]> => {
  const response = await fetch(`/api/eventbanners`);
  if (!response.ok) {
    throw new Error(`Error fetching event banners`);
  }
  return response.json() as Promise<EventBanner[]>;
};

export default fetchEventBanners;
