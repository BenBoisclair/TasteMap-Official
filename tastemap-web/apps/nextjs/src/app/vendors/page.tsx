import { getVendors } from "../_actions/vendors";
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
  if (Array.isArray(tag)) {
    tag = tag[0];
  }

  const vendors = await getVendors({ tag: tag });
  if (!vendors) return;
  return (
    <SearchVendorsUI
      vendors={vendors}
      title={tag ? `Explore all ${tag}!` : "Explore all Shops"}
    />
  );
}
