"use client";
import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import {
  MediaTabNavigation,
  type TabType,
} from "./_components/media-tab-navigation";
import { MediaGrid } from "./_components/media-grid";
import { mediaItems } from "./_components/media-data";
import { filterMediaByTab } from "./_components/media-utils";

export default function MediaPage() {
  const [activeTab, setActiveTab] = useState<TabType>("latest");

  // Filter media items based on active tab
  const filteredMedia = filterMediaByTab(mediaItems, activeTab);

  return (
    <div className="bg-[#000024] min-h-screen py-10 pb-12">
      <Container className="px-[135px]">
        {/* Header */}
        <div className="flex items-center justify-center mb-10">
          <h1 className="text-white text-[32px] font-bold leading-[40px] font-['Inter']">
            Latest Media
          </h1>
        </div>

        {/* Tab Navigation */}
        <MediaTabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Media Grid */}
        <MediaGrid mediaItems={filteredMedia} />
      </Container>
    </div>
  );
}
