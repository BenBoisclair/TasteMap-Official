import { getOrder } from "@/actions/vendorOrder";
import { getVendor } from "@/actions/vendors";
import NavBar from "@/components/navbar/nav-bar";
import CartUI from "@/components/vendor/card-ui";
import Cart from "@/components/vendor/cart";
import { Info } from "lucide-react";
import Image from "next/image";

export default async function OrderConfirmedPage({
  params: { orderId, id },
}: {
  params: { orderId: string; id: string };
}) {
  const vendor = await getVendor(id);
  if (!vendor) return <h1>Vendor not found</h1>;

  return (
    <>
      <NavBar />
      <div className="flex flex-col bg-neutral-200 min-h-screen gap-1 pt-14">
        <div className="bg-white flex flex-col p-5 justify-center rounded-b-3xl">
          <div className="w-full relative h-[143px] rounded-3xl overflow-hidden ">
            <Image
              fill={true}
              style={{ objectFit: "cover" }}
              src={vendor?.bannerUrl || "/opengraph-image.png"}
              alt={vendor?.name}
            />
            <div className=" p-5 text-white absolute border w-full flex h-full bg-black/40 flex-col">
              <div className="flex flex-col justify-center text-center grow items-center">
                <p className="text-lg">Your order number</p>
                <p className="text-3xl font-bold">{`${orderId.slice(0, 5)}`}</p>
              </div>
              <div className="flex justify-center text-sm">
                <p className="font-medium">{vendor.name}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center px-5 items-center gap-4">
            {/* Change when App is complete */}
            {/* <p className="leading-1 mt-2 text-black">
              The merchant has been notified of your order and will prepare it
              as soon as possible!
            </p> */}
            <Info size={40} />
            <p className="leading-1 mt-2 text-black">
              Show this to the merchant to confirm your order.
            </p>
          </div>
        </div>
        <CartUI orderId={orderId} />
      </div>
    </>
  );
}
