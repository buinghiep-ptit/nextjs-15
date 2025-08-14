"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Artist {
  id: string;
  name: string;
  avatar: string;
  isVerified: boolean;
  followerCount: string;
}

interface ArtistDropdownProps {
  currentArtist: Artist;
  onArtistChange: (artist: Artist) => void;
}

export default function ArtistDropdown({
  currentArtist,
  onArtistChange,
}: ArtistDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Mock data for artists
  const artists: Artist[] = [
    {
      id: "tayguyen",
      name: "TaynguyenSound",
      avatar: "/images/home/trending/artist-avatar.png",
      isVerified: true,
      followerCount: "2.5M",
    },
    {
      id: "sontung",
      name: "Sơn Tùng M-TP",
      avatar: "/images/home/trending/artist-avatar.png",
      isVerified: true,
      followerCount: "8.2M",
    },
    {
      id: "denvau",
      name: "Đen Vâu",
      avatar: "/images/home/trending/artist-avatar.png",
      isVerified: true,
      followerCount: "3.1M",
    },
    {
      id: "hoangthuylinh",
      name: "Hoàng Thùy Linh",
      avatar: "/images/home/trending/artist-avatar.png",
      isVerified: true,
      followerCount: "1.8M",
    },
    {
      id: "blackpink",
      name: "BLACKPINK",
      avatar: "/images/home/trending/artist-avatar.png",
      isVerified: true,
      followerCount: "15.2M",
    },
    {
      id: "bichphuong",
      name: "Bích Phương",
      avatar: "/images/home/trending/artist-avatar.png",
      isVerified: true,
      followerCount: "2.1M",
    },
  ];

  const handleArtistSelect = (artist: Artist) => {
    onArtistChange(artist);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 cursor-pointer group">
          <h1
            className="text-[24px] font-bold leading-[28px] text-[#212529] transition-colors group-hover:opacity-80"
            style={{ fontFamily: "Phudu" }}
          >
            {currentArtist.name}
          </h1>
          <div className="transition-transform group-hover:scale-110">
            <Image
              src="/icons/arrow-down.svg"
              alt="Dropdown"
              width={20}
              height={20}
            />
          </div>
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="w-80 p-0 bg-white border border-gray-200 rounded-2xl shadow-xl"
        align="start"
        sideOffset={8}
      >
        <div className="p-4">
          <h3 className="text-lg font-semibold text-[#212529] mb-4">
            Chọn nghệ sĩ / Ban nhạc
          </h3>

          <div className="space-y-2 max-h-80 overflow-y-auto">
            {artists.map((artist) => (
              <button
                key={artist.id}
                onClick={() => handleArtistSelect(artist)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-gray-50 ${
                  currentArtist.id === artist.id
                    ? "bg-purple-50 border border-purple-200"
                    : ""
                }`}
              >
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={artist.avatar}
                    alt={artist.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gray-200">
                    {artist.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#212529] text-sm">
                      {artist.name}
                    </span>
                    {artist.isVerified && (
                      <Image
                        src="/icons/tick.svg"
                        alt="Verified"
                        width={16}
                        height={16}
                      />
                    )}
                  </div>
                  <span className="text-xs text-[#868E96]">
                    {artist.followerCount} người theo dõi
                  </span>
                </div>

                {currentArtist.id === artist.id && (
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Add new artist option */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <button className="w-full flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-gray-50 text-[#495057]">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Image src="/icons/plus.svg" alt="Add" width={20} height={20} />
              </div>
              <span className="font-medium text-sm">
                Thêm nghệ sĩ / Ban nhạc khác
              </span>
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
