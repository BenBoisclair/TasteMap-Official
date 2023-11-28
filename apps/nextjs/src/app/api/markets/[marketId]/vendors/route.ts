import { db, eq } from "@acme/db";
import { vendor } from "@acme/db/schema/schema";

export const GET = async (
  request: Request,
  { params }: { params: { marketId: string } },
) => {
  const marketId = params.marketId;

  const allVendors = db
    .select()
    .from(vendor)
    .where(eq(vendor.marketId, marketId));

  const data = await allVendors;

  return Response.json(data);
};
