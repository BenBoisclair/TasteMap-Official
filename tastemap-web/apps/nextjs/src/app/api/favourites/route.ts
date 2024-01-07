import { db, eq } from "@acme/db";
import { favourites } from "@acme/db/schema/schema";
import { auth } from "@clerk/nextjs";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import queryClient from "~/utils/queryClient";

export const POST = async (request: NextRequest, response: NextResponse) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.redirect("/auth/sign-in");
    }

    const { marketId, vendorId } = await request.json();

    const existingFavourite = await db.query.favourites.findFirst({
      where: (favourites, { and }) =>
        and(
          eq(favourites.marketId, marketId),
          eq(favourites.userExternalId, userId)
        ),
    });

    // Step 3: Toggle the favourite.
    let response;
    if (existingFavourite) {
      // If it exists, delete it.
      await db
        .delete(favourites)
        .where(eq(favourites.id, existingFavourite.id));
      response = { message: "Favourite removed successfully." };
    } else {
      await db.insert(favourites).values({
        id: nanoid(20),
        userExternalId: userId,
        marketId: marketId,
      });
      response = { message: "Favourite added successfully." };
    }

    // Step 4: Return a successful response.
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    // Return an error response.
    return new Response(
      JSON.stringify({ message: "Failed to toggle favourite" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
