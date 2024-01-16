import Section from "~/components/section";
import { MarketCard } from "../../market/market-card";
import { getMarkets } from "~/app/_actions/actions";

export const dynamic = "force-dynamic";

export async function MarketsNearYouSection() {
  const markets = await getMarkets();

  if (!markets) return;

  return (
    <Section>
      <Section.Title>Explore Markets Near You</Section.Title>
      <Section.Carousel gap={5}>
        {markets.map(market => (
          <MarketCard market={market} key={market.id} />
        ))}
      </Section.Carousel>
    </Section>
  );
}
