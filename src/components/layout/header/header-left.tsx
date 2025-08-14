"use client";
import React from "react";
import Image from "next/image";
import ArtistDropdown from "./artist-dropdown";

export default function HeaderLeft() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-shrink-0">
        <Image src="/images/logo.svg" alt="Logo" width={132} height={28} />
      </div>

      <ArtistDropdown />
    </div>
  );
}
