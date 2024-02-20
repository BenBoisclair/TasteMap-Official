import { Store } from "lucide-react";
import AddMarketButton from "./components/add-market-button";
import MarketsTable from "./markets-table";

export default async function AdminMarketsPage() {
  return (
    <div>
      <div className="w-full flex flex-col">
        <div>
          <Store size={24} color="#FFD14E" className="mb-4" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white text-3xl font-bold">Markets</span>
          <AddMarketButton />
        </div>
      </div>
      <MarketsTable />
    </div>
  );
}
