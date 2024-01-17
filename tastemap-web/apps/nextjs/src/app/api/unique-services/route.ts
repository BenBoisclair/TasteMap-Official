import { db, eq } from "@acme/db";
import { uniqueService } from "@acme/db/schema/schema";

export const GET = async (
  request: Request,
  { params }: { params: { marketId: string } },
) => {
  const marketId = params.marketId;

  const allUniqueServices = db
    .select()
    .from(uniqueService)
    .where(eq(uniqueService.marketId, marketId));

  const data = await allUniqueServices;

  return Response.json(data);
};
