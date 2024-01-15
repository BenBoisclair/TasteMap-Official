"use server";

import { asc, db, desc, eq, sql } from "@acme/db";
import { favourites, review, vendor } from "@acme/db/schema/schema";
import { auth } from "@clerk/nextjs";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Market, Vendor } from "~/types/types";
import queryClient from "~/utils/queryClient";

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

      console.log("Favourite deleted!");
    } else {
      await db.insert(favourites).values({
        id: nanoid(20),
        userExternalId: userId,
        marketId: marketId || undefined,
        vendorId: vendorId || undefined,
      });

      console.log("Favourited!");
      queryClient.invalidateQueries({ queryKey: ["allMarkets"] });
    }
    revalidatePath("/");
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

type getVendorsProps = {
  tag?: string;
};

export async function getVendors({ tag }: getVendorsProps) {
  try {
    const searchTag = tag;
    const { userId } = auth();
    const allVendors = await db.query.vendor.findMany({
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
        userFavourites: {
          columns: {
            userExternalId: true,
          },
        },
      },
      orderBy: [desc(vendor.isVerified), asc(vendor.sequence)],
    });

    const filteredVendors = !!searchTag
      ? allVendors.filter(
          vendor => vendor?.tags.some(({ tag }) => tag.name === searchTag)
        )
      : allVendors;

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

        const { userFavourites, ...otherVendorData } = vendor;

        const isFavourite = userFavourites.some(
          favourite => favourite.userExternalId === userId
        );

        return {
          ...vendor,
          ratings,
          tags: vendor?.tags.map(({ tag }) => tag),
          isFavourite: isFavourite,
          createdAt: vendor.createdAt ? vendor.createdAt.toISOString() : null,
        };
      })
    );
    return vendorsWithReview;
  } catch (error) {
    console.log(error);
  }
}
