"use client";

import React from "react";

import { cn } from "~/utils/cn";

interface OpeningHourItemProps {
  day: string;
  hours: string;
  isOpen: boolean;
}

export default function OpeningHourItem({
  day,
  hours,
  isOpen,
}: OpeningHourItemProps) {
  return (
    <div className="flex pb-1 pt-1 font-medium text-black">
      <div className="flex-grow">{day}</div>
      <div
        className={cn(`font-bold`, {
          "text-orange": !isOpen,
          "text-green": isOpen,
        })}
      >
        {hours}
      </div>
    </div>
  );
}
