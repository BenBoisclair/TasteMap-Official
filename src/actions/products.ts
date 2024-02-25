"use server";

import { asc, db, desc, eq } from "@/db";
import { product } from "@/db/schema/schema";

export const getProducts = async (vendorId: string) => {
  try {
    const products = await db
      .select()
      .from(product)
      .where(eq(product.vendorId, vendorId))
      .orderBy(desc(product.price));

    if (!product) {
      return { data: [], status: "failed" };
    }

    return { data: products };
  } catch (error) {
    return { data: [], status: "failed" };
  }
};
