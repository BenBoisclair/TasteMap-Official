import { auth } from "@clerk/nextjs";

import { db, eq, sql } from "@acme/db";
import { review, reviewAspect, users } from "@acme/db/schema/schema";

import type { InsertReview } from "~/app/api/_actions/writeReview";
import type { InsertReviewAspect } from "~/types/types";
import { insertReviewAspectSchema, insertReviewSchema } from "~/types/types";

export const GET = async (
  request: Request,
  { params }: { params: { vendorId: string } },
) => {
  const vendorId = params.vendorId;

  // Aggregate query to get total count and average rating
  const aggregationReviewRatings = await db
    .select({
      total: sql<number>`cast(count(${review.id}) as int)`,
      average: sql<number>`cast(avg(${review.rating}) as float)`,
    })
    .from(review)
    .where(eq(review.vendorReviewedID, vendorId))
    .groupBy(review.vendorReviewedID);

  const aggregatedRatings =
    aggregationReviewRatings.length > 0 ? aggregationReviewRatings[0] : null;

  const aggregatedReviewAspects = await db
    .select({
      name: reviewAspect.name,
      average: sql<number>`cast(avg(${reviewAspect.rating}) as float)`,
    })
    .from(reviewAspect)
    .leftJoin(review, eq(reviewAspect.reviewId, review.id))
    .where(eq(review.vendorReviewedID, vendorId))
    .groupBy(reviewAspect.name);

  const reviewAspects = aggregatedReviewAspects.map((aspect) => ({
    name: aspect.name,
    average: aspect.average,
  }));

  const allReviewsRaw = await db
    .select()
    .from(review)
    .where(eq(review.vendorReviewedID, vendorId))
    .leftJoin(users, eq(users.externalId, review.authorId));

  const allReviews = allReviewsRaw.map((review) => {
    return {
      ...review.review,
      author: {
        id: review?.user?.id,
        firstName: review?.user?.firstName,
        lastName: review?.user?.lastName,
      },
    };
  });

  // Constructing the response object
  const responseObject = {
    reviews: allReviews,
    total: aggregatedRatings?.total ?? 0,
    average: aggregatedRatings?.average ?? 0,
    reviewAspects,
  };

  return new Response(JSON.stringify(responseObject), {
    headers: { "Content-Type": "application/json" },
  });
};

export const POST = async (
  request: Request,
  { params }: { params: { vendorId: string } },
) => {
  const { userId } = auth();

  if (!userId) {
    return Response.json(
      { message: "User needs to be logged in" },
      { status: 401 },
    );
  }

  const vendorId = params.vendorId;

  try {
    const { reviewAspects, reviewData } = (await request.json()) as {
      reviewData: InsertReview;
      reviewAspects: InsertReviewAspect[];
    };

    const reviewsValidated = insertReviewSchema.parse(reviewData);
    const reviewAspectsValidated = reviewAspects.map((aspect) => {
      return insertReviewAspectSchema.parse(aspect);
    });

    if (!reviewsValidated || !reviewAspectsValidated) {
      return Response.json({ message: `Invalid review Data` }, { status: 400 });
    } else {
      const reviewWrite = await db.transaction(async (tx) => {
        const reviewWriteStatus = await tx
          .insert(review)
          .values({
            ...reviewsValidated,
            vendorReviewedID: vendorId,
            authorId: userId,
          })
          .onConflictDoNothing({
            target: [review.vendorReviewedID, review.authorId],
          })
          .returning();
        await tx
          .insert(reviewAspect)
          .values(reviewAspectsValidated)
          .onConflictDoNothing({
            target: [reviewAspect.id, reviewAspect.reviewId],
          })
          .returning();
        return reviewWriteStatus;
      });

      if (reviewWrite.length === 0 && !reviewWrite) {
        return Response.json(
          { message: "Whoops! You already have a review!" },
          { status: 409 },
        );
      }

      // if (reviewWrite[0] !== undefined) {
      //   await db.insert(reviewAspect).values(reviewAspects).returning();
      // }

      // return new Response(JSON.stringify(reviewWrite), {
      //   headers: { "Content-Type": "application/json" },
      // });
      return Response.json({ message: "Review Created!" }, { status: 200 });
    }
  } catch (error) {
    return Response.json(
      { message: "Whoops.. creating review failed.." },
      { status: 404 },
    );
  }
};
