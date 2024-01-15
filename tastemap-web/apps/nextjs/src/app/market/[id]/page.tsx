import MarketView from "./market-view";
import { Tag } from "~/types/types";
import { Metadata } from "next";
import { getMarket } from "~/app/_actions/markets";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const marketId = params.id;

  const market = await getMarket(marketId);

  if (!market)
    return {
      title: "Loading",
    };

  return {
    title: market.name,
    description: market.about,
    keywords: market.tags.map((tag: Tag) => tag.name),
  };
}

export default async function MarketPage({
  params: { id: marketId },
}: {
  params: { id: string };
}) {
  const market = await getMarket(marketId);

  return <MarketView params={{ id: marketId }} market={market} />;
}
