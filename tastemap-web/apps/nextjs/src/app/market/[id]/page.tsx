import { Metadata } from "next";
import { getMarket } from "~/app/_actions/markets";
import MarketHeader from "~/components/market/market-header";
import HighlightsPage from "~/components/market/market-highlights";
import MarketInfoPage from "~/components/market/market-info-page";
import RatingAndReviewSection from "~/components/sections/RatingsAndReviews/rating-and-reviews-section";
import Tabs from "~/components/tabs";
import { Market, Tag } from "~/types/types";
import NavBar from "~/components/navbar/nav-bar";

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
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const marketId = params.id;
  const market = await getMarket(marketId);
  const activeTab = searchParams["tab"] || "Highlights";

  if (!market) return;

  return (
    <div className="relative bg-neutral-200">
      <NavBar />
      <MarketHeader market={market} />
      <Tabs tabs={["Highlights", "Map & Info", "Reviews"]} />

      {activeTab === "Highlights" && <HighlightsPage market={market} />}
      {activeTab === "Map & Info" && <MarketInfoPage market={market} />}
      {activeTab === "Reviews" && (
        <RatingAndReviewSection
          id={marketId}
          name={market?.name}
          imageUrl={market?.bannerUrl}
          type={"market"}
        />
      )}
    </div>
  );
}
// if (!market) {
//   return <LoadingPage />;
// }

// const marketJsonLd: WithContext<Place> = {
//   "@context": "https://schema.org",
//   "@type": "Place",
//   name: market.name,
//   description: market.about,
//   // branchCode: market.code,
//   latitude: parseFloat(market.latitude!),
//   longitude: parseFloat(market.longitude!),
//   isAccessibleForFree: true,
//   publicAccess: true,
//   alternateName: market.nameTH || undefined,
//   additionalType: market.type,
// };
