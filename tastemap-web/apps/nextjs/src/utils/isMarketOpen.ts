import { addDays, format, isWithinInterval } from "date-fns";

import type { OpeningHour } from "~/types/types";

export default function isMarketOpen(
  openingHours: OpeningHour[] | OpeningHour,
): boolean {
  const now = new Date();
  const today = format(now, "EEEE"); // Format day as "Monday", "Tuesday", etc.

  let todayOpening: OpeningHour | undefined;

  if (Array.isArray(openingHours)) {
    todayOpening = openingHours.find((day) => day.dayOfWeek === today);
  } else {
    todayOpening = openingHours.dayOfWeek === today ? openingHours : undefined;
  }

  if (!todayOpening) return false; // Market not open today

  const openTime = todayOpening.open.split(":").map(Number);
  const closeTime = todayOpening.close.split(":").map(Number);

  const openingDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    openTime[0],
    openTime[1],
  );
  let closingDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    closeTime[0],
    closeTime[1],
  );

  // Adjust closingDate to next day if closing time is earlier than opening time
  if (closingDate < openingDate) {
    closingDate = addDays(closingDate, 1);
  }

  return isWithinInterval(now, {
    start: openingDate,
    end: closingDate,
  });
}
