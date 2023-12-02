import type { Review } from "~/types/types";

const deleteReview = async ({
  reviewId,
}: {
  reviewId: string;
}): Promise<Review> => {
  console.log(reviewId);
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ reviewId }),
  });
  console.log(response);
  if (!response.ok) {
    throw new Error(`Error fetching market: ${reviewId}`);
  }

  return response.json() as Promise<Review>;
};

export default deleteReview;
