import { addDays, format, isWithinInterval } from "date-fns";

import type { OpeningHour } from "@/types/types";

function toThaiTime(date: Date) {
  const thaiZoneTimeOffset = 7; // for UTC+7
  const localTimeInMs = date.getTime();
  const localOffsetInMs = date.getTimezoneOffset() * 60 * 1000; // to milliseconds
  const thaiTimeInMs =
    localTimeInMs + localOffsetInMs + thaiZoneTimeOffset * 60 * 60 * 1000; // to milliseconds
  return new Date(thaiTimeInMs);
}

export default function isMarketOpen(
  openingHours: OpeningHour[] | OpeningHour
): boolean {
  const now = toThaiTime(new Date());

  const today = format(now, "EEEE");

  let todayOpening: OpeningHour | undefined;

  if (Array.isArray(openingHours)) {
    todayOpening = openingHours.find((day) => day.dayOfWeek === today);
    if (!todayOpening) {
      todayOpening = openingHours.find(
        (day) => day.dayOfWeek === format(addDays(now, -1), "EEEE")
      ); // Check also for yesterday
    }
  } else {
    todayOpening = openingHours.dayOfWeek === today ? openingHours : undefined;
    if (
      !todayOpening &&
      openingHours.dayOfWeek === format(addDays(now, -1), "EEEE")
    ) {
      todayOpening = openingHours; // Check also for yesterday
    }
  }

  if (!todayOpening) return false;

  const openTime = todayOpening.open.split(":").map(Number);
  const closeTime = todayOpening.close.split(":").map(Number);

  const openingDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    openTime[0],
    openTime[1]
  );
  let closingDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    closeTime[0],
    closeTime[1]
  );

  if (openingDate > closingDate) {
    closingDate = addDays(closingDate, 1);
  }

  return isWithinInterval(now, {
    start: openingDate,
    end: closingDate,
  });
}
