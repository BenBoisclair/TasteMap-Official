import { OffersType } from "@/app/vendors/[id]/vendor-view";
import OfferForm from "./offer-form";
const VENDOR_OFFERS_PAGE = {
  title: "Order from this shop",
  description:
    "You can order everything and pay for it when picked up, or calculate the total cost before ordering in-person.",
};

export interface VendorOffersPageProps {
  offers: OffersType;
}

export default function VendorOffersPage({ offers }: VendorOffersPageProps) {
  return (
    <div className="bg-white px-5 py-5">
      <h3 className="text-xl font-bold">{VENDOR_OFFERS_PAGE.title}</h3>
      <p className="mt-2 text-sm font-medium">
        {VENDOR_OFFERS_PAGE.description}
      </p>
      <OfferForm offers={offers} />
    </div>
  );
}
