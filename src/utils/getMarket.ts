"use client";
import type { QueryStatus } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import type { Market } from "@/types/types";
import fetchAt from "./fetchAt";

const useMarket = (
  marketId: string
): [
  market: Market | undefined,
  status: QueryStatus,
  error: unknown, // Consider using 'unknown' or a more specific error type
] => {
  const {
    data: market,
    status,
    error,
  } = useQuery({
    queryKey: ["market", marketId],
    queryFn: () => fetchAt<Market>(`/api/markets/${marketId}`),
  });

  return [market, status, error];
};

export default useMarket;
