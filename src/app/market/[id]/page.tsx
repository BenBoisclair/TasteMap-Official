import { Metadata } from "next";
import { getMarket } from "@/server-actions/markets";
import MarketHeader from "@/components/market/market-header";
import HighlightsPage from "@/components/market/market-highlights";
import MarketInfoPage from "@/components/market/market-info-page";
import RatingAndReviewSection from "@/components/reviews/rating-and-reviews-section";
import Tabs from "@/components/tabs";
import { Market, Tag } from "@/types/types";
import NavBar from "@/components/navbar/nav-bar";
import { getReviews } from "@/server-actions/reviews";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const market = await getMarket(params.id);

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
  const reviewsData = await getReviews(marketId, "Market");
  const activeTab = searchParams["tab"] || "Highlights";

  if (!market) return;

  return (
    <div className="relative bg-neutral-200">
      <NavBar page="Market" marketId={marketId} />
      <MarketHeader market={market} />
      <Tabs tabs={["Highlights", "Map & Info", "Reviews"]} />

      {activeTab === "Highlights" && (
        <HighlightsPage market={market} reviews={reviewsData} />
      )}
      {activeTab === "Map & Info" && <MarketInfoPage market={market} />}
      {activeTab === "Reviews" && (
        <RatingAndReviewSection
          id={marketId}
          name={market?.name}
          type={"Market"}
          reviews={reviewsData}
        />
      )}
    </div>
  );
}
