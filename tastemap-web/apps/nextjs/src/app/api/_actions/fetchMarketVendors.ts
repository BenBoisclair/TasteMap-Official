import type { Vendor } from "~/types/types";

const fetchMarketVendors = async ({
  marketId,
}: {
  marketId: string;
}): Promise<Vendor[]> => {
  const response = await fetch(`/api/markets/${marketId}/vendors`);
  if (!response.ok) {
    throw new Error(`Error fetching vendors for market: ${marketId}`);
  }
  return response.json() as Promise<Vendor[]>;
};

export default fetchMarketVendors;
