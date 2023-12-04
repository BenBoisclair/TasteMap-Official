import type { Market } from "~/types/types";

const fetchMarkets = async (): Promise<Market[]> => {
  const response = await fetch("/api/markets");
  if (!response.ok) {
    throw new Error("Error fetching markets");
  }
  return response.json() as Promise<Market[]>;
};

export default fetchMarkets;
