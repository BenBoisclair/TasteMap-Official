"use client";
import { createOrder } from "@/server-actions/vendorOrder";
import { useOfferStore } from "@/hooks/cart-store";
import { Info, ShoppingBasket } from "lucide-react";
import { nanoid } from "nanoid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PromotionIcon from "../icons/promotion-icon";
import convertBahtToDollars from "@/utils/convertToDollars";

export default function Cart({ userId }: { userId: string }) {
  const products = useOfferStore((state) => state.products);
  const promotions = useOfferStore((state) => state.promotions);
  const totalPrice = useOfferStore((state) => state.getTotalPrice());
  const vendorId = useOfferStore((state) => state.vendorId);
  const resetCart = useOfferStore((state) => state.reset);
  const additionalInfo = useOfferStore((state) => state.additionalInfo);
  const router = useRouter();
  const totalPriceInDollars = convertBahtToDollars(totalPrice);

  const handleOrder = async () => {
    const order = {
      id: nanoid(20),
      vendorId: vendorId,
      userId: userId,
      total: totalPrice,
      orderJson: JSON.stringify({ products: products, promotions: promotions }),
      additionalInfo: additionalInfo,
      status: "pending",
      relatedProducts: products.map((product) => product.id),
    };
    const orderStatus = await createOrder(order);
    if (orderStatus.status === "success") {
      resetCart();
      toast.success("Order sent successfully.");
      router.push(`/vendors/${vendorId}/order/${orderStatus.data?.id}`);
    }
    if (orderStatus.status === "error") {
      toast.error("Failed to send order. Please try again.");
    }
  };
  if (!products.length && !promotions.length) {
    return (
      <div className="bg-white p-5 rounded-3xl h-40 flex">
        <div className="flex items-center gap-2 w-full justify-center">
          <ShoppingBasket size={50} color="#EF4E3D" />
          <p className="text-2xl text-orange font-medium">
            No products in cart
          </p>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col grow overflow-y-auto gap-1">
        {promotions.map((promotion) => (
          <div
            className="bg-white rounded-3xl p-4 pr-4 flex items-center gap-4 justify-between"
            key={promotion.id}>
            <div className="bg-neutral-300 rounded-full text-center px-4 py-1">
              <p className="font-bold text-lg">{`${promotion.quantity}x`}</p>
            </div>
            <div className=" w-56 flex flex-col gap-1">
              <p className="font-medium">{promotion.name}</p>
              <div className="flex items-center gap-2">
                <PromotionIcon />
                <p className="font-medium text-sm text-neutral-400">
                  {promotion.description}
                </p>
              </div>
            </div>
            <div className="shrink-0">
              <p className="font-medium">{`${promotion.price} ฿`}</p>
            </div>
          </div>
        ))}
        {products.map((product) => (
          <div
            className="bg-white rounded-3xl p-4 pr-4 flex items-center gap-4 justify-between"
            key={product.id}>
            <div className="bg-neutral-300 rounded-full text-center px-4 py-1">
              <p className="font-bold text-lg">{`${product.quantity}x`}</p>
            </div>
            <div className=" w-56">
              <p className="font-medium">{product.name}</p>
            </div>
            <div className="shrink-0">
              <p className="font-medium">{`${product.price} ฿`}</p>
            </div>
          </div>
        ))}
        <div className="bg-white px-5 pt-5 pb-6 flex flex-col gap-3 rounded-3xl">
          <div className="flex items-center">
            <Info size={25} />
            <p className="ml-1 text-lg font-medium">Additional Request</p>
          </div>
          <textarea
            value={additionalInfo ? additionalInfo : "No additional info."}
            disabled={true}
            className="bg-neutral-200 rounded-2xl py-2 px-4 h-16 text-black"
          />
        </div>
      </div>
      <div className="bg-white p-4">
        <div className="flex justify-between">
          <p className="text-lg">Total price</p>
          <div className="flex items-center gap-2">
            <p className="font-bold text-[18px]">{`${totalPrice}฿`}</p>
            <p className="font-medium text-[18px]">{`( $${totalPriceInDollars} USD )`}</p>
          </div>
        </div>
        <button
          onClick={handleOrder}
          disabled={totalPrice === 0}
          className="w-full py-3 bg-yellow rounded-3xl mt-4 font-bold text-xl disabled:bg-neutral-400 disabled:text-neutral-600 disabled:cursor-not-allowed">
          {totalPrice === 0 ? "The cart is empty." : "Confirm Order"}
        </button>
      </div>
    </>
  );
}
