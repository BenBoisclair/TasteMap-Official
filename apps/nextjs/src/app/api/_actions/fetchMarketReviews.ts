import type { ReviewsResponse } from "~/types/types";

const fetchMarketReviews = async ({
  marketId,
}: {
  marketId: string;
}): Promise<ReviewsResponse> => {
  const response = await fetch(`/api/markets/${marketId}/reviews`);
  if (!response.ok) {
    throw new Error(`Error fetching reviews for market: ${marketId}`);
  }
  return response.json() as Promise<ReviewsResponse>;
};

export default fetchMarketReviews;
