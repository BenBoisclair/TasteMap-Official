"use client";

// import IntToStringWeekday from "../(utils)/IntToStringWeekday";
import { BookText, CalendarDays, Info } from "lucide-react";

import type { Market } from "@/types/types";
import convertTimeFormat from "@/utils/convertTimeFormat";
import dayToNumber from "@/utils/dayToNumber";
import isMarketOpen from "@/utils/isMarketOpen";
import OpeningHourItem from "../opening-hour-item";
import { Tag } from "../tag";
import Title from "../title";
import Container from "../container";

interface MarketInfoPageProps {
  market: Market;
}

export default function MarketInfoPage({ market }: MarketInfoPageProps) {
  const sortedOpeningHours = market.openingHours.sort(
    (a, b) => dayToNumber(a.dayOfWeek) - dayToNumber(b.dayOfWeek)
  );

  const facilityTags = market?.tags?.filter((tag) => tag.type === "Facility");

  return (
    <div className="bg-white text-sm">
      {/* About Section */}
      <Container>
        <Title title={"About"} icon={<Info size={25} />} />
        <div className="mt-2">
          <div className="flex flex-col gap-2">
            <div className="flex h-fit w-full font-medium text-black">
              {market.about}
            </div>
            {facilityTags.length > 0 && (
              <div className="hide-scrollbar no-scrollbar flex items-center gap-2 overflow-scroll">
                {facilityTags?.map((tag, key: number) => {
                  return (
                    <Tag key={key} type={tag.type} size="default">
                      {tag.name}
                    </Tag>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Container>
      {/* Opening Hours Section */}
      <Container>
        <Title title="Opening Hours" icon={<CalendarDays size={25} />} />
        <div className="mt-2">
          {sortedOpeningHours.map((hour, index) => {
            const isOpen = isMarketOpen(hour);
            return (
              <OpeningHourItem
                isOpen={isOpen}
                day={hour.dayOfWeek}
                hours={`${convertTimeFormat(
                  hour.open
                )} am - ${convertTimeFormat(hour.close)} pm`}
                key={index}
              />
            );
          })}
        </div>
      </Container>
      {/* History Section */}
      <Container>
        <Title title="History" icon={<BookText size={25} />} />
        <div className="mt-2">
          <div className="flex h-fit w-full font-medium text-black">
            {market.history}
          </div>
        </div>
      </Container>
    </div>
  );
}
