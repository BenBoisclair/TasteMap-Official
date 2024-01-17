import { asc, db, desc, eq, sql } from "@acme/db";
import { review, vendor } from "@acme/db/schema/schema";
import { auth } from "@clerk/nextjs";

export const GET = async (
  request: Request,
  { params }: { params: { marketId: string } }
) => {
  const marketId = params.marketId;
  const { userId } = auth();

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
        userFavourites: {
          columns: {
            userExternalId: true,
          },
        },
      },
      orderBy: [desc(vendor.isVerified), asc(vendor.sequence)],
    })
    .then(async vendors => {
      const vendorsWithReview = await Promise.all(
        vendors.map(async vendor => {
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

          const { userFavourites, ...otherVendorData } = vendor;

          const isFavourite = userFavourites.some(
            favourite => favourite.userExternalId === userId
          );

          return {
            ...vendor,
            ratings,
            tags: vendor?.tags.map(({ tag }) => tag),
            isFavourite: isFavourite,
          };
        })
      );

      return vendorsWithReview;
    })
    .catch(error => {
      console.log(error);
      return Response.json(
        { message: "Vendors not found" },
        { status: 404, statusText: "Vendors not found" }
      );
    });

  return Response.json(allVendors);
};
