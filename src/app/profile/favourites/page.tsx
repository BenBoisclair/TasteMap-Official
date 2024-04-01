import { Frown, LogIn } from "lucide-react";
import { MarketCard } from "@/components/market/market-card";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { getFavourites } from "@/server-actions/favourites";
import VendorCardRecommendations from "@/components/recommendations/vendor-card-recommendations";
import { currentUser } from "@clerk/nextjs";
import NavbarBack from "@/components/navbar/nav-bar-back";
import removeSubstrings from "@/utils/removeSubstrings";

export const dynamic = "force-dynamic";

export default async function FavouritesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await currentUser();
  const favourites = await getFavourites();

  const tabs = ["All", "Markets", "Vendors"];
  const chosenTab = searchParams["tab"] ? searchParams["tab"] : "All";

  return (
    <div>
      <NavbarBack title="Favourites" />
      <div className="flex px-5 gap-2">
        {tabs.map((tab, index) => {
          return (
            <Link key={index} href={`/profile/favourites?tab=${tab}`} replace>
              <div
                // onClick={() => chooseTab(tab)}
                className={cn(" px-4 py-1 rounded-3xl text-sm font-medium", {
                  "bg-neutral-200 text-neutral-800": chosenTab !== tab,
                  "bg-neutral-800 text-white": chosenTab === tab,
                })}>
                {tab}
              </div>
            </Link>
          );
        })}
      </div>

      {chosenTab === "Markets" && favourites?.data?.markets?.length === 0 ? (
        <div className="flex flex-col items-center gap-1 mt-10">
          <Frown size={40} />
          <div className="text-xl">You haven't favourited any markets.</div>
          <Link href={`/`} className="mt-2">
            <div className="flex bg-yellow px-2 py-1 rounded-3xl font-medium">
              Explore
            </div>
          </Link>
        </div>
      ) : chosenTab === "Markets" && favourites?.data?.markets?.length !== 0 ? (
        <div className="flex flex-col mt-6 md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {favourites?.data.markets &&
            favourites?.data.markets.map((market) => (
              <MarketCard key={market.id} market={market} className="mx-3" />
            ))}
        </div>
      ) : null}

      {chosenTab === "Vendors" && favourites?.data?.vendors?.length === 0 ? (
        <div className="flex flex-col items-center gap-1 mt-10">
          <Frown size={40} />
          <div className="text-xl">You haven't favourited any vendors.</div>
          <Link href={`/`} className="mt-2">
            <div className="flex bg-yellow px-2 py-1 rounded-3xl font-medium">
              Explore
            </div>
          </Link>
        </div>
      ) : chosenTab === "Vendors" && favourites?.data?.vendors?.length !== 0 ? (
        <div className="flex flex-col mt-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:px-5 md:gap-6">
          {favourites?.data.vendors &&
            favourites?.data.vendors.map((vendor) => (
              <VendorCardRecommendations key={vendor.id} vendor={vendor} />
            ))}
        </div>
      ) : null}

      {chosenTab === "All" &&
      favourites?.data?.markets?.length === 0 &&
      favourites?.data?.vendors?.length === 0 ? (
        <div className="flex flex-col items-center gap-1 mt-10">
          <Frown size={40} />
          <div className="text-xl">
            You haven't favourited any markets or vendors.
          </div>
          <Link href={`/`} className="mt-2">
            <div className="flex bg-yellow px-2 py-1 rounded-3xl font-medium">
              Explore
            </div>
          </Link>
        </div>
      ) : chosenTab === "All" &&
        (favourites?.data?.markets?.length !== 0 ||
          favourites?.data?.vendors?.length !== 0) ? (
        <div className="flex flex-col mt-6 md:grid md:grid-cols-2 lg:grid-cols-4 md:px-5 gap-6 ">
          {favourites?.data.markets &&
            favourites?.data.markets.map((market) => {
              const marketVendors = favourites?.data.vendors?.filter(
                (vendor) => vendor.marketId === market.id
              );
              return (
                <>
                  <MarketCard
                    key={market.id}
                    market={market}
                    className="mx-3"
                  />
                  {marketVendors && marketVendors.length > 0 && (
                    <div className="bg-neutral">
                      <span className="font-medium text-sm text-neutral-400 flex justify-center mt-2">
                        {`Your favourited ${removeSubstrings(market.name)} Vendors`}
                      </span>
                      {marketVendors.map((vendor, key) => (
                        <VendorCardRecommendations
                          classNames="bg-transparent"
                          key={vendor.id + key}
                          vendor={vendor}
                        />
                      ))}
                    </div>
                  )}
                </>
              );
            })}
          {favourites?.data.vendors &&
            favourites?.data.vendors
              .filter(
                (vendor) =>
                  !favourites?.data.markets
                    ?.map((market) => market.id)
                    .includes(vendor.marketId)
              )
              .map((vendor, key) => (
                <VendorCardRecommendations
                  key={vendor.id + key}
                  vendor={vendor}
                />
              ))}
        </div>
      ) : null}

      {user === null && (
        <div className="flex flex-col items-center gap-4">
          <Link
            href={`/auth/sign-in`}
            className="underline text-yellow-500 font-medium">
            <LogIn size={35} />
          </Link>
          <div>
            Please{" "}
            <Link
              href={`/auth/sign-in?after_sign_in_url=%2profile%2favourites&after_sign_up_url=%2profile%2favourites&redirect_url=%2profile%2favourites`}
              className="underline text-yellow-500 font-medium">
              Log-in
            </Link>{" "}
            to view your favourites!
          </div>
        </div>
      )}
    </div>
  );
}
