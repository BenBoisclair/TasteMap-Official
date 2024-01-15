"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

import { cn } from "~/utils/cn";
import { createUrl } from "~/utils/createUrl";

interface TabProps {
  tabs: string[];
  inView?: boolean;
}

export default function Tabs({ tabs, inView }: TabProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <div
      className={cn(`sticky top-14 z-20 bg-white`, {
        "rounded-t-3xl": inView,
        "rounded-b-3xl": !inView,
      })}
    >
      <div className="flex justify-center">
        <div className="flex w-full justify-between p-2 md:justify-around text-center">
          {tabs.slice(0, 3).map((tab, index) => {
            const tabSearchParams = new URLSearchParams(
              searchParams.toString()
            );
            tabSearchParams.set("tab", tab);
            const isActive = searchParams.get("tab") === tab;
            const tabUrl = createUrl(pathname, tabSearchParams);
            return (
              <Link
                key={index}
                data-active={isActive}
                id={"Select Tabs"}
                className="tab-item w-full cursor-pointer rounded-3xl px-5 py-2 font-bold"
                href={tabUrl}
                scroll={true}
                replace={true}
              >
                {tab}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
