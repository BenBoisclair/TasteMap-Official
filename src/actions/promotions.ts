"use server";

import { db, desc, eq } from "@/db";
import { promotion } from "@/db/schema/schema";

export const getPromotions = async (vendorId: string) => {
  try {
    const promotions = await db
      .select()
      .from(promotion)
      .where(eq(promotion.vendorId, vendorId))
      .orderBy(desc(promotion.price));

    if (!promotions) {
      return { data: [], status: "failed" };
    }

    return { data: promotions };
  } catch (error) {
    return { data: [], status: "failed" };
  }
};
