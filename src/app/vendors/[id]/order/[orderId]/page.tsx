import { getVendor } from "@/server-actions/vendors";
import NavBar from "@/components/navbar/nav-bar";
import CartUI from "@/components/vendor/cart-ui";
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
          <div className="w-full relative h-[80px] rounded-3xl overflow-hidden ">
            <Image
              fill={true}
              style={{ objectFit: "cover" }}
              src={`${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL}/storage/v1/object/public/public-assets/vendors/${vendor.id}/banner`}
              alt={vendor?.name}
            />
            <div className=" text-white absolute border w-full flex h-full bg-black/40 flex-col">
              <div className="flex justify-center text-center grow items-center text-2xl gap-3">
                <p>Order Number:</p>
                <p className="font-bold">{`${orderId.slice(0, 5)}`}</p>
              </div>
              {/* <div className="flex justify-center text-sm">
                <p className="font-medium">{vendor.name}</p>
              </div> */}
            </div>
          </div>

          <div className="flex justify-center px-5 items-center gap-1 mt-4 text-center flex-col">
            <p className="leading-1 text-black text-xl font-medium">
              Show your screen to the merchant
            </p>
            <p className="text-lg">{`at ${vendor.name}`}</p>
          </div>
        </div>
        <CartUI orderId={orderId} />
      </div>
    </>
  );
}
