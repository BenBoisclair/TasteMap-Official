"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

import type { Market } from "~/types/types";
import isMarketOpen from "~/utils/isMarketOpen";
import { MarketStatusIcon } from "../icons/market-status-icon";
import VerifiedBadge from "../icons/verified-badge";
import { Ratings } from "../sections/RatingsAndReviews/ratings";
import { Tag } from "../tag";
import { useEffect, useState } from "react";
import haversineDistance from "~/utils/haversineDistance";
import { cn } from "~/utils/cn";
import FavouriteHeart from "../favouriteHeart";

export function MarketCard({ market }: { market: Market }) {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();
  const [distanceFromUser, setDistanceFromUser] = useState<number | undefined>(
    undefined
  );
  const productTags = market.tags.filter(tag => tag.type === "Product");
  const facilityTags = market.tags.filter(tag => tag.type === "Facility");

  const isOpen = isMarketOpen(market.openingHours);

  useEffect(() => {
    // Define a function to fetch the user's location
    const fetchLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            const { longitude, latitude } = coords;
            setLocation({ latitude, longitude });
          },
          error => {
            console.error("Geolocation error:", error); // Better to handle this with a state and show a UI message
          }
        );
      }
    };

    // Fetch the initial location
    fetchLocation();

    // Set an interval to fetch location every 5 minutes
    const interval = setInterval(fetchLocation, 300000); // 300000 ms = 5 minutes

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    // Function to calculate distance
    const calculateDistance = () => {
      if (location) {
        const distance = haversineDistance(
          { latitude: location.latitude, longitude: location.longitude },
          {
            latitude: parseFloat(market.latitude),
            longitude: parseFloat(market.longitude),
          }
        );
        setDistanceFromUser(distance);
      }
    };

    // Calculate the initial distance
    calculateDistance();

    // Set an interval to recalculate distance every 5 minutes
    const interval = setInterval(calculateDistance, 300000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [location]); // Dependency array includes location, so effect runs when location changes

  return (
    <div className="shrink-0 overflow-hidden">
      <div className="relative flex h-[120px] w-[316px] place-content-center overflow-hidden rounded-3xl">
        <Image
          src={market.bannerUrl || ""}
          alt={`${market.name}'s Banner`}
          fill={true}
          style={{ objectFit: "cover" }}
        />
        <div className="absolute flex h-full w-full flex-col justify-between p-3">
          <div
            className={cn(`flex items-center text-white`, {
              "justify-between": !!distanceFromUser,
              "justify-end": !distanceFromUser,
            })}
          >
            {!!distanceFromUser && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span className="font-black">
                  {`${distanceFromUser.toFixed(2)} km`}
                </span>
              </div>
            )}
            <FavouriteHeart
              isFavourite={market.isFavourite}
              marketId={market.id}
            />
          </div>
          <div className="flex justify-end">
            {market.isVerified && <VerifiedBadge />}
          </div>
        </div>
      </div>
      <Link href={`/market/${market.id}?tab=Highlights`}>
        <div className="mt-[10px] flex flex-col">
          <h1 className=" text-xl font-black">{market.name}</h1>
          <p className="font-medium">{market.type}</p>

          <div className="mt-[10px] flex items-center gap-2">
            <MarketStatusIcon status={isOpen ? "OPEN" : "CLOSED"} />
            <Ratings
              total={market?.ratings?.total}
              average={market?.ratings?.average}
            />
          </div>
          <div className="mt-[10px] flex flex-col gap-2">
            <div className="flex gap-2">
              {productTags.slice(0, 3).map(tag => (
                <Tag type={tag.type} key={tag.id}>
                  {tag.name}
                </Tag>
              ))}
              {productTags?.length > 3 && (
                <Tag type="Product">+{productTags?.length - 3}</Tag>
              )}
            </div>
            <div className="flex gap-2">
              {facilityTags.slice(0, 3).map(tag => (
                <Tag type={tag.type} key={tag.id}>
                  {tag.name}
                </Tag>
              ))}
              {facilityTags?.length > 3 && (
                <Tag type="Facility">+{facilityTags?.length - 3}</Tag>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
