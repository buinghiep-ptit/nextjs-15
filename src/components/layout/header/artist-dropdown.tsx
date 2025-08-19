"use client";

import React, { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useArtist } from "@/providers/artist-provider";
import { useRouter, usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Community } from "@/types/community.type";
import { useListPublicCommunities } from "@/hooks/queries/use-community";

export default function ArtistDropdown() {
  const { currentArtist, setCurrentArtist, generateArtistSlug } = useArtist();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Fetch artists from API
  const { data: artists, isLoading } = useListPublicCommunities();

  // Sync currentArtist with URL on mount and pathname change
  useEffect(() => {
    if (!currentArtist || artists?.content?.length === 0) return;

    // Check if we're on a page that has artist ID in URL
    if (
      pathname.includes("/artistpedia/") ||
      pathname.includes("/community/") ||
      pathname.includes("/artists/") ||
      pathname.includes("/media/")
    ) {
      const artistIdFromUrl = pathname.split("/").pop();

      // Find artist by ID from URL
      const artistFromUrl = artists?.content?.find((artist) => {
        const slug = generateArtistSlug(artist);
        return slug === artistIdFromUrl;
      });

      // If found artist from URL and it's different from current, update it
      if (artistFromUrl && artistFromUrl.id !== currentArtist.id) {
        setCurrentArtist(artistFromUrl);
      }
    }
  }, [pathname, currentArtist, setCurrentArtist, generateArtistSlug, artists]);

  // Set current artist from URL if not set yet
  useEffect(() => {
    if (currentArtist || artists?.content?.length === 0) return;

    // Check if we're on a page that has artist ID in URL
    if (
      pathname.includes("/artistpedia/") ||
      pathname.includes("/community/") ||
      pathname.includes("/artists/") ||
      pathname.includes("/media/")
    ) {
      const artistIdFromUrl = pathname.split("/").pop();

      // Find artist by ID from URL
      const artistFromUrl = artists?.content?.find((artist) => {
        const slug = generateArtistSlug(artist);
        return slug === artistIdFromUrl;
      });

      // If found artist from URL, set it
      if (artistFromUrl) {
        setCurrentArtist(artistFromUrl);
        return;
      }
    }

    // If no artist found from URL and no current artist, set the first one
    if (artists?.content?.length && artists?.content?.length > 0) {
      setCurrentArtist(artists?.content?.[0] ?? null);
    }
  }, [pathname, currentArtist, setCurrentArtist, generateArtistSlug, artists]);

  const handleArtistSelect = (artist: Community) => {
    // Close popover immediately to avoid flicker
    setIsOpen(false);

    // Update current artist
    setCurrentArtist(artist);

    // Update URL with new artist slug
    const newArtistSlug = generateArtistSlug(artist);

    // Get current locale from pathname
    const pathSegments = pathname.split("/");
    const locale = pathSegments[1];

    // Check current page type and update URL accordingly
    if (pathname.includes("/artistpedia/")) {
      router.push(`/${locale}/artistpedia/${newArtistSlug}`);
    } else if (pathname.includes("/community/")) {
      router.push(`/${locale}/community/${newArtistSlug}`);
    } else if (pathname.includes("/artists/")) {
      router.push(`/${locale}/artists/${newArtistSlug}`);
    } else if (pathname.includes("/media/")) {
      router.push(`/${locale}/media/${newArtistSlug}`);
    }
    // If on other pages (home, profile, etc.), don't change URL
  };

  // Show loading state
  if (isLoading) {
    return <Skeleton className="bg-gray-200 w-20 sm:w-24 md:w-25 h-6 sm:h-7" />;
  }

  // Don't render if no current artist
  if (!currentArtist) {
    return null;
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 cursor-pointer group">
          <h1
            className="text-[18px] sm:text-[20px] md:text-[24px] font-bold leading-tight md:leading-[28px] text-[#212529] transition-colors group-hover:opacity-80"
            style={{ fontFamily: "Phudu" }}
          >
            {currentArtist?.communityName}
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
        className="w-[260px] sm:w-[280px] md:w-80 p-0 bg-white border border-gray-200 rounded-2xl shadow-xl"
        align="start"
        sideOffset={8}
      >
        <div className="p-4">
          <h3 className="text-lg font-semibold text-[#212529] mb-4">
            Chọn nghệ sĩ / Ban nhạc
          </h3>

          <div className="space-y-2 max-h-80 overflow-y-auto">
            {artists?.content?.map((artist) => (
              <button
                key={artist.id}
                onClick={() => handleArtistSelect(artist)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-gray-50 ${
                  currentArtist.id === artist.id
                    ? "bg-purple-50 border border-purple-200"
                    : ""
                }`}
              >
                <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                  <AvatarImage
                    src={artist.imageUrl ?? ""}
                    alt={artist.communityName ?? ""}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gray-200">
                    {artist.communityName?.charAt(0) ?? ""}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#212529] text-sm">
                      {artist.communityName ?? ""}
                    </span>
                    {/* {artist.isVerified && (
                      <Image
                        src="/icons/tick.svg"
                        alt="Verified"
                        width={16}
                        height={16}
                      />
                    )} */}
                  </div>
                  {/* <span className="text-xs text-[#868E96]">
                    {artist.followerCount} người theo dõi
                  </span> */}
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
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center">
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
