import { review } from "@/db/schema/schema";
import type { InsertReviewAspect } from "@/types/types";

export type InsertReview = typeof review.$inferInsert;

const writeReview = async ({
  reviewAspects,
  reviewData,
  id,
  type = "markets",
}: {
  reviewAspects: InsertReviewAspect[];
  reviewData: InsertReview;
  id?: string;
  type?: string;
}) => {
  if (!reviewData) return;

  const response = await fetch(`/api/${type}/${id}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ reviewData, reviewAspects }),
  });

  const data = (await response.json()) as {
    message: string;
  };

  const status = response.status;

  return { status, data };
};

export default writeReview;
