"use server";

import { db, eq } from "../../../packages/db";
import { favourites, market, vendor } from "../../../packages/db/schema/schema";
import { auth } from "@clerk/nextjs";
import { getMarkets } from "./actions";
import { getVendors } from "./vendors";

export async function getFavourites() {
  const { userId }: { userId: string | null } = auth();
  if (!userId) return;
  try {
    const allFavourites = await db
      .select()
      .from(favourites)
      .fullJoin(vendor, eq(vendor.id, favourites.vendorId))
      .fullJoin(market, eq(market.id, favourites.marketId))
      .where(eq(favourites.userExternalId, userId));

    const favouriteMarkets = allFavourites
      .filter(favourite => favourite.market !== null)
      .map(favourite => favourite?.market?.id);

    const favouriteVendors = allFavourites
      .filter(favourite => favourite.vendor !== null)
      .map(favourite => favourite?.vendor?.id);

    const allVendors = await getVendors({});
    const allMarkets = await getMarkets();

    const markets = allMarkets?.filter(market =>
      favouriteMarkets.includes(market.id)
    );
    const vendors = allVendors?.filter(vendor =>
      favouriteVendors.includes(vendor.id)
    );

    return {
      data: {
        markets,
        vendors,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
