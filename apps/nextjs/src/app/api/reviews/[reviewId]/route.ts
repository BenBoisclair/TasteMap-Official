import { auth } from "@clerk/nextjs";

import { db, eq } from "@acme/db";
import { review } from "@acme/db/schema/schema";

export const DELETE = async (
  request: Request,
  { params }: { params: { reviewId: string } },
) => {
  const { userId } = auth();

  if (!userId) {
    return Response.json(
      { message: "You must be logged in to delete reviews" },
      { status: 401 },
    );
  }

  const reviewId = params.reviewId;

  const existingReview = await db
    .selectDistinct()
    .from(review)
    .where(eq(review.id, reviewId));

  if (!existingReview)
    return Response.json({ message: "Review doesn't exist" }, { status: 404 });

  const deletedReview = await db
    .delete(review)
    .where(eq(review.id, reviewId))
    .returning();

  return Response.json(deletedReview);
};
