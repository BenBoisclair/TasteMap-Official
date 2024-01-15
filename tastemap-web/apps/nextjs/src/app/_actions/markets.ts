"use server";

import { db } from "@acme/db";
import { market, review } from "@acme/db/schema/schema";
import { eq, sql } from "drizzle-orm";
import { Market } from "~/types/types";

export async function getMarket(marketId: string): Promise<Market | undefined> {
  try {
    const oneMarket = await db.query.market.findFirst({
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
            id: true,
            dayOfWeek: true,
            open: true,
            close: true,
          },
        },
      },
    });
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
      createdAt: restOfData.createdAt
        ? restOfData.createdAt.toISOString()
        : null,
    };
  } catch (error) {
    console.log(error);
  }
}
