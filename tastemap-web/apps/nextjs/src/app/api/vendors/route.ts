import { asc, db, desc, eq, sql } from "@acme/db";
import { review, tag, vendor } from "@acme/db/schema/schema";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const params = request.nextUrl.searchParams;
  const searchTag = params.get("tag");
  const allVendors = await db.query.vendor
    .findMany({
      with: {
        market: {
          columns: {
            name: true,
          },
        },
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
    .then(async vendors => {
      const filteredVendors = !!searchTag
        ? vendors.filter(vendor =>
            vendor.tags.some(({ tag }) => tag.name === searchTag)
          )
        : vendors;

      const vendorsWithReview = await Promise.all(
        filteredVendors.map(async vendor => {
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
