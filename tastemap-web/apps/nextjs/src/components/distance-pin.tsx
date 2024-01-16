"use client";
import { useEffect, useState } from "react";
import { cn } from "~/utils/cn";
import haversineDistance from "~/utils/haversineDistance";

interface DistancePinProps {
  latitude?: number;
  longitude?: number;
  className?: string;
}

export default function DistancePin({
  latitude,
  longitude,
  className,
}: DistancePinProps) {
  if (!latitude && !longitude) return;
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();
  const [distanceFromUser, setDistanceFromUser] = useState<number | undefined>(
    undefined
  );

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
            console.error("Geolocation error:", error);
          }
        );
      }
    };

    // Fetch the initial location
    fetchLocation();
    const interval = setInterval(fetchLocation, 300000); // Every 5 minutes
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Function to calculate distance between market and user
    const calculateDistance = () => {
      if (location && latitude && longitude) {
        const distance = haversineDistance(
          { latitude: location.latitude, longitude: location.longitude },
          {
            latitude: latitude,
            longitude: longitude,
          }
        );
        setDistanceFromUser(distance);
      }
    };

    // Calculate the initial distance
    calculateDistance();
    const interval = setInterval(calculateDistance, 300000); // Every 5 minutes
    return () => clearInterval(interval);
  }, [location]);

  if (!distanceFromUser) return;

  return (
    <div className={cn(`flex items-center gap-1 text-white`, className)}>
      <div className="w-2 h-2 bg-orange border-2 border-white rounded-full" />
      <div className="font-black">{`${distanceFromUser.toFixed(2)} km`}</div>
    </div>
  );
}
