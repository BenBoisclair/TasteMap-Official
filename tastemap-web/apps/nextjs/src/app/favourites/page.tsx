"use client";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation"; // Note: Corrected from 'next/navigation'
import { ArrowLeft } from "lucide-react";
import LoadingPage from "~/components/pages/loading-page";
import SearchBar from "~/components/search-bar";
import fetchAt from "~/utils/fetchAt";
import { useDebounce } from "~/utils/useDebounce";
import { Favourites, Market, Vendor } from "~/types/types";
import { MarketCard } from "~/components/market/market-card";
import VendorCardRecommendations from "~/components/sections/RecommendedForYou/vendor-card-recommendations";
import FavouriteHeart from "~/components/favouriteHeart";
import TasteMapLogo from "~/components/assets/taste-map-logo";
import { Ratings } from "~/components/sections/RatingsAndReviews/ratings";
import VerifiedBadge from "~/components/icons/verified-badge";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { cn } from "~/utils/cn";

export default function FavouritesPage() {
  const [chosenType, setChosenType] = useState<
    "View All" | "Market" | "Vendor"
  >("View All");
  const router = useRouter();
  const { data: favourites, status } = useQuery({
    queryKey: ["favourites"],
    queryFn: () => fetchAt<Favourites[]>("/api/favourites", "GET"),
    staleTime: 5 * 1000,
  });

  const handleBack = () => router.back();

  if (status === "pending") return <LoadingPage />;

  const filterFavourites = (type: string) => {
    return favourites?.filter(
      (item: any) =>
        item[type.toLowerCase() + "Id"] !== null &&
        item[type.toLowerCase()] !== null
    );
  };

  const renderFavourites = (type: "Market" | "Vendor") => {
    const filteredFavs = filterFavourites(type);
    return (
      filteredFavs?.length &&
      filteredFavs.map(
        (fav: any) =>
          fav[type.toLowerCase()] && (
            <FavouriteCard type={type} data={fav[type.toLowerCase()]} />
          )
      )
    );
  };

  const chooseTab = (name: "View All" | "Market" | "Vendor") => {
    setChosenType(name);
  };

  return (
    <div>
      <div className="flex items-center px-5 py-4">
        <button className="pr-3" onClick={handleBack}>
          <ArrowLeft />
        </button>
        <div className="grow text-xl font-bold">Favorites</div>
      </div>
      <div className="flex px-5 gap-2">
        <button
          onClick={() => chooseTab("View All")}
          className={cn(" px-4 py-1 rounded-3xl text-sm font-medium", {
            "bg-neutral-200 text-neutral-800": chosenType !== "View All",
            "bg-neutral-800 text-white": chosenType === "View All",
          })}
        >
          View All
        </button>
        <button
          onClick={() => chooseTab("Market")}
          className={cn(" px-4 py-1 rounded-3xl text-sm font-medium", {
            "bg-neutral-200 text-neutral-800": chosenType !== "Market",
            "bg-neutral-800 text-white": chosenType === "Market",
          })}
        >
          Markets
        </button>
        <button
          onClick={() => chooseTab("Vendor")}
          className={cn(" px-4 py-1 rounded-3xl text-sm font-medium", {
            "bg-neutral-200 text-neutral-800": chosenType !== "Vendor",
            "bg-neutral-800 text-white": chosenType === "Vendor",
          })}
        >
          Vendors
        </button>
      </div>
      {chosenType === "View All" && (
        <div>
          {renderFavourites("Market")}
          {renderFavourites("Vendor")}
        </div>
      )}
      {chosenType === "Market" && <div>{renderFavourites("Market")}</div>}
      {chosenType === "Vendor" && <div>{renderFavourites("Vendor")}</div>}
    </div>
  );
}

const FavouriteCard = ({
  data,
  type,
}: {
  data: Market | Vendor;
  type?: "Vendor" | "Market" | undefined;
}) => {
  return (
    <div className={twMerge("flex cursor-pointer rounded-[40px] bg-white p-3")}>
      <div className=" relative mr-4 h-[120px] w-[150px] shrink-0 rounded-xl">
        {data.bannerUrl ? (
          <>
            <Image
              src={data.bannerUrl ?? ""}
              alt={`${data.name} Banner`}
              fill={true}
              style={{
                objectFit: "cover",
              }}
              className=" rounded-3xl "
            />
            <div className="absolute top-0 w-full h-full flex flex-col items-end p-2.5">
              <FavouriteHeart
                color="white"
                isFavourite={data.isFavourite}
                vendorId={data.id}
              />
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center border-2 rounded-3xl h-full bg-neutral">
            <TasteMapLogo size={100} />
            <div className="absolute top-0 w-full h-full flex flex-col items-end p-2.5">
              <FavouriteHeart
                color="black"
                isFavourite={data.isFavourite}
                vendorId={data.id}
              />
            </div>
          </div>
        )}
      </div>

      <Link href={`/markets/${data.id}?tab=Highlights`}>
        <div className="flex grow flex-col justify-between overflow-hidden">
          <h1 className="line-clamp-2 font-bold ">{data.name}</h1>
          {!!type && (
            <span className="text-sm font-medium">
              {type === "Market" ? "Market" : "Vendor"}
            </span>
          )}

          <div className="flex items-center gap-2">
            <Ratings
              average={data?.ratings?.average}
              total={data?.ratings?.total}
            />
            {data.isVerified && <VerifiedBadge toggleBorder={false} />}
          </div>
        </div>
      </Link>
    </div>
  );
};
