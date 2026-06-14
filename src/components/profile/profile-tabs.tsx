"use client";

import { LayoutGrid, Bookmark } from "lucide-react";

type Tab = "my" | "saved";

interface ProfileTabsProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  myCount: number;
  savedCount: number;
}

export default function ProfileTabs({
  activeTab,
  setActiveTab,
  myCount,
  savedCount,
}: ProfileTabsProps) {
  const tabs = [
    { id: "my" as Tab,    label: "My prompts", icon: <LayoutGrid size={15} />, count: myCount    },
    { id: "saved" as Tab, label: "Saved",       icon: <Bookmark size={15} />,  count: savedCount },
  ];

  return (
    <div className="flex border-b border-gray-100" role="tablist">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 pb-3 pt-1 text-sm font-medium transition-colors border-b-2
              ${isActive
                ? "text-gray-900 border-gray-900"
                : "text-gray-400 border-transparent hover:text-gray-600"
              }`}
          >
            {tab.icon}
            {tab.label}
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full font-semibold
                ${isActive ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-500"}`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}