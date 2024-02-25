import { OffersType } from "@/app/vendors/[id]/vendor-view";
import OfferForm from "./offer-form";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { LogIn } from "lucide-react";

const VENDOR_OFFERS_PAGE = {
  title: "Vendor Offers Page",
  description:
    "Order from the shop. Here, you can either order everything and pay for it when picked up, or calculate the total cost before you order in-person.",
};

export interface VendorOffersPageProps {
  offers: OffersType;
}

export default function VendorOffersPage({ offers }: VendorOffersPageProps) {
  const { userId } = useAuth();
  return (
    <div className="bg-white px-5 py-5">
      <h3 className="text-xl font-bold">{VENDOR_OFFERS_PAGE.title}</h3>
      <p className="mt-5 text-sm font-medium">
        {VENDOR_OFFERS_PAGE.description}
      </p>
      {userId ? (
        <OfferForm offers={offers} />
      ) : (
        <div className="bg-white px-5 py-5 mt-5 justify-center flex flex-col items-center">
          <LogIn size={40} color="#33BFBE" />
          <h3 className="text-xl mt-3">
            Please{" "}
            <Link
              href={`/auth/sign-in`}
              className="text-green underline underline-offset-2 cursor-pointer">
              login
            </Link>{" "}
            to view offers.
          </h3>
        </div>
      )}
    </div>
  );
}
