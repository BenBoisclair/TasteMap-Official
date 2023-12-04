import type { ReviewsResponse } from "~/types/types";

const fetchMarketReviews = async ({
  id,
}: {
  id: string;
}): Promise<ReviewsResponse> => {
  const response = await fetch(`/api/markets/${id}/reviews`);
  if (!response.ok) {
    throw new Error(`Error fetching reviews for market: ${id}`);
  }
  return response.json() as Promise<ReviewsResponse>;
};

export default fetchMarketReviews;
