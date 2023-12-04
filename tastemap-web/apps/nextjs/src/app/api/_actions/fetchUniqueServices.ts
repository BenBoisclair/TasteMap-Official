import type { UniqueService } from "~/types/types";

const fetchUniqueServices = async ({
  marketId,
}: {
  marketId: string;
}): Promise<UniqueService[]> => {
  const response = await fetch(`/api/markets/${marketId}/unique-services`);
  if (!response.ok) {
    throw new Error(`Error fetching services for market: ${marketId}`);
  }
  return response.json() as Promise<UniqueService[]>;
};

export default fetchUniqueServices;
