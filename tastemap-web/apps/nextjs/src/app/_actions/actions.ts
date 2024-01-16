"use server";

import { asc, db, desc, eq, sql } from "@acme/db";
import {
  favourites,
  review,
  uniqueService,
  vendor,
} from "@acme/db/schema/schema";
import { auth } from "@clerk/nextjs";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface FavouriteActionProps {
  marketId: string | undefined;
  vendorId: string | undefined;
}

export async function favouriteAction({
  marketId,
  vendorId,
}: FavouriteActionProps) {
  const { userId } = auth();
  if (!userId) {
    redirect("/auth/sign-in");
  }

  try {
    let query;
    if (marketId) {
      query = db.query.favourites.findFirst({
        where: favourites => eq(favourites.marketId, marketId),
      });
    } else if (vendorId) {
      query = db.query.favourites.findFirst({
        where: favourites => eq(favourites.vendorId, vendorId),
      });
    } else {
      console.log("No marketId or vendorId provided");
    }

    const existingFavourite = await query;

    if (existingFavourite) {
      await db
        .delete(favourites)
        .where(eq(favourites.id, existingFavourite.id));

      // console.log("Favourite deleted!");
    } else {
      await db.insert(favourites).values({
        id: nanoid(20),
        userExternalId: userId,
        marketId: marketId || undefined,
        vendorId: vendorId || undefined,
      });

      // console.log("Favourited!");
    }
    revalidatePath("/", "layout");
  } catch (error) {
    console.error("Error querying the database", error);
  }
}

export async function getMarkets() {
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
    });
    const marketsWithReview = await Promise.all(
      markets.map(async market => {
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
          favourite => favourite.userExternalId === userId
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

export async function getUniqueServices(marketId: string) {
  const allUniqueServices = await db
    .select()
    .from(uniqueService)
    .where(eq(uniqueService.marketId, marketId));

  return allUniqueServices;
}
