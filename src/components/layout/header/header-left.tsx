"use client";
import React, { useState } from "react";
import Image from "next/image";
import ArtistDropdown from "./artist-dropdown";

interface Artist {
  id: string;
  name: string;
  avatar: string;
  isVerified: boolean;
  followerCount: string;
}

export default function HeaderLeft() {
  const [currentArtist, setCurrentArtist] = useState<Artist>({
    id: "tayguyen",
    name: "TaynguyenSound",
    avatar: "/images/home/trending/artist-avatar.png",
    isVerified: true,
    followerCount: "2.5M",
  });

  const handleArtistChange = (artist: Artist) => {
    setCurrentArtist(artist);
    // Here you can add logic to switch context/data based on selected artist
    console.log("Selected artist:", artist);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex-shrink-0">
        <Image src="/images/logo.svg" alt="Logo" width={132} height={28} />
      </div>

      <ArtistDropdown
        currentArtist={currentArtist}
        onArtistChange={handleArtistChange}
      />
    </div>
  );
}
