import { MarketCard } from "../../market/market-card";
import { getMarkets } from "~/app/_actions/actions";

export const dynamic = "force-dynamic";

export async function MarketsNearYouSection() {
  const markets = await getMarkets();

  return (
    <div className="w-full rounded-3xl bg-white py-5">
      <div className="px-5">
        <h1 className="text-xl font-bold">Explore Markets Near You</h1>
      </div>
      <div className="no-scrollbar flex gap-5 overflow-x-scroll px-5 py-3">
        {!!markets &&
          markets.map(market => <MarketCard market={market} key={market.id} />)}
      </div>
    </div>
  );
}
