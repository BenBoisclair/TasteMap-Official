import type { ReviewsResponse } from "~/types/types";

const fetchVendorReviews = async ({
  id,
}: {
  id: string;
}): Promise<ReviewsResponse> => {
  const response = await fetch(`/api/vendors/${id}/reviews`);
  if (!response.ok) {
    throw new Error(`Error fetching reviews for vendor: ${id}`);
  }
  return response.json() as Promise<ReviewsResponse>;
};

export default fetchVendorReviews;
