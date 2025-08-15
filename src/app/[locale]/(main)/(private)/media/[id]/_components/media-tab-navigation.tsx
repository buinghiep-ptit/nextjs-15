import React from "react";
import { MediaTabButton } from "./media-tab-button";

export type TabType = "latest" | "membership" | "all";

interface MediaTabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function MediaTabNavigation({
  activeTab,
  onTabChange,
}: MediaTabNavigationProps) {
  const tabs = [
    { id: "latest", label: "Latest Media", icon: null },
    { id: "membership", label: "Membership", icon: "crown" },
    { id: "all", label: "See All media", icon: null },
  ] as const;

  return (
    <div className="flex items-center justify-center gap-4 mb-10">
      {tabs.map((tab) => (
        <MediaTabButton
          key={tab.id}
          isActive={activeTab === tab.id}
          onClick={() => onTabChange(tab.id as TabType)}
          icon={tab.icon}
        >
          {tab.label}
        </MediaTabButton>
      ))}
    </div>
  );
}
