import { asc, db, desc, eq, sql } from "@acme/db";
import { review, vendor } from "@acme/db/schema/schema";

export const GET = async (
  request: Request,
  { params }: { params: { marketId: string } },
) => {
  const marketId = params.marketId;

  const allVendors = await db.query.vendor
    .findMany({
      where: eq(vendor.marketId, marketId),
      with: {
        tags: {
          columns: {
            tagId: false,
            vendorId: false,
          },
          with: {
            tag: {
              columns: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
      orderBy: [desc(vendor.isVerified), asc(vendor.sequence)],
    })
    .then(async (vendors) => {
      const vendorsWithReview = await Promise.all(
        vendors.map(async (vendor) => {
          const aggregationQuery = await db
            .select({
              total: sql<number>`cast(count(${review.id}) as int)`,
              average: sql<number>`cast(avg(${review.rating}) as float)`,
            })
            .from(review)
            .where(eq(review.vendorReviewedID, vendor.id))
            .groupBy(review.vendorReviewedID);

          const ratings =
            aggregationQuery.length > 0 ? aggregationQuery[0] : null;

          return {
            ...vendor,
            ratings,
            tags: vendor?.tags.map(({ tag }) => tag),
          };
        }),
      );

      return vendorsWithReview;
    })
    .catch((error) => {
      console.log(error);
      return Response.json(
        { message: "Vendors not found" },
        { status: 404, statusText: "Vendors not found" },
      );
    });

  return Response.json(allVendors);
};
