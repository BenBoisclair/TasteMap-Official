// import IntToStringWeekday from "../(utils)/IntToStringWeekday";
import type { Vendor } from "~/types/types";
import { Tag } from "./tag";

interface VendorInfoPageProps {
  vendor: Vendor;
}

export default function VendorInfoPage({ vendor }: VendorInfoPageProps) {
  return (
    <div id="InfoPage" className="py-8">
      <div className="px-5">
        <h1 className="text-lg font-bold">About</h1>
        <div className="mt-2 h-full w-full font-medium text-neutral-400">
          {vendor.about}
        </div>
      </div>
      <div className="mt-5 px-5">
        <h1 className="text-lg font-bold">Price Range</h1>
        <div className="mt-2 h-full w-full font-medium text-neutral-400">
          {vendor.priceRange}
        </div>
      </div>
      <div className="mt-5 px-5">
        <h1 className="text-lg font-bold">Payment Options</h1>
        <div className="mt-2 flex gap-3">
          {vendor.paymentOptions.map((option) => (
            <Tag type="Facility" key={option.id} size="lg">
              {option.name}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
}
