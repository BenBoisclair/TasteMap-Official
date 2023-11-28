import React from "react";

interface OpeningHourItemProps {
  day: string;
  hours: string;
}

export default function OpeningHourItem({ day, hours }: OpeningHourItemProps) {
  return (
    <div className="flex pb-1 pt-1 font-medium text-neutral-400">
      <div className="flex-grow">{day}</div>
      <div>{hours}</div>
    </div>
  );
}
