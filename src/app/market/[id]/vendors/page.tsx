import SearchVendorsUI from "@/app/vendors/search-vendors-ui";
import { getVendors } from "@/server-actions/vendors";
import { db, eq } from "@/db";
import { market } from "@/db/schema/schema";

export const dynamic = "force-dynamic";

export default async function MarketVendorsPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const marketId = params.id;

  let tag = searchParams["category"];

  let shownTag;
  if (Array.isArray(tag)) {
    tag = tag[0];
  }
  shownTag = tag;

  if (tag === "Fashion") {
    tag = ["Clothing", "Accessory"];
  }

  if (tag === "Services") {
    tag = ["Service", "Fortune Telling"];
  }

  if (tag === "Fresh") {
    tag = ["Ingredients", "Fruits"];
  }

  const vendors = await getVendors({ marketId: marketId, tag: tag });
  const marketName = await db.query.market.findFirst({
    where: eq(market.id, marketId),
    columns: {
      name: true,
    },
  });

  if (!vendors) return;

  return (
    <SearchVendorsUI
      vendors={vendors}
      title={tag ? `${shownTag}` : "Explore all Shops"}
      subTitle={`in ${marketName?.name}`}
    />
  );
}
