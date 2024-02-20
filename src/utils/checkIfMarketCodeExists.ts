"use server";

import { db, eq } from "@/db";
import { market } from "@/db/schema/schema";

export default async function checkIfMarketCodeExists(code: string) {
  const doesExists = await db.query.market.findFirst({
    where: eq(market.code, code),
  });
  if (doesExists) {
    return true;
  } else {
    return false;
  }
}
