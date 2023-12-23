"use client";

import React from "react";

import { cn } from "~/utils/cn";

interface TabProps {
  activeTab: string;
  handleTabSelect: (tabname: string) => void;
  tabs: string[];
  inView: boolean;
}

export default function Tabs({
  activeTab,
  handleTabSelect,
  tabs,
  inView,
}: TabProps) {
  return (
    <div
      className={cn(`sticky top-14 z-20 bg-white`, {
        "rounded-t-3xl": inView,
        "rounded-b-3xl": !inView,
      })}
    >
      <div className="flex justify-center">
        <div className="flex w-full justify-between p-2 md:justify-around">
          {tabs.slice(0, 3).map((tab, index) => (
            <button
              key={index}
              data-active={activeTab === tab}
              id={"Select Tabs"}
              className="tab-item w-full cursor-pointer rounded-3xl px-5 py-2 font-bold"
              onClick={() => handleTabSelect(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
