"use server";
import { db } from "@/db";
import { eventBanners } from "@/db/schema/schema";

export async function getEventBanners() {
  try {
    const banners = await db.select().from(eventBanners);
    return banners;
  } catch (error) {
    console.log(error);
  }
}
