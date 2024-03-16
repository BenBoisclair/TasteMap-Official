import Link from "next/link";
import ProductItem from "./product-item";
import { VendorOffersPageProps } from "./vendor-offers-page";
import { useOfferStore } from "@/hooks/cart-store";
import PromotionItem from "./promotion-item";
import { useAuth } from "@clerk/nextjs";
import AdditionalInfoTextarea from "./additional-info-textarea";
import convertBahtToDollars from "@/utils/convertToDollars";

const OfferForm = ({ offers }: VendorOffersPageProps) => {
  const { userId } = useAuth();
  const totalPrice = useOfferStore((state) => state.getTotalPrice());
  const vendorId = useOfferStore((state) => state.vendorId);

  const totalPriceInDollars = convertBahtToDollars(totalPrice);
  return (
    <>
      <div className="flex flex-col mt-8 gap-2">
        {offers.promotions?.map((promotion) => (
          <PromotionItem {...promotion} key={promotion.id} />
        ))}
        {offers.products?.map((product) => (
          <ProductItem {...product} key={product.id} />
        ))}
        <AdditionalInfoTextarea />
      </div>
      <div className=" bg-neutral-200 rounded-xl py-2 px-3 mt-5">
        <div className="flex justify-between items-center">
          <p>Total price</p>
          <div className="flex items-center gap-2">
            <p className="font-bold text-[18px]">{`${totalPrice}฿`}</p>
            <p className="font-medium text-[18px]">{`( $${totalPriceInDollars} USD )`}</p>
          </div>
        </div>

        <Link href={!userId ? `/auth/sign-in` : `/vendors/${vendorId}/order`}>
          <button
            disabled={totalPrice === 0}
            className="w-full py-3 bg-yellow rounded-3xl mt-4 font-bold text-xl disabled:bg-neutral-400 disabled:text-neutral-600 disabled:cursor-not-allowed">
            {userId ? (
              totalPrice === 0 ? (
                "Please choose a product."
              ) : (
                "Review your order"
              )
            ) : (
              <span className="flex gap-2 justify-center">
                Please
                <p className="underline underline-offset-2 text-green">
                  Log in
                </p>
                to order
              </span>
            )}
          </button>
        </Link>
      </div>
    </>
  );
};

export default OfferForm;
