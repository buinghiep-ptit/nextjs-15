import type { MediaItem } from "./media-card";
import type { TabType } from "./media-tab-navigation";

/**
 * Filter media items based on the selected tab
 */
export function filterMediaByTab(
  mediaItems: MediaItem[],
  activeTab: TabType
): MediaItem[] {
  if (activeTab === "latest")
    return mediaItems.filter((item) => item.category === "latest");
  if (activeTab === "membership")
    return mediaItems.filter((item) => item.category === "membership");
  if (activeTab === "all") return mediaItems; // Show all items
  return mediaItems;
}
