"use server";
import { reviewAspect } from "./../db/drizzle/schema";
import { db, eq, sql } from "@/db";
import { InsertReview, review, users } from "@/db/schema/schema";
import {
  InsertReviewAspect,
  Review,
  insertReviewAspectSchema,
  insertReviewSchema,
} from "@/types/types";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export interface ReviewsProps {
  data: {
    reviews: Review[];
    total: number;
    average: number;
    reviewAspects: {
      name: string;
      average: number;
    }[];
  };
  status: number;
}

interface createReviewProps {
  reviewData: InsertReview;
  reviewAspects: InsertReviewAspect[];
  id: string;
  type: string;
}

export const createReview = async ({
  reviewData,
  reviewAspects,
  id,
  type,
}: createReviewProps) => {
  const { userId } = auth();

  if (!userId) return { message: "User needs to be logged in", status: 401 };

  try {
    const reviewsValidated = insertReviewSchema.parse(reviewData);
    const reviewAspectsValidated = reviewAspects.map((aspect) => {
      return insertReviewAspectSchema.parse(aspect);
    });

    if (!reviewsValidated || !reviewAspectsValidated) {
      return { message: `Invalid review Data`, status: 400 };
    } else {
      const reviewWrite = await db.transaction(async (tx) => {
        const reviewIDField =
          type === "Market" ? "marketReviewedID" : "vendorReviewedID";

        const reviewWriteStatus = await tx
          .insert(review)
          .values({
            ...reviewsValidated,
            [reviewIDField]: id,
            authorId: userId,
          })
          .onConflictDoNothing({
            target: [review.vendorReviewedID, review.authorId],
          })
          .returning();
        await tx
          .insert(reviewAspect)
          .values(
            reviewAspectsValidated.map((reviewAspect) => ({
              ...reviewAspect,
              createdAt: reviewAspect.createdAt?.toISOString(),
            }))
          )
          .onConflictDoNothing({
            target: [reviewAspect.id, reviewAspect.reviewId],
          })
          .returning();
        return reviewWriteStatus;
      });

      if (reviewWrite.length === 0 && !reviewWrite) {
        return { message: "Whoops! You already have a review!", status: 409 };
      }
      revalidatePath("/", "layout");
      return { message: "Review Created!", status: 200 };
    }
  } catch (error) {
    return { message: "Whoops.. creating review failed..", status: 500 };
  }
};

export const deleteReview = async (reviewId: string) => {
  const { userId } = auth();

  if (!userId)
    return { message: "You must be logged in to delete reviews", status: 401 };

  const existingReview = await db
    .selectDistinct()
    .from(review)
    .where(eq(review.id, reviewId));

  if (!existingReview) return { message: "Review doesn't exist", status: 404 };

  const deletedReview = await db
    .delete(review)
    .where(eq(review.id, reviewId))
    .returning();

  revalidatePath("/", "layout");
  return { message: "Review Deleted!", status: 200 };
};

export const getReviews = async (id: string, type: "Market" | "Vendor") => {
  const reviewIDField =
    type === "Market" ? "marketReviewedID" : "vendorReviewedID";

  const aggregationReviewRatings = await db
    .select({
      total: sql<number>`cast(count(${review.id}) as int)`,
      average: sql<number>`cast(avg(${review.rating}) as float)`,
    })
    .from(review)
    .where(eq(review[reviewIDField], id)) // Use the dynamic review ID field
    .groupBy(review[reviewIDField]);

  const aggregatedRatings =
    aggregationReviewRatings.length > 0 ? aggregationReviewRatings[0] : null;

  const aggregatedReviewAspects = await db
    .select({
      name: reviewAspect.name,
      average: sql<number>`cast(avg(${reviewAspect.rating}) as float)`,
    })
    .from(reviewAspect)
    .leftJoin(review, eq(reviewAspect.reviewId, review.id))
    .where(eq(review[reviewIDField], id)) // Use the dynamic review ID field again
    .groupBy(reviewAspect.name);

  const reviewAspects = aggregatedReviewAspects.map((aspect) => ({
    name: aspect.name,
    average: aspect.average,
  }));

  const allReviewsRaw = await db
    .select()
    .from(review)
    .where(eq(review[reviewIDField], id)) // And once more for retrieving all reviews
    .leftJoin(users, eq(users.externalId, review.authorId));

  const allReviews = allReviewsRaw.map((reviewRaw) => {
    return {
      ...reviewRaw.review,
      author: {
        id: reviewRaw?.user?.id,
        username: reviewRaw.user?.username,
        firstName: reviewRaw?.user?.firstName,
        lastName: reviewRaw?.user?.lastName,
        imageUrl: reviewRaw?.user?.imageUrl,
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

  return { data: responseObject, status: 200 };
};
