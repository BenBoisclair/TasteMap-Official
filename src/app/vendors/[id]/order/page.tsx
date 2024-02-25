import { getUserId } from "@/actions/user";
import { getVendor } from "@/actions/vendors";
import NavbarBack from "@/components/navbar/nav-bar-back";
import Cart from "@/components/vendor/cart";
import Image from "next/image";

export default async function OrderPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const vendor = await getVendor(id);
  const userId = await getUserId();

  if (!vendor || !userId) return <h1>Vendor not found</h1>;
  return (
    <>
      <NavbarBack />
      <div className="flex flex-col bg-neutral-200 min-h-screen gap-1 pt-14">
        <div className="bg-white flex flex-col p-5 justify-center rounded-b-3xl">
          <div className="w-full relative h-[80px] rounded-3xl overflow-hidden">
            <Image
              fill={true}
              style={{ objectFit: "cover" }}
              src={vendor?.bannerUrl || "/opengraph-image.png"}
              alt={vendor?.name}
            />
          </div>
          <div className="flex flex-col text-center mt-3">
            <p>You're ordering at</p>
            <h1 className="text-2xl font-bold -mt-2">{vendor?.name}</h1>
          </div>
        </div>
        <Cart userId={userId} />
      </div>
    </>
  );
}
