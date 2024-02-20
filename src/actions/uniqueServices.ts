import { db, eq } from "@/db";
import { uniqueService } from "@/db/schema/schema";

export async function getUniqueServices(marketId: string) {
  const allUniqueServices = await db
    .select()
    .from(uniqueService)
    .where(eq(uniqueService.marketId, marketId));

  return allUniqueServices;
}
