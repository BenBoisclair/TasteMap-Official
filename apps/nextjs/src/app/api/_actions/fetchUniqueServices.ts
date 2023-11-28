import type { ReviewsResponse } from "~/data/testData";

const fetchMarketReviews = async ({
  marketId,
}: {
  marketId: string;
}): Promise<ReviewsResponse> => {
  const response = await fetch(`/api/markets/${marketId}/unique-services`);
  if (!response.ok) {
    throw new Error(`Error fetching services for market: ${marketId}`);
  }
  return response.json() as Promise<ReviewsResponse>;
};

export default fetchMarketReviews;
