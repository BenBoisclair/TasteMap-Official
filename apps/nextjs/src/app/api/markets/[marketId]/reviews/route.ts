import { db, eq, sql } from "@acme/db";
import { review, reviewAspect, users } from "@acme/db/schema/schema";

export const GET = async (
  request: Request,
  { params }: { params: { marketId: string } },
) => {
  const marketId = params.marketId;

  // Aggregate query to get total count and average rating
  const aggregationReviewRatings = await db
    .select({
      total: sql<number>`cast(count(${review.id}) as int)`,
      average: sql<number>`cast(avg(${review.rating}) as float)`,
    })
    .from(review)
    .where(eq(review.marketReviewedID, marketId))
    .groupBy(review.marketReviewedID);

  const aggregatedRatings =
    aggregationReviewRatings.length > 0 ? aggregationReviewRatings[0] : null;

  const aggregatedReviewAspects = await db
    .select({
      name: reviewAspect.name,
      average: sql<number>`cast(avg(${reviewAspect.rating}) as float)`,
    })
    .from(reviewAspect)
    .leftJoin(review, eq(reviewAspect.reviewId, review.id))
    .where(eq(review.marketReviewedID, marketId))
    .groupBy(reviewAspect.name);

  const reviewAspects = aggregatedReviewAspects.map((aspect) => ({
    name: aspect.name,
    average: aspect.average,
  }));

  // Fetch all reviews for the given marketId
  const allReviewsRaw = await db
    .select()
    .from(review)
    .where(eq(review.marketReviewedID, marketId))
    .leftJoin(users, eq(users.id, review.authorId));

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
