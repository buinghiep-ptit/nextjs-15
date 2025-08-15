import React from "react";
import { MediaCard, type MediaItem } from "./media-card";

interface MediaGridProps {
  mediaItems: MediaItem[];
}

export function MediaGrid({ mediaItems }: MediaGridProps) {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {mediaItems.map((media) => (
        <MediaCard key={media.id} media={media} />
      ))}
    </div>
  );
}
