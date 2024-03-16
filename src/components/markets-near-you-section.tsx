import Section from "@/components/section";
import { MarketCard } from "./market/market-card";
import { getMarkets } from "@/server-actions/markets";

export const dynamic = "force-dynamic";

export async function MarketsNearYouSection() {
  const markets = await getMarkets({});

  if (!markets) return;

  const marketsList = markets.map((market) => (
    <MarketCard market={market} key={market.id} />
  ));

  return (
    <Section>
      <Section.Title>Must-visit markets</Section.Title>
      <Section.Carousel>{marketsList}</Section.Carousel>
    </Section>
  );
}
