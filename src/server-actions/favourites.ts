"use server";

import { db, eq } from "@/db";
import { favourites, market, vendor } from "@/db/schema/schema";
import { auth } from "@clerk/nextjs";
import { getMarkets } from "./markets";
import { getVendors } from "./vendors";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

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
    let type;
    if (marketId) {
      query = db.query.favourites.findFirst({
        where: (favourites) => eq(favourites.marketId, marketId),
      });
      type = "Market";
    } else if (vendorId) {
      query = db.query.favourites.findFirst({
        where: (favourites) => eq(favourites.vendorId, vendorId),
      });
      type = "Vendor";
    } else {
      console.log("No marketId or vendorId provided");
    }

    const existingFavourite = await query;

    if (existingFavourite) {
      await db
        .delete(favourites)
        .where(eq(favourites.id, existingFavourite.id));
    } else {
      await db.insert(favourites).values({
        id: nanoid(20),
        userExternalId: userId,
        marketId: marketId,
        vendorId: vendorId,
      });
    }
    revalidatePath("/", "layout");
  } catch (error) {
    console.error("Error querying the database", error);
    return { success: false };
  }
}

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
      .filter((favourite) => favourite.market !== null)
      .map((favourite) => favourite?.market?.id);

    const favouriteVendors = allFavourites
      .filter((favourite) => favourite.vendor !== null)
      .map((favourite) => favourite?.vendor?.id);

    const allVendors = await getVendors({});
    const allMarkets = await getMarkets({});

    const markets = allMarkets?.filter((market) =>
      favouriteMarkets.includes(market.id)
    );
    const vendors = allVendors?.filter((vendor) =>
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
