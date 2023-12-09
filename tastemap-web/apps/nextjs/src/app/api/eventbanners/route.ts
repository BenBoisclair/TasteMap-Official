import { db } from "@acme/db";
import { eventBanners } from "@acme/db/schema/schema";

export const GET = async () => {
  try {
    const banners = await db.select().from(eventBanners);
    return Response.json(banners);
  } catch (error) {
    return Response.json(
      { message: "Failed fetching event banners" },
      { status: 404 },
    );
  }
};
