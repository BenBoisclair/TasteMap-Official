import { db, eq, sql } from "@acme/db";
import { review, vendor } from "@acme/db/schema/schema";

export const GET = async (
  request: Request,
  { params }: { params: { vendorId: string } },
) => {
  const vendorId = params.vendorId;

  const oneVendor = await db.query.vendor
    .findFirst({
      where: eq(vendor.id, vendorId),
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
        paymentOptions: {
          columns: {
            vendorId: false,
            paymentOptionId: false,
          },
          with: {
            paymentOption: {
              columns: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    })
    .then(async (oneVendor) => {
      try {
        const { tags, paymentOptions, ...restOfData } = oneVendor!;

        console.log(oneVendor);

        const aggregationRatings = await db
          .select({
            total: sql<number>`cast(count(${review.id}) as int)`,
            average: sql<number>`cast(avg(${review.rating}) as float)`,
          })
          .from(review)
          .where(eq(review.vendorReviewedID, vendorId))
          .groupBy(review.vendorReviewedID);

        const ratings =
          aggregationRatings.length > 0 ? aggregationRatings[0] : null;

        return {
          ...restOfData,
          ratings,
          tags: tags.map(({ tag }) => tag) ?? [],
          paymentOptions:
            paymentOptions.map(({ paymentOption }) => paymentOption) ?? [],
        };
      } catch (error) {
        console.log(error);
      }
    })
    .catch((error) => {
      console.log(error);
      return Response.json(
        { message: "Vendor not found" },
        { status: 404, statusText: "Vendor not found" },
      );
    });

  return Response.json(oneVendor);
};
