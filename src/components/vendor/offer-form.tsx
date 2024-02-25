import Link from "next/link";
import ProductItem from "./product-item";
import { VendorOffersPageProps } from "./vendor-offers-page";
import { useOfferStore } from "@/utils/store";
import PromotionItem from "./promotion-item";

const OfferForm = ({ offers }: VendorOffersPageProps) => {
  const totalPrice = useOfferStore((state) => state.getTotalPrice());
  const vendorId = useOfferStore((state) => state.vendorId);
  return (
    <>
      <div className="flex flex-col">
        {offers.promotions?.map((promotion) => (
          <PromotionItem {...promotion} key={promotion.id} />
        ))}
        {offers.products?.map((product) => (
          <ProductItem {...product} key={product.id} />
        ))}
      </div>
      <div className=" bg-neutral-200 rounded-xl py-2 px-3 mt-8">
        <div className="flex justify-between items-center">
          <p>Total price</p>
          <p className="font-bold text-[18px]">{totalPrice}</p>
        </div>
        <Link href={`/vendors/${vendorId}/order`}>
          <button
            disabled={totalPrice === 0}
            className="w-full py-3 bg-yellow rounded-3xl mt-4 font-bold text-xl disabled:bg-neutral-400 disabled:text-neutral-600 disabled:cursor-not-allowed">
            {totalPrice === 0
              ? "Please choose a product."
              : "Review your order"}
          </button>
        </Link>
      </div>
    </>
  );
};

export default OfferForm;
