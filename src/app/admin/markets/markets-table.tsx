import { Market } from "@/types/types";
import { DataTable } from "../../../components/ui/data-table";
import { columns } from "./columns";
import { getMarkets } from "@/actions/markets";

export default async function MarketsTable() {
  const markets: Market[] | undefined = await getMarkets({
    noFavourites: true,
  });

  if (!markets) {
    return null;
  }
  return <DataTable columns={columns} data={markets} />;
}
