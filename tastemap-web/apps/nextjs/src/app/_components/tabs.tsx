"use client";

import React from "react";

interface TabProps {
  activeTab: string;
  handleTabSelect: (tabname: string) => void;
  tabs: string[];
}

export default function Tabs({ activeTab, handleTabSelect, tabs }: TabProps) {
  return (
    <div className="sticky top-14 z-20 rounded-t-3xl bg-white">
      <div className="flex justify-center">
        <div className="flex w-full justify-around py-2">
          {tabs.slice(0, 3).map((tab, index) => (
            <button
              key={index}
              data-active={activeTab === tab}
              id={"Select Tabs"}
              className="tab-item cursor-pointer rounded-3xl px-5 py-2 font-bold"
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
