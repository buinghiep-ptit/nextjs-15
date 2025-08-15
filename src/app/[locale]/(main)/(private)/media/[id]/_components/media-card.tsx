import React from "react";
import Image from "next/image";

export interface MediaItem {
  id: string;
  title: string;
  date: string;
  thumbnail: string;
  type: "video" | "image";
  isPremium: boolean;
  category: "latest" | "membership" | "all";
}

interface MediaCardProps {
  media: MediaItem;
}

export function MediaCard({ media }: MediaCardProps) {
  return (
    <div className="flex flex-col gap-4 cursor-pointer group transition-transform hover:scale-105">
      {/* Thumbnail */}
      <div className="relative w-[274px] h-[154px] rounded-2xl overflow-hidden group-hover:shadow-lg transition-shadow">
        <Image
          src={media.thumbnail}
          alt={media.title}
          fill
          className="object-cover"
        />

        {/* Premium Blur Overlay */}
        {media.isPremium && (
          <>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[6px] backdrop-filter" />

            {/* Premium Crown Icon */}
            <div className="absolute top-2 left-2 p-1 rounded-full">
              <div className="w-4 h-4 relative">
                <Image
                  src="/icons/crown-icon.svg"
                  alt="Premium"
                  width={16}
                  height={16}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Info Container */}
      <div className="flex flex-col gap-1 w-[274px]">
        <h3 className="text-white text-[15px] font-semibold leading-[20px] font-['Inter'] group-hover:text-gray-200 transition-colors">
          {media.title}
        </h3>
        <p className="text-[#868E96] text-[14px] font-normal leading-[20px] font-['Inter']">
          {media.date}
        </p>
      </div>
    </div>
  );
}
