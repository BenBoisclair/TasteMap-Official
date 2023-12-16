import { db, eq, sql } from "@acme/db";
import { review } from "@acme/db/schema/schema";

export const GET = async () => {
  const markets = await db.query.market
    .findMany({
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
            id: true,
            dayOfWeek: true,
            open: true,
            close: true,
          },
        },
      },
    })
    .then(async (markets) => {
      // const { marketTags, ...restOfData } = data!;
      const marketsWithReview = await Promise.all(
        markets.map(async (market) => {
          const aggregationQuery = await db
            .select({
              total: sql<number>`cast(count(${review.id}) as int)`,
              average: sql<number>`cast(avg(${review.rating}) as float)`,
            })
            .from(review)
            .where(eq(review.marketReviewedID, market.id))
            .groupBy(review.marketReviewedID);

          const ratings =
            aggregationQuery.length > 0 ? aggregationQuery[0] : null;

          return {
            ...market,
            ratings,
            tags: market.marketTags.map(({ tag }) => tag),
            marketTags: null,
          };
        }),
      );

      return marketsWithReview;
    })
    .catch((error) => {
      console.log(error);
      return Response.json(
        { message: "Markets not found" },
        { status: 404, statusText: "Markets not found" },
      );
    });

  return Response.json(markets);
};
