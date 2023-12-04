/* eslint-disable @typescript-eslint/no-unused-vars */
import { db, eq, sql } from "@acme/db";
import { market, openingHour, review, tag } from "@acme/db/schema/schema";

export async function GET(
  request: Request,
  { params }: { params: { marketId: string } },
) {
  const marketId = params.marketId;
  const oneMarket = await db.query.market
    .findFirst({
      where: eq(market.id, marketId),
      with: {
        marketTags: {
          columns: {
            marketId: false,
            tagId: false,
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
        openingHours: {
          columns: {
            dayOfWeek: true,
            open: true,
            close: true,
          },
        },
      },
    })
    .then(async (oneMarket) => {
      try {
        const { marketTags, ...restOfData } = oneMarket!;

        const aggregationRatings = await db
          .select({
            total: sql<number>`cast(count(${review.id}) as int)`,
            average: sql<number>`cast(avg(${review.rating}) as float)`,
          })
          .from(review)
          .where(eq(review.marketReviewedID, marketId))
          .groupBy(review.marketReviewedID);

        const ratings =
          aggregationRatings.length > 0 ? aggregationRatings[0] : null;

        return {
          ...restOfData,
          ratings,
          tags: marketTags.map(({ tag }) => tag) ?? [],
        };
      } catch (error) {
        console.log(error);
      }
    })
    .catch((error) => {
      console.log(error);
      return Response.json(
        { message: "Market not found" },
        { status: 404, statusText: "Market not found" },
      );
    });
  return Response.json(oneMarket);
}
