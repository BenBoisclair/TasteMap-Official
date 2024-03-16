"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

import { cn } from "@/utils/cn";
import { createUrl } from "@/utils/createUrl";

interface TabProps {
  tabs: string[];
}

export default function Tabs({ tabs }: TabProps) {
  const [activeTab, setActiveTab] = React.useState(tabs[0]);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <div className={cn(`sticky top-14 z-20 bg-white`)}>
      <div className="flex justify-center">
        <div className="flex w-full justify-between p-2 md:justify-around text-center">
          {tabs.slice(0, 3).map((tab, index) => {
            let isActive = false;
            const tabSearchParams = new URLSearchParams(
              searchParams.toString()
            );

            // If there are no search params, set the tab to the first one
            if (searchParams.get("tab") === null) {
              tabSearchParams.set("tab", activeTab);
              if (activeTab === tab) {
                isActive = true;
              }
            } else {
              tabSearchParams.set("tab", tab);
              if (searchParams.get("tab") === tab) {
                isActive = true;
              }
            }
            const tabUrl = createUrl(pathname, tabSearchParams);
            return (
              <Link
                key={index}
                data-active={isActive}
                id={"Select Tabs"}
                className="tab-item w-full cursor-pointer rounded-3xl px-5 py-2 font-bold"
                href={tabUrl}
                scroll={true}
                replace={true}>
                {tab}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
