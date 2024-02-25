"use server";
import { db, eq } from "@/db";
import { VendorOrderInsert, vendorOrder } from "./../db/schema/schema";

interface OrderResponseType {
  data: VendorOrderInsert | null;
  status: string;
}

export const createOrder = async (
  order: VendorOrderInsert
): Promise<OrderResponseType> => {
  try {
    const newOrder = await db
      .insert(vendorOrder)
      .values(order)
      .returning()
      .onConflictDoNothing();
    if (!newOrder) {
      return { data: null, status: "error" };
    }
    return { data: newOrder[0], status: "success" };
  } catch (error) {
    return { data: null, status: "error" };
  }
};

export const getOrder = async (orderId: string) => {
  try {
    const order = await db
      .select()
      .from(vendorOrder)
      .where(eq(vendorOrder.id, orderId));
    if (order.length) {
      return order[0];
    }
    return null;
  } catch (error) {
    return null;
  }
};
