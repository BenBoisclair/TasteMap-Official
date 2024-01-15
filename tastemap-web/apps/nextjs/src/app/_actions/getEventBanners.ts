"use server";
import { db } from "@acme/db";
import { eventBanners } from "@acme/db/schema/schema";

export async function getEventBanners() {
  try {
    const banners = await db.select().from(eventBanners);
    return banners;
  } catch (error) {
    console.log(error);
  }
}
