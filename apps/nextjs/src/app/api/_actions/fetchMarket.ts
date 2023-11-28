import type { Market } from "~/data/testData";

const fetchMarket = async ({
  marketId,
}: {
  marketId: string;
}): Promise<Market> => {
  const response = await fetch(`/api/markets/${marketId}`);
  if (!response.ok) {
    throw new Error(`Error fetching market: ${marketId}`);
  }
  return response.json() as Promise<Market>;
};

export default fetchMarket;
