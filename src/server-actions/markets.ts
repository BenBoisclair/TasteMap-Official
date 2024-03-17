"use server";

import { db } from "@/db";
import { market, review } from "@/db/schema/schema";
import { asc, desc, eq, sql } from "drizzle-orm";
import { Market, insertMarketSchema } from "../types/types";
import { auth } from "@clerk/nextjs";
import { z } from "zod";

export async function getMarkets({
  noFavourites = false,
}: {
  noFavourites?: boolean;
}): Promise<Market[] | undefined> {
  const { userId } = auth();
  try {
    const markets = await db.query.market.findMany({
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
        userFavourites: {
          columns: {
            userExternalId: true,
          },
        },
      },
      orderBy: [desc(market.isVerified), asc(market.code)],
    });
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

        const { userFavourites, ...otherMarketData } = market;

        const isFavourite = userFavourites.some(
          (favourite) => favourite.userExternalId === userId && !noFavourites
        );

        return {
          ...otherMarketData,
          ratings,
          tags: market.marketTags.map(({ tag }) => tag),
          marketTags: null,
          isFavourite: isFavourite,
          createdAt: market.createdAt ? market.createdAt.toISOString() : null,
        };
      })
    );
    return marketsWithReview;
  } catch (error) {
    console.log(error);
  }
}

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

export async function createMarket(values: z.infer<typeof insertMarketSchema>) {
  try {
    const newMarket = await db.insert(market).values(values).returning();
    return newMarket;
  } catch (error) {
    throw new Error();
  }
}

export async function deleteMarket(marketId: string) {
  try {
    const deletedMarket = await db
      .delete(market)
      .where(eq(market.id, marketId))
      .returning();
    if (deletedMarket) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error();
  }
}
