import { getVendors } from "../../server-actions/vendors";
import SearchVendorsUI from "./search-vendors-ui";

export const dynamic = "force-dynamic";

export default async function VendorsPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
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

  const vendors = await getVendors({ tag: tag });
  if (!vendors) return;
  return (
    <SearchVendorsUI
      vendors={vendors}
      title={tag ? `Explore all ${shownTag}!` : "Explore all Shops"}
    />
  );
}
