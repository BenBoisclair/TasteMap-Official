import { getOrder } from "@/actions/vendorOrder";
import Image from "next/image";
import Link from "next/link";
import { PromotionSchema } from "./promotion-item";
import { ProductSchema } from "./product-item";

export default async function CartUI({ orderId }: { orderId: string }) {
  const currentOrder = await getOrder(orderId);
  if (!currentOrder) return <h1>Order not found</h1>;
  const { orderJson, total } = currentOrder;
  const orders = JSON.parse(orderJson as string);
  return (
    <>
      <div className="flex flex-col grow overflow-y-auto gap-1">
        {orders.promotions.map((promotion: PromotionSchema) => (
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
              <p className="font-bold text-lg">
                {promotion.nameTH ? promotion.nameTH : promotion.name}
              </p>
              <p>
                {promotion.descriptionTH
                  ? promotion.descriptionTH
                  : promotion.description}
              </p>
            </div>
            <div className="shrink-0">
              <p className="font-medium text-lg">{`${promotion.price}฿`}</p>
            </div>
          </div>
        ))}
        {orders.products.map((product: ProductSchema) => (
          <div
            className="bg-white rounded-3xl p-4 pr-4 flex items-center gap-4 justify-between"
            key={product.id}>
            <div className="bg-neutral-300 rounded-full text-center px-4 py-1">
              <p className="font-bold text-lg">{`${product.quantity}x`}</p>
            </div>
            <div className=" w-56">
              <p className="font-bold text-lg">
                {product.nameTH ? product.nameTH : product.name}
              </p>
            </div>
            <div className="shrink-0">
              <p className="font-medium text-lg">{`${product.price}฿`}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white p-4">
        <div className="flex justify-between">
          <p className="text-xl">Total price | ราคาทั่งหมด</p>
          <p className="text-xl font-bold">{`${total}฿`}</p>
        </div>
        <Link href={`/`}>
          <button className="w-full py-3 bg-yellow rounded-3xl mt-4 font-bold text-xl disabled:bg-neutral-400 disabled:text-neutral-600 disabled:cursor-not-allowed">
            Back to browsing.
          </button>
        </Link>
      </div>
    </>
  );
}
