import React from "react";

interface TabProps {
  activeTab: string;
  handleTabSelect: (tabname: string) => void;
  tabs: string[];
}

export default function Tabs({ activeTab, handleTabSelect, tabs }: TabProps) {
  return (
    <div className="sticky top-12 z-20 border-b-2 border-neutral-600/30 bg-white">
      <div className="flex justify-center pb-1">
        <div className="flex w-full justify-around px-5">
          {tabs.slice(0, 3).map((tab, index) => (
            <button
              key={index}
              data-active={activeTab === tab}
              id={tab}
              className="tab-item cursor-pointer px-5 py-3 font-bold"
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
