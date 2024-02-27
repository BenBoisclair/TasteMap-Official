"use client";
import { createOrder } from "@/actions/vendorOrder";
import { useOfferStore } from "@/utils/store";
import { Info, ShoppingBasket } from "lucide-react";
import { nanoid } from "nanoid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Cart({ userId }: { userId: string }) {
  const products = useOfferStore((state) => state.products);
  const promotions = useOfferStore((state) => state.promotions);
  const totalPrice = useOfferStore((state) => state.getTotalPrice());
  const vendorId = useOfferStore((state) => state.vendorId);
  const resetCart = useOfferStore((state) => state.reset);
  const additionalInfo = useOfferStore((state) => state.additionalInfo);
  const router = useRouter();

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
            <div className="rounded-full p-2 bg-neutral-300">
              <Image
                alt={`Promotion and Discounts`}
                src={`/icons/promotion_icon.png`}
                width={40}
                height={40}
              />
            </div>
            <div className=" w-56">
              <p className="font-bold text-lg">{promotion.name}</p>
              <p>{promotion.description}</p>
            </div>
            <div className="shrink-0">
              <p className="font-medium text-lg">{promotion.price}</p>
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
              <p className="font-bold text-lg">{product.name}</p>
            </div>
            <div className="shrink-0">
              <p className="font-medium text-lg">{product.price}</p>
            </div>
          </div>
        ))}
        <div className="bg-white px-5 pt-5 pb-6 flex flex-col gap-3 rounded-3xl">
          <div className="flex items-center">
            <Info size={25} />
            <p className="ml-1 text-lg font-medium">
              Additional Info for Vendor.
            </p>
          </div>
          <textarea
            disabled={true}
            className="bg-neutral-200 rounded-2xl py-2 px-4 h-40">
            {additionalInfo ? additionalInfo : "No additional info."}
          </textarea>
        </div>
      </div>
      <div className="bg-white p-4">
        <div className="flex justify-between">
          <p className="text-xl">Total price</p>
          <p className="text-xl font-bold">{totalPrice}</p>
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
