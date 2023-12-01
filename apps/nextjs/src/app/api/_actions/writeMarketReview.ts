import type { review } from "@acme/db/schema/schema";

export type InsertReview = typeof review.$inferInsert;

const writeMarketReview = async ({
  reviewData,
  marketId,
}: {
  reviewData: InsertReview;
  marketId: string;
}) => {
  if (!reviewData) return;

  const response = await fetch(`/api/markets/${marketId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  });

  const data = (await response.json()) as {
    message: string;
  };

  const status = response.status;

  return { status, data };
};

export default writeMarketReview;
